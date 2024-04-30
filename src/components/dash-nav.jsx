import React, { Fragment, useEffect } from 'react';

import { Logo } from './navbar';
import axiosInstance from '../utils/axios';
import { useAuth } from '../context/Auth';
import useTokenStatus from '../hooks/useTokenStatus';
import pfp from '../assets/pfp/dp.jpeg';

import './dash-nav.css';

import { BsChevronDown } from 'react-icons/bs';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import { TbLogout } from 'react-icons/tb';


const DashboardNavbar = ({ userName }) => {

    useTokenStatus();

    const { setLoggedIn, setRole } = useAuth();

    const showDropdownMenu=()=>{

        const dropdownMenu=document.getElementById("user-profile-dropdown");
        const icon=document.getElementById("down-icon");

        icon.classList.toggle("rotate-icon");
        dropdownMenu.classList.toggle("show-profile-dropdown")
    }

    const logUserOut = () => {
        
        axiosInstance.get("/api/user/logout").then(() => {
            setRole(null)
            setLoggedIn(false);
        }).catch(() => {
            setRole(null);
            setLoggedIn(false);
        });

    }

    return(
        <Fragment>
            <nav className='dashboard-nav'>
                <div className='dash-nav-content'>
                    <div className='nav-logo'>
                        <Logo/>
                    </div>
                    <ul className='profile-menu'>
                        <li className='profile-section' onClick={showDropdownMenu}>
                            <span className='user-profile-icon'>
                                <div className='user-pfp'>
                                    <img src={pfp}  alt='profile-picture' />
                                </div>
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
                                <li className='dropdown-item' onClick={logUserOut}><span className='item-icon'><i><TbLogout/></i></span> Sign out</li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}
export default DashboardNavbar;