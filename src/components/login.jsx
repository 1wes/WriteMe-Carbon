import React, { useState, useLayoutEffect, Fragment } from "react";

import './login.css';

import Footer from './footer';
import { Logo } from './navbar';
import { FormAlerts } from "./create-order";
import { CtaButton } from "./services";
import { useAuth } from "../context/Auth";
import useLoginStatus from "../hooks/useLogInStatus";

import { Link } from "react-router-dom";

import axiosInstance from "../utils/axios";

import { IoIosCloseCircle } from "react-icons/io";


const LoginForm = () => {

    useLoginStatus();
    
    const { setLoggedIn, setRole, setNames } = useAuth();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [error, setError]=useState(false);

    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit=(e)=>{

        e.preventDefault();

        const loginInfo={
            email:email, 
            password:password
        }

        setEmail('');
        setPassword('');

        axiosInstance.post("/api/user/login", loginInfo).then(res => {
            
            setError(false);

            if (res.data.code == 200) {
                setLoggedIn(true);
                setRole(res.data.role);
                setNames({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                })
            }
        }).catch(()=>{

            setError(true);
        })
    }

    const removeError=()=>{

        setError(false);
    }

    return(
        <React.Fragment>
            <form className="login-form" id="user-login-form" onSubmit={handleSubmit}>
                <div className="form-heading">
                    <div className="login-logo">
                        <div>
                            <Logo/>
                        </div>
                    </div>
                </div>
                {error && <LoginError/>}
                <div className="input-group"> 
                    <label>Email</label>
                    <div>
                        <input type="email" value={email} onChange={handleEmailChange} onFocus={removeError} placeholder="user@example.com" required></input>
                    </div>
                </div>
                <div className="input-group"> 
                    <label>Password</label>
                    <div>
                        <input type="password" value={password} onChange={handlePasswordChange} onFocus={removeError} placeholder="Enter your password" required></input>
                    </div>
                </div>
                <div className="prompts">
                    <div>
                        <FormAlerts message={`Don't have an account? `}>
                            <Link to={`/register`} className="create-acct-prompt">create one</Link>
                        </FormAlerts>
                    </div>
                    <div>
                        <Link to={'/forgot-password'} className="link">Forgot password?</Link>
                    </div>
                </div>
                <CtaButton type={`submit`} id={`login-btn`} message={`Log in `} />
            </form>
        </React.Fragment>
    )
}

const Login = () => {
    
    useLayoutEffect(()=>{

        window.scrollTo(0, 0);
    })

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

const LoginError = () => {
    
    return (
        <Fragment>
            <div className="loginError">
                <div className="error-notification">
                    <span className="error-icon">
                        <i>
                            <IoIosCloseCircle/>
                        </i>
                    </span>
                    <span className="login-error" >
                        Failed to log in. Check email or password !
                    </span>
                </div>
            </div>
        </Fragment>
    )
}
export default Login;