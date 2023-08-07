import React from "react";
import './home.css'
import { CtaButton } from "./services";
import { goToSection } from "../utils.js/section";

const Home=()=>{

    const goToContact=()=>{
        goToSection('contact-form-section');
    }

    return(
        <React.Fragment>
            <div className="section" id="home-section">
                <div className="home">
                    <p className="punchline">Are you <span>exhausted</span> with your academic workload? </p>
                    <p className="tagline">Well, worry no more. Our academic experts will help out. We deliver well-written, 
                        plagiarism and AI-free papers within the shortest time possible. Do not hesitate to reach out to us! </p>

                    <div className="prompt-button">
                        <CtaButton message={`Write Me a Paper`} onClick={goToContact}/>
                    </div>
                    <div className="prompt">
                        <div className="scroll-down">
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Home;