import React from "react";
import "./breadcrumb.css";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const FAQBreadcrumb: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <div className="breadcrumbs">
        <Link
          to={`/`}
          className={
            location.pathname === "/"
              ? "active-breadcrumb"
              : "inactive-breadcrumb"
          }
        >
          home
        </Link>
        <span className="arrow-right">
          <i>
            <IoIosArrowForward />
          </i>
        </span>
        <Link
          to={``}
          className={
            location.pathname === "/faq"
              ? "active-breadcrumb"
              : "inactive-breadcrumb"
          }
        >
          faq
        </Link>
      </div>
    </React.Fragment>
  );
};

const BlogBreadcrumb: React.FunctionComponent<{ title: string }> = ({
  title,
}) => {
  const location = useLocation();

  const id = location.pathname.split("/");

  return (
    <React.Fragment>
      <div className="breadcrumbs">
        <Link
          to={`/`}
          className={
            location.pathname === "/"
              ? "active-breadcrumb"
              : "inactive-breadcrumb"
          }
        >
          home
        </Link>
        <span className="arrow-right">
          <i>
            <IoIosArrowForward />
          </i>
        </span>
        <Link
          to={`/`}
          className={
            location.pathname === "/"
              ? "active-breadcrumb"
              : "inactive-breadcrumb"
          }
        >
          blog
        </Link>
        <span className="arrow-right">
          <i>
            <IoIosArrowForward />
          </i>
        </span>
        <Link
          to={``}
          className={
            location.pathname === `/blog/${id[2]}`
              ? "active-breadcrumb"
              : "inactive-breadcrumb"
          }
        >
          {title}
        </Link>
      </div>
    </React.Fragment>
  );
};

const OrderBreadcrumb: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <div className="breadcrumbs">
        <Link
          to={`/`}
          className={
            location.pathname === "/"
              ? "active-breadcrumb"
              : "inactive-breadcrumb"
          }
        >
          home
        </Link>
        <span className="arrow-right">
          <i>
            <IoIosArrowForward />
          </i>
        </span>
        <Link
          to={``}
          className={
            location.pathname === "/submit-assignment"
              ? "active-breadcrumb"
              : "inactive-breadcrumb"
          }
        >
          submit assignment
        </Link>
      </div>
    </React.Fragment>
  );
};

const Breadcrumbs: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <div className="breadcrumbs">
        <Link
          to={`/`}
          className={
            location.pathname === "/"
              ? "active-breadcrumb"
              : "inactive-breadcrumb"
          }
        >
          home
        </Link>
        <span className="arrow-right">
          <i>
            <IoIosArrowForward />
          </i>
        </span>
        <Link
          to={``}
          className={
            location.pathname === "/about"
              ? "active-breadcrumb"
              : "inactive-breadcrumb"
          }
        >
          about us
        </Link>
      </div>
    </React.Fragment>
  );
};
export { FAQBreadcrumb, BlogBreadcrumb, OrderBreadcrumb };
export default Breadcrumbs;
