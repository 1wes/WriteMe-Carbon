import React from "react";
import './navbar.css';
import { Link } from "react-router-dom";
import { goToSection } from "../utils.js/section";
import {CgMenuRight, CgClose} from 'react-icons/cg';

const Logo=()=>{

    return(
        <React.Fragment>
            <Link to={`/`} className="logo-image">
                <img src={require('../pen.png')} alt="logo" /> <p><span>W</span>rite<span>M</span>e</p>
            </Link>
        </React.Fragment>
    )
}

let MobileNavbar=()=>{

    const showMenu=()=>{

        let menu=document.getElementById('dropdown');

        menu.classList.add('show-menu')
    }

    const closeMenu=()=>{
        let menu=document.getElementById('dropdown');

        menu.classList.remove('show-menu')
    }

    return(
        <React.Fragment>
            <nav className="section" id="mobile-navbar-section">
                <div className="mobile-nav">
                    <div className="logo">
                        <Logo/>
                    </div>
                    <div className="mobile-nav-menu">
                        <span className="hamburger-menu" onClick={showMenu} ><i><CgMenuRight/></i></span>
                    </div>
                    <div className="menu" id="dropdown">
                        <div className="dropdown-content">
                            <span className="close-btn" onClick={closeMenu}><i><CgClose/></i></span>
                            <div className="menu-items">
                                <div>
                                    <Link className="link" to={`/about`}>
                                        <li>
                                            About us
                                        </li>
                                    </Link>
                                    <li>Why us</li>
                                    <li>Disciplines</li>
                                    <li>Contact us</li>
                                    <li>Blog</li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
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
    Logo,
    MobileNavbar
}
export default Navbar;