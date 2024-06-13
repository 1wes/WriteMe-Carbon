// check whether the mandatroy fields in step 1 are filled
export const validateStep1 = ( formData ) => {
    
    if (!formData.service || !formData.subject || !formData.gradeLevel || !formData.style || !formData.language 
        || !formData.sources || !formData.topic || !formData.pagesOrWords || !formData.instructions
    ) {
        return false;
    }

    return true;
}

// check whether service is anything other than writing and if it has files
export const validateStep2 = ( formData ) => {
    
    if (formData.service !== 'writing' && formData.files.lenght == 0) {
        return false;
    }

    return true;
}

// check whether deadlines are filled
export const validateStep3 = (formData) => {
    
    if (!formData.deadline || !formData.time) {
        return false;
    }

    return true;
}


// validate based on active step
const validateForm = (step, formData) => {
    
    switch (step) {
        
        case 0:
            return validateStep1(formData);
        
        case 1:
            return validateStep2(formData);
        
        case 2:
            return validateStep3(formData);
        
        default:
            return false;
    }
}

export default validateForm;
