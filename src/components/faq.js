import React, {useState} from "react";
import './faq.css';
import Navbar from "./navbar";
import { MobileNavbar } from "./navbar";
import { FAQBreadcrumb } from "./breadcrumb";
import SectionHeader from "./heading";
import Footer from "./footer";

const FAQ=()=>{

    const [searchQuery, setSearchQuery]=useState('');

    const handleSubmit=(e)=>{

        e.preventDefault();

        setSearchQuery('');
    }

    const handleChange=(e=>{

        if(e.target.value!==''){
            setSearchQuery(e.target.value);
        }
    })

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
                            <input type="text" placeholder="Search commonly asked questions.." value={searchQuery} onChange={handleChange} ></input>
                            <button className="search-bar-submit" type="submit">Search</button>
                        </div>
                    </form>
                </div>
                <div className="faq">
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
export default FAQ;