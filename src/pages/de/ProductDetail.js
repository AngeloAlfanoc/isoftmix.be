import 'react-image-lightbox/style.css';

import AnchorLink from 'react-anchor-link-smooth-scroll'
import Breadcrumbs from '../../components/de/Breadcrumbs'
import ContactOrder from '../../components/de/ContactOrder'
import Footer from '../../components/de/Footer'
import Header from '../../components/de/Header'
import {Helmet} from 'react-helmet'
import Lightbox from 'react-image-lightbox';
import React from 'react';
import TechTable from '../../components/de/TechTable'
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig'
import {isMobile} from "react-device-detect";

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: window
                .location
                .pathname
                .slice(13, window.location.pathname.length)
                .replace('_', ' '),
            data: [],
            title: '',
            photoIndex: 0,
            isOpen: false
        };
    }
    componentDidMount() {
        this.fetchData();
        this.findProductQuery()
    }
    fetchData = async() => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getProducts)
            .then((result) => {
                this.setState({isLoaded: true, data: result.data});
            }, (error) => {
                this.setState({isLoaded: false, error});
            })
    }

    //Find product that matches our location, => output to html
    findProductQuery = (p) => {

        const {isLoaded, location} = this.state;
        if (isLoaded === true) {

            return p.map((item, i) => {
                let productNeeded = item
                    .title
                    .rendered
                    .toLowerCase();
                
                if (location === productNeeded) {

                    const images = [item.acf.picture, item.acf.sub_foto_1, item.acf.sub_foto_2, item.acf.sub_foto_3];
                    const {photoIndex, isOpen} = this.state;
                    let sanitizeSEOTAG = item.acf.descr_de.replace(/(<([^>]+)>)/ig,"");
                    return (<>
                        <section key={i} className="product-detail container mb-5">
                            <h1 className="my-3 w-100">{item.title.rendered}</h1>
                            <Helmet>
                            <title>{item.title.rendered}</title>
                                <meta name="description" content={sanitizeSEOTAG}/>
                                <meta name="keywords-product" content={item.acf.zoekwoorden}/>
                            </Helmet> 
                            <div  className={isMobile? "d-flex flex-row flex-wrap mb-3" : "d-flex flex-row mb-3" }>
                                <div>
                                    <img
                                        alt={item.title.rendered + 'Main Picture'}
                                        style={{
                                        maxWidth: 150 + 'px',
                                        maxHeight: 175 + 'px'
                                    }}
                                        src={item.acf.picture}
                                        onClick={() => this.setState({isOpen: true})}className="rounded img-fluid" ></img>
                                </div>
                                {/* ADD MAPPING HERE! */}
                                <div className="d-flex flex-column mx-3">
                                    {isOpen && (<Lightbox
                                        mainSrc={images[photoIndex]}
                                        nextSrc={images[(photoIndex + 1) % images.length]}
                                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                        onCloseRequest={() => this.setState({isOpen: false})}
                                        onMovePrevRequest={() => this.setState({
                                        photoIndex: (photoIndex + images.length - 1) % images.length
                                    })}
                                        onMoveNextRequest={() => this.setState({
                                        photoIndex: (photoIndex + 1) % images.length
                                    })}/>)}
                                    {item.acf.sub_foto_1
                                        ? <img
                                                style={{
                                                width: 50 + 'px'
                                            }}
                                                className="rounded mb-2"
                                                alt={item.title.rendered + ' Sub Picture'}
                                                src={item.acf.sub_foto_1}
                                                onClick={() => this.setState({isOpen: true})}></img>
                                        : ''}
                                    {item.acf.sub_foto_2
                                        ? <img
                                                style={{
                                                width: 50 + 'px'
                                            }}
                                                className="rounded mb-2"
                                                alt={item.title.rendered + ' Sub Picture'}
                                                src={item.acf.sub_foto_2}
                                                onClick={() => this.setState({isOpen: true})}></img>
                                        : ''}
                                    {item.acf.sub_foto_3
                                        ? <img
                                                style={{
                                                width: 50 + 'px'
                                            }}
                                                className="rounded mb-2"
                                                alt={item.title.rendered + ' Sub Picture'}
                                                src={item.acf.sub_foto_3}
                                                onClick={() => this.setState({isOpen: true})}></img>
                                        : ''}
                                </div>

                                <div className="d-flex flex-column  justify-content-around">
                                <p className={isMobile? "mt-2":""}
                                        dangerouslySetInnerHTML={{
                                        __html: item.acf.descr_de
                                    }}></p>
                                    <div className="d-flex flex-column align-items-end">
                                        <span className="my-4">
                                            Preis anstreben €{item.acf.richtprijs_},00</span>
                                        <div
                                            className="d-flex justify-content-center align-items-end align-content-end">
                                             {item.acf.tech_tabel_entry ? <AnchorLink
                                                style={{
                                                backgroundColor: '#54A4DB'
                                            }}
                                                className="btn rounded font-weight-bold mx-1"
                                                href='#techTable'>
                                                Technische Tabelle</AnchorLink > : ''}
                                            <AnchorLink className="btn rounded font-weight-bold" href='#contactOrder'>
                                                Zitat</AnchorLink >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                         {item.acf.tech_tabel_entry ? <TechTable/> : ''}</>
                    )
                }
                else{return ''}

            })
        }

    }

    render() {
        const {data} = this.state;
        return (
            <div className="loaded">
                <Header/>
                <Breadcrumbs/> {this.findProductQuery(data)}
                <ContactOrder/>
                <Footer/>
            </div>
        );
    }
}

export default ProductDetail;