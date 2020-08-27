import {BrowserView, MobileView} from "react-device-detect";

import AnchorLink from 'react-anchor-link-smooth-scroll'
import Breadcrumbs from '../components/Breadcrumbs'
import ContactOrder from '../components/ContactOrder'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Footer from '../components/Footer'
import Header from '../components/Header'
import {Helmet} from 'react-helmet';
import LoaderComponent from '../components/Loader'
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import axios from 'axios'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {frontConfig} from '../settings/frontconfig'

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '/producten/',
            error: null,
            isLoaded: false,
            isLoadedSections: false,
            data: [],
            dataText: [],
            chosenProduct: null

        };
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData = async() => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getProducts)
            .then((result) => {
                const reversed = result
                    .data
                    .reverse()
                this.setState({isLoaded: true, data: reversed});
            }, (error) => {
                this.setState({isLoaded: false, error});
            })
        await
        axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSections)
            .then((result) => {
                this.setState({isLoadedSections: true, dataText: result.data[1].acf});
            }, (error) => {
                this.setState({isLoadedSections: false, error});
            })
    }

    render() {
        const {error, isLoaded, isLoadedSections, dataText, data} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoaded === true && isLoadedSections === true) {
            return <div className="products loaded">
                <Helmet>
                    <title>{"iSOFTMIX.be - "+dataText.title_producten_nl}</title>
                </Helmet>
                <Header/>
                <Breadcrumbs/>
                <section>
                    <div className="container">
                        <div className="d-flex flex-row align-items-center">
                            <span className="mr-3 mb-3">
                                <h2>{dataText.title_producten_nl}</h2>
                            </span>
                            <span>
                                <FontAwesomeIcon
                                    style={{
                                    fontSize: '1.4em',
                                    color: '#FFBF37'
                                }}
                                    icon={faChevronRight}/>
                            </span>
                        </div>
                        <p
                            className="w-100"
                            dangerouslySetInnerHTML={{
                            __html: dataText.paragraaf_pruducten_nl
                        }}></p>
                    </div>
                    <BrowserView>
                        <div className="container">
                            <div className="row">
                                {data.map((product, i) => {
                                    //Shorten the description of the product.
                                    if (product.acf.descr_nl.length > 180) {
                                        product.acf.descr_nl = product
                                            .acf
                                            .descr_nl
                                            .substring(0, 175) + '...'
                                    }
                                    return (      
                                        <div key={i} className="col-lg-6 col-md-12 col-sm-12  my-1  d-flex  rounded">
                                           <div
                                                style={{
                                                minHeight: 225 + 'px'
                                            }}
                                                className="d-flex border p-3">
                                                <div className="mr-4">
                                                    <a href={this.state.location + product.acf.permalink}>
                                                        <img
                                                            alt='thumb'
                                                            style={{
                                                            maxWidth: 150 + 'px',
                                                            maxHeight: 175 + 'px'
                                                        }}
                                                            className="rounded img-fluid"
                                                            src={product.acf.picture}></img>
                                                    </a>
                                                </div>
                                                <div>
                                                    <h3>
                                                        <a href={this.state.location + product.acf.permalink}>{product.acf.product_name_nl}</a>
                                                    </h3>
                                                    <p
                                                        className="d-flex flex-column"
                                                        dangerouslySetInnerHTML={{
                                                        __html: product.acf.descr_nl
                                                    }}></p>
                                                    <div className="d-flex justify-content-end align-content-end align-items-end">
                                                        <button
                                                            style={{
                                                            backgroundColor: '#54A4DB'
                                                        }}
                                                            onClick={event => window.location.href = 'producten/' + product.acf.permalink}
                                                            className="btn rounded mx-1 font-weight-bold"
                                                            type="button">Info
                                                        </button>
                                                        <AnchorLink className="btn rounded font-weight-bold" href='#contactOrder'>Offerte</AnchorLink >
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </BrowserView>
                    <MobileView>
                        <div className="container">
                            <div className="row">
                                {data.map((product, i) => {
                                    if (product.acf.descr_nl.length > 180) {
                                        product.acf.descr_nl = product
                                            .acf
                                            .descr_nl
                                            .substring(0, 175) + '...'
                                    }
                                    return (
                                        <div key={i} className="col-lg-6 col-md-12 col-sm-12  my-1  d-flex  rounded">
                                            <div
                                                style={{
                                                minHeight: 225 + 'px'
                                            }}
                                                className="d-flex flex-wrap border p-3">
                                                <div className="mr-4">
                                                    <a href={this.state.location + product.acf.permalink}>
                                                        <img
                                                            alt='thumb'
                                                            style={{
                                                            maxWidth: 150 + 'px',
                                                            maxHeight: 175 + 'px'
                                                        }}
                                                            className="rounded img-fluid"
                                                            src={product.acf.picture}></img>
                                                    </a>
                                                </div>
                                                <div className="py-2">
                                                    <h3>
                                                        <a href={this.state.location + product.acf.permalink}>{product.acf.product_name_nl}</a>
                                                    </h3>
                                                    <p
                                                        className="d-flex flex-column"
                                                        dangerouslySetInnerHTML={{
                                                        __html: product.acf.descr_nl
                                                    }}></p>
                                                    <div
                                                        className="d-flex justify-content-start align-content-start align-items-start">
                                                        <button
                                                            style={{
                                                            backgroundColor: '#54A4DB'
                                                        }}
                                                            onClick={event => window.location.href = 'producten/' + product.acf.permalink}
                                                            className="btn rounded mx-1 font-weight-bold"
                                                            type="button">Info
                                                        </button>
                                                        <AnchorLink className="btn rounded font-weight-bold" href='#contactOrder'>Offerte</AnchorLink >
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </MobileView>

                </section>
                <ContactOrder/>
                <Footer/>
            </div>;
        } else {
            return <LoaderComponent/>
        }

    }
}

export default ProductsPage;