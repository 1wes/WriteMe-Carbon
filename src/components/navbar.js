import React from "react";
import './navbar.css';
import { Link } from "react-router-dom";

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

    return(
        <React.Fragment>
            <nav className="section" id="navbar-section">
                <div className="desktop-nav">
                    <div className="logo">
                        <Logo/>
                    </div>
                    <ul className="nav-menu"> 
                        <li>About us</li>
                        <li>Why us</li>
                        <li>Disciplines</li>
                        <li>Contact us</li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
}
export default Navbar;