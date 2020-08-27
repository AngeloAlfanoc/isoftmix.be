import LoaderComponent from './Loader'
import React from 'react';
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig'

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
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
        const {error, isLoaded, data} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoaded === true) {
            return (
                <section>
                    <div
                        id="googlemap"
                        className="bg-third d-flex flex-column align-items-center justify-content-center align-content-center">
                        <span className="text-white text-center botbar d-flex align-items-center py-2">
                        {data.companyname} - {data.adres} - <a className="text-white ml-1" href="https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=698886087"> BE{data.btw_nummer}</a>
                        </span>
                        <iframe
                            title="location"
                            width="100%"
                            height="500"
                            id="gmap_canvas"
                            src="https://maps.google.com/maps?q=zuidenring%2045genk&t=&z=17&ie=UTF8&iwloc=&output=embed"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"></iframe>
                    </div>
                </section>
            );
        } else {
            return <LoaderComponent/>
        }
    }

}

export default Contact;