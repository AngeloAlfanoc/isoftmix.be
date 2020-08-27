import About from '../../components/fr/About'
import Breadcrumbs from '../../components/fr/Breadcrumbs'
import Footer from "../../components/fr/Footer";
import Header from '../../components/fr/Header'
import {Helmet} from 'react-helmet';
import LoaderComponent from '../../components/fr/Loader';
import React from 'react';
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
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
                this.setState({
                    isLoaded: true, data: result.data[1].acf,
                });
            }, (error) => {
                this.setState({isLoaded: false, error});
            })
    }

    render() {

        const {data, isLoaded} = this.state;
        if (isLoaded === true) {
                let sanitizeSEOTAG = data.paragraaf_fr.replace(/(<([^>]+)>)/ig,"").split(/[ ,]+/).join(',').replace(/[ .]+/g, " ");
            return ( <> <div className="loaded content">
                <Helmet>
                    <title>{"iSOFTMIX.be - "+data.title_fr}</title>
                    <meta name="keywords" content={sanitizeSEOTAG}/>
                </Helmet>
                <Header/>
                <Breadcrumbs/>
                <About/>
            </div> < Footer /> </>);
        } else {
            return <LoaderComponent/>
        }
    }
}

export default Home;