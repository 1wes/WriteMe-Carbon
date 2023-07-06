import React, { useState } from 'react';
import './contact.css';
import SectionHeader from './heading';
import {FaQuoteLeft, FaQuoteRight} from 'react-icons/fa';
import { CtaButton } from './services';

const Testimonial=({name, occupation, testimony, src})=>{

    return(
        <React.Fragment>
            <div className='testimonial'>
                <div className='t-image'>
                    <img src={src} alt='client' />
                </div>
                <div className='id'>
                    <span className='name'>{name} </span><span> - </span><span className='occupation'>{occupation}.</span>
                </div>
                <div className='quote'>
                    <div>
                        <i><FaQuoteLeft/></i>
                    </div>
                    <div className='quote-text'>
                        {testimony}
                    </div> 
                    <div>
                        <i><FaQuoteRight/></i>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const Contact=()=>{

    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [subject, setSubject]=useState('');
    const [message, setMessage]=useState('');

    const handleNameChange=(e=>{

        if(e.target.value!==''){
            setName(e.target.value);
        }
    })

    const handleEmailChange=(e=>{

        if(e.target.value!==''){
            setEmail(e.target.value);
        }
    })

    const handleSubjectChange=(e=>{

        if(e.target.value!==''){
            setSubject(e.target.value);
        }
    })

    const handleMessageChange=(e=>{

        if(e.target.value!==''){
            setMessage(e.target.value);
        }
    })

    const submitForm=(e=>{

        e.preventDefault();

        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
    })

    return(
        <React.Fragment>
            <div className='section' id='contact-section'>
                <div className='contact'>
                    <SectionHeader heading={`Work With Us`} tagline={`Fill in the submission form below to get a Quote on your work and connect directly with our writers.`}/>

                    <div className='contact-content'>
                        <div className='testimonials'>
                            <SectionHeader tagline={`Hear from some of our clients.`}/>
                            <div className='testimonials-card'>
                                <Testimonial name={`John P.`} occupation={`Research Assistant`} src={require('../testi.jpeg')} testimony={`It has been a pleasure working with the company's writer and I can confidently say that 
                                his writing skills are exceptional. His versatile style of writing and adaptability to different writing formats has enabled him to consistently produce top notch content that captivates the mind.`}/>
                                <Testimonial name={`Marylin S.`} occupation={`Banker & Student`} src={require('../testi2.jpeg')} testimony={`Working with the writer has been a great delight as all my writing needs have always been 
                                fulfilled with superior craftsmanship. The writer has a great mastery in different writing formats thus delivering exactly what is required by guidelines and rubric. Additionally, he is also very creative.`}/>
                            </div>
                        </div>
                        <div className='contact-form'>
                            <SectionHeader tagline={`Get in touch with us.`}/>

                            <div className='form-section'>
                                <form onSubmit={submitForm}> 
                                    <label>
                                        Name
                                    </label>
                                    <div>
                                        <input type='text' placeholder='Enter Your Name.' value={name} onChange={handleNameChange} required></input>
                                    </div>

                                    <label>
                                        Email
                                    </label>
                                    <div>
                                        <input type='email' placeholder='Enter Your Email.' value={email} onChange={handleEmailChange} required></input>
                                    </div>

                                    <label>
                                        Subject
                                    </label>
                                    <div>
                                        <input type='text' placeholder='Enter Your Subject.' value={subject} onChange={handleSubjectChange} required></input>
                                    </div>
                                    <label>
                                        Message
                                    </label>
                                    <div>
                                        <textarea type='text' placeholder='Enter Your Message.' value={message} onChange={handleMessageChange} required></textarea>
                                    </div>

                                    <CtaButton type={`submit`} message={`Submit`}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </React.Fragment>
    )
}
export default Contact