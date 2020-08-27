import About from '../../components/eng/About'
import Contact from '../../components/eng/Contact'
import CookieConsent from "react-cookie-consent";
import Footer from '../../components/eng/Footer'
import Header from '../../components/eng/Header'
import {Helmet} from 'react-helmet';
import Products from '../../components/eng/Products'
import React from 'react';
import Testimonials from '../../components/eng/Testimonials'

class Home extends React.Component {
    render() {
        return (
            <div className="loaded content">
                <Helmet>
                    <title>iSOFTMIX.be - Specialist service provider for water treatment</title>
                </Helmet>
                <Header/>
                <About/>
                <Products/>
                <Testimonials/>
                <Contact/>
                <Footer/>
                <CookieConsent
                    buttonText="
I understand!"
                    cookieName="GDPR_COOKIE"
                    expires={150}
                    buttonStyle={{
                    backgroundColor: "#FFBF37",
                    fontSize: "13px",
                    borderRadius: "4px"
                }}>

                    This website uses cookies to personalize your experience. Click
                    <a href='/cookies'> here </a>
                    for more info.
                </CookieConsent >
            </div>
        );

    }
}

export default Home;