import {BrowserView, MobileView} from "react-device-detect";

import AnchorLink from 'react-anchor-link-smooth-scroll'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LangSwitch from './LangSwitch';
import React from 'react';
import axios from 'axios'
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {frontConfig} from '../../settings/frontconfig'

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        this.fetch();
    }
    fetch = async() => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSections)
            .then((result) => {
                this.setState({isLoaded: true, data: result.data[2].acf});
            }, (error) => {
                this.setState({isLoaded: false, error});
            })
    }
    render() {
        const {data} = this.state;

        return ( <>
        <BrowserView>
            <section>
                <div className="topbar container-fluid d-flex align-items-center">
                    <div
                        className="container d-flex justify-content-between flex-wrap align-items-center">
                        <div className="d-flex justify-content-around h-100">
                            <span>
                                {data.adres ?<><FontAwesomeIcon icon={faMapMarkerAlt}/> <AnchorLink offset='100' href='#googlemap'>{data.adres}</AnchorLink ></> : ''}
                            </span>
                            <span><FontAwesomeIcon icon={faPhoneAlt}/>
                                {data.telefoon_nummer ?<a href={'tel:' + data.telefoon_nummer}>{data.telefoon_nummer}</a>: ''}
                            </span>
                            <span>
                                {data.instagram ? <a href={data.instagram}><FontAwesomeIcon icon={faInstagram}/>Instagram</a> : ''}
                            </span>
                            <span>
                                {data.linkedin ? <a href={data.linkedin}><FontAwesomeIcon icon={faLinkedinIn}/>linkedin</a> : '' }
                            </span>
                        </div>
                       
                            <LangSwitch/>
                     

                    </div>
                </div>
            </section>
        </BrowserView> 
        <MobileView>
        <section>
            <div className="topbar container-fluid d-flex flex-column py-2">
                    <div className="d-flex flex-row justify-content-end">
                    <span>
                             {data.instagram ? <a href={data.instagram}><FontAwesomeIcon icon={faInstagram}/>Instagram</a> : ''}
                        </span>
                        <span>
                             {data.linkedin ? <a href={data.linkedin}><FontAwesomeIcon icon={faLinkedinIn}/>linkedin</a> : '' }
                        </span>
                    </div>
                    <div className="d-flex justify-content-end">
                        <LangSwitch/>
                    </div>
                </div>
        </section>
        </MobileView>
       </>);
    }
}

export default Topbar;