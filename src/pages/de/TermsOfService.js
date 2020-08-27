import Footer from '../../components/de/Footer'
import Header from '../../components/de/Header'
import {Helmet} from 'react-helmet'
import LoaderComponent from '../../components/Loader';
import React from 'react';
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig';

class Terms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };

    }
    componentDidMount() {
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
                        <title>{"iSOFTMIX.be - Nutzungsbedingungen"}</title>
                    </Helmet>
                    <Header/>
                    <div
                        className="container py-5"
                        dangerouslySetInnerHTML={{
                        __html: data[0].acf.editor
                    }}></div>
                    <Footer/>
                </div>
            );
        } else {
            return <LoaderComponent/>
        }
    }
}

export default Terms;