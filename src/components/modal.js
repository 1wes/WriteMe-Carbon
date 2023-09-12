import React, {Fragment} from 'react';
import './modal.css';
import {BiCheck} from 'react-icons/bi'

const Modal=({onClick, mainMessage, supportingMessage})=>{

    return(
        <Fragment>
            <div className='modal-wrapper' id='modal-wrap'>
                <div className='modal-contents'>
                    <div className='modal'>
                        <div className='success-icon'>
                            <i className='success'><BiCheck/></i>
                        </div>
                        <h2>
                            {mainMessage}
                        </h2>
                        <p>
                            {supportingMessage}
                        </p>
                        <button onClick={onClick}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Modal;