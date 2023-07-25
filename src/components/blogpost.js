import React from 'react';
import './blogpost.css';
import Navbar from './navbar';
import Footer from './footer';
import { BlogBreadcrumb } from './breadcrumb';
import { CiCamera } from 'react-icons/ci';

const BlogLayout=()=>{

    return(
        <React.Fragment>
            <section className='blog-layout'>
                <h1 className='blog-title'>
                    What to do about your traction slide when you don't have revenue yet
                </h1>

                <h3 className='blog-tagline'>
                    Your traction slide needs to describe the risk you've designed out of the business
                </h3>
                <div className='blog-metadata'>
                    <p className='author'>Kevin McSereti</p>
                    <p>14:23 GMT +3</p>
                    <p>Fri, Jul 26, 2023</p>
                </div>
                <div className='blog-cover'>
                    <img src={require('../blog.jpeg')} alt='blog-topic' />
                </div>
                <p className='image-credit'><i><CiCamera/></i><span> Image credits </span>: Personal Album</p>
                <article className='blog-article'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                 dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                 anim id est laborum
                 Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                 totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                 dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                 sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam 
                 est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi 
                 tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
                  Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
                   vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </article>
            </section>
        </React.Fragment>
    )
}

const Blogpost=()=>{

    return(
        <React.Fragment>
            <Navbar/>
            <main className='section' id='blogpost-section'>
                <section className='blogpost'>
                    <BlogBreadcrumb title={`Why many people prefer APA`} />
                    <BlogLayout/>
                </section>
            </main>
            <Footer/>
        </React.Fragment>
    )
}
export default Blogpost
