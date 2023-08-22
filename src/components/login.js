import React, {useState, useLayoutEffect} from "react";
import './login.css';
import Footer from './footer';
import {Logo} from './navbar';
import { FormAlerts } from "./create-order";
import { Link } from "react-router-dom";
import { CtaButton } from "./services";
import axios from "../utils.js/axios";

const LoginForm=()=>{

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

        axios.post("/api/user/login", loginInfo).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <React.Fragment>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-heading">
                    <div className="login-logo">
                        <div>
                            <Logo/>
                        </div>
                    </div>
                </div>
                <div className="input-group"> 
                    <label>Email</label>
                    <div>
                        <input type="email" value={email} onChange={handleEmailChange} placeholder="user@example.com" required></input>
                    </div>
                </div>
                <div className="input-group"> 
                    <label>Password</label>
                    <div>
                        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" required></input>
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