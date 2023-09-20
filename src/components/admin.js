import React, {Fragment, useEffect, useState} from 'react';
import './admin.css';
import { DashSectionHeaders, Metrics, DashboardNavbar, OrdersTable } from './dashboard';
import useSWR from 'swr';
import axios from '../utils.js/axios';
import { useNavigate } from 'react-router-dom';
import checkToken from '../utils.js/check-token';
import { BsFileEarmarkBarGraph, BsFileEarmarkCheck } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';

const fetcher=url=>axios.get(url).then(res=>res.data);

const Admin=()=>{

    const [adminName, setAdminName]=useState('');
    const [loggedIn, setLoggedIn]=useState(true);
    const [totalOrders, settotalOrders]=useState(0);
    const [activeOrders, setActiveOrders]=useState(0);
    const [completedOrders, setCompletedOrders]=useState(0);
    const [cancelledOrders, setCancelledOrders]=useState(0);
    const [allOrders, setAllOrders]=useState([]);

    const navigate=useNavigate();

    const {data, isLoading}=useSWR(`/api/orders/admin`, fetcher);

    useEffect(()=>{
        if(data){

            let { username, totalOrders, allActiveOrders, allCancelledOrders, allCompletedOrders, allOrders }=data;

            setAdminName(username);
            settotalOrders(totalOrders);
            setActiveOrders(allActiveOrders);
            setCompletedOrders(allCompletedOrders);
            setCancelledOrders(allCancelledOrders);
            setAllOrders(allOrders);

        }

        checkToken().then(res=>{
            setLoggedIn(true)
        }).catch(err=>{
            setLoggedIn(false)
        })

    },[data]);

    const logoutUser=()=>{

        axios.get("/api/user/logout").then(res=>{

            navigate("/login")
        }).catch(err=>{
            setLoggedIn(false);
        })
    }

    !loggedIn && navigate("/login");

    let name;

    if(adminName){
        name=adminName
    }

    return(
        <Fragment>
            <section className='section' id='admin-dashboard'>
                <DashboardNavbar userName={name} onClick={logoutUser} />
                <div className='dashboard' id='admin-dashboard'>
                    <section className='overview'>
                        <DashSectionHeaders heading={`Overview`}/>
                        <div className='overview-metrics'>
                            <Metrics title={`All Orders`} icon={<BsFileEarmarkBarGraph/>} number={totalOrders} />
                            <Metrics title={`Completed Orders`} icon={<BsFileEarmarkCheck/>} number={completedOrders}/>
                            <Metrics title={`Active Orders`} icon={<GiSandsOfTime/>} number={activeOrders} />
                            <Metrics title={`Cancelled Orders`} icon={<ImCancelCircle/>} number={cancelledOrders} />
                        </div>
                    </section>
                    <section>
                        
                    </section>
                </div>
            </section>
        </Fragment>
    )
}
export default Admin;