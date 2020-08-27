import Footer from '../../components/fr/Footer'
import Header from '../../components/fr/Header'
import { Helmet } from 'react-helmet';
import LoaderComponent from '../../components/fr/Loader';
import React from 'react';
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig';

class Privacy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data:[],
        };

    }
    componentDidMount(){
        this.fetch();
    }
    fetch = async() => {
        await
        axios
        .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getPages)
        .then((result) => {
            this.setState({isLoaded: true, data: result.data});
        }, (error) => {
            this.setState({isLoaded: false, error});
        })
    }
    render() {
        const {isLoaded, data} = this.state;
        if (isLoaded === true) {
            return (
                <div className="loaded">
                                        <Helmet>
                        <title>Privacy Policy (english)</title>
                    </Helmet>
                    <Header/>
                    <div className="container py-5" dangerouslySetInnerHTML={{__html:data[2].acf.editor}}></div>
                    <Footer/>
                </div>
            );
        }
        else{
            return <LoaderComponent/>
        }
    }
}

export default Privacy;