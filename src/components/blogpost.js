import React from 'react';
import './blogpost.css';
import Navbar, { MobileNavbar } from './navbar';
import Footer from './footer';
import { BlogBreadcrumb } from './breadcrumb';
import { CiCamera } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';

const fetcher=url=>axios.get(url).then(res=>res.data.data);

const API=process.env.REACT_APP_BLOG_API_KEY;

const BlogLayout=({title, tagline, author, time, date, body, src, alt})=>{

    return(
        <React.Fragment>
            <section className='blog-layout'>
                <h1 className='blog-title'>
                    {title}
                </h1>

                <h3 className='blog-tagline'>
                    {tagline}
                </h3>
                <div className='blog-metadata'>
                    <p className='author'>{author}</p>
                    <p>{time}</p>
                    <p>{date}</p>
                </div>
                <div className='blog-cover'>
                    <img src={src} alt={alt} />
                </div>
                <p className='image-credit'><i><CiCamera/></i><span> Image credits </span>: via ButterCMS</p>
                <article className='blog-article' dangerouslySetInnerHTML={{__html:body}} />
            </section>
        </React.Fragment>
    )
}

const Blogpost=()=>{

    const location=useLocation();

    const slug=location.pathname.split("/")[2];    

    console.log(slug)

    const {data}=useSWR(`https://api.buttercms.com/v2/posts/${slug}/?auth_token=${API}`, fetcher);

    const post=data;

    console.log(post)
    return(
        <React.Fragment>
            <Navbar/>
            <MobileNavbar/>
            <main className='section' id='blogpost-section'>
                <section className='blogpost'>
                    {
                        post?<BlogBreadcrumb title={post.title}/>:<BlogBreadcrumb/>
                    }
                    {
                        post?<BlogLayout title={post.title} tagline={post.meta_description} author={post.author.first_name+""+post.author.last_name} time={post.published.split("T")[1]}
                        date={post.published.split("T")[0]} alt={post.featured_image_alt} src={post.featured_image} body={post.body}/>:<BlogLayout/>
                    }
                </section>
            </main>
            <Footer/>
        </React.Fragment>
    )
}
export default Blogpost
