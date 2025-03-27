import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
  MouseEventHandler,
  ReactNode,
  FunctionComponent,
  ChangeEventHandler,
  ChangeEvent,
  FormEvent,
} from "react";

import "./dashboard.css";

import useSWR from "swr";

import axios from "../utils/axios";
import SectionHeader from "./heading";
import MandatoryFields, {
  Error,
  Files,
  Deadline,
  Payment,
} from "./create-order";
import { Select } from "./create-order";
import Modal, { ModalForm, SuccessIcon, WarningIcon } from "./modal";
import { revisionGracePeriod } from "../utils/dates";
import DashboardNavbar from "./dash-nav";
import PageNumbers from "./paginate";
import FormStepper from "./stepper";
import { categorizeDeadline } from "../utils/dates";
import { useModalContext } from "../context/modal";
import calculateTotalOrderCost from "../utils/cost-calculator";

import { BsFileEarmarkBarGraph, BsFileEarmarkCheck } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { FiPlus, FiMinus } from "react-icons/fi";
import { BiCloudUpload } from "react-icons/bi";
import { LuFilterX } from "react-icons/lu";

const fetcher = (url: string) => axios.get(url).then((res: any) => res.data);

const initialState = {
  service: "",
  subject: "",
  gradeLevel: "",
  style: "",
  language: "",
  sources: "",
  files: [],
  instructions: "",
  topic: "",
  pagesOrwords: "",
  deadline: "",
  time: "",
  deadlineCategory: "",
  paymentOption: "",
  totalCost: 0,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "newService": {
      return {
        ...state,
        service: action.newService,
      };
    }

    case "newSubject": {
      return {
        ...state,
        subject: action.newSubject,
      };
    }

    case "newGradeLevel": {
      return {
        ...state,
        gradeLevel: action.newGrade,
      };
    }

    case "newStyle": {
      return {
        ...state,
        style: action.newStyle,
      };
    }

    case "newLanguage": {
      return {
        ...state,
        language: action.newLanguage,
      };
    }

    case "newSources": {
      return {
        ...state,
        sources: action.newSources,
      };
    }

    case "newFiles": {
      return {
        ...state,
        files: action.newFiles,
      };
    }

    case "newInstructions": {
      return {
        ...state,
        instructions: action.newInstructions,
      };
    }

    case "newTopic": {
      return {
        ...state,
        topic: action.newTopic,
      };
    }

    case "newPagesOrWords": {
      return {
        ...state,
        pagesOrwords: action.newPages,
      };
    }

    case "newDeadline": {
      return {
        ...state,
        deadline: action.newDeadline,
      };
    }

    case "newTime": {
      return {
        ...state,
        time: action.newTime,
      };
    }

    case "newDeadlineCategory": {
      return {
        ...state,
        deadlineCategory: action.newDeadlineCategory,
      };
    }

    case "newPaymentOption": {
      return {
        ...state,
        paymentOption: action.newPaymentOption,
      };
    }

    case "newCost": {
      return {
        ...state,
        totalCost: action.newCost,
      };
    }

    case "clearForm":
      return {
        ...initialState,
      };

    default:
  }
};

const DashSectionHeaders: React.FunctionComponent<{ heading: string }> = ({
  heading,
}) => {
  return (
    <Fragment>
      <div className="overview-header">
        <SectionHeader id={`dash-header`} heading={heading} />
      </div>
    </Fragment>
  );
};

const Metrics: React.FunctionComponent<{
  title: string;
  icon: React.ReactNode;
  number: any;
}> = ({ title, icon, number }) => {
  return (
    <Fragment>
      <div className="metric-details">
        <span className="metric-title">{title}</span>
        <span className="metric-icon">
          <i>{icon}</i>
        </span>
        <span className="metric-number">{number}</span>
      </div>
    </Fragment>
  );
};

const NewOrderButton: React.FunctionComponent<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  formStatus: any;
}> = ({ onClick, formStatus }) => {
  return (
    <Fragment>
      <button type="button" className="add-button" onClick={onClick}>
        <span className="button-icon">
          <i>{formStatus ? <FiMinus /> : <FiPlus />}</i>
        </span>
      </button>
    </Fragment>
  );
};

const OrdersTable: React.FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Fragment>
      <div className="table">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

const GenericCtaButton: React.FunctionComponent<{
  id: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
  message: string;
}> = ({ id, onClick, message }) => {
  return (
    <button className="generic-cta-btn" type="button" id={id} onClick={onClick}>
      {message}
    </button>
  );
};

const Search: FunctionComponent<{
  searchValue: any;
  onSearchChange: ChangeEventHandler;
  statusValue: any;
  onStatusChange: ChangeEventHandler;
  sortValue: any;
  onSortChange: ChangeEventHandler;
  onClearClick: MouseEventHandler<HTMLButtonElement>;
}> = ({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
  sortValue,
  onSortChange,
  onClearClick,
}) => {
  return (
    <Fragment>
      <div className="search-section">
        <form className="search-form">
          <div className="input-group">
            <input
              type="text"
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search orders by topic"
            ></input>
          </div>
        </form>
        <div className="filters">
          <Select
            value={statusValue}
            name={`status-filter`}
            onChange={onStatusChange}
          >
            <option value={``} hidden disabled>
              Filter by status
            </option>
            <option value={`Active`}>Active</option>
            <option value={`Completed`}>Completed</option>
            <option value={`Cancelled`}>Cancelled</option>
            <option value={`All`}>All</option>
          </Select>
          <Select
            value={sortValue}
            name={`deadline-sort-filter`}
            onChange={onSortChange}
          >
            <option value={``} hidden disabled>
              Filter by deadline
            </option>
            <option value={`Ascending`}>Ascending</option>
            <option value={`Descending`}>Descending</option>
          </Select>
          <div>
            <button
              className="clear-filters"
              type="button"
              onClick={onClearClick}
            >
              <LuFilterX />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const Dashboard = () => {
  const [allOrders, setAllOrders] = useState();
  const [activeOrders, setActiveOrders] = useState();
  const [completedOrders, setCompletedOrders] = useState();
  const [cancelledOrders, setCancelledOrders] = useState();
  const [orders, setOrders] = useState<any[]>();
  const [error, setError] = useState(false);
  const [DeadlineErrorMessage, setDeadlineErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [filterMessage, setFilterMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [revision, setRevision] = useState<string | null>();
  const [orderId, setOrderId] = useState("");
  const [revise, setRevise] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    show: false,
  });
  const [moreFiles, setMoreFiles] = useState<{ [key: string]: any }>({
    extraFiles: [],
  });
  const [stepsValidation, setStepsValidation] = useState({
    message: "",
    isValid: true,
  });

  // pass the message and validity status to handleValidation function
  const handleStepsValidation = (
    validationMessage?: any,
    validationStatus?: any
  ) => {
    setStepsValidation({
      ...stepsValidation,
      message: validationMessage,
    });

    setStepsValidation({
      ...stepsValidation,
      isValid: validationStatus,
    });
  };

  // get the modal state
  const { displayModal, modal } = useModalContext() ?? {};

  const { showModal, mainMessage, supportingMessage, warning } = modal ?? {};

  const [state, dispatch] = useReducer(reducer, initialState);

  var { data } = useSWR(`/api/orders/all`, fetcher);

  const userInfo = data;

  useEffect(() => {
    if (userInfo) {
      let {
        activeOrders,
        allOrders,
        cancelledOrders,
        completedOrders,
        orders,
      } = userInfo;

      setActiveOrders(activeOrders);
      setAllOrders(allOrders);
      setCancelledOrders(cancelledOrders);
      setCompletedOrders(completedOrders);

      const lastOrderIndex = currentPage * ordersPerPage;

      const firstOrderIndex = lastOrderIndex - ordersPerPage;

      const currentOrders = orders.slice(firstOrderIndex, lastOrderIndex);

      setOrders(currentOrders);
    }
  }, [userInfo, currentPage, ordersPerPage, revise]);

  // update total cost everytime it changes based on criteria
  const areFieldsFilled = (state: any) => {
    return (
      state.service &&
      state.gradeLevel &&
      state.pagesOrwords > 0 &&
      state.deadlineCategory
    );
  };

  useEffect(() => {
    if (areFieldsFilled(state)) {
      const newCost = calculateTotalOrderCost(state);

      dispatch({
        type: "newCost",
        newCost: newCost,
      });
    }
  }, [
    state.service,
    state.gradeLevel,
    state.pagesOrwords,
    state.deadlineCategory,
  ]);
  //  end of cost update

  const displayForm = () => {
    setSubmissionForm({
      show: !submissionForm.show,
    });
  };

  const handleServiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newService",
      newService: e.target.value,
    });
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newSubject",
      newSubject: e.target.value,
    });
  };

  const handleGradeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newGradeLevel",
      newGrade: e.target.value,
    });
  };

  const handleStyleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newStyle",
      newStyle: e.target.value,
    });
  };

  const handleLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newLanguage",
      newLanguage: e.target.value,
    });
  };

  const handleSourcesChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newSources",
      newSources: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.prototype.slice.call(e.target.files);

    dispatch({
      type: "newFiles",
      newFiles: files,
    });
  };

  const handleInstructionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newInstructions",
      newInstructions: e.target.value,
    });
  };

  const handleTopicChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newTopic",
      newTopic: e.target.value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch({
        type: "newTopic",
        newTopic: "Any/Other",
      });
    } else {
      dispatch({
        type: "newTopic",
        newTopic: "",
      });
    }
  };

  const handlePaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newPaymentOption",
      newPaymentOption: e.target.value,
    });
  };

  const handlePagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newPagesOrWords",
      newPages: e.target.value,
    });
  };

  const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkDate = () => {
      const deadline = new Date(e.target.value).valueOf();

      const currentDate = new Date().valueOf();

      return deadline > currentDate;
    };

    const isValid = checkDate();

    if (isValid) {
      setError(false);

      dispatch({
        type: "newDeadline",
        newDeadline: e.target.value,
      });

      let deadlineCategory = categorizeDeadline(e.target.value);

      dispatch({
        type: "newDeadlineCategory",
        newDeadlineCategory: deadlineCategory,
      });
    } else {
      setError(!error);
      setDeadlineErrorMessage("deadline cannot be in the past !!");
    }
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "newTime",
      newTime: e.target.value,
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusQuery(e.target.value);

    if (userInfo && userInfo.orders.length !== 0) {
      const filterStatus = (status: string) => {
        return userInfo.orders.filter((orders: { [key: string]: any }) => {
          return orders.status === status;
        });
      };

      const foundOrders = filterStatus(e.target.value);

      if (foundOrders.length > 0) {
        setFilterMessage("");

        setOrders(foundOrders);
      } else {
        setOrders([]);
        setFilterMessage("No orders found for this filter");
      }
    }

    if (e.target.value === "All") {
      setFilterMessage("");

      setOrders(userInfo.orders);
    }
  };

  const handleSortingFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setSortQuery(e.target.value);

    let ascendingOrder;
    let descendingOrder;

    switch (e.target.value) {
      case "Ascending":
        ascendingOrder = orders?.sort((a: any, b: any): any => {
          return (
            new Date(a.date_deadline).getTime() -
            new Date(b.date_deadline).getTime()
          );
        });

        setOrders(ascendingOrder);

        break;

      case "Descending":
        descendingOrder = orders?.sort((a: any, b: any) => {
          return (
            new Date(b.date_deadline).getTime() -
            new Date(a.date_deadline).getTime()
          );
        });

        setOrders(descendingOrder);

        break;

      default:
    }
  };

  const addFiles = (event: ChangeEvent<HTMLInputElement>, params: any) => {
    const additionalFiles = Array.prototype.slice.call(event.target.files);

    setMoreFiles({
      ...moreFiles,
      extraFiles: additionalFiles,
    });
  };

  const setClickedOrderId = (event: FormEvent, param: string) => {
    setOrderId(() => param);
  };

  const clearFilters = () => {
    setFilterMessage("");
    setStatusQuery("");
    setSortQuery("");
    setOrders(userInfo.orders);
  };

  const closeModalForm = () => {
    setOrderId("");
    setRevision("");
    setRevise(false);
  };

  const addMoreFiles = (event: FormEvent, param: string) => {
    event.preventDefault();

    const extraFilesFormData = new FormData();

    for (var key in moreFiles.extraFiles) {
      extraFilesFormData.append("additionalFiles", moreFiles.extraFiles[key]);
    }

    axios
      .put(`api/orders/order/update/files/${orderId}`, extraFilesFormData)
      .then(() => {
        displayModal(
          false,
          "Files Successfully Uploaded",
          `File (s) uploaded for Order-${orderId} (${param})`
        );

        setOrderId("");

        setMoreFiles({
          extraFiles: [],
        });
      })
      .catch((err: ErrorCallback) => {
        console.log(err);
      });
  };

  const handleRevision = (e: ChangeEvent<HTMLInputElement>) => {
    setRevision(e.target.value);
  };

  const submitRevision = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const revisionDetails = {
      orderId: orderId,
      modificationType: "Revision",
      modificationReason: revision,
    };

    axios
      .post("api/orders/revision", revisionDetails)
      .then(() => {
        closeModalForm();

        displayModal(
          false,
          "Success",
          "Your revision request has been successfully sent."
        );

        setRevise(false);
      })
      .catch((err: ErrorCallback) => {
        console.log(err);
      });
  };

  const submitAssignment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let assignmentDetails = new FormData();

    alert(JSON.stringify(state));

    // for (var key in state){
    //     assignmentDetails.append(key, state[key])
    // }

    // if(state.files.length!==0){

    //     for(var keys in state.files){
    //         assignmentDetails.append("attachedFiles", state.files[keys])
    //         assignmentDetails.append("fileNames", state.files[keys].name)
    //     }
    // }

    // axios.post("api/orders/new", assignmentDetails,
    //  {
    //     headers:{
    //         "Content-Type":"multipart/form-data"
    //     }
    //     }
    // ).then(() => {

    //     dispatch({
    //         type: "clearForm"
    //     });

    //     setSubmissionForm({
    //         show: false
    //     });

    // displayModal(false, 'Success', `Your assignment has been submitted successfully. You will be
    //          updated on its progress.`)

    // }).catch(err=>{
    //     console.log(err);
    // });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  let extraFilesNames = moreFiles.extraFiles.length
    ? moreFiles.extraFiles.length < 2
      ? moreFiles.extraFiles[0].name.length > 15
        ? `${moreFiles.extraFiles[0].name.substr(
            0,
            8
          )}..${moreFiles.extraFiles[0].name.substr(
            moreFiles.extraFiles[0].name.length - 6,
            moreFiles.extraFiles[0].name.length
          )}`
        : moreFiles.extraFiles[0].name
      : `${moreFiles.extraFiles.length} Selected Files`
    : "";

  let all;
  let complete;
  let cancelled;
  let active;
  let tableRows;
  let noOrders;
  let pages;
  let lastIndex = currentPage * ordersPerPage;
  let firstIndex = lastIndex - ordersPerPage;

  const revisionForm = (
    <ModalForm
      id={`rev-modal-form`}
      formLabel={`Please provide revision details`}
      message={`Request Revision`}
      value={revision}
      onChange={handleRevision}
      onSubmit={submitRevision}
      closeModal={closeModalForm}
    />
  );

  const feedbackModal = (
    <Modal
      modalIcon={warning ? <WarningIcon /> : <SuccessIcon />}
      mainMessage={mainMessage}
      supportingMessage={supportingMessage}
      buttonColor={warning ? "warning-btn-color" : "success-btn-color"}
    />
  );

  if (orders) {
    all = allOrders;
    complete = completedOrders;
    cancelled = cancelledOrders;
    active = activeOrders;

    tableRows = (
      <Fragment>
        {orders.length === 0
          ? ""
          : orders
              .filter((orders) => {
                if (searchQuery === "") {
                  return orders;
                } else {
                  return orders.topic
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                }
              })
              .map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{`Order-${order.order_id}`}</td>
                    <td>{order.topic}</td>
                    <td>{order.status}</td>
                    <td>{order.date_deadline.split("T")[0]}</td>
                    <td>
                      <GenericCtaButton
                        id={`revision-btn`}
                        onClick={() => {
                          if (order.status === "Completed") {
                            axios
                              .get(
                                `/api/orders/order/dispatchTime/${order.order_id}`
                              )
                              .then((res: any) => {
                                if (res.data.code === 200) {
                                  let revisionGraceDaysLeft =
                                    revisionGracePeriod(res.data.message);

                                  if (revisionGraceDaysLeft > 0) {
                                    setOrderId(order.order_id);

                                    setRevise(true);
                                  } else {
                                    displayModal(
                                      true,
                                      "Unable To Request Revision",
                                      `Dear client, you have unfortunately exhausted your allocated free revision request grace period of 7 days
                                                    (since the delivery of the completed work). Kindly contact our support team for further instructions.`
                                    );
                                  }
                                } else {
                                  displayModal(
                                    true,
                                    "Warning !!",
                                    res.data.message
                                  );
                                }
                              })
                              .catch((err: ErrorCallback) => {
                                console.log(err);
                              });
                          }
                        }}
                        message={`Order Revision`}
                      />
                      <form
                        encType="multipart/form-data"
                        onSubmit={(event: FormEvent) =>
                          addMoreFiles(event, order.topic)
                        }
                        className="add-files"
                      >
                        <label
                          htmlFor="more-files"
                          className="label"
                          onClick={(event) =>
                            setClickedOrderId(event, order.order_id)
                          }
                        >
                          <span>
                            <i>
                              <BiCloudUpload />
                            </i>
                            Upload Files
                          </span>
                        </label>
                        <input
                          type="file"
                          id="more-files"
                          onChange={(event) => addFiles(event, order.order_id)}
                          multiple
                          hidden
                        ></input>

                        {moreFiles.extraFiles.length > 0 &&
                        orderId === order.order_id ? (
                          <button
                            className="selected-files"
                            type="submit"
                          >{`Submit ${extraFilesNames}`}</button>
                        ) : (
                          ""
                        )}
                      </form>
                    </td>
                  </tr>
                );
              })}
      </Fragment>
    );

    noOrders =
      orders.length === 0 ? (
        filterMessage === "" ? (
          <span className="no-orders">
            <p>
              You have not submitted any assignments yet. Click on{" "}
              <b className="highlight">Create New Order </b>to submit. Once you
              do, they will appear here.
            </p>
          </span>
        ) : (
          <span className="no-orders">{filterMessage}</span>
        )
      ) : (
        ""
      );

    pages =
      orders.length === 0 ? (
        ""
      ) : (
        <Fragment>
          <PageNumbers
            paginate={paginate}
            ordersPerPage={ordersPerPage}
            totalOrders={userInfo.orders.length}
          />
          <span className="pagination-legend">
            Showing {firstIndex + 1}-{firstIndex + orders.length} of{" "}
            {userInfo.orders.length} orders
          </span>
        </Fragment>
      );
  }

  return (
    <React.Fragment>
      <section className="section" id="dashboard-section">
        <DashboardNavbar />
        <div className="dashboard">
          <section className="overview">
            <DashSectionHeaders heading={`Overview`} />
            <div className="overview-metrics">
              <Metrics
                title={`All Orders`}
                icon={<BsFileEarmarkBarGraph />}
                number={all}
              />
              <Metrics
                title={`Completed Orders`}
                icon={<BsFileEarmarkCheck />}
                number={complete}
              />
              <Metrics
                title={`Active Orders`}
                icon={<GiSandsOfTime />}
                number={active}
              />
              <Metrics
                title={`Cancelled Orders`}
                icon={<ImCancelCircle />}
                number={cancelled}
              />
            </div>
          </section>
          <section className="create-order-section">
            <DashSectionHeaders heading={`New Order`} />
            <div className="new-order">
              <div className="add-order">
                <h2 className="new-order-heading">Place a new order</h2>
                <div className="btn">
                  <NewOrderButton
                    onClick={displayForm}
                    formStatus={submissionForm.show}
                  />
                </div>
              </div>
              <p className="new-order-description">
                A fast, four-step, secure and confidential process to to submit
                your work.
              </p>
              {submissionForm.show && (
                <Fragment>
                  <FormStepper
                    onSubmit={submitAssignment}
                    formData={state}
                    step1={
                      <MandatoryFields
                        onSubjectChange={handleSubjectChange}
                        onGradeChange={handleGradeChange}
                        onStyleChange={handleStyleChange}
                        onSourcesChange={handleSourcesChange}
                        onLanguageChange={handleLanguage}
                        onInstructionChange={handleInstructionChange}
                        onPagesChange={handlePagesChange}
                        onServiceChange={handleServiceChange}
                        onTopicChange={handleTopicChange}
                        onCheckBoxChange={handleCheckboxChange}
                        formData={state}
                        onValidation={handleStepsValidation}
                      />
                    }
                    step2={
                      <Files onFileChange={handleFileChange} formData={state} />
                    }
                    step3={
                      <Deadline
                        onDeadlineChange={handleDeadlineChange}
                        onTimeChange={handleTimeChange}
                        errorAlert={
                          error && <Error errorMessage={DeadlineErrorMessage} />
                        }
                        formData={state}
                      />
                    }
                    step4={
                      <Payment
                        handlePaymentChange={handlePaymentChange}
                        formData={state}
                      />
                    }
                  />
                </Fragment>
              )}
            </div>
          </section>
          <section className="all-orders">
            <DashSectionHeaders heading={`All Orders`} />
            <div className="orders-wrapper">
              <Search
                searchValue={searchQuery}
                onSearchChange={handleSearch}
                statusValue={statusQuery}
                onStatusChange={handleStatusFilter}
                sortValue={sortQuery}
                onSortChange={handleSortingFilter}
                onClearClick={clearFilters}
              />
              <OrdersTable>{tableRows}</OrdersTable>
              {noOrders}
              {pages}
            </div>
          </section>
        </div>
        {revise && revisionForm}
        {showModal && feedbackModal}
      </section>
    </React.Fragment>
  );
};
export { DashSectionHeaders, Metrics, OrdersTable, Search, GenericCtaButton };
export default Dashboard;
