import React, {useState, useLayoutEffect} from "react";
import './faq.css';
import Navbar from "./navbar";
import { MobileNavbar } from "./navbar";
import { FAQBreadcrumb } from "./breadcrumb";
import SectionHeader from "./heading";
import Footer from "./footer";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { BiChevronDown, BiMailSend } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { CtaButton } from "./services";

const AccordionComponent=({question, answer, expanded, onChange})=>{

    return(
        <React.Fragment>
            <div className="accordion">
                <Accordion expanded={expanded} sx={{width:"100%"}}  onChange={onChange} >
                    <AccordionSummary  expandIcon={<BiChevronDown className="faq-icon"/>}>
                        <Typography sx={{fontWeight:600, color:"#000000cc", fontSize:"13px"}}>
                            {question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails> 
                        <Typography sx={{fontSize:"13px"}}>
                           {answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </React.Fragment>
    )
}

const Support=()=>{

    return(
        <React.Fragment>
            <div className="section" id="support-section">
                <div className="support-contact">
                    <SectionHeader heading={`Did not find what you were looking for?`}tagline={`Get in touch with our support team and we will have 
                    your issue sorted within no time.`} />
                    <div className="support-mail-phone">
                        <SupportContacts icon={<BiMailSend/>} header={`Mail us`} details={`Get in direct contact with one of our support agents through email.`}
                        to={`mailto:support@writeme.com`} contact={`support@writeme.com`} />
                        <SupportContacts icon={<BsFacebook/>} header={`Let's chat on social media`} details={`Contact us via Facebook and we shall answer all your questions and provide adequate assistance.`}
                        to={``} contact={`Write_Me`}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const SupportContacts=({icon, header, details, to, contact})=>{

    return(
        <React.Fragment>
            <div className="support-channels">
                <div className="support-icon">
                    <i>{icon}</i>
                </div>
                <h3>
                    {header}
                </h3>
                <p className="support-details">{details}</p>

                <Link className="support-link" to={to}>{contact}</Link>
            </div>
        </React.Fragment>
    )
}

const FAQ=()=>{

    const [searchQuery, setSearchQuery]=useState('');
    const [expanded, setExpanded]=useState(false);
    const [showMore, setShowMore]=useState(false);

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    },[])

    const closeAccordion=(panel)=>(event, isExpanded)=>{
        setExpanded(isExpanded ? panel : false)
    }

    const handleSubmit=(e)=>{

        e.preventDefault();

        setSearchQuery('');
    }

    const handleChange=(e=>{

        if(e.target.value!==''){
            setSearchQuery(e.target.value);
        }
    })

    const toggleQuestionsShown=()=>{

        let moreQuestions= document.getElementById('more-questions');

        setShowMore(!showMore)

        moreQuestions.classList.toggle('show-questions')

    }

    return(
        <React.Fragment>
            <Navbar/>
            <MobileNavbar/>
            <div className="section" id="faq-section">
                <div className="faq-breadcrumb">
                    <FAQBreadcrumb/>
                </div>
                <div className="search-bar">
                    <SectionHeader heading={`What would you like to know?`} />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" placeholder="Search using keywords" value={searchQuery} onChange={handleChange} ></input>
                            <button className="search-bar-submit" type="submit">Search</button>
                        </div>
                    </form>
                </div>
                <div className="faq">
                    <SectionHeader heading={`Frequently Asked Questions`} />
                    <div className="faq-cards">
                        <div className="questions">
                            <AccordionComponent expanded={expanded==='panel1'} onChange={closeAccordion('panel1')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel2'} onChange={closeAccordion('panel2')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel3'} onChange={closeAccordion('panel3')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel4'} onChange={closeAccordion('panel4')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel5'} onChange={closeAccordion('panel5')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel6'} onChange={closeAccordion('panel6')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel7'} onChange={closeAccordion('panel7')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel8'} onChange={closeAccordion('panel8')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel9'} onChange={closeAccordion('panel9')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel10'} onChange={closeAccordion('panel10')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                        </div>
                        <div className="questions" id="more-questions">
                            <AccordionComponent expanded={expanded==='panel11'} onChange={closeAccordion('panel11')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel12'} onChange={closeAccordion('panel12')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel13'} onChange={closeAccordion('panel13')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel14'} onChange={closeAccordion('panel14')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel15'} onChange={closeAccordion('panel15')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel16'} onChange={closeAccordion('panel16')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel17'} onChange={closeAccordion('panel17')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel18'} onChange={closeAccordion('panel18')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel19'} onChange={closeAccordion('panel19')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                            <AccordionComponent expanded={expanded==='panel20'} onChange={closeAccordion('panel20')} question={`How do i make an order`} answer={`Just fill in the contact form and we'll be in touch`}/>
                        </div>
                        <CtaButton id="show-more" onClick={toggleQuestionsShown}>
                            {showMore?"Show less":"Show more"}
                        </CtaButton>
                    </div>
                </div>
            </div>
            <Support/>
            <Footer/>
        </React.Fragment>
    )
}
export default FAQ;