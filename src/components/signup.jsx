import React , {useReducer, useState, useLayoutEffect, useEffect} from "react";
import './signup.css';
import axios from "axios";
import Countries from '../utils/countries.json';
import Footer from './footer';
import {CtaButton} from './services';
import { Error, FormAlerts } from "./create-order";
import { Link, useNavigate } from "react-router-dom";
import Modal, {SuccessIcon} from "./modal";

const reducer=(state, action)=>{

    switch(action.type){

        case "newFirstName":{
            return{
                firstName:action.newFirstName,
                lastName:state.lastName,
                email:state.email,
                dialCode:state.dialCode,
                phoneNumber:state.phoneNumber,
                password:state.password,
                confirmPassword:state.confirmPassword
            }
        }

        case "newLastName":{
            return{
                firstName:state.firstName,
                lastName:action.newLastName,
                email:state.email,
                dialCode:state.dialCode,
                phoneNumber:state.phoneNumber,
                password:state.password,
                confirmPassword:state.confirmPassword
            }
        }

        case "newEmail":{
            return{
                firstName:state.firstName,
                lastName:state.lastName,
                email:action.newEmail,
                dialCode:state.dialCode,
                phoneNumber:state.phoneNumber,
                password:state.password,
                confirmPassword:state.confirmPassword
            }
        }

        case "newDialCode":{
            return{
                firstName:state.firstName,
                lastName:state.lastName,
                email:state.email,
                dialCode:action.newDialCode,
                phoneNumber:state.phoneNumber,
                password:state.password,
                confirmPassword:state.confirmPassword
            }
        }

        case "newPhoneNumber":{
            return{
                firstName:state.firstName,
                lastName:state.lastName,
                email:state.email,
                dialCode:state.dialCode,
                phoneNumber:action.newPhoneNumber,
                password:state.password,
                confirmPassword:state.confirmPassword
            }
        }

        case "newPassword":{
            return{
                firstName:state.firstName,
                lastName:state.lastName,
                email:state.email,
                dialCode:state.dialCode,
                phoneNumber:state.phoneNumber,
                password:action.newPassword,
                confirmPassword:state.confirmPassword
            }
        }

        case "newConfirmPassword":{
            return{
                firstName:state.firstName,
                lastName:state.lastName,
                email:state.email,
                dialCode:state.dialCode,
                phoneNumber:state.phoneNumber,
                password:state.password,
                confirmPassword:action.newConfirmPassword
            }
        }

        default:
    }
}

const RegistrationForm=()=>{
    
    const initialState={
        firstName:"",
        lastName:"",
        email:"",
        dialCode:"",
        phoneNumber:"",
        password:"",
        confirmPassword:""
    }

    const [state, dispatch]=useReducer(reducer, initialState);

    const [match, setMatch]=useState(true);
    const [emailError, setEmailError]=useState(false);
    const [modal, setModal] = useState({
        show:false
    });

    const navigate=useNavigate();

    let countryCode=Countries.map(code=>{
        return <option key={code.code} value={code.dial_code}>{` ${code.emoji} ${code.name} (${code.dial_code})`}</option>
    })

    const handleWheel=(e)=>{

        e.target.blur();

        e.stopPropagation();
    }

    const handleFirstNameChange=(e)=>{

        dispatch({
            type:"newFirstName",
            newFirstName:e.target.value
        })
    }

    const handleLastNameChange=(e)=>{

        dispatch({
            type:"newLastName",
            newLastName:e.target.value
        })
    }

    const handleEmailChange=(e)=>{

        dispatch({
            type:"newEmail",
            newEmail:e.target.value
        })
    }

    const handleDialCodeChange=(e)=>{

        dispatch({
            type:"newDialCode",
            newDialCode:e.target.value
        })
    }

    const handlePhoneChange=(e)=>{

        dispatch({
            type:"newPhoneNumber",
            newPhoneNumber:e.target.value
        })
    }

    const handlePasswordChange=(e)=>{

        dispatch({
            type:"newPassword",
            newPassword:e.target.value
        })
    }

    const handleConfirmationChange=(e)=>{

        let password=e.target.value;

        if(password!==state.password){
            setMatch(false)
        }else{
            setMatch(true)
        }

        dispatch({
            type:"newConfirmPassword",
            newConfirmPassword:e.target.value
        })
    }

    const removeError=()=>{
        setEmailError(false);
    }

    const closeModal=()=>{
        setModal({
            show:false
        })

        navigate("/login");
    }

    let phoneConfirmation;
    let passwordAlert;
    let duplicateEmail;

    if(state.dialCode!==''){
        phoneConfirmation=(
            <div className="phone-confirmation">Your phone number is <span>{state.dialCode}</span> <span>{state.phoneNumber}</span></div>
        )
    }

    if(!match){
        passwordAlert=(
            <Error errorMessage={`The passwords do not match !!`} />
        )
    }

    if(emailError){
        duplicateEmail=(
            <Error errorMessage={`Email is already registered !`} />
        )
    }

    const handleSubmit=(e)=>{

        e.preventDefault();

        if(match){
            axios.post("/api/user/register", state).then(res=>{
                setModal({
                    show:true
                })
            }).catch(err=>{
                if(err.response.status===403){
                    setEmailError(true);
                }
            });
        }
    }

    return(
        <React.Fragment>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h4 className="signup-header">Sign up to WriteMe </h4>
                <div className="input-group">
                    <label className="required">First name</label>
                    <div>
                        <input type="text" value={state.firstName} onChange={handleFirstNameChange}  required></input>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">Last name</label>
                    <div>
                        <input type="text" value={state.lastName} onChange={handleLastNameChange} required ></input>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">Email</label>
                    <div>
                        <input type="email" value={state.email} onChange={handleEmailChange} onFocus={removeError} required ></input>
                    </div>
                </div>
                {duplicateEmail}
                <div className="input-group">
                    <label>
                        Phone Number
                    </label>
                    <div className="code-and-phone">
                        <select value={state.dialCode} onChange={handleDialCodeChange} className="code">
                            <option value={``} hidden disabled >🇦🇫 Afghanistan</option>
                            {countryCode}
                        </select>
                    <input className="phone-number" type="number" onChange={handlePhoneChange} onWheel={handleWheel} ></input>
                    </div>
                </div>
                {phoneConfirmation}
                <div className="input-group">
                    <label className="required">Password</label>
                    <div>
                        <input type="password" value={state.password} onChange={handlePasswordChange}  required></input>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">Confirm password</label>
                    <div>
                        <input type="password" value={state.confirmPassword} onChange={handleConfirmationChange} required></input>
                    </div>
                </div>
                {passwordAlert}
                <FormAlerts message={`Already have an account? `}>
                    <Link to={`/login`}>
                        Log in
                    </Link>
                </FormAlerts>
                <CtaButton type={`submit`} message={`Sign Up`} id={`submit-btn`} />
            </form>
            {modal.show && <Modal modalIcon={<SuccessIcon/>} onClick={closeModal} mainMessage={`Success`} supportingMessage={
                `Account created successfully. You can proceed to log in now.`
            } buttonColor={'success-btn-color'} />}
        </React.Fragment>
    )
}

const SignUp=()=>{

    useLayoutEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return(
        <React.Fragment>
            <section className="section" id='signup-section'>
                <div className="signup">
                    <div className="reg-text">
                        <h3>Create your <span>free</span> account in seconds.</h3>
                    </div>
                    <div className="reg-form">
                        <div className="form-wrapper">
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