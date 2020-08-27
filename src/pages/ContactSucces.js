import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Footer from '../components/Footer'
import Header from '../components/Header'
import {Helmet} from 'react-helmet';
import React from 'react';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

class Contact extends React.Component {

    render() {
        return (
            <div className="loaded">
                <Helmet>
                    <title>Formulier is succesvol verstuurd.</title>
                </Helmet>
                <Header/>
                <div className="container">
                    <div className="d-flex flex-column justify-content-center py-5">
                        <div className="d-flex justify-content-center">
                            <FontAwesomeIcon
                                style={{
                                fontSize: '10em'
                            }}icon={faPaperPlane}/>
                        </div>
                        <h4 className="text-center my-5">
                            Wij verwerken jou mail en nemen zo snel mogelijk contact met je op.
                        </h4>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Contact;