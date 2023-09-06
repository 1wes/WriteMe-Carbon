import React, {Fragment, useState, useEffect, useReducer} from 'react';
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
import SubmissionForm ,{ Error } from './create-order';

const fetcher=url=>axios.get(url).then(res=>res.data);

const reducer=(state, action)=>{

    switch(action.type){

        case "newSubject":{
            return{
                subject:action.newSubject,
                gradeLevel:state.gradeLevel,
                file:state.file,
                instructions:state.instructions,
                pagesOrwords:state.pagesOrwords,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
            }
        }

        case "newGradeLevel":{
            return{
                gradeLevel:action.newGrade,
                subject:state.subject,
                file:state.file,
                instructions:state.instructions,
                pagesOrwords:state.pagesOrwords,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
            }
        }

        case "newFile":{
            return{
                file:action.newFile,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions,
                pagesOrwords:state.pagesOrwords,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
            }
        }

        case "newInstructions":{
            return{
                instructions:action.newInstructions,
                pagesOrwords:state.pagesOrwords,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject
            }
        }

        case "newPagesOrWords":{
            return{
                pagesOrwords:action.newPages,
                amount:state.amount,
                deadline:state.deadline,
                time:state.time,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions
            }
        }

        case "newAmount":{
            return{
                amount:action.newAmount,
                pagesOrwords:state.pagesOrwords,
                deadline:state.deadline,
                time:state.time,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions
            }
        }

        case "newDeadline":{
            return{
                deadline:action.newDeadline,
                amount:state.amount,
                pagesOrwords:state.pagesOrwords,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions,
                time:state.time,
            }
        }

        case "newTime":{
            return{
                time:action.newTime,
                deadline:state.deadline,
                amount:state.amount,
                pagesOrwords:state.pagesOrwords,
                file:state.file,
                gradeLevel:state.gradeLevel,
                subject:state.subject,
                instructions:state.instructions
            }
        }

        default:
    }

}

const DashSectionHeaders=({heading})=>{

    return(
        <Fragment>
            <div className='overview-header'>
                <SectionHeader id={`dash-header`} heading={heading} />
            </div>
        </Fragment>
    )
}

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

const NewOrderButton=({onClick})=>{

    return (
        <Fragment>
            <button type='button' className='add-button' onClick={onClick} >
                <span>Create New Order</span>
                <span className='button-icon'><i><FiPlus/></i></span>
            </button>
        </Fragment>
    )
}

const OrdersTable=({children})=>{

    return(
        <Fragment>
            <table className='orders-table'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>                        
        </Fragment>
    )
}

const GenericCtaButton=({id, onClick, message})=>{

    return(
        <button className='generic-cta-btn' type='button' id={id} onClick={onClick}>
            {message}
        </button>
    )
}

const Dashboard=()=>{

    const [userDetails, setUserDetails]=useState();
    const [loggedIn, setloggedIn]=useState(true);
    const [error, setError]=useState(false);
    const [DeadlineErrorMessage, setDeadlineErrorMessage]=useState('');

    const initialState={
        subject:"",
        gradeLevel:"",
        file:"",
        instructions:"",
        pagesOrwords:"",
        amount:"",
        deadline:"",
        time:""
    }

    const [state, dispatch]=useReducer(reducer, initialState);

    const navigate=useNavigate();

    var {data}=useSWR(`/api/orders/all`, fetcher);

    const userInfo=data

    useEffect(()=>{

        setUserDetails(userInfo);

        checkToken().then(res=>{
            setloggedIn(true);
        }).catch(err=>{
            setloggedIn(false);
        });

    },[userInfo]);

    const logOutUser=()=>{

        axios.get("/api/user/logout").then(res=>{

            navigate("/login");

        }).catch(err=>{
            setloggedIn(false);
        });
    }

    const displayForm=()=>{
        let form=document.getElementById("assignment-form");

        form.classList.toggle("toggle-form")
    }

    !loggedIn && navigate("/login");

    let DeadlineErrorAlert;

    if(error){
        DeadlineErrorAlert=(
            <Error errorMessage={DeadlineErrorMessage} />
        )
    }

    const handleSubjectChange=(e)=>{

        dispatch({
            type:"newSubject",
            newSubject:e.target.value
        })
    }

    const handleGradeChange=(e)=>{

        dispatch({
            type:"newGradeLevel",
            newGrade:e.target.value
        })
    }

    const handleFileChange=(e)=>{

        const fileName=e.target.files[0];

        dispatch({
            type:"newFile",
            newFile:fileName
        })
    }

    const handleInstructionChange=(e)=>{

        dispatch({
            type:"newInstructions",
            newInstructions:e.target.value
        })
    }

    const handlePagesChange=(e)=>{

        dispatch({
            type:"newPagesOrWords",
            newPages:e.target.value
        })
    }

    const handleAmountChange=(e)=>{

        dispatch({
            type:"newAmount",
            newAmount:e.target.value
        })
    }

    const handleDeadlineChange=(e)=>{

        const checkDate=()=>{

            const deadline=new Date(e.target.value).valueOf();

            const currentDate=new Date().valueOf();

            return deadline>currentDate;
        }

        const isValid=checkDate();

        if(isValid){
            setError(false);

            dispatch({
                type:"newDeadline",
                newDeadline:e.target.value
            })
        }else{
            setError(!error);
            setDeadlineErrorMessage("deadline cannot be in the past !!");
        }
    }

    const handleTimeChange=(e)=>{

        dispatch({
            type:"newTime",
            newTime:e.target.value
        })
    }

    const submitAssignment=(e=>{

        e.preventDefault();

        let assignmentDetails= new FormData();

        for (var key in state){
            assignmentDetails.append(key, state[key])
        }

        assignmentDetails.append('fileName', state.file.name);
        
        axios.post("api/orders/new", assignmentDetails, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err);
        });
    });

    let username;
    let all;
    let complete;
    let cancelled;
    let active;
    let tableRows

    if(userDetails){
        username=userDetails.name;
        all=userDetails.allOrders;
        complete=userDetails.completedOrders;
        cancelled=userDetails.cancelledOrders;
        active=userDetails.activeOrders;
        
        tableRows=(
            <Fragment>
                {userDetails.orders.map((order)=>{

                    return (
                        <tr key={order.id}>
                            <td>{`Order-${order.order_id}`}</td>
                            <td>{order.subject}</td>
                            <td>{order.status}</td>
                            <td>{order.date_deadline.split("T")[0]}</td>
                            <td>
                                <GenericCtaButton id={`revision-btn`} onClick={()=>{

                                }} message={`Order Revision`}/>
                                <GenericCtaButton id={`cancel-btn`} onClick={()=>{
                                    
                                }} message={`Cancel Order`}/>
                            </td>
                        </tr>
                    )
                })}
            </Fragment>
        )
    }

    return(
        <React.Fragment>
            <section className='section' id='dashboard-section'>
                <DashboardNavbar userName={username} onClick={logOutUser}/>
                <div className='dashboard'>
                    <section className='overview'>
                        <DashSectionHeaders heading={`Overview`} />
                        <div className='overview-metrics'>
                            <Metrics title={`All Orders`} icon={<BsFileEarmarkBarGraph/>} number={all} />
                            <Metrics title={`Completed Orders`} icon={<BsFileEarmarkCheck/>} number={complete}  />
                            <Metrics title={`Active Orders`} icon={<GiSandsOfTime/>} number={active} />
                            <Metrics title={`Cancelled Orders`} icon={<ImCancelCircle/>} number={cancelled} />
                        </div>
                    </section>
                    <section className='create-order-section'>
                        <DashSectionHeaders heading={`New Order`} />
                        <div className='add-order'>
                            <div className='btn'>
                                <NewOrderButton onClick={displayForm} />
                            </div>
                        </div>
                        <div className='new-submission' id='assignment-form'>
                            <SubmissionForm onSubmit={submitAssignment} onSubjectChange={handleSubjectChange} onGradeChange={handleGradeChange} 
                                onFileChange={handleFileChange} onInstructionChange={handleInstructionChange} onPagesChange={handlePagesChange} 
                                onAmountChange={handleAmountChange} onDeadlineChange={handleDeadlineChange} onTimeChange={handleTimeChange} 
                                subjectValue={state.subject} gradeValue={state.gradeLevel} instructionsValue={state.instructions} pagesOrwordsValue={state.pagesOrwords}
                                amountValue={state.amount} deadlineValue={state.deadline} timeValue={state.time} deadlineErrorAlert={DeadlineErrorAlert} />
                        </div>
                    </section>
                    <section className='all-orders'>
                        <DashSectionHeaders heading={`All Orders`} />
                        <div>
                            <form className='search-form'>
                                <div className='input-group'>
                                    <input type='search' placeholder='Search orders' ></input>
                                </div>
                            </form>
                        </div>
                        <OrdersTable>
                            {tableRows}
                        </OrdersTable>
                    </section>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Dashboard;