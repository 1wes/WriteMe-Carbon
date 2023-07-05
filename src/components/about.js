import React from "react";
import './about.css';
import Navbar from "./navbar";
import Footer from "./footer";
import Breadcrumbs from "./breadcrumb";

const About=()=>{

    return(
        <React.Fragment>
            <Navbar/>
            <div className="section" id="about-section">
                <div className="about">
                    <Breadcrumbs/>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
export default About