import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {BrowserView, MobileView} from "react-device-detect";

import AnchorLink from 'react-anchor-link-smooth-scroll'
import LoaderComponent from './Loader';
import React from "react";
import ScrollAnimation from 'react-animate-on-scroll';
import Slider from "react-slick";
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig'
import mobHeader from '../../assets/img/headerbg.jpg'

class SimpleSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isLoadedVid: false,
            data: [],
            videoUrl : 'https://beheer.isoftmix.be/wp-content/uploads/2020/06/bgwater.mp4'
        };
    }

    fetch = async() => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSections)
            .then((result) => {
                this.setState({isLoaded: true, data: result.data[0].acf, isLoadedVid:true});
            }, (error) => {
                this.setState({isLoaded: false, error});
            })
    }

    componentDidMount() {
        this.fetch();
    }
    buildSlickDesktop = (title, subtitle, button, buttonhref) => {

        return (
            <div className="slick-title-container">
                <div className="headline text-center">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <div
                            className="headline-sub d-flex flex-column justify-content-center align-items-center mb-5">
                            <h3>{title}</h3>
                            <h1>{subtitle}</h1>
                        </div>
                        <div>
                            <a className="btn-header text-white border" href={buttonhref}>{button}
                            </a>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        );
    }
    buildSlickMob = (title, subtitle, button, buttonhref) => {
        return (
            <div className="slick-title-container">
                <div className="headline text-center">
                
                        <div
                            className="headline-sub d-flex flex-column justify-content-center align-items-center mb-5">
                            <h3>{title}</h3>
                            <h1>{subtitle}</h1>
                        </div>
                        <div>
                            <a className="btn-header text-white border" href={buttonhref}>{button}
                            </a>
                        </div>
                </div>
            </div>
        );
    }
    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 800,
            autoplaySpeed: 16000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            pauseOnFocus: true,
            pauseOnHover: false,
            pauseOnDotsHover: false,
            autoplay: true
        };

       
        const {error, isLoaded, data,  isLoadedVid, videoUrl} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoaded === true) {
            return ( <> <BrowserView>
                <div className="slick-container">
                    <Slider {...settings}>
                        {this.buildSlickDesktop(data.title_fr_1,data.subtitle_fr_1,data.button_fr_1,data.button_1_href_fr)}
                        {this.buildSlickDesktop(data.title_fr_2,data.subtitle_fr_2,data.button_fr_2,data.button_2_href_fr)}
                        {this.buildSlickDesktop(data.title_fr_3,data.subtitle_fr_3,data.button_fr_3,data.button_3_href_fr)}
                    </Slider>
                    <div className="media-wrapper">
                        <div className="video-thumb tiny"/>
                        {isLoadedVid?<video
                            className={ isLoadedVid
                            ? "elem-ease-in"
                            : ''}
                            playsInline
                            muted
                            autoPlay
                            loop
                            src={videoUrl}
                            type="video/mp4"
                            onLoadedData={() => this.setState({ isLoadedVid: true})}></video>:''}
                    </div>
                    <AnchorLink className="scroll-link" href="#about">
                        <svg
                            className="mouse"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 76 130"
                            preserveAspectRatio="xMidYMid meet">
                            <g fill="none" fillRule="evenodd">
                                <rect
                                    width="70"
                                    height="118"
                                    x="1.5"
                                    y="1.5"
                                    stroke="#FFF"
                                    strokeWidth="3"
                                    rx="36"/>
                                <circle className="scroll" cx="36.5" cy="31.5" r="4.5" fill="#FFF"/>
                            </g>
                        </svg>
                    </AnchorLink>
                </div>
            </BrowserView>
            < MobileView > 
            <div className="slick-container">
                <Slider {...settings}>
                {this.buildSlickMob(data.title_fr_1,data.subtitle_fr_1,data.button_fr_1,data.button_1_href_fr)}
                {this.buildSlickMob(data.title_fr_2,data.subtitle_fr_2,data.button_fr_2,data.button_2_href_fr)}
                {this.buildSlickMob(data.title_fr_3,data.subtitle_fr_3,data.button_fr_3,data.button_3_href_fr)}
                </Slider>
                <div className="media-wrapper">
                <img src={mobHeader}  alt=""></img>
                </div>
                <AnchorLink className="scroll-link" href="#about">
                    <svg
                        className="mouse"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 76 130"
                        preserveAspectRatio="xMidYMid meet">
                        <g fill="none" fillRule="evenodd">
                            <rect
                                width="70"
                                height="118"
                                x="1.5"
                                y="1.5"
                                stroke="#FFF"
                                strokeWidth="3"
                                rx="36"/>
                            <circle className="scroll" cx="36.5" cy="31.5" r="4.5" fill="#FFF"/>
                        </g>
                    </svg>
                </AnchorLink>
            </div> </MobileView>
            </>);
        } else {
            return <LoaderComponent/>
        }
    }
}
export default SimpleSlider;