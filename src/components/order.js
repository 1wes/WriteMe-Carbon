import React , { Fragment, useState, useEffect } from 'react';

import { useLocation, useNavigate, Link } from 'react-router-dom';

import { DashSectionHeaders, DashboardNavbar } from './dashboard';
import './order.css';
import useSWR from 'swr';
import axios from '../utils.js/axios';
import checkToken from '../utils.js/check-token';
import remainingDays from '../utils.js/dates';

const fetcher=url=>axios.get(url).then(res=>res.data);

const ClientOrder=()=>{

    const [loggedIn, setLoggedIn]=useState(true);
    const [order, setOrder]=useState();

    const id=useLocation().pathname.split("Order-")[1];
    const navigate=useNavigate();

    const {data}=useSWR(`/api/orders/order/${id}`, fetcher);

    useEffect(()=>{
        if(data){
            setOrder(data);
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
                                        <span>{` ( ${remainingDays(order?order.date_deadline:new Date(Date.now()))} days remaining )`}</span>
                                    </li>
                                    <li><span className='order-key'>Time : </span><span className='order-value'>{order?order.time_deadline:""}</span></li>
                                    <li><span className='order-key'>Topic : </span><span className='order-value'></span></li>
                                    <li><span className='order-key'>Sources : </span><span className='order-value'>{order?order.sources:""} source(s) required</span></li>
                                    <li><span className='order-key'>Citation Style : </span><span className='order-value'>{order?order.ref_style:""}</span></li>
                                    <li><span className='order-key'>Instructions : </span><span className='order-value'>{order?order.instructions:""}</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </section>            
        </Fragment>
    )
}
export default ClientOrder