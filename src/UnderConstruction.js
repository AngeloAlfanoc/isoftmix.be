//React
import React from 'react';

//Assets
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/main.min.css'

import {Helmet} from 'react-helmet';


class UnderConstruction extends React.Component {

 

    render() { 
        return (<>
            <Helmet>
            <title>Website onder constructie.</title >
        </Helmet>
        <div className="container my-5 d-flex flex-column align-items-center">
        <h3>Onze website komt er binnenkort aan!</h3>
        <p>Je kan ook even surfen naar een van onze andere websites! <a href="http://www.iservwater.be/"> iservwater.be</a></p>
        <p>Dit project is in samenwerken met <a href="http://www.methods.me">methods</a></p>
    </div>
    </>)
    }
}

export default UnderConstruction;