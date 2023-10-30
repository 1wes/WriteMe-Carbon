import React, { useLayoutEffect } from 'react';
import './blogpost.css';
import Navbar, { MobileNavbar } from './navbar';
import Footer from './footer';
import { BlogBreadcrumb } from './breadcrumb';
import { CiCamera } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import { CtaButton } from './services';
import { BlogPostLoader } from './loader';

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
                            </div>
                        </div>
                        <div className='prompt-btn'>
                            <CtaButton id={`profile-btn`} message={`Hire me`} />
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

    const postData=data;

    const breadcrumb=postData?(<BlogBreadcrumb title={postData.title} />):(<BlogBreadcrumb/>);

    const post=postData?<BlogLayout title={postData.title} tagline={postData.meta_description} author={`${postData.author.first_name} ${postData.author.last_name}`}
        time={new Date(postData.published).toLocaleTimeString()} tags={postData.tags.map((tag)=>{return(<Tags key={tag.slug} tagName={tag.name} />)})} authorTitle={postData.author.title}
        authorName={`${postData.author.first_name} ${postData.author.last_name}`} bio={postData.author.bio} avatar={postData.author.profile_image}
        date={new Date(postData.published).toLocaleDateString()} alt={postData.featured_image_alt} src={postData.featured_image} body={postData.body}/>:<BlogPostLoader/>
    
    useLayoutEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return(
        <React.Fragment>
            <Navbar/>
            <MobileNavbar/>
            <main className='section' id='blogpost-section'>
                <section className='blogpost'>
                    {breadcrumb}
                    {post}
                </section>
            </main>
            <Footer/>
        </React.Fragment>
    )
}
export default Blogpost
