import React from "react";
import './navbar.css';
import { Link } from "react-router-dom";
import { goToSection } from "../utils/section";
import {CgMenuRight, CgClose} from 'react-icons/cg';
import { BsPerson } from 'react-icons/bs';
import { IoLogInOutline} from 'react-icons/io5';
import { HashLink as Jumplink } from "react-router-hash-link";

const SignButton=()=>{

    return(

        <React.Fragment>
            <Link to={`/register`} id='submit-cta' target="blank">
                <button className="navbar-button">
                    Sign Up
                </button>
            </Link>
        </React.Fragment>
    )
}

const LogInButton=()=>{

    return(

        <React.Fragment>
            <Link to={`/login`} target="blank">
                <button className="navbar-button" id="login-cta">
                    Log in
                </button>
            </Link>
        </React.Fragment>
    )
}

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

        menu.classList.add('show-menu');
    }

    const closeMenu=()=>{
        let menu=document.getElementById('dropdown');

        menu.classList.remove('show-menu');
    }

    const goToBenefits=()=>{

        let menu=document.getElementById('dropdown');

        menu.classList.remove('show-menu')

        goToSection('benefits-section');
    }

    const goToDisciplines=()=>{

        let menu=document.getElementById('dropdown');

        menu.classList.remove('show-menu');

        goToSection('discplines-section');
    }

    const gotToContact=()=>{

        let menu=document.getElementById('dropdown');

        menu.classList.remove('show-menu');

        goToSection('contact-form-section');
    }

    const goToBloglist=()=>{

        let menu=document.getElementById('dropdown');

        menu.classList.remove('show-menu');

        goToSection('bloglist-section')
    }


    return(
        <React.Fragment>
            <nav className="section" id="mobile-navbar-section">
                <div className="mobile-nav">
                    <div className="logo">
                        <Logo/>
                    </div>
                    <div className="nav-cta">
                        <Link className="nav-cta-link" to={`/register`} target="blank" >
                            <span><i><BsPerson/></i></span>Signup
                        </Link>
                        <Link className="nav-cta-link" to={`/login`} target="blank">
                            <span><i><IoLogInOutline/></i></span>Login
                        </Link>
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
                                        <li onClick={closeMenu}>
                                            About us
                                        </li>
                                    </Link>
                                    <li onClick={goToBenefits}>Why us</li>
                                    <li onClick={goToDisciplines}>Disciplines</li>
                                    <li onClick={gotToContact}>Contact us</li>
                                    <li onClick={goToBloglist}>
                                        Blog
                                    </li>
                                    <Link className="link" to={`/faq`}>
                                        <li onClick={closeMenu}>
                                            FAQ
                                        </li>
                                    </Link>
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
                        <Jumplink className="link" to={'/#benefits-section'}>
                            <li>Why us</li>
                        </Jumplink>
                        <Jumplink className="link" to={`/#discplines-section`}>
                            <li>Disciplines</li>
                        </Jumplink>
                        <Jumplink className="link" to={`/#contact-section`}>
                            <li>Contact us</li>
                        </Jumplink>
                        <Jumplink className="link" to={`/#bloglist-section`}>
                            <li>Blog</li>
                        </Jumplink>
                        <Link className="link" to={`/faq`}>
                            <li>FAQ</li>
                        </Link>
                        <li>
                            <LogInButton/>
                        </li>
                        <li>
                            <SignButton/>
                        </li>
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