import React, { Fragment } from "react";

import './create-order.css';

import { CtaButton } from "./services";

import visa from '../assets/payment/visa.png';
import mastercard from '../assets/payment/mastercard.png';
import paypal from '../assets/payment/paypal.png';

import { BiCloudUpload } from "react-icons/bi";

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

const FormControl=({labelClassName, children, label, htmlFor})=>{

    return(
        <Fragment>
            <div className="input-group">
                <label className={labelClassName} htmlFor={htmlFor} >
                    {label}
                </label>
                {children}
            </div>
        </Fragment>
    )
}

const Select=({name, value, onChange, children, required})=>{

    return(
        <Fragment>
            <div>
                <select name={name} value={value} onChange={onChange} required={required}>
                    {children}
                </select>
            </div>
        </Fragment>
    )
}

const Input=({type, onChange, placeholder, onWheel, value, required, multiple, name, id, hidden})=>{

    return(
        <Fragment>
            <div>
                <input id={id} type={type} name={name} onChange={onChange} placeholder={placeholder} onWheel={onWheel} value={value} required={required} multiple={multiple}
                hidden={hidden}></input>
            </div>
        </Fragment>
    )
}

const TextArea=({value, onChange, required})=>{

    return(
        <div>
            <textarea value={value} onChange={onChange} required={required}></textarea>
        </div>
    )
}

const FieldsLayout = ({ id, children }) => {
    
    return (
        <div className='fields-layout' id={id} >
            {children}
        </div>
    )
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

const handleWheel=e=>{

    e.target.blur();

    e.stopPropagation();
}

const StepDescriptor = ({description}) => {
    
    return (
        <h2 className="step-description">            
            {description}
        </h2>        
    )
}

const MandatoryFields = ({subjectValue, onSubjectChange, gradeValue, onGradeChange,instructionsValue, onInstructionChange,
    pagesOrwordsValue, onPagesChange, styleValue, languageValue, onStyleChange, sourcesValue, onSourcesChange, topicValue,
    onTopicChange, onCheckBoxChange, onLanguageChange }) => {
    
    return (
        <Fragment>
            <StepDescriptor description={`Tell us the kind of paper you want us to help you with.`} />
            <FieldsLayout>
                <FormControl label={`Subject`} labelClassName={`required`}>
                    <Select name={`subject`} value={subjectValue} onChange={onSubjectChange} required={true}>
                        {subjectOptions}
                    </Select>
                </FormControl>
                <FormControl label={`Grade Level`} labelClassName={`required`}>
                        <Select name={`grade-level`} value={gradeValue} onChange={onGradeChange} required={true}>
                            <option disabled value={``} hidden></option>
                            <option value="School" >School</option>
                            <option value="College">College</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                            <option value="Doctorate">Doctorate</option>
                        </Select>
                </FormControl>
                <FormControl label={`Reference Style`} labelClassName={`required`}>
                        <Select name={`reference-style`} value={styleValue} onChange={onStyleChange} required={true}>
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
                <FormControl label={`Language`} labelClassName={`required`} >
                        <Select name={`language`} value={languageValue} onChange={onLanguageChange} required={true} >
                            <option disabled value={``} hidden></option>
                            <option value={`Eng (US)`} >🇺🇸  Eng (US)</option>
                            <option value={`Eng (UK)`} >🇬🇧  Eng (UK)</option>
                            <option value={`Eng (AUS)`} >🇦🇺  Eng (AUS)</option>
                            <option value={`Eng (CAN)`} >🇨🇦  Eng (CAN)</option>
                        </Select>
                </FormControl>   
                <FormControl label={`Number of Sources`} labelClassName={`required`}>
                        <Input type={`number`} onWheel={handleWheel} value={sourcesValue} onChange={onSourcesChange} required={true} />
                </FormControl>  
                <FormControl label={`Instructions`} labelClassName={`required`}>
                        <TextArea value={instructionsValue} onChange={onInstructionChange} required={true} />
                </FormControl>
                <FormControl label={`Assignment Topic`} labelClassName={'required'}>
                        <Input type={`text`} value={topicValue} onChange={onTopicChange} required={true}/>
                        <div className="box-and-text"> 
                            <input className="checkbox" type="checkbox" onChange={onCheckBoxChange}  ></input>
                            <span>Use Any or Other.</span>
                        </div>
                </FormControl> 
                <FormControl label={`Number of Pages/Words`} labelClassName={`required`}>
                        <Input type={`number`} value={pagesOrwordsValue} onChange={onPagesChange} onWheel={handleWheel} required={true} />
                </FormControl>            
            </FieldsLayout>
        </Fragment>
    )
}

const Files = ({ onFileChange, files }) => {

    const fileCounter = files.length ? files.length > 1 ? `${files.length} files` : `${files[0].name}` : "";

    return (
        <Fragment>
            <StepDescriptor description={`Upload files, if any and necessary. This step is optional, and you can add files even after submission by clicking
            on "Upload Files" in the All Orders section.`} />
            <FieldsLayout id={`files-layout`} >
                <div className="input-group" id="files-input-group">
                    <label htmlFor="new-files" className="new-files" >
                        <span className="add-file-icon"><i><BiCloudUpload /></i>Attach Files</span>
                    </label>
                    <Input type={`file`} name={`fileAttachments`} id={`new-files`} onChange={onFileChange} placeholder={`add file`} multiple={true} hidden={true} />
                    {files.length>0 &&
                        <div className="number-of-files">
                            <span className="file-counter"> {fileCounter} </span> selected.                        
                        </div>
                    }
                </div>
            </FieldsLayout>
        </Fragment>
    )
}

const Deadline = ({deadlineValue, onDeadlineChange,timeValue, onTimeChange, deadlineErrorAlert}) => {
    
    return (
        <Fragment>
            <StepDescriptor description={`Select date and time within which the work should be completed.`} />
            <FieldsLayout>
                <FormControl label={`Date`} labelClassName={`required`}>                    
                    <Input type={`date`} value={deadlineValue} onChange={onDeadlineChange} required={true} />                          
                    {deadlineErrorAlert}                    
                </FormControl>                
                <FormControl label={`Time`} labelClassName={`required`}>                    
                    <Input type={`time`} value={timeValue} onChange={onTimeChange} required={true} />                    
                </FormControl>                
            </FieldsLayout>            
        </Fragment>
    )
}

const Payment = () => {
    
    return (
        <Fragment>
            <StepDescriptor description={`Please enter your card payment details`} />
            <FieldsLayout>
                <div className="payment-options">
                    <PaymentOption logo={visa} method={`credit card`} >
                        <img src={mastercard} />
                    </PaymentOption>
                    <PaymentOption logo={paypal} method={`PayPal`} />
                </div>
            </FieldsLayout>
        </Fragment>
    )
}

const PaymentOption = ({children, logo, method, paymentMethod}) => {
    
    return (
        <label htmlFor="payment-method" className="payment-option">
            <div className="option-logo">
                <img src={logo} />
                {children}
            </div>
            <div className="payment-selection">
                <Input type={`radio`} value={paymentMethod} /> <span>Pay $34 with { method }</span>
            </div>
        </label>
    )
}

const SubmissionForm=({onSubmit, onFileChange,  
    })=>{

    return(

        <React.Fragment>
            <form className="assignment-form" encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="assignment-details">



                </div>
                <FormLegend/>
                <CtaButton type={`submit`} message={`Submit Assignment`} id={`submit-assignment-button`} />
            </form>
        </React.Fragment>
    )
}

export{
    FormControl,
    TextArea,
    FormLegend, 
    Error,
    FormAlerts,
    Select,
    Input,
    MandatoryFields,
    Files, 
    Deadline,
    Payment
}
export default SubmissionForm;