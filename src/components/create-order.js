import React, { useLayoutEffect, useReducer, useState, useEffect } from "react";
import './create-order.css';
import Navbar,{ MobileNavbar } from "./navbar";
import { OrderBreadcrumb } from "./breadcrumb";
import Footer from "./footer";
import { Link } from "react-router-dom";
import SectionHeader from "./heading";
import { CtaButton } from "./services";
import axios from "axios";
import Countries from '../utils.js/countries.json';

const StepsBreadcrumb=()=>{

    return(
        <React.Fragment>
            <div className="steps-breadcrumb">
                <div className="step-info">Submit assignment</div>
                <div className="step-info"><Link className='breadcrumb-link' to={`#`}>Get a quote and pay</Link></div>
                <div className="step-info">Receive your work</div>
            </div>
        </React.Fragment>
    )
}

const FormLegend=()=>{

    return(
        <>
            <div className="legend"> <span>*</span> indicates mandatory field</div>
        </>
    )
}

const FormAlerts=({message})=>{

    return(
        <>
            <div className="form-alerts" >{message}</div>
        </>
    )
}

const Error=({errorMessage})=>{

    return(
        <>
            <div className="error-message">{errorMessage}</div>
        </>
    )
}

const reducer=(state, action)=>{

    switch(action.type){

        case "newSubject":{
            return{
                subject:action.newSubject,
                gradeLevel:state.gradeLevel,
                file:state.file,
                instructions:state.instructions,
                pagesOrwords:state.pagesOrwords,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
                name:state.name,
                email:state.email,
                code:state.code,
                phone:state.phone

            }
        }

        case "newGradeLevel":{
            return{
                gradeLevel:action.newGrade,
                subject:state.subject,
                file:state.file,
                instructions:state.instructions,
                pagesOrwords:state.pagesOrwords,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
                name:state.name,
                email:state.email,
                code:state.code,
                phone:state.phone
            }
        }

        case "newFile":{
            return{
                file:action.newFile,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions,
                pagesOrwords:state.pagesOrwords,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
                name:state.name,
                email:state.email,
                code:state.code,
                phone:state.phone
            }
        }

        case "newInstructions":{
            return{
                instructions:action.newInstructions,
                pagesOrwords:state.pagesOrwords,
                amount:state.amount,
                deadline:state.deadline,
                name:state.name,
                email:state.email,
                time:state.time,
                code:state.code,
                phone:state.phone,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject
            }
        }

        case "newPagesOrWords":{
            return{
                pagesOrwords:action.newPages,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
                name:state.name,
                email:state.email,
                code:state.code,
                phone:state.phone,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions
            }
        }

        case "newAmount":{
            return{
                amount:action.newAmount,
                pagesOrwords:state.pagesOrwords,
                deadline:state.deadline,
                time:state.time,
                name:state.name,
                email:state.email,
                code:state.code,
                phone:state.phone,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions
            }
        }

        case "newDeadline":{
            return{
                deadline:action.newDeadline,
                amount:state.amount,
                pagesOrwords:state.pagesOrwords,
                name:state.name,
                email:state.email,
                code:state.code,
                phone:state.phone,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions,
                time:state.time,
            }
        }

        case "newTime":{
            return{
                time:action.newTime,
                email:state.email,
                name:state.name,
                deadline:state.deadline,
                amount:state.amount,
                pagesOrwords:state.pagesOrwords,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                code:state.code,
                phone:state.phone,
                instructions:state.instructions
            }
        }

        case "newName":{
            return{
                name:action.newName,
                deadline:state.deadline,
                time:state.time,
                amount:state.amount,
                pagesOrwords:state.pagesOrwords,
                email:state.email,
                code:state.code,
                phone:state.phone,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions
            }
        }

        case "newEmail":{
            return{
                email:action.newEmail,
                name:state.name,
                deadline:state.deadline,
                time:state.time,
                amount:state.amount,
                pagesOrwords:state.pagesOrwords,
                code:state.code,
                phone:state.phone,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions
            }
        }

        case "newCode":{
            return{
                code:action.newCode,
                phone:state.phone,
                email:state.email,
                name:state.name,
                deadline:state.deadline,
                time:state.time,
                amount:state.amount,
                pagesOrwords:state.pagesOrwords,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions
            }
        }

        case "newPhone":{
            return{
                phone:action.newPhone,
                email:state.email,
                code:state.code,
                name:state.name,
                deadline:state.deadline,
                time:state.time,
                amount:state.amount,
                pagesOrwords:state.pagesOrwords,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions
            }
        }

        default:
    }

}

const SubmissionForm=()=>{

    const initialState={
        subject:"",
        gradeLevel:"",
        file:"",
        instructions:"",
        pagesOrwords:"",
        amount:"",
        deadline:"",
        name:"",
        email:"",
        code:"",
        phone:"",
        time:""
    }

    const [error, setError]=useState(false);
    const [DeadlineErrorMessage, setDeadlineErrorMessage]=useState('');

    const [state, dispatch]=useReducer(reducer, initialState);

    const handleWheel=e=>{

        e.target.blur();

        e.stopPropagation();
    }

    const handleSubjectChange=(e)=>{

        dispatch({
            type:"newSubject",
            newSubject:e.target.value
        })
    }

    const handleGradeChange=(e)=>{

        dispatch({
            type:"newGradeLevel",
            newGrade:e.target.value
        })
    }

    const handleFileChange=(e)=>{

        const fileName=e.target.files[0];

        dispatch({
            type:"newFile",
            newFile:fileName
        })
    }

    const handleInstructionChange=(e)=>{

        dispatch({
            type:"newInstructions",
            newInstructions:e.target.value
        })
    }

    const handlePagesChange=(e)=>{

        dispatch({
            type:"newPagesOrWords",
            newPages:e.target.value
        })
    }

    const handleAmountChange=(e)=>{

        dispatch({
            type:"newAmount",
            newAmount:e.target.value
        })
    }

    const handleDeadlineChange=(e)=>{

        const checkDate=()=>{

            const deadline=new Date(e.target.value).valueOf();

            const currentDate=new Date().valueOf();

            return deadline>currentDate;
        }

        const isValid=checkDate();

        if(isValid){
            setError(false);

            dispatch({
                type:"newDeadline",
                newDeadline:e.target.value
            })
        }else{
            setError(!error);
            setDeadlineErrorMessage("deadline cannot be in the past !!");
        }
    }

    const handleTimeChange=(e)=>{

        dispatch({
            type:"newTime",
            newTime:e.target.value
        })
    }

    const handleNameChange=(e)=>{

        dispatch({
            type:"newName",
            newName:e.target.value
        })
    }

    const handleEmailChange=(e)=>{

        dispatch({
            type:"newEmail",
            newEmail:e.target.value
        })
    }

    const handleCodeChange=(e)=>{

        dispatch({
            type:"newCode",
            newCode:e.target.value
        })
    }

    const handlePhoneChange=(e)=>{

        dispatch({
            type:"newPhone",
            newPhone:e.target.value
        })
    }

    let DeadlineErrorAlert;

    let countryCode=Countries.map(code=>{
        return <option key={code.code} value={code.dial_code}>{` ${code.emoji} ${code.name} (${code.dial_code})`}</option>
    })

    let phoneConfirmation;

    if(state.code!==''){
        phoneConfirmation=(
            <div className="phone-confirmation">Your phone number is <span>{state.code}</span> <span>{state.phone}</span></div>
        )
    }

    if(error){
        DeadlineErrorAlert=(
            <Error errorMessage={DeadlineErrorMessage} />
        )
    } 

    const submitAssignment=(e=>{

        e.preventDefault();

        let assignmentDetails= new FormData();

        assignmentDetails.append("name", "Wesley");

        for (var key in state){
            assignmentDetails.append(key, state[key])
        }
        
        // axios.post("url", assignmentDetails, {
        //     headers:{
        //         "Content-Type":"multipart/form-data"
        //     }
        // }).then(res=>{
        //     console.log(res)
        // }).catch(err=>{
        //     console.log(err);
        // });
    })

    return(

        <React.Fragment>
            <form className="assignment-form" onSubmit={submitAssignment}>
            <SectionHeader tagline={`Fill in your assignment requirements`} />
                <div className="assignment-details">
                <div className="input-group">
                    <label className="required">
                        Subject
                    </label>
                    <div>
                        <select name="subject" value={state.subject} onChange={handleSubjectChange} required>
                            <option disabled value={``} hidden></option>
                            <option value="History">History</option>
                            <option value="Sports">Sports</option>
                            <option value="programming">Programming</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Psychology">Psychology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Lifestyle and wellness">Lifestyle & Wellness </option>
                            <option value="Business">Business</option>
                            <option value="Law">Law</option>
                            <option value="Technology">Technology</option>
                            <option value="Science">Science</option>
                            <option value="Education">Education</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sociology">Sociology</option>
                            <option value="Humanities">Humanities</option>
                            <option value="Language">Language</option>
                            <option value="Art">Art</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">
                        Grade Level
                    </label>
                    <div>
                        <select name="grade-level" value={state.gradeLevel} onChange={handleGradeChange} required>
                            <option disabled value={``} hidden></option>
                            <option value="K-12" >School</option>
                            <option value="College">College</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                            <option value="Doctorate">Doctorate</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <label>
                        Attach file
                    </label>
                    <div>
                        <input type="file" onChange={handleFileChange} placeholder="add file" multiple></input>
                    </div>
                    <FormAlerts message={`supports only common image, document, video, and audio formats.`} />
                </div>
                <div className="input-group">
                    <label className="required">
                        Instructions
                    </label>
                    <div>
                        <textarea value={state.instructions} onChange={handleInstructionChange} required></textarea>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">
                        Number of Pages/Words
                    </label>
                    <div>
                        <input type="number" value={state.pagesOrwords} onChange={handlePagesChange} onWheel={handleWheel}></input>
                    </div>
                </div>

                <div className="input-group">
                    <label className="required">
                        Expected Amount (USD)
                    </label>
                    <div>
                        <input type="number" value={state.amount} onChange={handleAmountChange} onWheel={handleWheel}></input>
                    </div>
                </div>

                <div className="input-group">
                    <label className="required">
                        Deadline Date
                    </label>
                    <div>
                        <input type="date" value={state.deadline} onChange={handleDeadlineChange} required></input>
                    </div>
                    {DeadlineErrorAlert}
                </div>

                <div className="input-group">
                    <label className="required">
                        Deadline Time
                    </label>
                    <div>
                        <input type="time" value={state.time} onChange={handleTimeChange}  required></input>
                    </div>
                </div>
                </div>
                <SectionHeader tagline={`Enter your information to enable us to reply to you`} />
                <div className="personal-info">
                    <div className="input-group">
                        <label className="required">
                            Name
                        </label>
                        <div>
                            <input type="text" value={state.name} onChange={handleNameChange} required></input>
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="required">
                            Email
                        </label>
                        <div>
                            <input type="email" value={state.email} onChange={handleEmailChange} required></input>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>
                            Phone Number
                        </label>
                        <div className="code-and-phone">
                            <select value={state.code} onChange={handleCodeChange}  className="code">
                                <option value={``} hidden disabled >🇦🇫 Afghanistan</option>
                                {countryCode}
                            </select>
                            <input className="phone-number" type="number" onWheel={handleWheel} value={state.phone} onChange={handlePhoneChange}></input>
                        </div>
                        {phoneConfirmation}
                    </div>
                </div>
                <FormLegend/>
                <CtaButton type={`submit`} message={`Submit Assignment`} />
            </form>
        </React.Fragment>
    )
}

const CreateOrder=()=>{

    useLayoutEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    useEffect(()=>{
        let submitCtaBtn=document.getElementById('submit-cta');

        submitCtaBtn.classList.add('hide-assignment-btn')
    },[]);

    return(

        <React.Fragment>
            <Navbar/>
            <MobileNavbar/>
            <section className="section" id="create-order-section">
                <div className="create-order">
                    <OrderBreadcrumb/>
                    <StepsBreadcrumb/>
                    <SubmissionForm/>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
}
export{
    FormLegend,
    FormAlerts,
    Error
}
export default CreateOrder;