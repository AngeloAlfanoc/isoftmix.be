import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoaderComponent from '../components/Loader'
import Popup from "reactjs-popup";
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Slider from "react-slick";
import axios from 'axios'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {frontConfig} from '../settings/frontconfig'
import { routesObject } from './../settings/routesObject';

class Testimonials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thisLocation: '/',
            location: window.location.pathname,
            isLoaded:false,
            data:[],
            user:'',
            message:'',
            email:'',
            title:'Recensies'
        };
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData = async () => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getComments )
            .then((result) => {
                this.setState({isLoaded: true,  data: result.data});
            }, (error) => {
                this.setState({isLoaded: false, error});
            })
    }

    
    
    submitForm = async (e) => {

        e.preventDefault();
        const {user, message,email} = this.state;
        let formData = JSON.stringify({
            post: 1,
            author_name: user,
            author_email: email,
            content: message,
          });
    
        await axios({
            method: 'post', 
            url: frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getComments,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
            }
          }).then((res) => {
            window.location.href = routesObject.routesNL.testimonials
       }, (error) => {
           console.error(error)
        })
    }
    onUserChange = (event) => {
        this.setState({user: event.target.value})
      }
    onMessageChange=(event)=> {
        this.setState({message: event.target.value})
    }
    onEmailChange=(event)=> {
        this.setState({email: event.target.value})
    }
    buildForm = () => {

        return (<div className="py-3 rounded w-100 d-flex justify-content-center">
        <form className="d-flex flex-column align-items-center" onSubmit={this.submitForm.bind(this)} method='POST'>
            <input className="form-control w-100" type="text" required placeholder="Naam" aria-describedby="nameHelp"  value={this.state.user} onChange={this.onUserChange.bind(this)}></input>
            <input className="form-control w-100" type="text" required placeholder="Email" aria-describedby="emailHelp"  value={this.state.email} onChange={this.onEmailChange.bind(this)}></input>
            <textarea maxLength='400'  className="form-control w-100" rows="5" required placeholder='Gelieve hier jou bericht in te vullen'   value={this.state.message} onChange={this.onMessageChange.bind(this)}></textarea>
            <div className="d-flex flex-row justify-content-end my-5">
                <button className="btn">Verstuur</button>
            </div>
        </form>
        </div>);

    }
    buildTestimonial = (p) => {
        const settings = {dots: true,infinite: true,speed: 800, autoplaySpeed: 10000,slidesToShow: 1,slidesToScroll: 1,autoplay: true};

        return (
        <>  
                <div className="">
                    <div className="d-flex flex-row align-items-center py-5">
                        <span className="mr-3">
                            <a href={routesObject.routesNL.testimonials}><h2>Recensies</h2></a>
                        </span>
                        <span>
                            <a href={routesObject.routesNL.testimonials}><FontAwesomeIcon style={{ fontSize: '1.4em', color: '#FFBF37' }} icon={faChevronRight}/></a>
                        </span>
                    </div>
                    <Slider {...settings}>
                    {p.map((item, i) => {
                        let itemText = item.content.rendered.replace(/<[^>]+>/gm, '')
                        if (itemText.length > 100) {
                            itemText = itemText.substring(0, 120) + '... '
                        }
                        return (
                    <div className="py-4"  key={i}>
                            <div className="px-5 d-flex flex-column align-items-center testi-front">
                            <p onClick={event => window.location.href = routesObject.routesNL.testimonials} style={{maxHeight:250,textAlign:'center', fontSize:'1em'}}>{itemText}</p>
                            <h5  className="text-right my-2">-{item.author_name}</h5>
                            </div>
                    </div>)})}
                    </Slider>
                </div>
               
        
            </> )
    }
    buildTestimonialStandalone = (p) => {
        return (
        <>  
                <div>
                    <div className="d-flex flex-row align-items-center justify-content-between flex-wrap">
                        <div className="d-flex align-items-center">
                            <span className="mr-3">
        <h2>{this.state.title}</h2>
                            </span>
                            <span>
                                <FontAwesomeIcon style={{ fontSize: '1.4em', color: '#FFBF37' }} icon={faChevronRight}/>
                            </span>
                        </div>
                        <div className="justify-content-end">
                        <Popup trigger={<button className="btn"> Uw Ervaring delen? </button>}modal closeOnDocumentClick>
                            {this.buildForm()}
                        </Popup>
                        
                        </div>
                    </div>

                    {p.map((item, i) => {
                        return (
                    <div className="border rounded py-3 my-2" key={i}>
                            <div className="px-5 d-flex flex-column">
                                <span className="text-center" dangerouslySetInnerHTML={{ __html: item.content.rendered}}></span>
                                <h5 className="text-right">-{item.author_name}</h5>
                            </div>
                    </div>)})}
                    <div className="py-5">
                    </div>
                </div>
        
            </> )
    }

    render() {
        const {data, location,isLoaded,thisLocation} = this.state;
        if ((location === thisLocation && isLoaded === true) || (location === thisLocation+'/' && isLoaded === true)) {
           
        return (
            
        <section className="testimonials" style={{paddingBottom: 100+'px'}}>
            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <div className="container py-5">
                {data == 0? <><div className="d-flex flex-row align-items-center pt-5">
                <span className="mr-3">
                            <a href={routesObject.routesNL.testimonials}><h2>Recensies</h2></a>
                        </span>
                        <span>
                            <a href={routesObject.routesNL.testimonials}><FontAwesomeIcon style={{ fontSize: '1.4em', color: '#FFBF37' }} icon={faChevronRight}/></a>
                        </span>

                       
                    </div> 
                    <p className="p-2">Het lijkt erop dat er nog geen recensies gepost werden. <br/>
                    klik <a href={routesObject.routesNL.testimonials}>hier</a>, om Uw ervaring te delen.</p></> : this.buildTestimonial(data)} 
                </div>
            </ScrollAnimation>
        </section>);
        }
        else if(isLoaded){
        
            return (
        <section className="testimonials contact" style={{paddingBottom: 250+'px'}}>
            <ScrollAnimation animateIn="fadeIn">
                <div className="container">
                {data == 0? <><div className="d-flex flex-row align-items-center justify-content-between flex-wrap">
                        <div className="d-flex align-items-center">
                            <span className="mr-3">
                                <h2>{this.state.title}</h2>
                            </span>
                            <span>
                                <FontAwesomeIcon style={{ fontSize: '1.4em', color: '#FFBF37' }} icon={faChevronRight}/>
                            </span>
                        </div>
                        <div className="justify-content-end">
                        <Popup trigger={<button className="btn"> Klik hier om jouw ervaring te delen!</button>}modal closeOnDocumentClick>
                            {this.buildForm()}
                        </Popup>
                        
                        </div>
                    </div>
                    <p className="p-2">Het lijkt erop dat er nog geen recensies werden toegevoegd. </p></> : this.buildTestimonialStandalone(data)} 
                </div>
            </ScrollAnimation>
        </section>);
        } else{
            return <LoaderComponent/>
        }
        
    }          

}

export default Testimonials;