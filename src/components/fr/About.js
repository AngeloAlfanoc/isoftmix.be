import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoaderComponent from './Loader';
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import axios from 'axios'
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {frontConfig} from '../../settings/frontconfig'
import { routesObject } from "../../settings/routesObject";

class About extends React.Component {
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

        const {data, isLoaded, location} = this.state;

        if (isLoaded === true) {
            if (location === routesObject.routesFR.default) {
                if (data.paragraaf_fr.length > 380) {
                    data.paragraaf_fr = data.paragraaf_fr.substring(0, 375) + '...'
                }
            }
            return ( 
         <>
        <section className="about" style={this.state.location === '/fr' ? { paddingBottom: 100+'px', paddingTop: 100+'px'} : {paddingBottom: 100+'px'}}>
            <div className="container d-flex" id="about">
                <div className="d-flex flex-column align-items-start w-100 pb-5 flex-wrap">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="d-flex flex-row align-items-center">
                            <span className="mr-3">
                                <a href="/about"><FontAwesomeIcon
                                    style={{fontSize: '1.4em',color: '#FFBF37'}}
                                    icon={faAngleDoubleRight}/></a>
                            </span>
                            <span className="mr-3">
                                <a href="/about">
                                    <h2>{data.title_fr}</h2>
                                </a>
                            </span>
                        </div>
                    </ScrollAnimation>
                    <div className="d-flex flex-row flex-wrap">

                        <div className="col-md-6">
                            <ScrollAnimation animateIn="fadeIn">
                                <p dangerouslySetInnerHTML={{__html:data.paragraaf_fr}}></p>
                                {location === routesObject.routesFR.default? <a href={routesObject.routesFR.about}>Lire plus</a> : ''}
                            </ScrollAnimation>
                        </div>

                        <div className="col-md-6">
                            <ScrollAnimation animateIn="fadeIn">
                                <img alt="Logo About Section" className="img-fluid" src={data.pic}></img>
                            </ScrollAnimation>
                        </div>
                    </div>

                </div>
            </div>
        </section></>);
        }
         else{
             return <LoaderComponent/>
         }
        

    }
}

export default About;