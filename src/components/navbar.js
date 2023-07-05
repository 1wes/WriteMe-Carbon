import React from "react";
import './navbar.css';
import { Link } from "react-router-dom";
import { goToSection } from "../utils.js/section";

const Logo=()=>{

    return(
        <React.Fragment>
            <Link to={`/`} className="logo-image">
                <img src={require('../pen.png')} alt="logo" /> <p><span>W</span>rite<span>M</span>e</p>
            </Link>
        </React.Fragment>
    )
}

const Navbar=()=>{

    const goToBenefits=()=>{

        goToSection('benefits-section');
    }

    const goToDisciplines=()=>{

        goToSection('discplines-section');
    }

    const gotToContact=()=>{

        goToSection('contact-section');
    }

    return(
        <React.Fragment>
            <nav className="section" id="navbar-section">
                <div className="desktop-nav">
                    <div className="logo">
                        <Logo/>
                    </div>
                    <ul className="nav-menu"> 
                        <Link className="link" to={`/about`}>
                            <li>About us</li>
                        </Link>
                        <li onClick={goToBenefits}>Why us</li>
                        <li onClick={goToDisciplines}>Disciplines</li>
                        <li onClick={gotToContact}>Contact us</li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
}
export{
    Logo
}
export default Navbar;