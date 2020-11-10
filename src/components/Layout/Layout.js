import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandle = (props) => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = (props) => {
        this.setState((prevSate) => {
            return { showSideDrawer: !prevSate.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandle}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
} 

export default Layout;