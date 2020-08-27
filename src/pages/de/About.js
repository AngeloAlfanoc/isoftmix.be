import About from '../../components/de/About'
import Breadcrumbs from '../../components/de/Breadcrumbs'
import Footer from "../../components/de/Footer";
import Header from '../../components/de/Header'
import {Helmet} from 'react-helmet';
import LoaderComponent from '../../components/de/Loader';
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
                let sanitizeSEOTAG = data.paragraaf_de.replace(/(<([^>]+)>)/ig,"").split(/[ ,]+/).join(',').replace(/[ .]+/g, " ");
            return ( <> <div className="loaded content">
                <Helmet>
                    <title>{"iSOFTMIX.be - "+data.title_de}</title>
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