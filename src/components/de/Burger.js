import LoaderComponent from './Loader';
import React from 'react';
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig'

class Burger extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false,
            error: null,
            isLoaded: false,
            isLoadedData: false,
            data: [],
            menu: []
        }
    }
    componentDidMount() {
        this.fetch();
    }
    handleStateChange(state) {
        this.setState({menuOpen: state.isOpen})
    }
    closeMenu() {
        this.setState({menuOpen: false})
    }
    toggleMenu() {
        this.setState(state => ({
            menuOpen: !state.menuOpen
        }))
    }
    fetch = async() => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getPrimaryMenuDE)
            .then((result) => {
                this.setState({isLoaded: true, menu: result.data});
                this.setState({location: window.location.pathname})
            }, (error) => {
                this.setState({isLoaded: false, error});
            })
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSections)
            .then((result) => {
                this.setState({isLoadedData: true, data: result.data});
            }, (error) => {
                this.setState({isLoadedData: false, error});
            })
    }

    buildListedItems = (p) => {
        return p
            .items
            .map((item, i) => {
                if (item.url === this.state.location) {
                    return (
                        <li key={i}>
                            <a className="active nav-item" id={item.title} href={item.url}>{item.title}</a>
                        </li>
                    )
                } else {
                    return (
                        <li key={i}>
                            <a className="nav-item" id={item.title} href={item.url}>{item.title}</a>
                        </li>
                    )
                }

            })

    }
    render() {
        const {error, isLoaded, isLoadedData, menu} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoaded === true && isLoadedData === true) {
            return <div className="bg-white">
            <div className="container d-flex justify-content-center py-3 bg-white">
                <a href="/">
                    <img
                        src='https://beheer.isoftmix.be/wp-content/uploads/2020/05/Logo-ISOFTMIX-1.png'
                        alt="Logo iSOFTMIX"
                        width={250}></img>
                </a>
            </div>
            <div className="menu-wrap">
                <input
                    type='checkbox'
                    id='toggle'
                    style={{
                    display: 'none'
                }}/>
                <label className='toggle-btn toggle-btn__cross' htmlFor='toggle'>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </label>
                <nav>
                    <ul className="d-flex flex-column justify-content-around">
                        {this.buildListedItems(menu)}
                    </ul>
                </nav>
            </div>
        </div>

    } else {
        return (<LoaderComponent/>);

    }

}
}

export default Burger;