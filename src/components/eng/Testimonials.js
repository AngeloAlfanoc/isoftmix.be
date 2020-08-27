import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoaderComponent from './Loader'
import Popup from "reactjs-popup";
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Slider from "react-slick";
import axios from 'axios'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {frontConfig} from '../../settings/frontconfig'
import { routesObject } from "../../settings/routesObject";

class Testimonials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: window.location.pathname,
            thisLocation: '/eng',
            isLoaded:false,
            data:[],
            user:'',
            message:'',
            email:'',
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
            window.location.href = '/testimonials'
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
            <input className="form-control w-100" type="text" required placeholder="Your name" aria-describedby="nameHelp"  value={this.state.user} onChange={this.onUserChange.bind(this)}></input>
            <input className="form-control w-100" type="text" required placeholder="Your email" aria-describedby="emailHelp"  value={this.state.email} onChange={this.onEmailChange.bind(this)}></input>
            <textarea maxLength='400'  className="form-control w-100" rows="5" required placeholder='Your message'   value={this.state.message} onChange={this.onMessageChange.bind(this)}></textarea>
            <div className="d-flex flex-row justify-content-end my-5">
                <button className="btn">Send</button>
            </div>
        </form>
        </div>);

    }
    buildTestimonial = (p) => {
        const settings = {dots: true,infinite: true,speed: 800, autoplaySpeed: 10000,slidesToShow: 1,slidesToScroll: 1,autoplay: true};

        return (
        <>  
                <div >
                    <div className="d-flex flex-row align-items-center py-5">
                        <span className="mr-3">
                            <a href={routesObject.routesENG.testimonials}><h2>Testimonials</h2></a>
                        </span>
                        <span>
                            <a href={routesObject.routesENG.testimonials}><FontAwesomeIcon style={{ fontSize: '1.4em', color: '#FFBF37' }} icon={faChevronRight}/></a>
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
                            <p onClick={event => window.location.href = '/testimonials'} style={{maxWidth:60+'%', maxHeight:250,textAlign:'center', fontSize:'1em'}}>{itemText}</p>
                            <h5  className="text-right my-2">-{item.author_name}</h5>
                            </div>
                    </div>)})}
                    </Slider>
                </div>
               
        
            </> )
    }
    buildTestimonialStandalone = (p) => {
        
        return (<>  
                
                    <div className="d-flex flex-row align-items-center justify-content-between flex-wrap">
                        <div className="d-flex align-items-center">
                            <span className="mr-3">
                                <h2>Testimonials</h2>
                            </span>
                            <span>
                                <FontAwesomeIcon style={{ fontSize: '1.4em', color: '#FFBF37' }} icon={faChevronRight}/>
                            </span>
                        </div>
                        <div className="justify-content-end">
                        <Popup trigger={<button className="btn"> Share your experience? </button>}modal closeOnDocumentClick>
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

                           }
                    </div>)})}
             
        
            </> )
    }

    render() {
        const {data, location,isLoaded,thisLocation} = this.state;
        if ((location === thisLocation && isLoaded === true) || (location === thisLocation+'/' && isLoaded === true)) {
           
        return (
            
        <section className="testimonials" style={{paddingBottom: 250+'px'}}>
           <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <div className="container py-5">
                {data == 0? <><div className="d-flex flex-row align-items-center pt-5">
                <span className="mr-3">
                            <a href={routesObject.routesENG.testimonials}><h2>Testimonials</h2></a>
                        </span>
                        <span>
                            <a href={routesObject.routesENG.testimonials}><FontAwesomeIcon style={{ fontSize: '1.4em', color: '#FFBF37' }} icon={faChevronRight}/></a>
                        </span>
                       
                    </div> 
                    <p className="p-2">It looks like there are no testimonials yet.. <br/>Click <a href="/eng/testimonials">here </a>to add one!</p></> : this.buildTestimonial(data)} 
                </div>
            </ScrollAnimation>
        </section>);
        }
        else if(isLoaded){
        
            return (
        <section className="testimonials contact" style={{paddingBottom: 200+'px'}}>
             <ScrollAnimation animateIn="fadeIn"  animateOnce={true}> 
                <div className="container">
                {data == 0? <>                    <div className="d-flex flex-row align-items-center justify-content-between flex-wrap">
                        <div className="d-flex align-items-center">
                            <span className="mr-3">
                                <h2>Testimonials</h2>
                            </span>
                            <span>
                                <FontAwesomeIcon style={{ fontSize: '1.4em', color: '#FFBF37' }} icon={faChevronRight}/>
                            </span>
                        </div>
                        <div className="justify-content-end">
                        <Popup trigger={<button className="btn"> Share your experience? </button>}modal closeOnDocumentClick>
                            {this.buildForm()}
                        </Popup>
                        
                        </div>
                    </div>
                    <p className="p-2">It looks like there are no testimonials yet.. </p></> : this.buildTestimonialStandalone(data)} 
                </div>
            </ScrollAnimation>
        </section>);
        } else{
            return <LoaderComponent/>
        }
        
    }      

}

export default Testimonials;