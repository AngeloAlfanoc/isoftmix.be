import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoaderComponent from './Loader';
import React from 'react';
import axios from 'axios'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {frontConfig} from '../../settings/frontconfig';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoadedMenu0: false,
            isLoadedMenu1: false,
            isLoadedMenu2: false,
            isLoadedMenu3: false,
            isLoadedSections: false,
            menu0: [],
            menu1: [],
            menu2: [],
            menu3: [],
            section: []
        };

    }
    fetch = async(p) => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getPrimaryMenuFR)
            .then((result) => {
                this.setState({isLoadedMenu0: true, menu0: result.data});
            }, (error) => {
                this.setState({isLoadedMenu0: false, error});
            })
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSecondaryMenuFR)
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
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSections)
            .then((result) => {
                const reversed = result
                    .data
                    .reverse()
                this.setState({isLoadedSections: true, section: reversed});
            }, (error) => {
                this.setState({isLoadedSections: false, error});
            })

    }
    buildListedItems = (p) => {
        const {isLoadedMenu0, isLoadedMenu1, isLoadedMenu2} = this.state;
        if (isLoadedMenu0 === true && isLoadedMenu1 === true && isLoadedMenu2 === true) {
            return p
                .items
                .map((item, i) => {
                    if (item.title === 'Linkedin') {
                        return (
                            <li className="d-flex align-items-center" key={i}>
                                <FontAwesomeIcon
                                    style={{
                                    fontSize: '1em',
                                    color: 'white'
                                }}
                                    icon={faLinkedinIn}/>
                                <a className="pl-1" href={item.url}>{item.title}</a>
                            </li>
                        )
                    } else if (item.title === 'Instagram') {
                        return (
                            <li className="d-flex align-items-center" key={i}>
                                <FontAwesomeIcon
                                    style={{
                                    fontSize: '0.8em',
                                    color: 'white'
                                }}
                                    icon={faInstagram}/>
                                <a className="pl-1" href={item.url}>{item.title}</a>
                            </li>
                        )
                    } else {
                        return (
                            <li className="d-flex align-items-center" key={i}>
                                <FontAwesomeIcon
                                    style={{
                                    fontSize: '0.8em',
                                    color: 'white'
                                }}
                                    icon={faChevronRight}/>
                                <a className="pl-1" href={item.url}>{item.title}</a>
                            </li>
                        )
                    }
                })
        }
    }
    buildProductMenu = (p) => {
        const {isLoadedMenu3} = this.state;
        if (isLoadedMenu3 === true) {
            return p.map((item, i) => {
                if (i < 5) {
                    return (
                        <li className="d-flex align-items-center" key={i}>
                            <FontAwesomeIcon
                                style={{
                                fontSize: '0.8em',
                                color: 'white'
                            }}
                                icon={faChevronRight}/>
                            <a className="pl-1" href={'/fr/produits/' + item.acf.permalink}>{item.acf.product_name_nl}</a>
                        </li>
                    )
                } else {
                    return ''
                }

            })
        }
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
        const {
            isLoadedMenu0,
            isLoadedMenu1,
            isLoadedMenu2,
            isLoadedMenu3,
            isLoadedSections,
            menu0,
            menu1,
            menu2,
            menu3
        } = this.state;
        if (isLoadedMenu0 === true && isLoadedMenu1 === true && isLoadedMenu2 === true && isLoadedMenu3 === true && isLoadedSections === true) {
            return (
                <footer>
                    <div
                        className="container d-flex flex-row flex-wrap text-white  justify-content-between p-3 py-5">
                        <div className="col-md-3 col-sm-12">
                            <h3>Menu principal</h3>
                            <ul>{this.buildListedItems(menu0)}</ul>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <h3>Articles supplémentaires</h3>
                            <ul>{this.buildListedItems(menu1)}</ul>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <h3>Socials</h3>
                            <ul>{this.buildListedItems(menu2)}</ul>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <h3>Des produits</h3>
                            <ul>{this.buildProductMenu(menu3)}</ul>
                        </div>

                    </div>
                    <div className="bg-third">
                        <div
                            className="text-white text-center botbar d-flex justify-content-center col-sm-12">
                            <span className="pr-1">© 2020 iSOFTMIX.be All Rights Reserved</span>
                        </div>

                    </div>
                </footer>
            );
        } else {
            return <> <LoaderComponent/> </>
        }

    }
}

export default Footer;