import React, { FunctionComponent } from "react";
import "./loader.css";
import { CiCamera } from "react-icons/ci";
import placeholder from "../assets/placeholder.png";

const PlaceHolderAnimation: FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="p-wrapper">
        <div className="p-content"></div>
      </div>
    </React.Fragment>
  );
};

const PlaceHolderHeader: FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="bloglist-header" id="placeholder-header">
        <PlaceHolderAnimation />
      </div>
    </React.Fragment>
  );
};

const Paragraph: FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="paragraph">
        <PlaceHolderAnimation />
      </div>
    </React.Fragment>
  );
};

const NewContentPlaceHolder: FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="new-content-card" id="placeholder-card">
        <div className="blog-content-card">
          <div className="blog-image">
            <img src={placeholder} alt="placeholder" />
          </div>
          <div className="blog-details">
            <PlaceHolderHeader />
            <div className="bloglist-details" id="placeholder-paragraph">
              <Paragraph />
              <Paragraph />
              <Paragraph />
              <Paragraph />
              <Paragraph />
              <Paragraph />
              <Paragraph />
            </div>
            <div className="read-more" id="placeholder-link">
              <PlaceHolderAnimation />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const OlderContentPlaceHolder: FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="old-content-card">
        <div className="hr-blog-content-card" id="placeholder-hr-card">
          <div className="blog-image" id="hr-blog-image">
            <img src={placeholder} alt="placeholder" />
          </div>
          <div className="hr-blog-details">
            <h3 className="hr-bloglist-header">
              <PlaceHolderHeader />
            </h3>

            <div className="hr-bloglist-details" id="hr-details-holder">
              <Paragraph />
              <Paragraph />
              <Paragraph />
              <Paragraph />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const NewContentLoader: FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="newer-content-loader">
        <NewContentPlaceHolder />
        <NewContentPlaceHolder />
      </div>
    </React.Fragment>
  );
};

const OldContentLoader: FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="older-content-loader">
        <OlderContentPlaceHolder />
        <OlderContentPlaceHolder />
        <OlderContentPlaceHolder />
      </div>
    </React.Fragment>
  );
};

const BlogPostLoader: FunctionComponent = () => {
  return (
    <React.Fragment>
      <section className="blog-layout">
        <h1 className="blog-title">
          <PlaceHolderHeader />
          <PlaceHolderHeader />
        </h1>

        <h3 className="blog-tagline">
          <Paragraph />
        </h3>
        <div className="blog-metadata" id="metadata-placeholder">
          <div className="metadata">
            <Paragraph />
          </div>
          <div className="metadata">
            <Paragraph />
          </div>
          <div className="metadata">
            <Paragraph />
          </div>
        </div>
        <div className="blog-cover">
          <img src={placeholder} alt={`placeholder`} />
        </div>
        <p className="image-credit">
          <i>
            <CiCamera />
          </i>
          <span> Image credits </span>: via ButterCMS
        </p>
        <article className="blog-article" id="article-placeholder">
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <br />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <br />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
          <Paragraph />
        </article>
        <div className="placeholder-tags">
          <div className="p-tags">
            <PlaceHolderHeader />
          </div>
          <div className="p-tags">
            <PlaceHolderHeader />
          </div>
          <div className="p-tags">
            <PlaceHolderHeader />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export { NewContentLoader, BlogPostLoader };
export default OldContentLoader;
