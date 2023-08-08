import React, { useLayoutEffect } from "react";
import './create-order.css';
import Navbar,{ MobileNavbar } from "./navbar";
import { OrderBreadcrumb } from "./breadcrumb";
import Footer from "./footer";
import { Link } from "react-router-dom";
import SectionHeader from "./heading";
import { CtaButton } from "./services";

const StepsBreadcrumb=()=>{

    return(
        <React.Fragment>
            <div className="steps-breadcrumb">
                <div className="step-info">Submit assignment</div>
                <div className="step-info"><Link className='breadcrumb-link' to={`#`}>Get a quote and pay</Link></div>
                <div className="step-info">Receive your work</div>
            </div>
        </React.Fragment>
    )
}

const FormLegend=()=>{

    return(
        <>
            <div className="legend"> <span>*</span> indicates required field</div>
        </>
    )
}

const SubmissionForm=()=>{

    const handleWheel=e=>{

        e.target.blur();

        e.stopPropagation();
    }

    const submitAssignment=(e=>{

        e.preventDefault();

        alert("pushed")
    })

    return(

        <React.Fragment>
            <form className="assignment-form" onSubmit={submitAssignment}>
            <SectionHeader heading={`Assignment Requirements`} />
                <div className="assignment-details">
                <div className="input-group">
                    <label className="required">
                        Subject
                    </label>
                    <div>
                        <select name="subject" defaultValue={``} required>
                            <option disabled value={``} hidden></option>
                            <option value="Engineering">Engineering</option>
                            <option value="Engineering">Programming</option>
                            <option value="Engineering">History</option>
                            <option value="Engineering">Main</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">
                        Grade Level
                    </label>
                    <div>
                        <select name="grade-level" defaultValue={``} required>
                            <option disabled value={``} hidden></option>
                            <option value="K12" >K12</option>
                            <option value="Undergraduate" >Undergraduate</option>
                            <option value="Postgraduate" >Postgraduate</option>
                            <option value="Doctorate" >Doctorate</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <label>
                        Attach file
                    </label>
                    <div>
                        <input  type="file" placeholder="add file" ></input>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">
                        Instructions
                    </label>
                    <div>
                        <textarea required></textarea>
                    </div>
                </div>
                <div className="input-group">
                    <label className="required">
                        Number of Pages/Words
                    </label>
                    <div>
                        <input type="number" onWheel={handleWheel}></input>
                    </div>
                </div>

                <div className="input-group">
                    <label className="required">
                        Expected Amount (USD)
                    </label>
                    <div>
                        <input type="number" onWheel={handleWheel}></input>
                    </div>
                </div>

                <div className="input-group">
                    <label className="required">
                        Deadline
                    </label>
                    <div>
                        <input type="date"></input>
                    </div>
                </div>
                </div>
                <SectionHeader heading={`Personal Information`} />
                <div className="personal-info">
                    <div className="input-group">
                        <label className="required">
                            Name
                        </label>
                        <div>
                            <input type="text" required></input>
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="required">
                            Email
                        </label>
                        <div>
                            <input type="email" required></input>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>
                            Phone Number
                        </label>
                        <div>
                            <input type="tel"></input>
                        </div>
                    </div>
                </div>
                <FormLegend/>
                <CtaButton type={`submit`} message={`Submit Assignment`} />
            </form>
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
                    <SubmissionForm/>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
}
export{
    FormLegend
}
export default CreateOrder;