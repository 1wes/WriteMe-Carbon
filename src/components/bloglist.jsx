import React , { useState } from 'react';
import './bloglist.css';
import SectionHeader from "./heading";
import {BiChevronRight} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {BsArrowRight} from 'react-icons/bs';
import axios from 'axios';
import useSWR from 'swr';
import  OldContentLoader,{ NewContentLoader } from './loader';

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

    let arrow;

    arrow=longArrow?(<BsArrowRight/>):(<BiChevronRight/>);

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
                                Read More <i>{arrow}</i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const OlderContent=({date, link, title, summary, image, alt})=>{

    return(
        <React.Fragment>
            <div className='old-content-card'>
                <div className='hr-blog-content-card'>
                    <div className='blog-image' id='hr-blog-image'>
                        <img src={image} alt={alt}/>
                        <div className='date-posted'>
                            {date}
                        </div>
                    </div>
                    <div className='hr-blog-details'>
                        <h3 className='hr-bloglist-header'>
                            <Link to={link} id='bloglist-link'>
                                {title}
                            </Link>
                        </h3>

                        <p className='hr-bloglist-details'>
                            {summary}
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

    let newerContent;
    let oldContent;

    newerContent=blogPosts?blogPosts.slice(0, 2).map((post)=>{
        return(
            <NewerContent key={post.slug} title={post.title} summary={post.summary.substring(0, 322)+"..."} published={post.published.split("T")[0]} 
             alt={post.featured_image_alt}
             src={post.featured_image} link={`/blog/${post.slug}`} />)}):(<NewContentLoader/>)

    oldContent=blogPosts?blogPosts.slice(2, blogPosts.length).map((post)=>{
        return(
            <OlderContent key={post.slug} title={post.title} image={post.featured_image} link={`/blog/${post.slug}`} date={post.published.split("T")[0]}
            alt={post.featured_image_alt} summary={post.summary.substring(0, 110)+"..."} />
        )
    }):(<OldContentLoader/>)

    return(
        <React.Fragment>
            <section className='section' id='bloglist-section'>
                <div className='bloglist'>
                    <SectionHeader heading={`Latest News`} />
                    <div className='bloglist-content'>
                        <div className='newer-content'>
                            {
                                newerContent
                            }
                        </div>
                        <div className='older-content'>
                            {
                                oldContent
                            }
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Bloglist;