import {BrowserView, MobileView} from "react-device-detect";

import Burger from '../components/Burger'
import Nav from '../components/Nav'
import React from 'react';
import Slick from '../components/Slick'
import Topbar from '../components/Topbar'

class Home extends React.Component {
    render() {
        if (window.location.pathname === '/') {
            return (
                <header>
                    <BrowserView>
                        <Topbar/>
                        <Nav className="bg-white container-fluid"/>
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