import React, {
  Fragment,
  useState,
  useEffect,
  useLayoutEffect,
  FunctionComponent,
  ChangeEvent,
  FormEvent,
} from "react";

import { useLocation, Link } from "react-router-dom";

import { DashSectionHeaders } from "./dashboard";
import DashboardNavbar from "./dash-nav";
import "./order.css";
import useSWR from "swr";
import axios from "../utils/axios";
import remainingDays from "../utils/dates";
import { CtaButton } from "./services";
import { FormControl, Input, TextArea } from "./create-order";
import Modal, { SuccessIcon } from "./modal";

import { MdClose } from "react-icons/md";
import { BiCloudUpload } from "react-icons/bi";

const fetcher = (url: string) => axios.get(url).then((res: any) => res.data);

const ClientOrder: FunctionComponent = () => {
  const [order, setOrder] = useState<{ [key: string]: any }>({});
  const [daysToDeadline, setDaysToDeadline] = useState<number>(0);
  const [warning, setWarning] = useState<{
    display: boolean;
    error: boolean;
    message: string;
  }>({
    display: false,
    error: false,
    message: "",
  });
  const [showUploadForm, setShowUploadForm] = useState<{
    [key: string]: boolean;
  }>({
    show: false,
  });
  const [uploadedOrder, setUploadedOrder] = useState<{ [key: string]: any }>({
    files: [],
    additionalInfo: "",
  });
  const [modal, setModal] = useState({
    show: false,
  });

  const id = useLocation().pathname.split("Order-")[1];

  const { data } = useSWR(`/api/orders/order/${id}`, fetcher);

  // scroll to top when page is opened
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data) {
      const { date_deadline } = data;
      setOrder(data);

      const days = remainingDays(date_deadline);

      setDaysToDeadline(days);
    }
  }, [data]);

  const submitFinishedWork = () => {
    const { status } = order;

    switch (status) {
      case "Active":
        setWarning({
          display: true,
          message: `This order has not been completed yet, hence cannot be sent to the client. 
                            If it has been completed, please mark it complete before submitting.`,
          error: true,
        });

        break;

      case "Completed":
        setShowUploadForm({
          show: true,
        });

        break;

      default:
    }
  };

  const changeOrderStatus = () => {
    let { status } = order;

    if (status === "Active") {
      axios
        .put(`/api/orders/order/update/${order.order_id}`, {
          status: "Completed",
        })
        .then(() => {
          setWarning({
            display: true,
            message: `Order-${order.order_id} has been marked as complete. You can now send it to the client.`,
            error: false,
          });
        })
        .catch((err: ErrorCallback) => {
          console.log(err);
        });
    } else {
      setWarning({
        display: true,
        message:
          "This order is already marked as complete. Please send it to the client if you have not done so already.",
        error: true,
      });
    }
  };

  const closeModal = () => {
    setModal({
      show: false,
    });

    setShowUploadForm({
      show: false,
    });
  };

  let fileAttachments;
  let successModal;

  const downloadFile = (
    event: React.MouseEvent<HTMLSpanElement>,
    param: any
  ) => {
    if (order.attachedFiles.length > 0) {
      axios
        .get(`/api/orders/order/files/${order.attachedFiles[0]}/${param}`, {
          responseType: "blob",
        })
        .then((res: any) => {
          console.log(res.data);

          const fileUrl = window.URL.createObjectURL(new Blob([res.data]));

          const link = document.createElement("a") as any | null;

          link.href = fileUrl;

          link.setAttribute("download", `${param}`);

          document.body.appendChild(link);

          link.click();

          window.URL.revokeObjectURL(fileUrl);

          link?.parentNode.removeChild(link);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  if (order) {
    successModal = (
      <Modal
        mainMessage={`Success`}
        supportingMessage={`Order-${order.order_id} has been sent to ${order.email} (
            ${order.first_name} ${order.last_name}
         )`}
        modalIcon={<SuccessIcon />}
        buttonColor={"success-btn-color"}
        onClick={closeModal}
      />
    );

    fileAttachments = (
      <Fragment>
        {order.attachedFiles.length > 0 ? (
          <li className="attached-files">
            <span className="order-key">{`${order.fileNames.length} attached file(s)`}</span>
            <span className="download-link">
              {order.fileNames.map((file: any) => {
                return (
                  <span
                    onClick={(event) => downloadFile(event, file)}
                    className="file-list"
                    key={file}
                  >
                    {file}
                  </span>
                );
              })}
            </span>
          </li>
        ) : (
          ""
        )}
      </Fragment>
    );
  }

  const warningMessage = (
    <Fragment>
      <div id="cta-warning" className={warning.error ? "error" : "no-error"}>
        <div className="warning-close">
          <i
            onClick={() => {
              setWarning({
                display: false,
                message: "",
                error: false,
              });
            }}
          >
            <MdClose />
          </i>
        </div>
        <p>{warning.message}</p>
      </div>
    </Fragment>
  );

  const closeUploadForm = () => {
    setUploadedOrder({
      files: [],
      additionalInfo: "",
    });

    setShowUploadForm({
      show: false,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.prototype.slice.call(e.target.files);

    setUploadedOrder({
      ...uploadedOrder,
      files: files,
    });
  };

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadedOrder({
      ...uploadedOrder,
      additionalInfo: e.target.value,
    });
  };

  const uploadToClient = (e: FormEvent) => {
    e.preventDefault();

    const completedOrder = new FormData();

    for (var key in uploadedOrder) {
      completedOrder.append(key, uploadedOrder[key]);
    }

    for (var keys in uploadedOrder.files) {
      completedOrder.append("documents", uploadedOrder.files[keys]);
      completedOrder.append("fileNames", uploadedOrder.files[keys].name);
    }

    completedOrder.append("firstName", order.first_name);
    completedOrder.append("lastName", order.last_name);
    completedOrder.append("email", order.email);
    completedOrder.append("id", order.order_id);
    completedOrder.append("topic", order.topic);

    axios
      .post(`api/orders/order/send/${order.order_id}`, completedOrder, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setModal({
          show: true,
        });

        setUploadedOrder({
          files: [],
          additionalInfo: "",
        });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <section className="section">
        <DashboardNavbar />
        <div className="order">
          <section className="order-wrapper">
            <DashSectionHeaders
              heading={`Order-${order ? order.order_id : ""} details`}
            />
            <div className="order-details">
              <div className="order-specifics">
                <ul className="order-specifics-list">
                  <li>
                    <span className="order-key">Client : </span>
                    <span className="order-value">
                      <Link
                        to={`mailto:${order ? order.email : ""}`}
                        target="blank"
                        className="link"
                      >
                        {order ? order.email : ""}
                      </Link>
                    </span>
                    <span>{`${
                      order ? ` ( ${order.first_name} ${order.last_name} )` : ""
                    }`}</span>
                  </li>
                  <li>
                    <span className="order-key">Service : </span>
                    <span className="order-value">
                      {order ? order.service : ""}
                    </span>
                  </li>
                  <li>
                    <span className="order-key">Pages or Words : </span>
                    <span className="order-value">
                      {order ? order.words_or_pages : ""}
                    </span>
                  </li>
                  <li>
                    <span className="order-key">Education Level : </span>
                    <span className="order-value">
                      {order ? order.level : ""}
                    </span>
                  </li>
                  <li>
                    <span className="order-key">Language : </span>
                    <span className="order-value">
                      {order ? order.language : ""}
                    </span>
                  </li>
                  <li>
                    <span className="order-key">Deadline : </span>
                    <span className="order-value"></span>
                    {order ? order.date_deadline.split("T")[0] : ""}
                    <span>{` (${
                      daysToDeadline > 0
                        ? `${daysToDeadline} remaining`
                        : "Past deadline"
                    })`}</span>
                  </li>
                  <li>
                    <span className="order-key">Time : </span>
                    <span className="order-value">
                      {order ? order.time_deadline : ""}
                    </span>
                  </li>
                  <li>
                    <span className="order-key">Topic : </span>
                    <span className="order-value">
                      {order ? order.topic : ""}
                    </span>
                  </li>
                  <li>
                    <span className="order-key">Sources : </span>
                    <span className="order-value">
                      {order ? order.sources : ""} source(s) required
                    </span>
                  </li>
                  <li>
                    <span className="order-key">Citation Style : </span>
                    <span className="order-value">
                      {order ? order.ref_style : ""}
                    </span>
                  </li>
                  <li id="instruction-details">
                    <span className="order-key">Instructions : </span>
                    <span className="order-value">
                      {order ? order.instructions : ""}
                    </span>
                  </li>
                  {fileAttachments}
                </ul>
              </div>
              <div className="alerts">
                <ul className="alerts-list">
                  <li>
                    <div className="order-key">Status</div>
                    <div
                      className={order ? order.status : ""}
                      id="status-indicator"
                    ></div>
                  </li>
                  <li>
                    <div className="order-key">Deadline</div>
                    <div
                      className={
                        daysToDeadline
                          ? daysToDeadline >= 2
                            ? "safe-deadline"
                            : daysToDeadline > 0
                            ? "deadline-warning"
                            : daysToDeadline <= 0
                            ? "missed-deadline"
                            : ""
                          : ""
                      }
                      id="deadline-indicator"
                    ></div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="order-actions">
            <DashSectionHeaders heading={`Order Actions`} />
            <div className="order-actions-wrapper">
              {warning.display && warningMessage}
              <div className="actions-group">
                <div className="action">
                  <h2 className="action-heading">Mark this order complete</h2>
                  <p className="action-description">
                    This action will change the order status from active to
                    complete.
                  </p>
                  <div className="">
                    <CtaButton
                      id={`mark-complete-btn`}
                      message={`Mark As Complete`}
                      onClick={changeOrderStatus}
                    />
                  </div>
                </div>
                <div className="action">
                  <h2 className="action-heading">Send order to client</h2>
                  <p className="action-description">
                    This action will enable you to send the completed work to
                    the client. To send the order, it has to be marked complete.
                  </p>
                  <div className="">
                    <CtaButton
                      id={`upload-btn`}
                      message={`Upload Finished Work`}
                      onClick={submitFinishedWork}
                    />
                  </div>
                </div>
              </div>
              {showUploadForm.show && (
                <div className="upload-to-client">
                  <div className="form-close-icon">
                    <i onClick={closeUploadForm}>
                      <MdClose />
                    </i>
                  </div>
                  <div className="upload-form">
                    <div className="uploaded-order-details">
                      <h4>Uploading Finished Work For This Order:</h4>
                      <ul>
                        <li>
                          <span className="order-key">ID : </span>
                          <span className="order-value">{`Order-${order.order_id}`}</span>
                        </li>
                        <li>
                          <span className="order-key">Topic : </span>
                          <span className="order-value">{order.topic}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="upload-files">
                      <form
                        encType="multipart/form-data"
                        onSubmit={uploadToClient}
                      >
                        <div className="input-group" id="upload-input-group">
                          <label
                            htmlFor="upload-work"
                            className="completed-files"
                          >
                            <span
                              className="add-file-icon"
                              id="admin-upload-icon"
                            >
                              <i>
                                <BiCloudUpload />
                              </i>{" "}
                              Attach completed work files
                            </span>
                          </label>
                          <Input
                            type={`file`}
                            id={`upload-work`}
                            onChange={handleFileChange}
                            multiple={true}
                            required={true}
                            hidden={true}
                          />
                          {uploadedOrder.files.length > 0 && (
                            <div className="number-of-files">
                              <span className="file-counter">
                                {uploadedOrder.files.length
                                  ? uploadedOrder.files.length > 1
                                    ? `${uploadedOrder.files.length} files`
                                    : uploadedOrder.files[0].name
                                  : ""}
                              </span>{" "}
                              selected.
                            </div>
                          )}
                        </div>
                        <FormControl label={`Additional information (If any)`}>
                          <TextArea
                            value={uploadedOrder.additionalInfo}
                            onChange={handleInfoChange}
                          />
                        </FormControl>
                        <div className="send-order-btn">
                          <CtaButton
                            message={`Send To Client`}
                            id={`send-to-client`}
                            type={`submit`}
                          />
                        </div>
                      </form>
                      {modal.show && successModal}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          <section className="cancel-section">
            <DashSectionHeaders heading={`More Actions`} />
            <div className="cancel-order">
              <div className="cancel-warning">
                <h2>Cancel this order</h2>
                <p>
                  Cancelling this order is non-reversible. To enable its
                  continued processing , the client will have to create a new
                  order.
                </p>
                <div>
                  <CtaButton
                    id={`cancel-order-btn`}
                    message={`Cancel this order`}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </Fragment>
  );
};
export default ClientOrder;
