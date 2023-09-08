import React , {Fragment} from "react";
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

const FormControl=({labelClassName, children, label})=>{

    return(
        <Fragment>
            <div className="input-group">
                <label className={labelClassName}>
                    {label}
                </label>
                {children}
            </div>
        </Fragment>
    )
}

const Select=({name, value, onChange, children})=>{

    return(
        <Fragment>
            <select name={name} value={value} onChange={onChange} required>
                {children}
            </select>
        </Fragment>
    )
}

const Input=({type, onChange, placeholder, onWheel, value})=>{

    return(
        <Fragment>
            <div>
                <input type={type} onChange={onChange} placeholder={placeholder} onWheel={onWheel} value={value} ></input>
            </div>
        </Fragment>
    )
}

const TextArea=({value, onChange})=>{

    return(
        <div>
            <textarea value={value} onChange={onChange} required></textarea>
        </div>
    )
}



const SubmissionForm=({onSubmit, subjectValue, onSubjectChange, gradeValue, onGradeChange, onFileChange, instructionsValue, onInstructionChange,
    pagesOrwordsValue, onPagesChange, amountValue, onAmountChange, deadlineValue, onDeadlineChange,timeValue, onTimeChange, deadlineErrorAlert })=>{


    const handleWheel=e=>{

        e.target.blur();

        e.stopPropagation();
    }

    const subjectOptions=(
        <Fragment>
            <option disabled value={``} hidden></option>
            <option value="History">History</option>
            <option value="Sports">Sports</option>
            <option value="Programming">Programming</option>
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
        </Fragment>
    )

    return(

        <React.Fragment>
            <form className="assignment-form" encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="assignment-details">
                    <FormControl label={`Subject`} labelClassName={`required`}>
                        <Select name={`subject`} value={subjectValue} onChange={onSubjectChange}>
                            {subjectOptions}
                        </Select>
                    </FormControl>
                    <FormControl label={`Grade Level`} labelClassName={`required`}>
                        <Select name={`grade-level`} value={gradeValue} onChange={onGradeChange}>
                            <option disabled value={``} hidden></option>
                            <option value="School" >School</option>
                            <option value="College">College</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                            <option value="Doctorate">Doctorate</option>
                        </Select>
                    </FormControl>
                    <FormControl label={`Number of Sources`} labelClassName={`required`}>
                        <Input type={`number`} onWheel={handleWheel}  />
                    </FormControl>
                    <FormControl label={`Reference Style`} labelClassName={`required`}>
                        <Select name={`reference-style`}>
                            <option disabled value={``} hidden></option>
                            <option value={`APA-7th`}>APA-7th Edition</option>
                            <option value={`APA-6th`}>APA-6th Edition</option>
                            <option value={`MLA`}>MLA</option>
                            <option value={`Chicago/Turabian`}>Chicago/Turabian</option>
                            <option value={`Harvard`}>Harvard</option>
                            <option value={`ASA`}>ASA</option>
                            <option value={`Oscolar`}>Oscolar</option>
                            <option value={`Strayer`}>Strayer</option>
                            <option value={`Any`}>Any</option>
                            <option value={`None`}>None</option>
                        </Select>
                    </FormControl>
                    <FormControl label={`Attach File`}>
                        <Input type={`file`} onChange={onFileChange} placeholder={`add file`} multiple/>
                        <FormAlerts message={`supports only common image, document, video, and audio formats.`} />
                    </FormControl>
                    <FormControl label={`Instructions`} labelClassName={`required`}>
                        <TextArea value={instructionsValue} onChange={onInstructionChange}/>
                    </FormControl>
                    <FormControl label={`Number of Pages/Words`} labelClassName={`required`}>
                        <Input type={`number`} value={pagesOrwordsValue} onChange={onPagesChange} onWheel={handleWheel}/>
                    </FormControl>
                    <FormControl label={`Expected Amount (USD)`} labelClassName={`required`}>
                        <Input type={`number`} value={amountValue} onChange={onAmountChange} onWheel={handleWheel} required/>
                    </FormControl>
                    <FormControl label={`Date Deadline`} labelClassName={`required`}>
                        <Input type={`date`} value={deadlineValue} onChange={onDeadlineChange} required/>
                        {deadlineErrorAlert}
                    </FormControl>
                    <FormControl label={`Time Deadline`} labelClassName={`required`}>
                        <Input type={`time`} value={timeValue} onChange={onTimeChange} required/>
                    </FormControl>
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