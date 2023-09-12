import React, {Fragment} from 'react';
import './paginate.css';

const PageNumbers=({paginate, ordersPerPage, totalOrders})=>{

    const pageNumber=[];

    for(let number=1; number<=Math.ceil(totalOrders/ordersPerPage); number++){

        pageNumber.push(number)
    }

    const displayedNumber=pageNumber.map((number)=>{

        return(
            <li key={number} onClick={()=>{paginate(number)}} className='number' >
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