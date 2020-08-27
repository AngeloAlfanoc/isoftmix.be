import About from '../../components/fr/About'
import Contact from '../../components/fr/Contact'
import CookieConsent from "react-cookie-consent";
import Footer from '../../components/fr/Footer'
import Header from '../../components/fr/Header'
import Products from '../../components/fr/Products'
import React from 'react';
import Testimonials from '../../components/fr/Testimonials'

class Home extends React.Component {
    render() {
        return (
            <div className="loaded content">
                <Header/>
                <About/>
                <Products/>
                <Testimonials/>
                <Contact/>
                <Footer/>
                <CookieConsent
                    buttonText="
                    Je comprends!"
                    cookieName="GDPR_COOKIE"
                    expires={150}
                    buttonStyle={{
                    backgroundColor: "#FFBF37",
                    fontSize: "13px",
                    borderRadius: "4px"
                }}>

                    Ce site Web utilise des cookies pour personnaliser votre expérience. Cliquez <a href='/cookies'> ici </a>
                     pour plus d'informations.
                </CookieConsent >
            </div>
        );

    }
}

export default Home;