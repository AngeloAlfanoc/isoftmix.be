import About from '../../components/de/About'
import Contact from '../../components/de/Contact'
import CookieConsent from "react-cookie-consent";
import Footer from '../../components/de/Footer'
import Header from '../../components/de/Header'
import {Helmet} from 'react-helmet';
import Products from '../../components/de/Products'
import React from 'react';
import Testimonials from '../../components/de/Testimonials'

class Home extends React.Component {
    render() {
        return (
            <div className="loaded content">
                <Helmet>
                    <title>iSOFTMIX.be - Spezialist für Wasseraufbereitung</title>
                </Helmet>
                <Header/>
                <About/>
                <Products/>
                <Testimonials/>
                <Contact/>
                <Footer/>
                <CookieConsent
                    buttonText="Ich verstehe!"
                    cookieName="GDPR_COOKIE"
                    expires={150}
                    buttonStyle={{
                    backgroundColor: "#FFBF37",
                    fontSize: "13px",
                    borderRadius: "4px"
                }}>
                    Diese Website verwendet Cookies, um Ihre Erfahrung zu personalisieren. Klicken
                    Sie 
                    <a href='/cookies'> hier </a> 
                    um weitere Informationen zu erhalten.
                </CookieConsent >
            </div>
        );

    }
}

export default Home;