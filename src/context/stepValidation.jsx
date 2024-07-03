import React, { createContext, useContext, useState } from 'react';


const StepsValidationContext = createContext();

const useStepsValidationContext = () => {
    
    return useContext(StepsValidationContext);
}

const StepsValidation = ({ children }) => {
    
    const [navigateToNextStep, setNavigateToNextStep] = useState({
        isValid: true,
        message: ''
    });

    const updateValidation = (status, message) => {
        
        setNavigateToNextStep({
            ...navigateToNextStep,
            isValid: status,
            message: message
        });
    }

    const { isValid, message } = navigateToNextStep;

    return (
        <StepsValidationContext.Provider value={{isValid, message, updateValidation}} >
            {children}
        </StepsValidationContext.Provider>
    )
}

export {
    useStepsValidationContext
}
export default StepsValidation;