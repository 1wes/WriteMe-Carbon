import React, {Fragment, useState} from 'react';
import './paginate.css';

const PageNumbers=({paginate, ordersPerPage, totalOrders})=>{

    const [index, setIndex]=useState();

    const pageNumber=[];

    for(let number=1; number<=Math.ceil(totalOrders/ordersPerPage); number++){

        pageNumber.push(number)
    }

    const changeClass=(id)=>{

        setIndex(id);
    }

    const displayedNumber=pageNumber.map((number)=>{

        return(
            <li key={number} className={index===number?"active-page":null} onClick={()=>{

                changeClass(number);

                paginate(number)}} >
                {number}
            </li>
        )
    })

    return(
        <Fragment>
            <section className='page-numbers'>
                <ul className='page-number-list'>
                    {displayedNumber}
                </ul>
            </section>
        </Fragment>
    )
}
export default PageNumbers