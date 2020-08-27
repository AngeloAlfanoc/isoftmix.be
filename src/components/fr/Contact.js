import BottomBar from './BottomBar'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoaderComponent from './Loader';
import ReCAPTCHA from "react-google-recaptcha";
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import axios from 'axios'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {frontConfig} from '../../settings/frontconfig'
import { routesObject } from '../../settings/routesObject';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            user: '',
            email: '',
            message: '',
            subject: ''
        };
        this._reCaptchaRef = React.createRef();
    }
    componentDidMount() {
        this.fetch();
    }
    fetch = async() => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSections)
            .then((result) => {
                this.setState({isLoaded: true, data: result.data});
            }, (error) => {
                this.setState({isLoaded: false, error});
            }) 
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this._reCaptchaRef.current.execute()
        const {user, email, message, subject} = this.state;
        let bodyFormData = new FormData();
        bodyFormData.set('user', user);
        bodyFormData.set('email', email);
        bodyFormData.set('message', message);
        bodyFormData.set('subject', subject);
        await axios({
            method: 'post', 
            url: frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getContactForm + frontConfig.contactFormId,
            data: bodyFormData,
            headers: {
                'content-type': 'application/json'
            }
          }).then((res) => {
                window.location.href = '/de/kontakt/erfolg'
        })
    }
    resetForm = () => {
        this.setState({user: '', subject: '', email: '', message: ''})
    }
    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoaded === true) {
            return <section className="contact">
                 <ScrollAnimation animateIn="fadeIn">
                <div id="contact" className="container py-5">
                <div className="d-flex flex-row align-items-center">
                            
                            <span className="mr-3"><a href={routesObject.routesFR.contact}> <h2>Contact</h2></a></span>
                            <span className="mr-3 anim-title-bounce"> <a href={routesObject.routesFR.contact}><FontAwesomeIcon style={{fontSize: '1.8em',color: '#FFBF37'}} icon={faChevronDown}/></a></span>
                            
                   </div><p dangerouslySetInnerHTML={{__html:this.props.paragraph}}></p>
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <div className="d-flex flex-row justify-content-between my-4">
                            <input required type="text" className="form-control" id="name" value={this.state.user} onChange={this.onUserChange.bind(this)} placeholder="Votre nom"></input>
                            <input required type="email" className="form-control"  id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} placeholder="Votre e-mail"></input>
                        </div>
                        <div>
                            <input placeholder="Matière" type="subject" className="form-control w-100" id="subject" aria-describedby="subjectHelp" value={this.state.subject}  onChange={this.onSubjectChange.bind(this)}/>
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                            <textarea placeholder='Votre message' className="form-control mt-4" rows="1" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)}/>
                        </div>
                        <div className="d-flex flex-row justify-content-end my-5">
                            <button className="btn">Envoyer</button>
                        </div>
                        {(<ReCAPTCHA style={{ display: "none" }}  ref={this._reCaptchaRef} size="invisible" sitekey={frontConfig.recaptcha} onChange={this.handleChange} />
        )}
                    </form>
                </div>

               <BottomBar/>
               </ScrollAnimation>
            </section>;
        } else {
            return <LoaderComponent/>

        }

    }
    onUserChange(event) {
        this.setState({user: event.target.value})
        this._reCaptchaRef.current.execute()
    }
    onSubjectChange(event) {
        this.setState({subject: event.target.value})
        this._reCaptchaRef.current.execute()
    }
    onEmailChange(event) {
        this.setState({email: event.target.value})
        this._reCaptchaRef.current.execute()
    }
    onMessageChange(event) {
        this.setState({message: event.target.value})
        this._reCaptchaRef.current.execute()
    }
}

export default Contact;