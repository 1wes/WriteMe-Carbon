import React , {useState} from 'react';
import './bloglist.css';
import SectionHeader from "./heading";
import {BiChevronRight} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {BsArrowRight} from 'react-icons/bs';

const NewerContent=()=>{

    const [longArrow, setLongArrow]=useState(false);

    const changeIcon=()=>{
        setLongArrow(true)
    }

    const removeIcon=()=>{
        setLongArrow(false)
    }

    return(
        <React.Fragment>
            <div className='new-content-card'>
                <div className='blog-content-card'>
                    <div className='blog-image'>
                        <img src={require('../testi2.jpeg')} />
                        <div className='date-posted'>
                            May 31st, 2023
                        </div>
                    </div>
                    <div className='blog-details'>
                        <h2 className='bloglist-header'>
                            Learn how to write Awesome papers
                        </h2>

                        <p className='bloglist-details'>
                        We are determined to ensure that our clients are 
                        highly satisfied and will get value for their money. 
                        We allow for revisions and chargebacks when clients 
                        are unsatisfied with the services offered.
                        </p>

                        <div> 
                            <Link className='read-more' onMouseOver={changeIcon} onMouseOut={removeIcon} >
                                Read More <i>{longArrow?<BsArrowRight/>:<BiChevronRight/>}</i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const OlderContent=()=>{

    return(
        <React.Fragment>
            <div>
            </div>
        </React.Fragment>
    )
}

const Bloglist=()=>{

    return(
        <React.Fragment>
            <section className='section' id='bloglist-section'>
                <div className='bloglist'>
                    <SectionHeader heading={`Latest News`} />
                    <div className='bloglist-content'>
                        <div className='newer-content'>
                            <NewerContent/>
                            <NewerContent/> 
                        </div>
                        <div className='older-content'>
                            <OlderContent/>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Bloglist;