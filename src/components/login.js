import React, {useState, useLayoutEffect, useEffect} from "react";
import './login.css';
import Footer from './footer';
import {Logo} from './navbar';
import { FormAlerts, Error } from "./create-order";
import { Link, useNavigate } from "react-router-dom";
import { CtaButton } from "./services";
import axios from "../utils.js/axios";
import ForgotPassword from "./forgot-password";

const LoginForm=()=>{

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [error, setError]=useState(false);

    const navigate=useNavigate();

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

        axios.post("/api/user/login", loginInfo).then(res=>{

            setError(false);

            if(res.data.code==200){

                const role=res.data.role;

                role==='user'?navigate("/user-dashboard"):navigate("/admin-dashboard");
            }
        }).catch(err=>{

            setError(true);
        })
    }

    const loginError=error?(
        <Error id={`login-error`} errorMessage={`Incorrect email or password. Please check and try again.`} />
    ):"";

    useEffect(()=>{
        if(error){
            const loginForm=document.getElementById("user-login-form");
    
            loginForm.classList.add("login-animation")
        }else{
            const loginForm=document.getElementById("user-login-form");
    
            loginForm.classList.remove("login-animation")
        }
    },[error]);

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
                {loginError}
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

const Login=()=>{

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
export default Login;