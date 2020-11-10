import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.css'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
       <span style={{color: 'white', fontSize: '1em', fontStyle: 'bold'}}>SunTee Snacks & Foods Spot</span>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
        <Logo />
        </div>        
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
    )

export default Toolbar;