import React from 'react';
import './404.css';
import { Link } from 'react-router-dom';

const NotFound=()=>{

    return(

        <React.Fragment>
            <section className='section' id='not-found-section'>
                <div className='not-found'>
                    <h1 className='not-found-punchline'>Seems we cannot find this page !</h1>
                    <p className='not-found-tagline'>We have scoured our site, but we cannot find the page you are looking for.
                        Nevertheless, you can <span className='highlight'>check these other pages</span>. They are awesome. We promise
                        <span role='img' aria-label='wink'> 🙃</span>.
                    </p>
                    <div className='redirection-links'>
                        <span className='notfound-links'>
                            <Link className='link' to={`/`} >HOME</Link>
                        </span>
                        <span className='notfound-links'>
                            <Link className='link' to={`blog/learn-the-art-of-crafting-stories`} >OUR LATEST BLOG</Link>
                        </span>
                        <span className='notfound-links'>
                            <Link className='link' to={`/faq`} >FAQs ABOUT US</Link>
                        </span>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default NotFound;