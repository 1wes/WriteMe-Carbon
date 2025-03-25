import React, { FunctionComponent } from "react";
import "./heading.css";

const SectionHeader: FunctionComponent<{
  heading: string;
  tagline?: string;
  id?: string;
}> = ({ heading, tagline, id }) => {
  return (
    <React.Fragment>
      <div className="header">
        <h2 className="heading" id={id}>
          {heading}
        </h2>
        <p>{tagline}</p>
      </div>
    </React.Fragment>
  );
};
export default SectionHeader;
