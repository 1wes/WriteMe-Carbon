import React, { Fragment } from "react";

import './create-order.css';

import visa from '../assets/payment/visa.png';
import mastercard from '../assets/payment/mastercard.png';
import paypal from '../assets/payment/paypal.png';

import { BiCloudUpload } from "react-icons/bi";
import { MdDragIndicator } from "react-icons/md";


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

const Input=({type, onChange, placeholder, onWheel, value, required, multiple, name, id, hidden, checked})=>{

    return(
        <Fragment>
            <div>
                <input id={id} type={type} name={name} onChange={onChange} placeholder={placeholder} onWheel={onWheel} value={value} required={required} multiple={multiple}
                hidden={hidden} checked={checked} ></input>
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

const serviceOptions = (
    <Fragment>
        <option disabled value={``} hidden></option>
        <option value="Writing">Writing</option>
        <option value="Rewriting">Rewriting</option>
        <option value="Paraphrasing">Paraphrasing</option>
        <option value="Editing">Editing</option>
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

const MandatoryFields = ({ onSubjectChange, onGradeChange, onInstructionChange,
    onPagesChange, onStyleChange, onSourcesChange, onTopicChange, onCheckBoxChange,
     onLanguageChange, onServiceChange, formData }) => {
    
    return (
        <Fragment>
            <StepDescriptor description={`Tell us the kind of paper you want us to help you with.`} />
            <FieldsLayout>
                <FormControl label={`Service`} labelClassName={`required`} >
                    <Select name={`service`} value={formData.service} onChange={onServiceChange} required={true} >
                        {serviceOptions}
                    </Select>
                </FormControl>
                <FormControl label={`Subject`} labelClassName={`required`}>
                    <Select name={`subject`} value={formData.subject} onChange={onSubjectChange} required={true}>
                        {subjectOptions}
                    </Select>
                </FormControl>
                <FormControl label={`Grade Level`} labelClassName={`required`}>
                    <Select name={`grade-level`} value={formData.gradeLevel} onChange={onGradeChange} required={true}>
                        <option disabled value={``} hidden></option>
                        <option value="School" >School</option>
                        <option value="College">College</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                            <option value="Doctorate">Doctorate</option>
                    </Select>
                </FormControl>
                <FormControl label={`Reference Style`} labelClassName={`required`}>
                    <Select name={`reference-style`} value={formData.style} onChange={onStyleChange} required={true}>
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
                    <Select name={`language`} value={formData.language} onChange={onLanguageChange} required={true} >
                        <option disabled value={``} hidden></option>
                        <option value={`Eng (US)`} >🇺🇸  Eng (US)</option>
                        <option value={`Eng (UK)`} >🇬🇧  Eng (UK)</option>
                        <option value={`Eng (AUS)`} >🇦🇺  Eng (AUS)</option>
                        <option value={`Eng (CAN)`} >🇨🇦  Eng (CAN)</option>
                    </Select>
                </FormControl>   
                <FormControl label={`Number of Sources`} labelClassName={`required`}>
                    <Input type={`number`} onWheel={handleWheel} value={formData.sources} onChange={onSourcesChange} required={true} />                    
                </FormControl>  
                <FormControl label={`Assignment Topic`} labelClassName={'required'}>
                        <Input type={`text`} value={formData.topic} onChange={onTopicChange} required={true}/>
                        <div className="box-and-text"> 
                            <input className="checkbox" type="checkbox" onChange={onCheckBoxChange}  ></input>
                            <span>Use Any or Other.</span>
                        </div>
                </FormControl> 
                <FormControl label={`Number of Pages/Words`} labelClassName={`required`}>
                        <Input type={`number`} value={formData.pagesOrwords} onChange={onPagesChange} onWheel={handleWheel} required={true} />
                </FormControl>   
                <FormControl label={`Instructions`} labelClassName={`required`}>
                    <TextArea value={formData.instructions} onChange={onInstructionChange} required={true} />                    
                </FormControl>
            </FieldsLayout>
        </Fragment>
    )
}

const Files = ({ onFileChange, formData }) => {

    const fileCounter = formData.files.length ? formData.files.length > 1 ? `${formData.files.length} files` : `${formData.files[0].name}` : "";

    return (
        <Fragment>
            <StepDescriptor description={formData.service==="Writing"?`Upload files, if any and necessary. This step is optional, and you can add files even after submission by clicking
            on "Upload Files" in the All Orders section.`:`Since this order requires ${formData.service.toLowerCase()}, you need to attach the files of the work you have already done.`} />
            <FieldsLayout id={`files-layout`} >
                <div className="input-group" id="files-input-group">
                    <label htmlFor="new-files" className="new-files"  >
                        <span className="add-file-icon"><i><BiCloudUpload /></i>Attach Files</span>
                    </label>
                    <Input type={`file`} name={`fileAttachments`} id={`new-files`} onChange={onFileChange} placeholder={`add file`} multiple={true} hidden={true}
                    required={formData.service==='Writing'?false:true}/>
                    {formData.files.length>0 &&
                        <div className="number-of-files">
                            <span className="file-counter"> {fileCounter} </span> selected.                        
                        </div>
                    }
                </div>
            </FieldsLayout>
        </Fragment>
    ) 
}

const Deadline = ({formData, onDeadlineChange, onTimeChange, errorAlert}) => {
    
    return (
        <Fragment>
            <StepDescriptor description={`Select date and time within which the work should be completed.`} />
            <FieldsLayout>
                <FormControl label={`Date`} labelClassName={`required`}>                    
                    <Input type={`date`} value={formData.deadline} onChange={onDeadlineChange} required={true} />                          
                    {errorAlert}                    
                </FormControl>                
                <FormControl label={`Time`} labelClassName={`required`}>                    
                    <Input type={`time`} value={formData.time} onChange={onTimeChange} required={true} />                    
                </FormControl>                
            </FieldsLayout>            
        </Fragment>
    )
}

const Payment = ({ handlePaymentChange, formData }) => {

    return (
        <Fragment>
            <StepDescriptor description={`Please enter your payment details`} />
            <FieldsLayout>
                <div className="payment-options">
                    <PaymentOption logo={visa} onClick={event => selectActiveCard(event, "credit-card")} activeCard={formData.PaymentOption==="Credit Card"?"active-card":""}
                        method={`credit or debit card`} paymentMethod={`Credit Card`} onChange={handlePaymentChange} selectedOption={formData.PaymentOption} >
                        <img src={mastercard} />
                    </PaymentOption>
                    <PaymentOption logo={paypal} onClick={event => selectActiveCard(event, "paypal")} activeCard={formData.paymentOption==="PayPal"?"active-card":""}
                        method={`PayPal`} paymentMethod={`PayPal`} onChange={handlePaymentChange} selectedOption={formData.paymentOption} />
                </div>
                <div className="cost-payment-section">
                    <OrderCostCalculator level={formData.gradeLevel} service={formData.service} deadline={formData.deadline} pages={`x${formData.pagesOrwords}`} />
                    <PaymentDetails/>
                </div>
            </FieldsLayout>
        </Fragment>
    )
}

const PaymentOption = ({children, logo, method, paymentMethod, onChange, selectedOption, onClick, activeCard }) => {
    
    return (
        <label htmlFor={paymentMethod} className={activeCard} id="payment-option" onClick={onClick} >
            <div className="option-logo">
                <img src={logo} />
                {children}
            </div>
            <div className="payment-selection">
                <Input type={`radio`} id={paymentMethod} value={paymentMethod} onChange={onChange} checked={selectedOption===paymentMethod} /> <span>Pay $34 with { method }</span>
            </div>
        </label>
    )
}

const OrderCostCalculator = ({ level, service, deadline, pages, cost }) => {    
    
    return (
        <Fragment>
            <div className="cost-calculator">
                <StepDescriptor description={`Here is a breakdown of your order cost. If you would like to adjust it, just navigate back to 
                a specific cost determinant and edit it.`} />
                <ul className="calculator">
                    <ItemsList id={`items-heading`} item1={`Item`} item2={`Quantity`} item3={`Cost`} />
                    <ItemsList item1={`Level`} item2={level} />                
                    <ItemsList item1={`Service`} item2={service} />
                    <ItemsList item1={`Deadline`} item2={deadline} />
                    <ItemsList item1={`Pages`} item2={pages} item3={cost} />
                </ul>
                <div className="total-cost">
                    <span>Total Cost</span>          
                    <span>{ cost }</span>
                </div>                
            </div>
        </Fragment>
    )
}

const ItemsList = ({id, item1, item2, item3}) => {
    
    return (
        <Fragment>
            <li className="cost-item" id={id} >
                <span>{ item1 }</span>
                <span>{ item2 }</span>
                <span>{ item3}</span>                
            </li>
        </Fragment>
    )
}

const PaymentDetails = () => {
    
    return (
        <Fragment>
            <div className="payment-details">
                
            </div>
        </Fragment>
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
    Files, 
    Deadline,
    Payment
}

export default MandatoryFields;