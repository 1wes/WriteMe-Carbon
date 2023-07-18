import React from "react";
import './breadcrumb.css';
import { Link, useLocation } from "react-router-dom";
import {IoIosArrowForward} from 'react-icons/io';

const FAQBreadcrumb=()=>{

    const location=useLocation();

    return(
        <React.Fragment>
            <div className="breadcrumbs">
                <Link to={`/`} className={location.pathname=='/'?"active-breadcrumb":"inactive-breadcrumb"}>
                    home
                </Link><span className="arrow-right"><i><IoIosArrowForward/></i></span>
                <Link to={``} className={location.pathname=='/faq'?"active-breadcrumb":"inactive-breadcrumb"}>
                    faq
                </Link>
            </div>
        </React.Fragment>
    )
}

const Breadcrumbs=()=>{

    const location=useLocation();

    return(
        <React.Fragment>
            <div className="breadcrumbs">
                <Link to={`/`} className={location.pathname=='/'?"active-breadcrumb":"inactive-breadcrumb"}>
                    home
                </Link><span className="arrow-right"><i><IoIosArrowForward/></i></span>
                <Link to={``} className={location.pathname=='/about'?"active-breadcrumb":"inactive-breadcrumb"}>
                    about us
                </Link>

            </div>
        </React.Fragment>
    )
}
export{
    FAQBreadcrumb
}
export default Breadcrumbs;