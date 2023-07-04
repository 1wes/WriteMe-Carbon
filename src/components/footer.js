import React from 'react';
import './footer.css';
import { Logo } from './navbar';
import {BsTwitter, BsLinkedin} from 'react-icons/bs';
import {FaInstagramSquare, FaFacebook} from 'react-icons/fa';
import {AiOutlineCopyright} from 'react-icons/ai';

const Footer=()=>{

    return(
        <React.Fragment>
            <div className='section' id='footer-section'>
                <div className='footer'>
                    <div className='footer-content'>
                        <div className='footer-items'>
                            <div className='footer-logo'><Logo/></div>
                            <div className='socials'>
                                <li><i><BsTwitter/></i></li>
                                <li><i><FaInstagramSquare/></i></li>
                                <li><i><FaFacebook/></i></li>
                                <li><i><BsLinkedin/></i></li>
                            </div>
                        </div>
                        <div className='footer-items'>
                            <div className='support'>
                                <h4>Support</h4>
                                <li>FAQ</li>
                                <li>Contact Us</li>
                            </div>
                        </div>
                        <div className='footer-items'>
                            <div className='popular-services'> 
                                <h4>Popular Services</h4>
                                <li>Research Paper Writing</li>
                                <li>College Essays Writing</li>
                                <li>Thesis & Dissertation Wrting</li>
                                <li>Term Paper Writing</li>
                                <li>Literature Review</li>
                            </div>
                        </div>
                    </div>
                    <div className='copyright'>
                        <div> <span><i><AiOutlineCopyright/></i></span><span className='year'>{new Date().getFullYear()}</span></div> WriteMe.com | All Rights Reserved.
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Footer;