import Breadcrumbs from '../../components/fr/Breadcrumbs';
import Footer from '../../components/fr/Footer'
import Header from '../../components/fr/Header'
import {Helmet} from 'react-helmet'
import React from 'react';
import Testimonials from '../../components/fr/Testimonials';

class TestimonialsPage extends React.Component {
    render() {
        return (
            <div className="loaded">
                <Helmet>
                    <title>{"iSOFTMIX.be - Témoignages"}</title>
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