import React, {Fragment, useState, useEffect} from 'react';
import './dashboard.css';
import useSWR from 'swr';
import axios from '../utils.js/axios';
import { BiUser } from 'react-icons/bi'
import { BsChevronDown } from 'react-icons/bs';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import checkToken from '../utils.js/check-token';
import SectionHeader from './heading';
import { BsFileEarmarkBarGraph, BsFileEarmarkCheck } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';
import { FiPlus } from 'react-icons/fi';

const fetcher=url=>axios.get(url).then(res=>res.data);

const DashboardNavbar=({userName, onClick})=>{

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
                                <li className='dropdown-item' onClick={onClick}><span className='item-icon'><i><TbLogout/></i></span> Sign out</li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}

const Metrics=({title, icon, number})=>{

    return(
        <Fragment>
            <div className='metric-details'>
                <span className='metric-title'>{title}</span>
                <span className='metric-icon'><i>{icon}</i></span>
                <span className='metric-number'>{number}</span>
            </div>
        </Fragment>
    )
}

const NewOrderButton=()=>{

    return (
        <Fragment>
            <button type='button' className='add-button'>
                <span>New Order</span>
                <span className='button-icon'><i><FiPlus/></i></span>
            </button>
        </Fragment>
    )
}

const Dashboard=()=>{

    const [userDetails, setUserDetails]=useState();
    const [loggedIn, setloggedIn]=useState(true);

    const navigate=useNavigate();

    const {data}=useSWR(`/api/user/user-details`, fetcher);

    const userNames=data

    useEffect(()=>{

        setUserDetails(userNames);

        checkToken().then(res=>{
            setloggedIn(true);
        }).catch(err=>{
            setloggedIn(false);
        });

    },[userNames]);

    const logOutUser=()=>{

        axios.get("/api/user/logout").then(res=>{

            navigate("/login");

        }).catch(err=>{
            console.log(err);
        });
    }

    {!loggedIn && navigate("/login")}

    return(
        <React.Fragment>
            <section className='section' id='dashboard-section'>
                <DashboardNavbar userName={userDetails} onClick={logOutUser}/>
                <div className='dashboard'>
                    <section className='overview'>
                        <div className='overview-header'>
                            <SectionHeader heading={`Overview`} />
                        </div>
                        <div className='overview-metrics'>
                            <Metrics title={`All Orders`} icon={<BsFileEarmarkBarGraph/>} number={`0`} />
                            <Metrics title={`Completed Orders`} icon={<BsFileEarmarkCheck/>} number={`0`}  />
                            <Metrics title={`Active Orders`} icon={<GiSandsOfTime/>} number={`0`} />
                            <Metrics title={`Cancelled Orders`} icon={<ImCancelCircle/>} number={`0`} />
                        </div>
                    </section>
                    <section className='create-order-section'>
                        <div className='overview-header'>
                            <SectionHeader heading={`Create New Order`} />
                        </div>
                        <div className='add-order'>
                            <div className='btn'>
                                <NewOrderButton/>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Dashboard;