import React from "react";
import './heading.css';

const SectionHeader=({heading, tagline})=>{

    return(
        <React.Fragment>
            <div className="header">
                <h2 className="heading">{heading}</h2>
                <p>{tagline}</p>
            </div>
        </React.Fragment>
    )
}
export default SectionHeader;