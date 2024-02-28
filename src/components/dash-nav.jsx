import React, { Fragment } from 'react';

import { Logo } from './navbar';
import useTokenChecker from '../hooks/useTokenChecker';

import './dash-nav.css';

import { BiUser } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import { TbLogout } from 'react-icons/tb';

import axiosInstance from '../utils/axios';

const DashboardNavbar = ({ userName }) => {
    
    const { setLoggedIn } = useTokenChecker();

    const showDropdownMenu=()=>{

        const dropdownMenu=document.getElementById("user-profile-dropdown");
        const icon=document.getElementById("down-icon");

        icon.classList.toggle("rotate-icon");
        dropdownMenu.classList.toggle("show-profile-dropdown")
    }

    const logUserOut = () => {
        
        axiosInstance.get("/api/user/logout").then(() => {
    
            setLoggedIn(false);
        }).catch(() => {
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
                                <i><BiUser/></i>
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