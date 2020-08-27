import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer'
import Header from '../components/Header'
import {Helmet} from 'react-helmet'
import React from 'react';
import Testimonials from './../components/Testimonials';

class TestimonialsPage extends React.Component {
    render() {
        return (
            <div className="loaded">
                <Helmet>
                    <title>{"iSOFTMIX.be - Recensies"}</title>
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