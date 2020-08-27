import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Footer from '../../components/de/Footer'
import Header from '../../components/de/Header'
import {Helmet} from 'react-helmet'
import LoaderComponent from '../../components/de/Loader';
import React from 'react';
import axios from 'axios'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {frontConfig} from '../../settings/frontconfig';

class Sitemap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoadedMenu0: [],
            isLoadedMenu1: [],
            isLoadedMenu2: [],
            isLoadedMenu3: [],
            menu0: [],
            menu1: [],
            menu2: [],
            menu3: []
        };
    }
    fetchMenus = async(p) => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getPrimaryMenuDE)
            .then((result) => {
                this.setState({isLoadedMenu0: true, menu0: result.data});
            }, (error) => {
                this.setState({isLoadedMenu0: false, error});
            })
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSecondaryMenuDE)
            .then((result) => {
                this.setState({isLoadedMenu1: true, menu1: result.data});
            }, (error) => {
                this.setState({isLoadedMenu1: false, error});
            })
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSocialMenu)
            .then((result) => {
                this.setState({isLoadedMenu2: true, menu2: result.data});
            }, (error) => {
                this.setState({isLoadedMenu2: false, error});
            })
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getProducts)
            .then((result) => {
                const reversed = result
                    .data
                    .reverse()
                this.setState({isLoadedMenu3: true, menu3: reversed});
            }, (error) => {
                this.setState({isLoadedMenu3: false, error});
            })

    }
    buildListedItems = (p) => {
        const {isLoadedMenu0, isLoadedMenu1, isLoadedMenu2} = this.state;
        if (isLoadedMenu0 === true && isLoadedMenu1 === true && isLoadedMenu2 === true) {
            return p
                .items
                .map((item, i) => {
                    return (
                        <li className="d-flex align-items-center" key={i}>
                            <FontAwesomeIcon
                                style={{
                                fontSize: '0.8em',
                                color: '#009CDA'
                            }}
                                icon={faChevronRight}/>
                            <a
                                style={{
                                color: '#009CDA'
                            }}
                                className="pl-1"
                                href={item.url}>{item.title}</a>
                        </li>
                    )
                })
        }
    }
    buildProductMenu = (p) => {
        const {isLoadedMenu3} = this.state;
        if (isLoadedMenu3 === true) {
            return p.map((item, i) => {

                return (
                    <li className="d-flex align-items-center" key={i}>
                        <FontAwesomeIcon
                            style={{
                            fontSize: '0.8em',
                            color: '#009CDA'
                        }}
                            icon={faChevronRight}/>
                        <a
                            style={{
                            color: '#009CDA'
                        }}
                            className="pl-1"
                            href={'producten/' + item.acf.permalink}>{item.acf.product_name_nl}</a>
                    </li>
                )

            })
        }
    }
    componentDidMount() {
        this.fetchMenus();
    }

    render() {
        const {
            isLoadedMenu0,
            isLoadedMenu1,
            isLoadedMenu2,
            isLoadedMenu3,
            menu0,
            menu1,
            menu2,
            menu3
        } = this.state;
        if (isLoadedMenu0 === true && isLoadedMenu1 === true && isLoadedMenu2 === true && isLoadedMenu3 === true) {
            return (
                <div className="loaded">
                    <Helmet>
                        <title>{"iSOFTMIX.be - Seitenverzeichnis"}</title>
                    </Helmet>
                    <Header/>
                    <div className="container p-5">
                        <h4>
                            Seitenverzeichnis
                        </h4>
                        <p>
                            Hier finden Sie eine Übersicht aller auf dieser Seite verfügbaren Links.</p>
                        <div className="d-flex flex-wrap w-100 justify-content-around">
                            <div className="col-lg-3 py-1">
                                <h5>Hauptmenü</h5>{this.buildListedItems(menu0)}</div>
                            <div className="col-lg-3 py-1">
                                <h5>Zusätzliche Gegenstände</h5>{this.buildListedItems(menu1)}</div>
                            <div className="col-lg-3 py-1">
                                <h5>Sozial</h5>{this.buildListedItems(menu2)}</div>
                            <div className="col-lg-3 py-1">
                                <h5>Produkte</h5>{this.buildProductMenu(menu3)}</div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        } else {
            return <> <LoaderComponent/> </>
    }
    

      }
    }

export default Sitemap;