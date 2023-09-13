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
import { Logo } from './navbar';
import { Select } from './create-order';
import {LuFilterX} from 'react-icons/lu';
import Modal from './modal';
import toggleModal from '../utils.js/toggle-modal';
import PageNumbers from './paginate';
import { ModalForm } from './modal';

const fetcher=url=>axios.get(url).then(res=>res.data);

const initialState={
    subject:"",
    gradeLevel:"",
    style:"",
    sources:"",
    file:"",
    instructions:"",
    pagesOrwords:"",
    amount:"",
    deadline:"",
    time:"",
}

const reducer=(state, action)=>{

    switch(action.type){

        case "newSubject":{
            return{
                ...state,
                subject:action.newSubject,

            }
        }

        case "newGradeLevel":{
            return{
                ...state,
                gradeLevel:action.newGrade,
            }
        }

        case "newStyle":{
            return{
                ...state,
                style:action.newStyle,
            }
        }

        case "newSources":{
            return{
                ...state,
                sources:action.newSources,
            }
        }

        case "newFile":{
            return{
                ...state,
                file:action.newFile,
            }
        }

        case "newInstructions":{
            return{
                ...state,
                instructions:action.newInstructions,
            }
        }

        case "newPagesOrWords":{
            return{
                ...state,
                pagesOrwords:action.newPages,
            }
        }

        case "newAmount":{
            return{
                ...state,
                amount:action.newAmount,
            }
        }

        case "newDeadline":{
            return{
                ...state,
                deadline:action.newDeadline,
            }
        }

        case "newTime":{
            return{
                ...state,
                time:action.newTime,
            }
        }

        case "clearForm":
            return{
                subject:"",
                gradeLevel:"",
                style:"",
                sources:"",
                file:"",
                instructions:"",
                pagesOrwords:"",
                amount:"",
                deadline:"",
                time:"",
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

    const [userName, setUserName]=useState();
    const [allOrders, setAllOrders]=useState();
    const [activeOrders, setActiveOrders]=useState();
    const [completedOrders, setCompletedOrders]=useState();
    const [cancelledOrders, setCancelledOrders]=useState();
    const [orders, setOrders]=useState();
    const [loggedIn, setloggedIn]=useState(true);
    const [error, setError]=useState(false);
    const [DeadlineErrorMessage, setDeadlineErrorMessage]=useState('');
    const [searchQuery, setSearchQuery]=useState("");
    const [statusQuery, setStatusQuery]=useState('');
    const [sortQuery, setSortQuery]=useState('');
    const [filterMessage, setFilterMessage]=useState("");
    const [modal, setModal]=useState(false);
    const [currentPage, setCurrentPage]=useState(1);
    const [ordersPerPage]=useState(2);
    const [revision, setRevision]=useState("");
    const [orderId, setOrderId]=useState(null);
    const [create, setCreate]=useState(false);
    const [revise, setRevise]=useState(false);


    const [state, dispatch]=useReducer(reducer, initialState);

    const navigate=useNavigate();

    var {data}=useSWR(`/api/orders/all`, fetcher);

    const userInfo=data

    useEffect(()=>{
        if(userInfo){

            let{name, activeOrders, allOrders, cancelledOrders, completedOrders, orders}=userInfo;

            setUserName(name)
            setActiveOrders(activeOrders)
            setAllOrders(allOrders)
            setCancelledOrders(cancelledOrders)
            setCompletedOrders(completedOrders)

            const lastOrderIndex=currentPage*ordersPerPage;

            const firstOrderIndex=lastOrderIndex-ordersPerPage;
    
            const currentOrders=orders.slice(firstOrderIndex, lastOrderIndex);
    
            setOrders(currentOrders);
        }

        checkToken().then(res=>{
            setloggedIn(true);
        }).catch(err=>{
            setloggedIn(false);
        });

        if(revise || create){
            toggleModal(modal);
        }

    },[userInfo, modal, currentPage, ordersPerPage, revise, create]);

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

    const handleStyleChange=(e)=>{
        dispatch({
            type:"newStyle",
            newStyle:e.target.value
        })
    }

    const handleSourcesChange=(e)=>{
        dispatch({
            type:"newSources",
            newSources:e.target.value
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

    const handleSearch=(e)=>{

            setSearchQuery(e.target.value);
    }

    const handleStatusFilter=(e)=>{

        setStatusQuery(e.target.value);
        
        if(userInfo&&userInfo.orders.length!==0){
            
            const filterStatus=(status)=>{

                return userInfo.orders.filter((orders)=>{

                    return orders.status===status;
                })
            }

            const foundOrders=filterStatus(e.target.value);

            if(foundOrders.length>0){
                setFilterMessage("");

                setOrders(foundOrders)
            }else{
                setOrders([]);
                setFilterMessage("No orders found for this filter")
            }

        }

        if(e.target.value==="All"){
            setFilterMessage("");

            setOrders(userInfo.orders);
        }
    }

    const handleSortingFilter=(e)=>{

        setSortQuery(e.target.value);

        switch(e.target.value){

            case "Ascending":
                const ascendingOrder=orders.sort((a, b)=>{

                    return new Date(a.date_deadline)-new Date(b.date_deadline);
                });

                setOrders(ascendingOrder)

                break;

            case "Descending":
                const descendingOrder=orders.sort((a, b)=>{

                    return new Date(b.date_deadline)-new Date(a.date_deadline);
                });

                setOrders(descendingOrder);

                break;

            default:
        }
    }

    const closeModal=()=>{

        setModal(false);
        setCreate(false);
        setRevise(false);
    }

    const clearFilters=()=>{
        setFilterMessage("");
        setStatusQuery("");
        setSortQuery("");
        setOrders(userInfo.orders)
    }

    const closeModalForm=()=>{

        setOrderId(null);
        setRevision("");

        document.getElementById("rev-modal-form").style.display="none";
    }

    const handleRevision=(e)=>{

        if(e.target.value!==""){
            setRevision(e.target.value)
        }
    }

    const submitRevision=(e)=>{

        e.preventDefault();

        const revisionDetails={
            orderId:orderId,
            modificationType:"Revision",
            modificationReason:revision
        }

        axios.post("api/orders/modify-order", revisionDetails).then(res=>{

            closeModalForm();

            setModal(true);
            setRevise(true);

            return(
                <Modal mainMessage={`Success`} supportingMessage={`Your revision request has been 
                successfully submitted.`}/>
            )

        }).catch(err=>{

            console.log(err);
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

            dispatch({
                type:"clearForm"
            })

            let form=document.getElementById("assignment-form");

            setModal(true);

            setCreate(true);

            form.classList.remove("toggle-form");            
        }).catch(err=>{
            console.log(err);
        });
    });

    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    let username;
    let all;
    let complete;
    let cancelled;
    let active;
    let tableRows;
    let noOrders;
    let pages;
    let lastIndex=currentPage*ordersPerPage;
    let firstIndex=lastIndex-ordersPerPage;

    const revisionForm=(
        <ModalForm id={`rev-modal-form`} formLabel={`Please provide revision details`} message={`Request Revision`} value={revision}
         onChange={handleRevision} onSubmit={submitRevision} closeModal={closeModalForm} />
    )

    const submitAssignmentModal=(
        <Modal mainMessage={`Success`} supportingMessage={`Your assignment has been submitted successfully. You will be 
        updated on its progress.`} onClick={closeModal} />
    );

    const submitRevisionModal=(
        <Modal mainMessage={`Success`} supportingMessage={`Your revision request has been successfully sent.`} onClick={closeModal} />
    )

    if(orders){
        username=userName;
        all=allOrders;
        complete=completedOrders;
        cancelled=cancelledOrders;
        active=activeOrders;
        
        tableRows=(
            <Fragment>
                {
                orders.length===0?"":orders.filter((orders)=>{
                    if(searchQuery===""){
                        return orders
                    }else{
                        return orders.subject.toLowerCase().includes(searchQuery.toLowerCase());
                    }

                }).map((order)=>{

                    return (
                        <tr key={order.id}>
                            <td>{`Order-${order.order_id}`}</td>
                            <td>{order.subject}</td>
                            <td>{order.status}</td>
                            <td>{order.date_deadline.split("T")[0]}</td>
                            <td>
                                <GenericCtaButton id={`revision-btn`} onClick={()=>{

                                    setOrderId(order.order_id);

                                    document.getElementById("rev-modal-form").style.display="block";
                                }} message={`Order Revision`}/>
                                <GenericCtaButton id={`cancel-btn`} onClick={()=>{
                                    
                                }} message={`Cancel Order`}/>
                            </td>
                        </tr>
                    )
                })
                }
            </Fragment>
        )

        noOrders=orders.length===0?
            filterMessage===""?(<span className='no-orders'><p>You have not submitted any assignments yet. Click on <b className="highlight">Create New Order </b>to submit.
            Once you do, they will appear here.</p></span>):<span className='no-orders'>{filterMessage}</span>
        :"";

        pages=orders.length===0?"":(
            <Fragment>
                <PageNumbers paginate={paginate} ordersPerPage={ordersPerPage} totalOrders={userInfo.orders.length} />
                <span className='pagination-legend'>Showing {firstIndex+1}-{lastIndex} of {userInfo.orders.length} orders</span>
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
                        <div className="new-order">
                            <div className='add-order'>
                                <div className='btn'>
                                    <NewOrderButton onClick={displayForm} />
                                </div>
                            </div>
                            <div className='new-submission' id='assignment-form'>
                                <SubmissionForm onSubmit={submitAssignment} onSubjectChange={handleSubjectChange} onGradeChange={handleGradeChange}
                                    onStyleChange={handleStyleChange} onSourcesChange={handleSourcesChange} 
                                    onFileChange={handleFileChange} onInstructionChange={handleInstructionChange} onPagesChange={handlePagesChange} 
                                    onAmountChange={handleAmountChange} onDeadlineChange={handleDeadlineChange} onTimeChange={handleTimeChange} 
                                    subjectValue={state.subject} gradeValue={state.gradeLevel} sourcesValue={state.sources} styleValue={state.style} 
                                    instructionsValue={state.instructions}pagesOrwordsValue={state.pagesOrwords} amountValue={state.amount} 
                                    deadlineValue={state.deadline} timeValue={state.time} deadlineErrorAlert={DeadlineErrorAlert} />
                            </div>
                        </div>
                    </section>
                    <section className='all-orders'>
                        <DashSectionHeaders heading={`All Orders`} />
                        <div className='orders-wrapper'>
                            <div className='search-section'>
                                <form className='search-form'>
                                    <div className='input-group'>
                                        <input type='text' value={searchQuery} onChange={handleSearch} placeholder='Search orders by subject'></input>
                                    </div>
                                </form>
                                <div className="filters"> 
                                    <Select value={statusQuery} name={`status-filter`} onChange={handleStatusFilter} >
                                        <option value={``} hidden disabled>Filter by status</option>
                                        <option value={`Active`}>Active</option>
                                        <option value={`Completed`}>Completed</option>
                                        <option value={`Cancelled`}>Cancelled</option>
                                        <option value={`All`}>All</option>
                                    </Select>
                                    <Select value={sortQuery} name={`deadline-sort-filter`} onChange={handleSortingFilter}>
                                        <option value={``} hidden disabled>Filter by deadline</option>
                                        <option value={`Ascending`}>Ascending</option>
                                        <option value={`Descending`}>Descending</option>
                                    </Select>
                                    <div>
                                        <button className='clear-filters' type='button' onClick={clearFilters}>
                                            <LuFilterX/><span>Clear Filters</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <OrdersTable>
                                {tableRows}
                            </OrdersTable>
                            {noOrders}
                            {pages}
                            {revisionForm}
                        </div>
                    </section>
                </div>
                {revise && submitRevisionModal}
                {create && submitAssignmentModal}
            </section>
        </React.Fragment>
    )
}
export default Dashboard;