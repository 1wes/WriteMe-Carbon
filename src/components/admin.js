import React, {Fragment, useEffect, useState} from 'react';
import './admin.css';
import { DashSectionHeaders, Metrics, DashboardNavbar, OrdersTable } from './dashboard';
import useSWR from 'swr';
import axios from '../utils.js/axios';
import { useNavigate } from 'react-router-dom';
import checkToken from '../utils.js/check-token';

const fetcher=url=>axios.get(url).then(res=>res.data);

const Admin=()=>{

    const [adminName, setAdminName]=useState('');
    const [loggedIn, setLoggedIn]=useState(true);

    const navigate=useNavigate();

    const {data, isLoading}=useSWR(`/api/orders/admin`, fetcher);

    useEffect(()=>{
        if(data){
            let { name }=data;

            setAdminName(name);
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
                <div className='admin'>

                </div>
            </section>
        </Fragment>
    )
}
export default Admin;