import React , { useState } from 'react';
import './bloglist.css';
import SectionHeader from "./heading";
import {BiChevronRight} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {BsArrowRight} from 'react-icons/bs';
import axios from 'axios';
import useSWR from 'swr';

const API=process.env.REACT_APP_BLOG_API_KEY;

const fetcher=url=>axios.get(url).then(res=>res.data.data);

const NewerContent=({src,alt,published, title, summary, link })=>{

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
                        <img src={src} alt={alt} />
                        <div className='date-posted'>
                            {published}
                        </div>
                    </div>
                    <div className='blog-details'>
                        <h2 className='bloglist-header'>
                            {title}
                        </h2>

                        <p className='bloglist-details'>
                            {summary}
                        </p>

                        <div> 
                            <Link to={link} className='read-more' onMouseOver={changeIcon} onMouseOut={removeIcon} >
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
            <div className='old-content-card'>
                <div className='hr-blog-content-card'>
                    <div className='blog-image' id='hr-blog-image'>
                        <img src={require('../blog.jpeg')} alt='blog-cover'/>
                        <div className='date-posted'>
                            May 31st, 2023
                        </div>
                    </div>
                    <div className='hr-blog-details'>
                        <h3 className='hr-bloglist-header'>
                            <Link to={`/blog/3`} id='bloglist-link'>
                                Why are many people opting for APA?
                            </Link>
                        </h3>

                        <p className='hr-bloglist-details'>
                        We are determined to ensure that our clients
                         are highly satisfied and will get value for 
                         their money.
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const Bloglist=()=>{

    const {data}=useSWR(`https://api.buttercms.com/v2/posts?auth_token=${API}` ,fetcher);

    const blogPosts=data;

    console.log(blogPosts);

    return(
        <React.Fragment>
            <section className='section' id='bloglist-section'>
                <div className='bloglist'>
                    <SectionHeader heading={`Latest News`} />
                    <div className='bloglist-content'>
                        <div className='newer-content'>
                            {
                                blogPosts?blogPosts.map((post)=>{
                                    return(
                                        <NewerContent key={post.slug} title={post.title} summary={post.summary} published={post.published.split("T")[0]} alt={post.featured_image_alt}
                                         src={post.featured_image} link={`/blog/${post.slug}`} />
                                    )
                                }):<NewerContent/>
                            }
                        </div>
                        <div className='older-content'>
                            <OlderContent/>
                            <OlderContent/>
                            <OlderContent/>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Bloglist;