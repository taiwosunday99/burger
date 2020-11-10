import React from 'react'
import BurgerLogo from '../../assets/images/burger.png'
import classes from './Logo.css'

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={BurgerLogo} alt="my burger"/>
    </div>
)
export default Logo