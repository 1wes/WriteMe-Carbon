import React , {useEffect} from "react";
import './signup.css';
import axios from "axios";
import SectionHeader from './heading';
import Countries from '../utils.js/countries.json';
import Footer from './footer';
import {CtaButton} from './services'

const RegistrationForm=()=>{

    let countryCode=Countries.map(code=>{
        return <option key={code.code} value={code.dial_code}>{` ${code.emoji} ${code.name} (${code.dial_code})`}</option>
    })

    return(
        <React.Fragment>
            <form className="signup-form">
                <div className="input-group">
                    <label className="required">First name</label>
                    <div>
                        <input type="text" required></input>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">Last name</label>
                    <div>
                        <input type="text" required ></input>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">Email</label>
                    <div>
                        <input type="email" required ></input>
                    </div>
                </div>
                <div className="input-group">
                    <label>
                        Phone Number
                    </label>
                    <div className="code-and-phone">
                        <select  className="code">
                            <option value={``} hidden disabled >🇦🇫 Afghanistan</option>
                            {countryCode}
                        </select>
                    <input className="phone-number" type="number"></input>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">Password</label>
                    <div>
                        <input type="password" required></input>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">Confirm password</label>
                    <div>
                        <input type="password" required></input>
                    </div>
                </div>
                <CtaButton message={`Sign Up`} />
            </form>
        </React.Fragment>
    )
}

const SignUp=()=>{


    return(
        <React.Fragment>
            <section className="section" id='signup-section'>
                <div className="signup">
                    <div className="reg-text"></div>
                    <div className="reg-form">
                        <div className="form-wrapper">
                            <SectionHeader heading={`Sign up to WriteMe.com`} />
                            <RegistrationForm/>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
}
export default SignUp;