import React from "react";
import './about.css';
import Navbar from "./navbar";
import Footer from "./footer";
import Breadcrumbs from "./breadcrumb";
import { MobileNavbar } from "./navbar";

const About=()=>{

    return(
        <React.Fragment>
            <Navbar/>
            <MobileNavbar/>
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