import React, {Fragment, useState, useEffect} from 'react';
import './dashboard.css';
import useSWR from 'swr';
import axios from '../utils.js/axios';
import { FiUser } from 'react-icons/fi'
import { BsChevronDown } from 'react-icons/bs';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';
import { IoNotificationsOutline } from 'react-icons/io5';

const fetcher=url=>axios.get(url).then(res=>res.data);

const DashboardNavbar=({userName})=>{

    const showDropdownMenu=()=>{

        const dropdownMenu=document.getElementById("user-profile-dropdown");
        const icon=document.getElementById("down-icon");

        icon.classList.toggle("rotate-icon");
        dropdownMenu.classList.toggle("show-profile-dropdown")
    }

    return(
        <Fragment>
            <nav className='dashboard-nav'>
                <div className='dash-nav-content'>
                    <div className='nav-logo'>
                        WriteMe
                    </div>
                    <ul className='profile-menu'>
                        <li className='profile-section' onClick={showDropdownMenu}>
                            <span className='user-profile-icon'>
                                <i><FiUser/></i>
                                <span className='username'>{userName}</span>
                            </span>
                            <span className='dropdown-icon' >
                                <i><BsChevronDown id='down-icon' /></i>
                            </span>
                        </li>
                        <div className='profile-dropdown' id='user-profile-dropdown'>
                            <ul>
                                <li className='dropdown-item'><span className='item-icon'><i><MdOutlineManageAccounts/></i></span> Account settings</li>
                                <li className='dropdown-item'><span className='item-icon' ><i><IoNotificationsOutline/></i></span>Notifications</li>
                                <li className='dropdown-item'><span className='item-icon'><i><TbLogout/></i></span> Sign out</li>
                            </ul>
                        </div>
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

                </div>
            </section>
        </React.Fragment>
    )
}
export default Dashboard;