import React from 'react';
import axios from 'axios'
import classnames from 'classnames'
import {frontConfig} from '../settings/frontconfig'
import {routesObject} from './../settings/routesObject';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            menu: [],
            location: window.location.pathname,
            prevScrollpos: window.pageYOffset,
            visible: true
        };
    }
    fetchMenu = async() => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getPrimaryMenu)
            .then((result) => {
                this.setState({isLoaded: true, menu: result.data});
                this.setState({location: window.location.pathname})
            }, (error) => {
                this.setState({isLoaded: false, error});
            })

    }
    buildListedItems = (p) => {

        return p
            .items
            .map((item, i) => {
                if (item.url === this.state.location && item.url !== routesObject.routesNL.contact) {
                    return (
                        <li key={i}>
                            <a className="active" id={item.title} href={item.url}>{item.title}</a>
                        </li>
                    )
                  
                } else if (item.url === routesObject.routesNL.products && this.state.location.slice(0, 16) === item.url + '/isoft') {
                    return (
                        <li key={i}>
                            <a className="active" id={item.title} href={item.url}>{item.title}</a>
                        </li>
                    )
                } else if (item.url === routesObject.routesNL.contact && item.url === this.state.location) {
                    return <li key={i}>
                        <a
                            className="btn text-white"
                            style={{
                            backgroundColor: "#5EBDDB"
                        }}
                            id={item.title}
                            href={item.url}>{item.title}</a>
                    </li>
                } else if (item.url === routesObject.routesNL.contact) {
                    return <li key={i}>
                        <a className="btn text-white" id={item.title} href={item.url}>{item.title}</a>
                    </li>
                } else if (item.url !== this.state.location) {
                    return (
                        <li key={i}>
                            <a id={item.title} href={item.url}>{item.title}</a>
                        </li>
                    )

                } else {
                    return ''
                }

            })

    }
    componentDidMount() {
        this.fetchMenu();
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        if (document.body.offsetHeight > 2000) {
            const currentScrollPos = window.pageYOffset;
            const visible = 200 > window.pageYOffset;
            this.setState({prevScrollpos: currentScrollPos, visible});

        }

    };
    render() {

        const {error, isLoaded, menu, visible} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return ('');
        } else {
            return <section style={{height:180+'px'}}>
                <div className={classnames("bg-white top-nav d-flex align-items-center justify-content-between border-bottom", {
                    "top-nav--hidden shadow-sm": !visible
                })}>
                    <div
                        className={classnames("middle container d-flex align-items-center justify-content-between border-black ", {
                        "top-nav-inner-hidden": !visible
                    })}>
                        <div>
                            <a href="/">
                                <img
                                    className={classnames("logo", {
                                    "logo--shrink": !visible
                                })}
                                    alt="logo-isoftmix"
                                    src='https://beheer.isoftmix.be/wp-content/uploads/2020/05/Logo-ISOFTMIX-1.png'></img >
                            </a>
                        </div>
                        <nav className="navbar navbar-expand">
                            <ul className="navbar-nav mr-auto d-flex align-items-center flex-nowrap">
                                {this.buildListedItems(menu)}
                            </ul >
                        </nav>
                    </div>
                </div>
            </section>
        }
    }
}

export default Nav;