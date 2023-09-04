import React from "react";
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



const SubmissionForm=({onSubmit, subjectValue, onSubjectChange, gradeValue, onGradeChange, onFileChange, instructionsValue, onInstructionChange,
    pagesOrwordsValue, onPagesChange, amountValue, onAmountChange, deadlineValue, onDeadlineChange,timeValue, onTimeChange, deadlineErrorAlert })=>{


    const handleWheel=e=>{

        e.target.blur();

        e.stopPropagation();
    }

    return(

        <React.Fragment>
            <form className="assignment-form" encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="assignment-details">
                <div className="input-group">
                    <label className="required">
                        Subject
                    </label>
                    <div>
                        <select name="subject" value={subjectValue} onChange={onSubjectChange} required>
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
                        <select name="grade-level" value={gradeValue} onChange={onGradeChange} required>
                            <option disabled value={``} hidden></option>
                            <option value="School" >School</option>
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
                        <input type="file" onChange={onFileChange} placeholder="add file" multiple></input>
                    </div>
                    <FormAlerts message={`supports only common image, document, video, and audio formats.`} />
                </div>
                <div className="input-group">
                    <label className="required">
                        Instructions
                    </label>
                    <div>
                        <textarea value={instructionsValue} onChange={onInstructionChange} required></textarea>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">
                        Number of Pages/Words
                    </label>
                    <div>
                        <input type="number" value={pagesOrwordsValue} onChange={onPagesChange} onWheel={handleWheel}></input>
                    </div>
                </div>

                <div className="input-group">
                    <label className="required">
                        Expected Amount (USD)
                    </label>
                    <div>
                        <input type="number" value={amountValue} onChange={onAmountChange} onWheel={handleWheel}></input>
                    </div>
                </div>

                <div className="input-group">
                    <label className="required">
                        Deadline Date
                    </label>
                    <div>
                        <input type="date" value={deadlineValue} onChange={onDeadlineChange} required></input>
                    </div>
                    {deadlineErrorAlert}
                </div>

                <div className="input-group">
                    <label className="required">
                        Deadline Time
                    </label>
                    <div>
                        <input type="time" value={timeValue} onChange={onTimeChange}  required></input>
                    </div>
                </div>
                </div>
                <FormLegend/>
                <CtaButton type={`submit`} message={`Submit Assignment`} id={`submit-assignment-button`} />
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