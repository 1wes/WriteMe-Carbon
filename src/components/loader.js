import React from 'react';
import './loader.css';

const PlaceHolderAnimation=()=>{

    return(
        <React.Fragment>
            <div className='p-wrapper'>
                <div className='p-content'>
                </div>
            </div>
        </React.Fragment>
    )
}

const Paragraph=()=>{
    
    return(
        <React.Fragment>
            <p className='paragraph'>
                <PlaceHolderAnimation/>
            </p>
        </React.Fragment>
    )
}

const NewContentPlaceHolder=()=>{

    return(
        <React.Fragment>
            <div className='new-content-card' id='placeholder-card'>
                <div className='blog-content-card'>
                    <div className='blog-image'>
                        <img src={require('../placeholder.png')} alt='placeholder' />
                    </div>
                    <div className='blog-details'>
                        <div className='bloglist-header' id='placeholder-header'>
                            <PlaceHolderAnimation/>
                        </div>
                        <div className='bloglist-details' id='placeholder-paragraph'>
                            <Paragraph/>
                            <Paragraph/>
                            <Paragraph/>
                            <Paragraph/>
                            <Paragraph/>
                            <Paragraph/>
                            <Paragraph/>
                        </div>
                        <div className='read-more' id='placeholder-link'>
                            <PlaceHolderAnimation/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const NewContentLoader=()=>{

    return(
        <React.Fragment>
            <div className='newer-content-loader'>
                <NewContentPlaceHolder/>
                <NewContentPlaceHolder/>
            </div>
        </React.Fragment>
    )
}

const Loader=()=>{

    return(
        <React.Fragment>
            <section className='section' id='loader-section'>
                <div className='loader'>

                </div> 
            </section>
        </React.Fragment>
    )
}
export{
    NewContentLoader
}
export default Loader;