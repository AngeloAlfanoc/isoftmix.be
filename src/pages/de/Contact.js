import Breadcrumbs from '../../components/de/Breadcrumbs'
import ContactComponent from '../../components/de/Contact'
import Footer from '../../components/de/Footer'
import Header from '../../components/de/Header'
import {Helmet} from 'react-helmet';
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
        return (
            <div className="loaded">
                <Helmet>
                    <title>iSOFTMIX.be - Kontakt</title>
                </Helmet>
                <Header/>
                <Breadcrumbs/>
                <ContactComponent paragraph={data.contact_text_de}/>
                <Footer/>
            </div>
        );
    }
}

export default Contact;