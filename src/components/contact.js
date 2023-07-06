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
                                <Testimonial name={`John Doe`} occupation={`Research Assistant`} src={require('../testi.jpeg')} testimony={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices 
                                    ullamcorper fringilla. Integer auctor massa id dolor ultricies efficitur. massa id dolor ultricies efficitur. Proin eu felis metus. Aenean vestibulum.`}/>
                                <Testimonial name={`Jane Doe`} occupation={`Banker & Student`} src={require('../testi2.jpeg')} testimony={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices 
                                    ullamcorper fringilla. Integer auctor massa id dolor ultricies efficitur. massa id dolor ultricies efficitur. Proin eu felis metus. Aenean vestibulum.`}/>
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