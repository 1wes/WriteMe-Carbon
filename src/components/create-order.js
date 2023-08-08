import React, { useLayoutEffect } from "react";
import './create-order.css';
import Navbar,{ MobileNavbar } from "./navbar";
import { OrderBreadcrumb } from "./breadcrumb";
import Footer from "./footer";
import { Link } from "react-router-dom";

const StepsBreadcrumb=()=>{

    return(
        <React.Fragment>
            <div className="steps-breadcrumb">
                <div className="step-info">Submit assignment alongside accurate details</div>
                <div className="step-info"><Link className='breadcrumb-link' to={`#`}>Get a quote and pay</Link></div>
                <div className="step-info">Receive completed work </div>
            </div>
        </React.Fragment>
    )
}

const CreateOrder=()=>{

    useLayoutEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return(

        <React.Fragment>
            <Navbar/>
            <MobileNavbar/>
            <section className="section" id="create-order-section">
                <div className="create-order">
                    <OrderBreadcrumb/>
                    <StepsBreadcrumb/>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
}
export default CreateOrder;