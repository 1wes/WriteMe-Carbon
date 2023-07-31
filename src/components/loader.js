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

const PlaceHolderHeader=()=>{

    return(
        <React.Fragment>
            <div className='bloglist-header' id='placeholder-header'>
                <PlaceHolderAnimation/>
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
                        <PlaceHolderHeader/>
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

const OlderContentPlaceHolder=()=>{

    return(
        <React.Fragment>
            <div className='old-content-card'>
                <div className='hr-blog-content-card' id='placeholder-hr-card'>
                    <div className='blog-image' id='hr-blog-image'>
                        <img src={require('../placeholder.png')} alt='placeholder'/>
                    </div>
                    <div className='hr-blog-details'>
                        <h3 className='hr-bloglist-header'>
                            <PlaceHolderHeader/>
                        </h3>

                        <p className='hr-bloglist-details'>
                            <Paragraph/>
                            <Paragraph/>
                            <Paragraph/>
                            <Paragraph/>
                        </p>
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

const OldContentLoader=()=>{

    return(
        <React.Fragment>
            <div className='older-content-loader'>
                <OlderContentPlaceHolder/>
                <OlderContentPlaceHolder/>
                <OlderContentPlaceHolder/>
            </div>
        </React.Fragment>
    )
}
export{
    NewContentLoader,
}
export default OldContentLoader;