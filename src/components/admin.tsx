import React, { Fragment, useEffect, useState } from "react";

import "./admin.css";
import {
  DashSectionHeaders,
  Metrics,
  OrdersTable,
  Search,
  GenericCtaButton,
} from "./dashboard";
import DashboardNavbar from "./dash-nav";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import { BsFileEarmarkBarGraph, BsFileEarmarkCheck } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import PageNumbers from "./paginate";

import useSWR from "swr";

const fetcher: any = (url: string) =>
  axios.get(url).then((res: any) => res.data);

const Admin: React.FunctionComponent = () => {
  const [totalOrders, settotalOrders] = useState(0);
  const [activeOrders, setActiveOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [filterMessage, setFilterMessage] = useState("");

  const { data } = useSWR(`/api/orders/admin`, fetcher);

  useEffect(() => {
    if (data) {
      let {
        totalOrders,
        allActiveOrders,
        allCancelledOrders,
        allCompletedOrders,
        allOrders,
      } = data;

      settotalOrders(totalOrders);
      setActiveOrders(allActiveOrders);
      setCompletedOrders(allCompletedOrders);
      setCancelledOrders(allCancelledOrders);
      setAllOrders(allOrders);

      const lastOrderIndex = currentPage * ordersPerPage;

      const firstOrderIndex = lastOrderIndex - ordersPerPage;

      const currentOrders = allOrders.slice(firstOrderIndex, lastOrderIndex);

      setAllOrders(currentOrders);
    }
  }, [data, currentPage, ordersPerPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusQuery(e.target.value);

    if (data && data.allOrders.length !== 0) {
      const filterStatus = (status: string) => {
        return data.allOrders.filter((orders: any) => {
          return orders.status === status;
        });
      };

      const foundOrders = filterStatus(e.target.value);

      if (foundOrders.length > 0) {
        setFilterMessage("");

        setAllOrders(foundOrders);
      } else {
        setAllOrders([]);
        setFilterMessage("No orders found for this filter");
      }

      if (e.target.value === "All") {
        setFilterMessage("");

        setAllOrders(data.allOrders);
      }
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortQuery(e.target.value);

    let ascendingOrder;
    let descendingOrder;

    switch (e.target.value) {
      case "Ascending":
        ascendingOrder = allOrders.sort((a: any, b: any) => {
          return (
            new Date(a.date_deadline).getTime() -
            new Date(b.date_deadline).getTime()
          );
        });

        setAllOrders(ascendingOrder);

        break;

      case "Descending":
        descendingOrder = allOrders.sort((a: any, b: any) => {
          return (
            new Date(b.date_deadline).getTime() -
            new Date(a.date_deadline).getTime()
          );
        });

        setAllOrders(descendingOrder);

        break;

      default:
    }
  };

  const clearFilters = () => {
    setFilterMessage("");
    setStatusQuery("");
    setSortQuery("");
    setAllOrders(data.allOrders);
  };

  let lastIndex = currentPage * ordersPerPage;
  let firstIndex = lastIndex - ordersPerPage;

  const tableRows = (
    <Fragment>
      {allOrders.length !== 0
        ? allOrders
            .filter((orders: any) => {
              if (searchQuery === "") {
                return allOrders;
              } else {
                return orders.topic
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              }
            })
            .map((order: { [key: string]: string }) => {
              return (
                <tr key={order.id}>
                  <td> {`Order-${order.order_id}`} </td>
                  <td> {order.topic} </td>
                  <td> {order.status} </td>
                  <td> {order.date_deadline.split("T")[0]} </td>
                  <td>
                    <Link
                      to={`/admin/Order-${order.order_id}`}
                      className="link"
                    >
                      <GenericCtaButton
                        id={`order-link`}
                        message={`View Order`}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })
        : ""}
    </Fragment>
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pages =
    allOrders.length === 0 ? (
      ""
    ) : (
      <Fragment>
        <PageNumbers
          paginate={paginate}
          ordersPerPage={ordersPerPage}
          totalOrders={data.allOrders.length}
        />
        <span className="pagination-legend">
          Showing {firstIndex + 1}-{firstIndex + allOrders.length} of{" "}
          {data.allOrders.length} orders
        </span>
      </Fragment>
    );

  const noOrders =
    allOrders.length === 0 ? (
      filterMessage === "" ? (
        <span className="no-orders">
          <p>
            No Assignments have been submitted yet. Once they are, they will
            appear here.
          </p>
        </span>
      ) : (
        <span className="no-orders">{filterMessage}</span>
      )
    ) : (
      ""
    );

  return (
    <Fragment>
      <section className="section" id="admin-dashboard">
        <DashboardNavbar />
        <div className="dashboard" id="admin-dashboard">
          <section className="overview">
            <DashSectionHeaders heading={`Overview`} />
            <div className="overview-metrics">
              <Metrics
                title={`All Orders`}
                icon={<BsFileEarmarkBarGraph />}
                number={totalOrders}
              />
              <Metrics
                title={`Completed Orders`}
                icon={<BsFileEarmarkCheck />}
                number={completedOrders}
              />
              <Metrics
                title={`Active Orders`}
                icon={<GiSandsOfTime />}
                number={activeOrders}
              />
              <Metrics
                title={`Cancelled Orders`}
                icon={<ImCancelCircle />}
                number={cancelledOrders}
              />
            </div>
          </section>
          <section className="all-orders">
            <DashSectionHeaders heading={`All Orders`} />
            <div className="orders-wrapper">
              <Search
                searchValue={searchQuery}
                onSearchChange={handleSearch}
                statusValue={statusQuery}
                onStatusChange={handleStatus}
                sortValue={sortQuery}
                onSortChange={handleSort}
                onClearClick={clearFilters}
              />
              <OrdersTable>{tableRows}</OrdersTable>
              {pages}
              {noOrders}
            </div>
          </section>
        </div>
      </section>
    </Fragment>
  );
};
export default Admin;
