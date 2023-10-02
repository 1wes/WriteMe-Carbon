import React , { Fragment, useState, useEffect } from 'react';

import { useLocation, useNavigate, Link } from 'react-router-dom';

import { DashSectionHeaders, DashboardNavbar } from './dashboard';
import './order.css';
import useSWR from 'swr';
import axios from '../utils.js/axios';
import checkToken from '../utils.js/check-token';
import remainingDays from '../utils.js/dates';
import { CtaButton } from './services';

const fetcher=url=>axios.get(url).then(res=>res.data);

const ClientOrder=()=>{

    const [loggedIn, setLoggedIn]=useState(true);
    const [order, setOrder]=useState();
    const [daysToDeadline, setDaysToDeadline]=useState(0);

    const id=useLocation().pathname.split("Order-")[1];

    const navigate=useNavigate();

    const {data}=useSWR(`/api/orders/order/${id}`, fetcher);

    useEffect(()=>{
        if(data){
            const {date_deadline}=data;
            setOrder(data);

            const days=remainingDays(date_deadline);

            setDaysToDeadline(days);

            // console.log(data.attachedFiles[0].data);

            // const blob=new Blob(data.attachedFiles[0].data);

            // console.log(blob);

            // console.log(data)

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

    !loggedIn && navigate("/login");

    let fileAttachments;

    const downloadFile=()=>{

        if(order.attachedFiles.length>0){

            axios.get(`/api/orders/order/files/${order.attachedFiles[0]}`,{
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
                    `${order.attachedFiles[0]}`
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

    if(order){

        fileAttachments=(
            <Fragment>
                {
                    order.attachedFiles.length>0?(
                        <li className='attached-files'><span className='order-key'>{`${order.attachedFiles.length} attached file(s)`}</span>
                            <span className='download-link' onClick={downloadFile}>
                                {order.attachedFiles[0]}
                            </span>
                        </li>
                    ):""
                }
            </Fragment>
        )
    }

    return(
        <Fragment>
            <section className='section'>
                <DashboardNavbar userName={order?order.username:""} onClick={logOutUser} />
                <div className='order'>
                    <section className='order-wrapper'>
                        <DashSectionHeaders heading={`Order-${order?order.order_id:""} details`} />
                        <div className='order-details'>
                            <div className='order-specifics'>
                                <ul className='order-specifics-list'>
                                    <li>
                                        <span className='order-key'>Client : </span><span className='order-value'>
                                            <Link to={`mailto:${order?order.email:""}`} target="blank" className='link'>
                                                {order?order.email:""}
                                            </Link>
                                        </span><span>{`${order?` ( ${order.first_name} ${order.last_name} )`:""}`}</span>
                                    </li>
                                    <li><span className='order-key'>Pages or Words : </span><span className='order-value'>{order?order.words_or_pages:""}</span></li>
                                    <li><span className='order-key'>Education Level : </span><span className='order-value'>{order?order.level:""}</span></li>
                                    <li><span className='order-key'>Deadline : </span><span className='order-value'>
                                        </span>{order?order.date_deadline.split("T")[0]:""}
                                        <span>{` (${daysToDeadline} days remaining )`}</span>
                                    </li>
                                    <li><span className='order-key'>Time : </span><span className='order-value'>{order?order.time_deadline:""}</span></li>
                                    <li><span className='order-key'>Topic : </span><span className='order-value'></span></li>
                                    <li><span className='order-key'>Sources : </span><span className='order-value'>{order?order.sources:""} source(s) required</span></li>
                                    <li><span className='order-key'>Citation Style : </span><span className='order-value'>{order?order.ref_style:""}</span></li>
                                    <li id='instruction-details'><span className='order-key'>Instructions : </span><span className='order-value'>{order?order.instructions:""}</span></li>
                                    {fileAttachments}
                                </ul>
                            </div>
                            <div className='alerts'>
                                <ul className='alerts-list'>
                                    <li>
                                        <div className='order-key' >Status</div>
                                        <div className={order?order.status:""} id='status-indicator'></div>
                                    </li>
                                    <li>
                                        <div className='order-key'>Deadline</div>
                                        <div className={daysToDeadline?daysToDeadline>=2?"safe-deadline":daysToDeadline>0?"deadline-warning":daysToDeadline<=0?"missed-deadline":"":""}
                                         id='deadline-indicator'></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className='order-actions'>
                        <DashSectionHeaders heading={`Order Actions`} />
                        <div className='order-actions-wrapper'>
                            <div className='buttons-group'>
                                <div className='admin-btn'>
                                    <CtaButton id={`cancel-order-btn`} message={`Cancel Order`}/>
                                </div>
                                <div  className='admin-btn'>
                                    <CtaButton id={`mark-complete-btn`} message={`Mark As Complete`}/>
                                </div>
                                <div className='admin-btn'>
                                    <CtaButton id={`upload-btn`} message={`Upload Finished Work`}/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>            
        </Fragment>
    )
}
export default ClientOrder