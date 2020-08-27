import Breadcrumbs from '../../components/fr/Breadcrumbs'
import ContactComponent from '../../components/fr/Contact'
import Footer from '../../components/fr/Footer'
import Header from '../../components/fr/Header'
import { Helmet } from 'react-helmet';
import React from 'react';
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig'

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        data: [],
        location: window.location.pathname,
    };
}

componentDidMount = () => {
    this.fetch();
}

fetch = async () => {
    await
    axios
        .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSections)
        .then((result) => {
            this.setState({isLoaded: true, data: result.data[1].acf});
        }, (error) => {
            this.setState({isLoaded: false, error});
        })
}

render() {

    const {data} = this.state;
        return(
            <div className="loaded">
              <Helmet>
                <title>Contact - Besoin d'informations?</title>
              </Helmet>
            <Header/>
            <Breadcrumbs/>
            <ContactComponent paragraph={data.contact_text_fr}/>
            <Footer/>
          </div>
        );
      }
    }

export default Contact;