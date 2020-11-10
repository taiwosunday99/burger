import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

const INRGEDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        
        axios.get('/orders.json')
        .then(response => {
            // console.log(response.data)
            let data = response.data;
            for (let key in data) {
                console.log(data[key])
                this.setState({
                    key: key,
                    ingredients: data[key].ingredients
                })
            }
            // this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error: true})
        })
    }

 purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    continuePurchaseHandler = () => {
        // alert('Yes continue purchase!')
        // this.setState({ loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Taiwo Sunday',
        //         address: '22 nnobi street',
        //         city: 'Lagos'
        //     },
        //     email: 'taiwosunday@gmail.com',
        //     deliveryMethod: 'Tansport by road'
        // }
        // axios.post('/orders.json', order)
        // .then(res => {
        //     console.log(res)
        //     this.setState({ loading: false, purchasing: false})
        // })
        // .catch(err => {
        //     console.log(err);
        //     this.setState({ loading: false, purchasing: false})
            
        // })
        let queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    updatePurchaseState (ingredients) {
       
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) =>{
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0})
    }

     addIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type]
            const updatedCount = oldCount + 1
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceAddition = INRGEDIENTS_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            })
            this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INRGEDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }
    
    render () {
        
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                        <Burger ingredients={this.state.ingredients} />
            <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            />
                </Aux>
            );
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients} 
            purchaseCancelled={this.cancelPurchaseHandler}
            purchaseContinued={this.continuePurchaseHandler}
            price={this.state.totalPrice}
            />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
      
        
        return (
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                {orderSummary}
            </Modal>
                { burger }
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);