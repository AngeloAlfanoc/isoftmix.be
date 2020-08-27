import About from '../components/About'
import Contact from '../components/Contact'
import CookieConsent from "react-cookie-consent";
import Footer from '../components/Footer'
import Header from '../components/Header'
import {Helmet} from 'react-helmet';
import Products from '../components/Products'
import React from 'react';
import Testimonials from '../components/Testimonials'

class Home extends React.Component {
    render() {
        return (
            <div className="loaded content">
                <Helmet>
                    <title>iSOFTMIX.be - Specialist serviceprovider voor waterbehandeling</title>
                </Helmet>
                <Header/>
                <About/>
                <Products/>
                <Testimonials/>
                <Contact/>
                <Footer/>
                <CookieConsent
                    buttonText="Ik begrijp het!"
                    cookieName="GDPR_COOKIE"
                    expires={150}
                    buttonStyle={{
                    backgroundColor: "#FFBF37",
                    fontSize: "13px",
                    borderRadius: "4px"
                }}>
                    Deze website gebruikt cookies om uw ervaring te personaliseren. Klik <a href='/cookies'> hier </a> voor meer info.
                </CookieConsent >
            </div>
        );

    }
}

export default Home;