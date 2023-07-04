import React from 'react';
import './services.css';
import SectionHeader from './heading';
import { GiFountainPen } from 'react-icons/gi';

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

                <CtaButton message={`Hire One of Our Writers`}/>
            </div>
        </React.Fragment>
    )
}

const CtaButton=({onClick, message})=>{

    return(
        <React.Fragment>
            <div className='button'>
                <button className='cta-btn' onClick={onClick}>
                    {message}
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