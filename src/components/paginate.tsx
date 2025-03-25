import React, { Fragment, FunctionComponent, useState } from "react";
import "./paginate.css";

const PageNumbers: FunctionComponent<{
  paginate: (pageNumber: number) => void;
  ordersPerPage: number;
  totalOrders: number;
}> = ({ paginate, ordersPerPage, totalOrders }) => {
  const [index, setIndex] = useState<number>(1);

  const pageNumber = [];

  for (
    let number = 1;
    number <= Math.ceil(totalOrders / ordersPerPage);
    number++
  ) {
    pageNumber.push(number);
  }

  const changeClass = (id: any) => {
    setIndex(id);
  };

  const displayedNumber = pageNumber.map((number) => {
    return (
      <li
        key={number}
        className={index === number ? "active-page" : undefined}
        onClick={() => {
          changeClass(number);

          paginate(number);
        }}
      >
        {number}
      </li>
    );
  });

  return (
    <Fragment>
      <section className="page-numbers">
        <ul className="page-number-list">{displayedNumber}</ul>
      </section>
    </Fragment>
  );
};
export default PageNumbers;
