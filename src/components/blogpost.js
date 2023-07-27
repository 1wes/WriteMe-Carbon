import React from 'react';
import './blogpost.css';
import Navbar, { MobileNavbar } from './navbar';
import Footer from './footer';
import { BlogBreadcrumb } from './breadcrumb';
import { CiCamera } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import { CtaButton } from './services';

const fetcher=url=>axios.get(url).then(res=>res.data.data);

const API=process.env.REACT_APP_BLOG_API_KEY;

const BlogLayout=({title, tagline, author, time, date, body, src, alt,tags, authorTitle, bio, authorName, avatar})=>{

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
                    <p>{time} UTC</p>
                    <p>{date}</p>
                </div>
                <div className='blog-cover'>
                    <img src={src} alt={alt} />
                </div>
                <p className='image-credit'><i><CiCamera/></i><span> Image credits </span>: via ButterCMS</p>
                <article className='blog-article' dangerouslySetInnerHTML={{__html:body}} />
                <div className='tags'>
                    {tags}
                </div>
                <div className='author-profile'>
                        <div className='cover'>
                            <span></span><span className='author-profile-name'>{authorName}</span>
                        </div>
                        <div className='author-details'>
                            <img src={avatar} />
                            <div className='bio-holder'>
                            </div>
                            <div className='bio'>
                                <span className='title'>{authorTitle}</span>
                                <p className='author-bio'>{bio}</p>
                                <CtaButton message={`Hire me`} />
                            </div>
                        </div>
                </div>
            </section>
        </React.Fragment>
    )
}

const Tags=({tagName})=>{

    return(
        <React.Fragment>
            <span>
                {tagName}
            </span>
        </React.Fragment>
    )
}

const Blogpost=()=>{

    const location=useLocation();

    const slug=location.pathname.split("/")[2];    

    const {data}=useSWR(`https://api.buttercms.com/v2/posts/${slug}/?auth_token=${API}`, fetcher);

    const post=data;

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
                        post?<BlogLayout title={post.title} tagline={post.meta_description} author={`${post.author.first_name} ${post.author.last_name}`}
                         time={post.published.split("T")[1]} tags={post.tags.map((tag)=>{return(<Tags key={tag.slug} tagName={tag.name} />)})} authorTitle={post.author.title}
                         authorName={`${post.author.first_name} ${post.author.last_name}`} bio={post.author.bio} avatar={post.author.profile_image}
                        date={post.published.split("T")[0]} alt={post.featured_image_alt} src={post.featured_image} body={post.body}/>:<BlogLayout/>
                    }
                </section>
            </main>
            <Footer/>
        </React.Fragment>
    )
}
export default Blogpost
