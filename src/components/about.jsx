import React, {useLayoutEffect} from "react";
import './about.css';
import Navbar from "./navbar";
import Footer from "./footer";
import Breadcrumbs from "./breadcrumb";
import { MobileNavbar } from "./navbar";
import SectionHeader from "./heading";

const About=()=>{

    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return(
        <React.Fragment>
            <Navbar/>
            <MobileNavbar/>
            <div className="section" id="about-section">
                <div className="about">
                    <Breadcrumbs/>
                    <SectionHeader heading={`Who We Are`} />

                    <div className='about-content'>
                        <div className='about-us'>
                            <div className="our-story">
                            WriteMe is an essay writing, research paper, term paper, dissertation, and thesis writing company with the 
                            friendliest prices in the market. We have been in operation for six years and have, over that period, mastered 
                            the art of writing, besides delivering thousands of papers for students that have trusted us with their services. 
                            Our experts are PH. D and masters holders from numerous reputable universities in America, Europe, and Canada, amongst other nations. 
                            </div>
                            <div className="analytics">
                                <span className="years">6+ <span>Years</span></span>
                                <span className="orders">4,800+ <span>Successful orders</span></span>
                            </div>
                        </div>


                        <div className="our-values">
                            <SectionHeader heading={`Our Core Values`} />
                            <div className="values"> 
                                <li>
                                    <span className="value-header">Problem-Solving</span>
                                    <div className="value-text">Our experts have been trained to achieve the impossible! We use critical thinking and all legal
                                        approaches to solve any problem, as difficult as it might be. 
                                     </div>
                                </li>
                                <li>
                                <span className="value-header">Efficiency</span>
                                    <div className="value-text">Academic writing requires high levels of efficiency. Our reliable experts will deliver high-quality 
                                        work within the deadline to ensure enhanced efficiency. This has been one of our top driving factors.  
                                     </div>
                                </li>
                                <li>
                                    <span className="value-header">Integrity</span>
                                    <div className="value-text">We practice the highest levels of integrity. Without this, we cannot serve our customers as per their
                                         expectations. 
                                     </div>
                                </li>
                                <li>
                                    <span className="value-header">Loyalty</span>
                                    <div className="value-text">We will have your back any time you need
                                         us!
                                     </div>
                                </li>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
export default About