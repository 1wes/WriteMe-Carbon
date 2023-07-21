import React from 'react';
import './services.css';
import SectionHeader from './heading';
import { GiFountainPen } from 'react-icons/gi';
import { goToSection } from '../utils.js/section';

const ServicesList=({service})=>{

    return(
        <React.Fragment>
            <div className='our-services'>
                <li><span><i><GiFountainPen/></i></span> <span className='service-name'>{service}</span></li>
            </div>
        </React.Fragment>
    )
}

const ServicesCard=()=>{

    const goToContact=()=>{
        goToSection('contact-form-section');
    }

    return(
        <React.Fragment>
            <div className='services-card'>
                <SectionHeader heading={`Our Services`} tagline={`These are some of the services our knowledgeable writers can help you with. `}/>

                <div className='services-list'>
                    <ServicesList service={`Research Paper`}/>
                    <ServicesList service={`Dissertation`}/>
                    <ServicesList service={`Case Study`}/>
                    <ServicesList service={`Research Proposal`}/>
                    <ServicesList service={`Book & Movie Review`}/>
                    <ServicesList service={`Literature Review`}/>
                    <ServicesList service={`Thesis`}/>
                    <ServicesList service={`Critical Thinking & Review`}/>
                    <ServicesList service={`Reflective Writing`}/>
                    <ServicesList service={`Report`}/>
                    <ServicesList service={`Article Review`}/>
                    <ServicesList service={`Creative Writing`}/>
                    <ServicesList service={`Proof Reading & Grammar Check`}/>
                    <ServicesList service={`Admissions Essay`}/>
                    <ServicesList service={`Presentations`}/>
                    <ServicesList service={`Term Paper`}/>
                    <ServicesList service={`Annotated Bibliography`}/>
                    <ServicesList service={`Business Plan`}/>
                </div>

                <CtaButton message={`Hire One of Our Writers`} onClick={goToContact}/>
            </div>
        </React.Fragment>
    )
}

const CtaButton=({onClick, message, id, type, children})=>{

    return(
        <React.Fragment>
            <div className='button'>
                <button type={type}  id={id} className='cta-btn' onClick={onClick}>
                    {message}
                    {children}
                </button>
            </div>
        </React.Fragment>
    )
}

const Services=()=>{

    return(
        <React.Fragment>
            <div className='section' id='services-section'>
                <div className='services'>
                    <ServicesCard/>
                </div>
            </div>
        </React.Fragment>
    )
}
export{
    CtaButton
}
export default Services;