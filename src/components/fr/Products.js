import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoaderComponent from './Loader';
import {Parallax} from 'react-parallax';
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Slider from "react-slick";
import axios from 'axios'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';
import {frontConfig} from '../../settings/frontconfig'

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            data: [],
            isLoaded: false,
            location: '/fr/produits/'
        };
    }
    componentDidMount() {
        this.fetch();
    }
    fetch = async() => {
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
    }

    render() {
        const {error, isLoaded, data} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (<LoaderComponent/>)
        } else {

            const settings = {
                dots: false,
                infinite: true,
                speed: 800,
                autoplaySpeed: 10000,
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplay: true
            };
            let wrap = ''
            if (window.innerWidth < 890) {
                settings.slidesToShow = 1
                wrap = {
                    flexWrap: 'wrap'
                }
            }
            return <section className="products">
                <div className="container py-5">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <div className="d-flex flex-row align-items-center">
                            <span className="mr-3 my-1">
                                <a href="producten">
                                    <h2>Produits</h2>
                                </a>
                            </span>
                            <span>
                                <a href="producten">
                                    <FontAwesomeIcon
                                        style={{
                                        fontSize: '1.4em',
                                        color: '#FFBF37'
                                    }}icon={faChevronRight}/>
                                </a>
                            </span>

                        </div>
                        <p className="pb-2">

                            Voici un aperçu de tous les produits dont nous disposons.
                        </p>

                        <Slider {...settings}>
                            {data.map((item, i) => {
                                if (item.acf.descr_fr.length > 125) {
                                    item.acf.descr_fr = item
                                        .acf
                                        .descr_fr
                                        .substring(0, 120) + '...'
                                }
                                return (
                                    <div className="mb-3" key={i}>
                                        <div style={{maxWidth: 100 + '%',maxHeight: 75 + '%',wrap}} className="d-flex m-2 mr-3">
                                            <Parallax
                                                className="mr-4 "
                                                bgImage={item.acf.picture}
                                                bgImageAlt="volume of products"
                                                strength={50}
                                                width='100%'>

                                                <div
                                                    style={{
                                                    width: 350 + 'px',
                                                    height: 150 + 'px'
                                                }}/>
                                            </Parallax>
                                            <div
                                                className="d-flex flex-column justify-content-center"
                                                style={{
                                                minWidth: 50 + '%'
                                            }}>
                                                <h3>
                                                    <a href={this.state.location + item.acf.permalink}>{item.acf.product_name_fr}</a>
                                                </h3>
                                                <p
                                                    style={{
                                                    minHeight: 85 + 'px'
                                                }}
                                                    dangerouslySetInnerHTML={{
                                                    __html: item.acf.descr_fr
                                                }}></p>
                                                <div className="d-flex justify-content-end mr-1">
                                                    <button
                                                        style={{
                                                        backgroundColor: '#54A4DB'
                                                    }}
                                                        onClick={event => window.location.href = this.state.location + item.acf.permalink}
                                                        className="btn rounded mx-1 font-weight-bold"
                                                        type="button">Info</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>

                    </ScrollAnimation>
                    <div className="mt-2 float-right">
                        <a
                            href={this.state.location}
                            style={{
                            color: '#e7e7e7'
                        }}>
                            <small>
Aperçu complet<FontAwesomeIcon
                                style={{
                fontSize: '1.2em',
                color: '#e7e7e7',
                paddingLeft: '.5em'
            }}icon={faExternalLinkAlt}/></small>
                        </a>
                    </div>
                </div>
            </section>;
        }

    }
}

export default Products;