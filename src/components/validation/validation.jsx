// check whether the mandatroy fields in step 1 are filled
export const validateStep1 = (formData) => {
    
    const { service, subject, gradeLevel, style, language, sources, topic, pagesOrwords, instructions } = formData;
    
    if (service==='' || subject==='' || gradeLevel==='' || style==='' || language==='' 
        || sources==='' || topic==='' || pagesOrwords==='' || instructions===''
    ) {
        return { isValid: false, message: 'Please fill in all fields as they are required before proceeding to the next step.' };        
    }

    return { isValid: true, message: '' };    
}

// check whether service is anything other than writing and if it has files
export const validateStep2 = (formData) => {
    
    const { service, files } = formData;
    
    if (service !== 'Writing' && files.length == 0) {
        return { isValid: false, message: 'Any other service other than writing requires files to be attached before proceeding to the next step.' };    
    }

    return { isValid: true, message: '' };
}

// check whether deadlines are filled
export const validateStep3 = (formData) => {

    const { deadline, time } = formData;
    
    if (deadline === '' || time === '') {
        return { isValid: false, message: 'Please fill in deadline date and time before proceeding to the next step' };
    }

    return { isValid: true, message: '' };
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
