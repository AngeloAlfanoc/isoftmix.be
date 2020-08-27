import {BrowserRouter, Route, Switch} from 'react-router-dom';

import About from '../pages/About'
import AboutDE from '../pages/de/About'
import AboutEng from '../pages/eng/About'
import AboutFR from '../pages/fr/About'
import Contact from '../pages/Contact'
import ContactDE from '../pages/de/Contact'
import ContactEng from '../pages/eng/Contact'
import ContactFR from '../pages/fr/Contact'
import ContactSucces from '../pages/ContactSucces'
import ContactSuccesDE from '../pages/de/ContactSucces'
import ContactSuccesEng from '../pages/eng/ContactSucces'
import ContactSuccesFR from '../pages/fr/ContactSucces'
import Cookies from '../pages/Cookies'
import CookiesDE from '../pages/de/Cookies'
import CookiesEng from '../pages/eng/Cookies'
import CookiesFR from '../pages/fr/Cookies'
import Error from '../pages/Error';
import Home from '../pages/Home'
import HomeDE from '../pages/de/Home'
import HomeEng from '../pages/eng/Home'
import HomeFR from '../pages/fr/Home'
import LoaderComponent from '../components/Loader';
import PrivacyPolicy from '../pages/PrivacyPolicy'
import PrivacyPolicyDE from '../pages/de/PrivacyPolicy'
import PrivacyPolicyEng from '../pages/eng/PrivacyPolicy'
import PrivacyPolicyFR from '../pages/fr/PrivacyPolicy'
import ProductDetail from '../pages/ProductDetail'
import ProductDetailDE from '../pages/de/ProductDetail'
import ProductDetailEng from '../pages/eng/ProductDetail'
import ProductDetailFR from '../pages/fr/ProductDetail'
import Producten from "../pages/Products";
import ProductsDE from '../pages/de/Products'
import ProductsEng from '../pages/eng/Products'
import ProductsFR from '../pages/fr/Products'
import React from 'react';
import SitemapPage from '../pages/Sitemap'
import SitemapPageDE from '../pages/de/Sitemap'
import SitemapPageEng from '../pages/eng/Sitemap'
import SitemapPageFR from '../pages/fr/Sitemap'
import Testimonials from '../pages/Testimonials'
import TestimonialsDE from '../pages/de/Testimonials'
import TestimonialsEng from '../pages/eng/Testimonials'
import TestimonialsFR from '../pages/fr/Testimonials'
import Voorwaarden from '../pages/TermsOfService'
import VoorwaardenDE from '../pages/de/TermsOfService'
import VoorwaardenEng from '../pages/eng/TermsOfService'
import VoorwaardenFR from '../pages/fr/TermsOfService'
import axios from 'axios'
import {frontConfig} from '../settings/frontconfig'
import { routesObject } from './routesObject';

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoadedProducts:false
        };
    }
    componentDidMount = () => {
        this.fetchData();

    }

    fetchData = async() => {

        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getProducts)
            .then((result) => {
                this.setState({isLoadedProducts: true, products: result.data});
            }, (error) => {
                this.setState({isLoadedProducts: false, error});
            })
    }

    render() {
        const {products,isLoadedProducts} = this.state;
        if (isLoadedProducts === true) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path={routesObject.routesNL.default} render={() => <Home/>}/>
                        <Route exact path={routesObject.routesNL.about} component={About}/>
                        <Route exact path={routesObject.routesNL.products} component={Producten}/>
                        <Route exact path={routesObject.routesNL.contact} component={Contact}/>
                        <Route exact path={routesObject.routesNL.contactSucces} component={ContactSucces}/>
                        <Route exact path={routesObject.routesNL.testimonials} component={Testimonials}/>
                        <Route exact path={routesObject.routesNL.sitemap} component={SitemapPage}/>
                        <Route exact path={routesObject.routesNL.privacyPolicy} component={PrivacyPolicy}/>
                        <Route exact path={routesObject.routesNL.cookies} component={Cookies}/>
                        <Route exact path={routesObject.routesNL.termsAndService} component={Voorwaarden}/>
                        <Route exact path={routesObject.routesENG.default} render={() => <HomeEng/>}/>
                        <Route exact path={routesObject.routesENG.about} component={AboutEng}/>
                        <Route exact path={routesObject.routesENG.products} component={ProductsEng}/>
                        <Route exact path={routesObject.routesENG.contact} component={ContactEng}/>
                        <Route exact path={routesObject.routesENG.contactSucces} component={ContactSuccesEng}/>
                        <Route exact path={routesObject.routesENG.testimonials} component={TestimonialsEng}/>
                        <Route exact path={routesObject.routesENG.sitemap} component={SitemapPageEng}/>
                        <Route exact path={routesObject.routesENG.privacyPolicy} component={PrivacyPolicyEng}/>
                        <Route exact path={routesObject.routesENG.cookies} component={CookiesEng}/>
                        <Route exact path={routesObject.routesENG.termsAndService} component={VoorwaardenEng}/>
                        <Route exact path={routesObject.routesFR.default} render={() => <HomeFR/>}/>
                        <Route exact path={routesObject.routesFR.about} component={AboutFR}/>
                        <Route exact path={routesObject.routesFR.products} component={ProductsFR}/>
                        <Route exact path={routesObject.routesFR.contact} component={ContactFR}/>
                        <Route exact path={routesObject.routesFR.contactSucces} component={ContactSuccesFR}/>
                        <Route exact path={routesObject.routesFR.testimonials} component={TestimonialsFR}/>
                        <Route exact path={routesObject.routesFR.sitemap} component={SitemapPageFR}/>
                        <Route exact path={routesObject.routesFR.privacyPolicy} component={PrivacyPolicyFR}/>
                        <Route exact path={routesObject.routesFR.cookies} component={CookiesFR}/>
                        <Route exact path={routesObject.routesFR.termsAndService} component={VoorwaardenFR}/>
                        <Route exact path={routesObject.routesDE.default} render={() => <HomeDE/>}/>
                        <Route exact path={routesObject.routesDE.about} component={AboutDE}/>
                        <Route exact path={routesObject.routesDE.products} component={ProductsDE}/>
                        <Route exact path={routesObject.routesDE.contact} component={ContactDE}/>
                        <Route exact path={routesObject.routesDE.contactSucces} component={ContactSuccesDE}/>
                        <Route exact path={routesObject.routesDE.testimonials} component={TestimonialsDE}/>
                        <Route exact path={routesObject.routesDE.sitemap} component={SitemapPageDE}/>
                        <Route exact path={routesObject.routesDE.privacyPolicy} component={PrivacyPolicyDE}/>
                        <Route exact path={routesObject.routesDE.cookies} component={CookiesDE}/>
                        <Route exact path={routesObject.routesDE.termsAndService} component={VoorwaardenDE}/>
                        <Route
                            path='/nl'
                            component={() => {
                            window.location.href = '/';
                            return null;
                        }}/>
                        <Route
                            path='/admin'
                            component={() => {
                            window.location.href = frontConfig.mainRestRef + '/wp-admin';
                            return null;
                        }}/>
                        
                        {products.map((product, i) => {
                            return <Route
                                exact
                                key={i}
                                path={'/producten/' + product.acf.permalink}
                                component={ProductDetail}/>
                        })}
                        {products.map((product, i) => {
                            return <Route
                                exact
                                key={i}
                                path={'/eng/products/' + product.acf.permalink}
                                component={ProductDetailEng}/>
                        })}
                        {products.map((product, i) => {
                            return <Route
                                exact
                                key={i}
                                path={'/fr/produits/' + product.acf.permalink}
                                component={ProductDetailFR}/>
                        })}
                        {products.map((product, i) => {
                            return <Route
                                exact
                                key={i}
                                path={'/de/produkte/' + product.acf.permalink}
                                component={ProductDetailDE}/>
                        })}
                        <Route component={Error}/>
                    </Switch>
                </BrowserRouter>
            );
        } else{

            return <LoaderComponent/>
        }

    }
}

export default Router