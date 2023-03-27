
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../assets/css/user_css/booking_page/booking_page.scss';
import { addPhone } from '../../../../redux/phone_reducer';
import { selectPhone } from '../../../../redux/phone_selecter';

const steps = [
    {
        label: 'Phone number',
    },
    {
        label: 'Choose a service',
    },
    {
        label: 'Select date and time',
    },
];


const BookingBody = () => {
    const [valueSearch, setValueSearch] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    // useEffect(()=>{
    //     nextStepper();
    // },[])
    const phone = useSelector(selectPhone);
    // const nextStepper = ()  =>{
       
    // }
    console.log(phone);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <>
            <Container className='booking'>
                <h4> Booking services</h4>
                <Stepper activeStep={activeStep} orientation="vertical" >
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                            // optional={
                            //     index === 2 ? (
                            //         <Typography variant="caption">Last step</Typography>
                            //     ) : null
                            // }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    {index === 0 ? <InputPhoneNumber error={valueSearch} /> : ''}
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Container>
        </>
    )
}

const InputPhoneNumber = (prop) => {
    const dispatch = useDispatch();
    const _hanldeChange = (e) =>{
        dispatch(addPhone(e.target.value));
    }

    return (
        <Col md={6}>
            <label for="validationCustom03" class="form-label">City</label>
            <input type="text" class="form-control" id="validationCustom03" onChange={_hanldeChange} />
            {
                prop.error === true ?
                    <div class="invalid-feedback">
                        Please provide a valid city.
                    </div> : ''
            }
        </Col>
    )
}

export default BookingBody