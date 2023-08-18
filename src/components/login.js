import React from "react";
import './login.css';
import Footer from './footer';
import {Logo} from './navbar';
import { FormAlerts } from "./create-order";
import { Link } from "react-router-dom";
import { CtaButton } from "./services";

const LoginForm=()=>{

    return(
        <React.Fragment>
            <form className="login-form" >
                <div className="form-heading">
                    <div className="login-logo"><Logo/></div>
                </div>
                <div className="input-group"> 
                    <label>Email</label>
                    <div>
                        <input type="email" placeholder="user@example.com" ></input>
                    </div>
                </div>
                <div className="input-group"> 
                    <label>Password</label>
                    <div>
                        <input type="password" placeholder="Enter your password" ></input>
                    </div>
                </div>
                <div className="prompts">
                    <div>
                        <FormAlerts message={`Don't have an account? `}>
                            <Link to={`/register`} className="create-acct-prompt">create one</Link>
                        </FormAlerts>
                    </div>
                    <div>
                        <Link className="link">Forgot password?</Link>
                    </div>
                </div>
                <CtaButton type={`submit`} id={`login-btn`} message={`Log in `} />
            </form>
        </React.Fragment>
    )
}

const Login=()=>{

    return(
        <React.Fragment>
            <section className="section" id="login-section"> 
                <div className="login">
                    <LoginForm/>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
}
export default Login;