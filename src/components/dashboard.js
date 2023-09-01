import React, {Fragment, useState, useEffect} from 'react';
import './dashboard.css';
import useSWR from 'swr';
import axios from '../utils.js/axios';
import { FiUser } from 'react-icons/fi'
import { BsChevronDown } from 'react-icons/bs';

const fetcher=url=>axios.get(url).then(res=>res.data);

const DashboardNavbar=({userName})=>{

    return(
        <Fragment>
            <nav className='dashboard-nav'>
                <div className='dash-nav-content'>
                    <div className='nav-logo'>
                        Holla
                    </div>
                    <ul className='profile-menu'>
                        <li className='profile-section'>
                            <span className='user-profile-icon'>
                                <i><FiUser/></i>
                                <span className='username'>{userName}</span>
                            </span>
                            <span className='dropdown-icon' >
                                <i><BsChevronDown/></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}

const Dashboard=()=>{

    const [userDetails, setUserDetails]=useState();

    const {data}=useSWR(`/api/user/user-details`, fetcher);

    const userNames=data

    useEffect(()=>{
        setUserDetails(userNames);
    },[userNames])

    return(
        <React.Fragment>
            <section className='section' id='dashboard-section'>
                <DashboardNavbar userName={userDetails}/>
                <div className='dashboard'>
                    dashboard
                </div>
            </section>
        </React.Fragment>
    )
}
export default Dashboard;