import {BrowserView, MobileView} from "react-device-detect";

import Burger from './Burger'
import Nav from './Nav'
import React from 'react';
import Slick from './Slick'
import Topbar from './Topbar'

class Home extends React.Component {
    render() {
        if (window.location.pathname === '/de' || window.location.pathname === '/de/') {
            return (
                <header>
                    <BrowserView>
                        <Topbar/>
                        <Nav/>
                        <Slick/>
                    </BrowserView>
                    <MobileView>
                    <Topbar/>
                        <Burger/>
                        <Slick/>
                    </MobileView>
                </header>
            );
        }
        else{
            return (
                <header>
                    <BrowserView>
                        <Topbar/>
                        <Nav/>
                    </BrowserView>
                    <MobileView>
                        <Topbar/>
                        <Burger/>
                    </MobileView>
                </header>
            );
        }

    }
}

export default Home;