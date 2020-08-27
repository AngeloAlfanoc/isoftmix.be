//Assets
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
import './assets/css/main.min.css'
import "animate.css/animate.min.css"

import {Helmet} from 'react-helmet';
import LoaderComponent from './components/Loader'
import React from 'react';
import ReactGA from 'react-ga';
import Router from './settings/routes'
import axios from 'axios'
import {frontConfig} from './settings/frontconfig'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoadedMain: false,
            isLoadedProducts: false,
            data: [],
            products: [],
        };
    }
    componentDidMount = () => {
        this.fetchData();
        ReactGA.initialize(frontConfig.GA);
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    fetchData = async () => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream)
            .then((result) => {
                this.setState({isLoadedMain: true, data: result.data});
            }, (error) => {
                this.setState({isLoadedMain: false, error});
            })
    }

    render() {
        const {error,isLoadedMain,data} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoadedMain === true) {
            return (
            <> 
            <Helmet>
                <title>{data.name} - {data.description}</title >
                <meta name="description" content={data.description}/>
                <meta charset="UTF-8"/>
                <meta name="description" content="iSERV is een gespecialiseerde dienstverlener voor de behandeling van water. iSERV biedt haar cliënteel intelligente, betrouwbare, duurzame en kost-efficënte diensten aan. Onze specialiteiten zijn ondermeer industrieel, puur en ultra-puur water, behandeld door Ion Exchange(IX), Reverse Osmosis, Membrane Technology, (ultra-) Filtration en Softening (verzachting) technieken. De ervaring van onze mensen maken het verschil."/>
                <meta name="keywords" content="water,cleaning,equipment"/>
                <meta name="author" content="methods - Alfano Angelo"/>
                <meta name="copyright" content="iSOFTMIX is owned by NWAT Bvba "/>
            </Helmet> 
            <Router/>

            </>)
        } else {
            return (<LoaderComponent/>);
        }
    }
}

export default App;