import React, {Fragment} from 'react';
import './modal.css';
import {BiCheck} from 'react-icons/bi';
import { FormControl, TextArea } from './create-order';
import { CtaButton } from './services';

const ModalWrapper=({children, className, id})=>{

    return (
        <Fragment>
            <div className={className} id={id}>
                <div className='modal-contents'>
                    <div className='modal'>
                        {children}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const ModalForm=({formLabel,value, onChange, message, onSubmit, id, closeModal})=>{

    return(
        <Fragment>
            <ModalWrapper id={id} >
                <form onSubmit={onSubmit}>
                    <FormControl label={formLabel} labelClassName={`required`} >
                        <TextArea value={value} onChange={onChange} required={true}>
                        </TextArea>
                    </FormControl>
                    <div className='modal-form-btn'>
                        <CtaButton type={`submit`} id={`form-modal-button`} message={message}/>
                        <CtaButton type={`button`} id={`modal-cancel-btn`} message={`Cancel`} onClick={closeModal}/>
                    </div>
                </form>
            </ModalWrapper>
        </Fragment>
    )
}

const Modal=({onClick, mainMessage, supportingMessage})=>{

    return(
        <Fragment>
            <ModalWrapper className={`modal-wrapper`} id={`modal-wrap`}>
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
            </ModalWrapper>
        </Fragment>
    )
}
export{
    ModalForm
}
export default Modal;
