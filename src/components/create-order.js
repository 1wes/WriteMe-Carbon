import React, { useReducer, useState } from "react";
import './create-order.css';
import { CtaButton } from "./services";

const FormLegend=()=>{

    return(
        <>
            <div className="legend"> <span>*</span> indicates mandatory field</div>
        </>
    )
}

const FormAlerts=({message, children})=>{

    return(
        <>
            <div className="form-alerts" >{message}{children}</div>
        </>
    )
}

const Error=({errorMessage, id})=>{

    return(
        <>
            <div className="error-message" id={id}>{errorMessage}</div>
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
            }
        }

        case "newInstructions":{
            return{
                instructions:action.newInstructions,
                pagesOrwords:state.pagesOrwords,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
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
                deadline:state.deadline,
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

    let DeadlineErrorAlert;

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

        alert(JSON.stringify(state));
        
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
                <FormLegend/>
                <CtaButton type={`submit`} message={`Submit Assignment`} />
            </form>
        </React.Fragment>
    )
}

export{
    FormLegend, 
    Error,
    FormAlerts
}
export default SubmissionForm;