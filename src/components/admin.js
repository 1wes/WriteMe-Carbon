import React, {Fragment, useEffect, useState} from 'react';
import './admin.css';
import { DashSectionHeaders, Metrics, DashboardNavbar, OrdersTable, Search, GenericCtaButton } from './dashboard';
import useSWR from 'swr';
import axios from '../utils.js/axios';
import { useNavigate, Link } from 'react-router-dom';
import checkToken from '../utils.js/check-token';
import { BsFileEarmarkBarGraph, BsFileEarmarkCheck } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';
import PageNumbers from './paginate';

const fetcher=url=>axios.get(url).then(res=>res.data);

const Admin=()=>{

    const [adminName, setAdminName]=useState('');
    const [loggedIn, setLoggedIn]=useState(true);
    const [totalOrders, settotalOrders]=useState(0);
    const [activeOrders, setActiveOrders]=useState(0);
    const [completedOrders, setCompletedOrders]=useState(0);
    const [cancelledOrders, setCancelledOrders]=useState(0);
    const [allOrders, setAllOrders]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [ordersPerPage]=useState(10);

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

            const lastOrderIndex=currentPage*ordersPerPage;

            const firstOrderIndex=lastOrderIndex-ordersPerPage;
    
            const currentOrders=allOrders.slice(firstOrderIndex, lastOrderIndex);
    
            setAllOrders(currentOrders);

        }

        checkToken().then(res=>{
            setLoggedIn(true)
        }).catch(err=>{
            setLoggedIn(false)
        })

    },[data, currentPage, ordersPerPage]);

    const logoutUser=()=>{

        axios.get("/api/user/logout").then(res=>{

            navigate("/login")
        }).catch(err=>{
            setLoggedIn(false);
        })
    }

    !loggedIn && navigate("/login");

    let name;
    let lastIndex=currentPage*ordersPerPage;
    let firstIndex=lastIndex-ordersPerPage;

    if(adminName){
        name=adminName
    }

    const tableRows=(
        allOrders.map((order)=>{

            return (
                <tr key={order.order_id}>
                    <td>{`Order-${order.order_id}`}</td>
                    <td>{order.subject}</td>
                    <td>{order.status}</td>
                    <td>{order.date_deadline.split("T")[0]}</td>
                    <td><Link className='link'><GenericCtaButton id={`order-link`} message={`View Order`} /></Link></td>
                </tr>
            )
        })
    )

    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    const pages=allOrders.length===0?"":(
        <Fragment>
            <PageNumbers paginate={paginate} ordersPerPage={ordersPerPage} totalOrders={data.allOrders.length} />
            <span className='pagination-legend'>Showing {firstIndex+1}-{lastIndex} of {data.allOrders.length} orders</span>
        </Fragment>
    )

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
                    <section className='all-orders'>
                        <DashSectionHeaders heading={`All Orders`} />
                        <div className='orders-wrapper'>
                            <Search/>
                            <OrdersTable>
                                {tableRows}
                            </OrdersTable>
                            {pages}
                        </div>
                    </section>
                </div>
            </section>
        </Fragment>
    )
}
export default Admin;