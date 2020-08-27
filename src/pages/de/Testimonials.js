import Breadcrumbs from '../../components/de/Breadcrumbs';
import Footer from '../../components/de/Footer'
import Header from '../../components/de/Header'
import {Helmet} from 'react-helmet'
import React from 'react';
import Testimonials from '../../components/de/Testimonials';

class TestimonialsPage extends React.Component {
    render() {
        return (
            <div className="loaded">
                                <Helmet>
                    <title>{"iSOFTMIX.be - Referenzen"}</title>
                </Helmet>
                <Header/>
                <Breadcrumbs/>
                <Testimonials/>
                <Footer/>
            </div>
        );

    }
}

export default TestimonialsPage;