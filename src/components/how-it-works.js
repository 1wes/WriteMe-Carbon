import React from 'react';
import './how-it-works.css';
import SectionHeader from './heading';
import { MdAssignmentAdd, MdOutlinePayment } from 'react-icons/md'
import { BsFileEarmarkCheck } from 'react-icons/bs';
import { VscFeedback } from 'react-icons/vsc';
import { CtaButton } from "./services";
import { Link } from 'react-router-dom';

const StepsCard=({stepIcon, stepName, details })=>{

    return(
        <>
            <div className='steps-card'>
                <div className='steps-icon'>
                    <i>
                        {stepIcon}
                    </i>
                </div>
                <h3 className='step-name'>
                    {stepName}
                </h3>
                <p className='step-details'>
                    {details}
                </p>
            </div>
        </>
    )
}
const HowItWorks=()=>{

    return(

        <React.Fragment>
            <section className='section' id='how-it-works-section'>
                <div className='how-it-works'>
                    <SectionHeader heading={`How it works`} tagline={`Want to post your order? Learn the steps to enable you to do that in less than a two minutes.`} />

                    <div className='steps'>
                        <StepsCard stepIcon={<MdAssignmentAdd/>} stepName={`1. Submit Your Assignment.`} 
                            details={`Fill in the provided form with authentic personal information and assignment details and choose your deadline`} />
                        <StepsCard stepIcon={<MdOutlinePayment/>} stepName={`2. Get A Quote and Pay.`} 
                            details={`We will send you a quote in your work within 2 minutes. Pay using supported methods to process your order.`} />
                        <StepsCard stepIcon={<BsFileEarmarkCheck/>} stepName={`3. Receive Solution`} 
                            details={`You will receive a completed work document within the stipulated deadline, alongised an anti-plagiarism and Grammarly report.`} />
                        <StepsCard stepIcon={<VscFeedback/>} stepName={`4. Provide Feedback`} 
                            details={`Provide us with feedback on the solution provided, and we will iteratively act on it until you are satisfied with the final solution.`} />
                    </div>
                    <Link className='link-button' to={`/login`}>
                        <CtaButton message={`Submit Assignment`} id={`submit-link`} />
                    </Link>
                </div>
            </section>
        </React.Fragment>
    )
}
export default HowItWorks;