import { Fragment, useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

import './stepper.css';

const FormStepper = () => {

    const [activeStep, setActiveStep] = useState(0);



    const steps = [
        { title: "Order specifics" },
        { title: "Files" },
        { title: "Deadline" },
        { title: "Payment" }
    ]
    
    return (
        <Fragment>
            <Stepper className='form-stepper' activeStep={activeStep} alternativeLabel sx={{mt:6, mb:6,fontSize:5}}>
                {steps.map((step, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel className='step-label' ><div  className='step-title'>{ step.title }</div></StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </Fragment>
    )
}
export default FormStepper;