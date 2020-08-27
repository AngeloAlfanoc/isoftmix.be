import Breadcrumbs from '../../components/eng/Breadcrumbs';
import Footer from '../../components/eng/Footer'
import Header from '../../components/eng/Header'
import {Helmet} from 'react-helmet'
import React from 'react';
import Testimonials from '../../components/eng/Testimonials';

class TestimonialsPage extends React.Component {
    render() {
        return (
            <div className="loaded">
                <Helmet>
                    <title>{"iSOFTMIX.be - Testimonials"}</title>
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