import Footer from '../../components/eng/Footer'
import Header from '../../components/eng/Header'
import {Helmet} from 'react-helmet';
import LoaderComponent from '../../components/eng/Loader';
import React from 'react';
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig';

class Cookies extends React.Component {
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
                        <title>Cookie Policy (english)</title>
                    </Helmet>
                    <Header/>
                    <div className="container py-5" dangerouslySetInnerHTML={{__html:data[1].acf.editor}}></div>
                    <Footer/>
                </div>
            );
        }
        else{
            return <LoaderComponent/>
        }
    }
}

export default Cookies;