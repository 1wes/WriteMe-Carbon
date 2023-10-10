import React , { Fragment, useState, useEffect } from 'react';

import { useLocation, useNavigate, Link } from 'react-router-dom';

import { DashSectionHeaders, DashboardNavbar } from './dashboard';
import './order.css';
import useSWR from 'swr';
import axios from '../utils.js/axios';
import checkToken from '../utils.js/check-token';
import remainingDays from '../utils.js/dates';
import { CtaButton } from './services';
import { FormControl, Input, TextArea } from './create-order';
import Modal from './modal';

import { MdClose } from 'react-icons/md';

const fetcher=url=>axios.get(url).then(res=>res.data);

const ClientOrder=()=>{

    const [loggedIn, setLoggedIn]=useState(true);
    const [order, setOrder]=useState();
    const [daysToDeadline, setDaysToDeadline]=useState(0);
    const [warning, setWarning]=useState({
        display:false,
        error:false,
        message:""
    });
    const [showUploadForm, setShowUploadForm]=useState({
        show:false
    });
    const [uploadedOrder, setUploadedOrder] = useState({
      files: [],
      additionalInfo:"",
    })
    const [modal, setModal] = useState({
      show:false
    })

    const id=useLocation().pathname.split("Order-")[1];

    const navigate=useNavigate();

    const {data}=useSWR(`/api/orders/order/${id}`, fetcher);

    useEffect(()=>{
        if(data){
            const {date_deadline}=data;
            setOrder(data);

            const days=remainingDays(date_deadline);

            setDaysToDeadline(days);
        }

        checkToken().then(res=>{
            setLoggedIn(true)
        }).catch(err=>{
            setLoggedIn(false)
        });
      
    },[data]);

    const logOutUser=()=>{

        axios.get("/api/user/logout").then(res=>{

            navigate("/login")
        }).catch(err=>{
            setLoggedIn(false);
        })
    }

    const submitFinishedWork=()=>{

        const {status}=order;

        switch(status){

            case 'Active':

                setWarning({
                    display:true,
                    message:`This order has not been completed yet, hence cannot be sent to the client. 
                            If it has been completed, please mark it complete before submitting.`,
                    error:true
                });

                break;

            case 'Completed':

                setShowUploadForm({
                    show:true
                });

                break;

            default:
        }
    }

    const changeOrderStatus=()=>{

        let {status}=order
        
        if(status==="Active"){

            axios.put(`/api/orders/order/update/${order.order_id}`, {status:"Completed"}).then((res)=>{

                setWarning({
                    display:true,
                    message:`Order-${order.order_id} has been marked as complete. You can now send it to the client.`,
                    error:false
                });
            }).catch(err=>{
                console.log(err);
            })
        }else{

            setWarning({
                display:true,
                message:"This order is already marked as complete. Please send it to the client if you have not done so already.",
                error:true
            })

        }
    }
  
  const closeModal = () => {
      
    setModal({
      show:false
    })
    
    setShowUploadForm({
      show:false
    })

  }

  let fileAttachments;
  let successModal;

    const downloadFile=(event,param)=>{

        if(order.attachedFiles.length>0){

            axios.get(`/api/orders/order/files/${order.attachedFiles[0]}/${param}`,{
                responseType:"blob"
            }).then(res=>{

                console.log(res.data)

                const fileUrl=window.URL.createObjectURL(
                    new Blob([res.data])
                )
                
                const link=document.createElement("a");

                link.href=fileUrl;

                link.setAttribute(
                    "download", 
                    `${param}`
                )

                document.body.appendChild(link);

                link.click();

                window.URL.revokeObjectURL(fileUrl);

                link.parentNode.removeChild(link)
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    !loggedIn && navigate("/login");

    if(order){

      successModal = (
        <Modal mainMessage={`Success`} supportingMessage={
          `Order-${order.order_id} has been sent to ${order.email} (
            ${order.first_name} ${order.last_name}
         )` 
        } onClick={closeModal} />
        )

        fileAttachments=(
            <Fragment>
                {
                    order.attachedFiles.length>0?(
                        <li className='attached-files'><span className='order-key'>{`${order.fileNames.length} attached file(s)`}</span>
                            <span className='download-link'>
                                {
                                    order.fileNames.map((file)=>{
                                        return(
                                            <span onClick={event=>downloadFile(event, file)} className='file-list' key={file}>{file}</span>
                                        )
                                    })
                                }
                            </span>
                        </li>
                    ):""
                }
            </Fragment>
        )
    }

    const warningMessage=(
        <Fragment>
            <div id='cta-warning' className={warning.error?"error":"success"}>
                <div className='warning-close'>
                    <i onClick={()=>{setWarning({
                        display:false,
                        message:"",
                        error:false
                        })}} >
                        <MdClose/>
                    </i>
                </div>
                <p>
                    {warning.message}
                </p>
            </div>
        </Fragment>
    )

    const closeUploadForm = () => {

      setUploadedOrder({
        files: [],
        additionalInfo:""
      })
        
        setShowUploadForm({
            show: false
        });
    }

    const handleFileChange = (e) => {
        
        const files = Array.prototype.slice.call(e.target.files);

        setUploadedOrder({
            ...uploadedOrder,
            files:files
        })
    }

    const handleInfoChange = (e) => {
                
        setUploadedOrder({
            ...uploadedOrder,
            additionalInfo:e.target.value
        })
    }

    const uploadToClient = (e) => {
        
        e.preventDefault();

        const completedOrder = new FormData();

        for (var key in uploadedOrder) {
            completedOrder.append(key, uploadedOrder[key]);
        }

        for (var keys in uploadedOrder.files) {
            completedOrder.append("documents", uploadedOrder.files[keys])
            completedOrder.append("fileNames", uploadedOrder.files[keys].name)
        }

      completedOrder.append("firstName", order.first_name);
      completedOrder.append("lastName", order.last_name);
      completedOrder.append("email", order.email);
      completedOrder.append("id", order.order_id);
      completedOrder.append("topic", order.topic);

      axios.post(`api/orders/order/send/${order.order_id}`, completedOrder, {
        headers: {
          "Content-Type":"multipart/form-data"
        }
      }).then(res => {
          
        setModal({
          show: true
        });
        
      }).catch(err => {
        console.log(err);
        })
    }

    return (
      <Fragment>
        <section className="section">
          <DashboardNavbar
            userName={order ? order.username : ""}
            onClick={logOutUser}
          />
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
                        order
                          ? ` ( ${order.first_name} ${order.last_name} )`
                          : ""
                      }`}</span>
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
                      <span className="order-key">Deadline : </span>
                      <span className="order-value"></span>
                      {order ? order.date_deadline.split("T")[0] : ""}
                      <span>{` (${daysToDeadline} days remaining )`}</span>
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
                <div className="buttons-group">
                  <div className="admin-btn">
                    <CtaButton
                      id={`cancel-order-btn`}
                      message={`Cancel Order`}
                    />
                  </div>
                  <div className="admin-btn">
                    <CtaButton
                      id={`mark-complete-btn`}
                      message={`Mark As Complete`}
                      onClick={changeOrderStatus}
                    />
                  </div>
                  <div className="admin-btn">
                    <CtaButton
                      id={`upload-btn`}
                      message={`Upload Finished Work`}
                      onClick={submitFinishedWork}
                    />
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
                            <span className='order-key'>ID : </span>
                            <span className="order-value">{`Order-${order.order_id}`}</span>
                          </li>
                          <li>
                            <span className='order-key'>Topic : </span>
                            <span className='order-value'>{order.topic}</span>
                          </li>
                        </ul>
                      </div>
                      <div className='upload-files'>
                        <form encType='multipart/form-data' onSubmit={uploadToClient}>
                            <FormControl label={`Attach Files`} labelClassName={`required`}>
                               <Input type={`file`} onChange={handleFileChange} multiple={true} required={true} /> 
                            </FormControl>
                            <FormControl label={`Additional information (If any)`} >
                                <TextArea  value={uploadedOrder.additionalInfo} onChange={handleInfoChange} />
                            </FormControl>
                            <CtaButton message={`Send To Client`} id={`send-to-client`} type={`submit`} />
                        </form>
                        {modal.show && successModal}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
      </Fragment>
    );
}
export default ClientOrder