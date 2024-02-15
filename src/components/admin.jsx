import React, {Fragment, useEffect, useState} from 'react';
import './admin.css';
import { DashSectionHeaders, Metrics, OrdersTable, Search, GenericCtaButton } from './dashboard';
import DashboardNavbar from './dash-nav';
import useSWR from 'swr';
import axios from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom';
import checkToken from '../utils/check-token';
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
    const [ordersPerPage]=useState(8);
    const [searchQuery, setSearchQuery]=useState("");
    const [statusQuery, setStatusQuery]=useState('');
    const [sortQuery, setSortQuery]=useState('');
    const [filterMessage, setFilterMessage]=useState("");

    const navigate=useNavigate();

    const {data}=useSWR(`/api/orders/admin`, fetcher);

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

        checkToken().then(()=>{
            setLoggedIn(true)
        }).catch(()=>{
            setLoggedIn(false)
        })

    },[data, currentPage, ordersPerPage]);

    const logoutUser=()=>{

        axios.get("/api/user/logout").then(()=>{

            navigate("/login")
        }).catch(()=>{
            setLoggedIn(false);
        })
    }

    const handleSearch=(e)=>{

        setSearchQuery(e.target.value);
    }

    const handleStatus=(e)=>{
        setStatusQuery(e.target.value);

        if(data && data.allOrders.length!==0){

            const filterStatus=(status)=>{

                return data.allOrders.filter((orders)=>{

                    return orders.status===status;
                })
            }

            const foundOrders=filterStatus(e.target.value);

            if(foundOrders.length>0){
                setFilterMessage("");

                setAllOrders(foundOrders)
            }else{
                setAllOrders([]);
                setFilterMessage("No orders found for this filter")
            }

            if(e.target.value==="All"){
                setFilterMessage("");
    
                setAllOrders(data.allOrders);
            }
        }
    }
    
    const handleSort=(e)=>{
        setSortQuery(e.target.value);

        let ascendingOrder;
        let descendingOrder;
        
        switch(e.target.value){

            case "Ascending":
                ascendingOrder=allOrders.sort((a, b)=>{

                    return new Date(a.date_deadline)-new Date(b.date_deadline);
                });

                setAllOrders(ascendingOrder)

                break;

            case "Descending":
                descendingOrder=allOrders.sort((a, b)=>{

                    return new Date(b.date_deadline)-new Date(a.date_deadline);
                });

                setAllOrders(descendingOrder);

                break;

            default:
        }
    }

    const clearFilters=()=>{

        setFilterMessage("");
        setStatusQuery("");
        setSortQuery("");
        setAllOrders(data.allOrders)
    }

    !loggedIn && navigate("/login");

    let name;
    let lastIndex=currentPage*ordersPerPage;
    let firstIndex=lastIndex-ordersPerPage;

    if(adminName){
        name=adminName
    }

    const tableRows=(
        <Fragment>
            {
                allOrders.length!==0?allOrders.filter((orders)=>{
                    if(searchQuery===""){
                        return allOrders
                    }else{
                        return orders.topic.toLowerCase().includes(searchQuery.toLowerCase());
                    }
                }).map((order)=>{

                    return(
                        <tr key={order.id}>
                            <td> {`Order-${order.order_id}`} </td>
                            <td> {order.topic} </td>
                            <td> {order.status} </td>
                            <td> {order.date_deadline.split("T")[0]} </td>
                            <td>
                                <Link to={`/admin/Order-${order.order_id}`} className='link'>
                                    <GenericCtaButton id={`order-link`} message={`View Order`} />
                                </Link>
                            </td>
                        </tr>
                    )
                }):""
            }
        </Fragment>
    )

    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    const pages=allOrders.length===0?"":(
        <Fragment>
            <PageNumbers paginate={paginate} ordersPerPage={ordersPerPage} totalOrders={data.allOrders.length} />
            <span className='pagination-legend'>Showing {firstIndex+1}-{firstIndex+allOrders.length} of {data.allOrders.length} orders</span>
        </Fragment>
    );

    const noOrders=allOrders.length===0?
    filterMessage===""?(<span className='no-orders'><p>No Assignments have been submitted yet.
    Once they are, they will appear here.</p></span>):<span className='no-orders'>{filterMessage}</span>:"";

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
                            <Search searchValue={searchQuery} onSearchChange={handleSearch} statusValue={statusQuery} 
                            onStatusChange={handleStatus} sortValue={sortQuery} onSortChange={handleSort}
                            onClearClick={clearFilters}  />
                            <OrdersTable>
                                {tableRows}
                            </OrdersTable>
                            {pages}
                            {noOrders}
                        </div>
                    </section>
                </div>
            </section>
        </Fragment>
    )
}
export default Admin;