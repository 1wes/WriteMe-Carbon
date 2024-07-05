import React, { createContext, useContext, useState } from 'react';


const ModalContext = createContext();

const useModalContext = () => {
    
    return useContext(ModalContext);
}

const ModalContextProvider = ({children}) => {
    
    const [modal, setModal] = useState({
        showModal: false,
        mainMessage: '',
        supportingMessage:'',
        warning: false
    });

    // functions to display and close.hide modal
    const displayModal = (warning, header, subtext) => {         

        setModal({
            ...modal,
            showModal: true,
            warning: warning,
            mainMessage: header,
            supportingMessage:subtext
        });
    }

    const hideModal = () => {
        
        setModal({
            ...modal,
            showModal: false,
            warning: false,
            mainMessage: '',
            supportingMessage:''
        });
    }
    // end of the two functions

    return (
        <ModalContext.Provider value={{displayModal, hideModal, modal, setModal}}>
            {children}
        </ModalContext.Provider>
    ) 
}
export {
    useModalContext
}

export default ModalContextProvider;