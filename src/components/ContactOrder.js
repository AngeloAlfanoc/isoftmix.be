import BottomBar from '../components/BottomBar'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReCAPTCHA from "react-google-recaptcha";
import React from 'react';
import axios from 'axios'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {frontConfig} from '../settings/frontconfig'

class ContactOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            email: '',
            message: '',
            location: window.location.pathname,
            product: '',
        };
        this._reCaptchaRef = React.createRef();
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        const {user, email, message, product} = this.state;
        this._reCaptchaRef.current.execute()
        let bodyFormData = new FormData();
        bodyFormData.set('user', user);
        bodyFormData.set('email', email);
        bodyFormData.set('product', product);
        bodyFormData.set('message', message);
        await axios({
            method: 'post', 
            url: frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getContactForm + frontConfig.contactFormOrder,
            data: bodyFormData,
            headers: {
                'content-type': 'application/json'
            }
          }).then((res) => 
            {
                     window.location.href = '/contact/succes'
            })
    }
    render() {
            return ( <> <div id="contactOrder" className="contact container mt-5">
                <div className="d-flex flex-row align-items-center mt-5 ">
                    <span className="mr-3 my-3">
                        <h2>Doe hier uw aanvraag</h2>
                    </span>
                    <span className="anim-title-bounce">
                        <FontAwesomeIcon style={{ fontSize: '1.4em',  color: '#FFBF37' }} icon={faChevronDown}/>
                    </span>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)}method="POST">
                        <input required type="text" className="form-control w-100 my-3" id="name" aria-describedby="nameHelp" value={this.state.user} onChange={this.onUserChange.bind(this)} placeholder="Uw naam"></input>
                        <input required type="email"  className="form-control  w-100 my-3" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} placeholder="Uw E-mail"></input>
                        <input  required placeholder="Het gekozen product" type="Product" className="form-control w-100  my-1" id="Product" aria-describedby="ProductHelp" value={this.state.product} onChange={this.onProductChange.bind(this)}/>
                        <textarea required placeholder='Uw boodschap' className="form-control  my-3" rows="2" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)}/>
                        <div className="d-flex flex-row justify-content-end my-5">
                            <button className="btn">Verstuur</button>
                        </div>
                        <ReCAPTCHA style={{ display: "inline-block" }} theme="dark" ref={this._reCaptchaRef} size="invisible" sitekey={frontConfig.recaptcha}  onChange={this.onMessageChange} />
                    </form>
                </div>
            </div> < BottomBar /> </>);
        

    }
    onProductChange(event){
        this.setState({product: event.target.value})
    }
    onUserChange(event) {
        this.setState({user: event.target.value})
    }
    onEmailChange(event) {
        this.setState({email: event.target.value})
    }
    onMessageChange(event) {
        this.setState({message: event.target.value})
    }
}

export default ContactOrder;