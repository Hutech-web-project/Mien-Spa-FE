
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../../../assets/scss/user_css/booking_page/booking_page.scss';
import BookingTime from './booking_time';
import { selectDate, selectPhone, selectTime } from '../../../../redux/Booking/booking_page_selecter';
import BookingPhone from './booking_phone';

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
    const timeSelect = useSelector(selectTime);
    const dateSelect = useSelector(selectDate);
    const phoneInput = useSelector(selectPhone);
    console.log(phoneInput)
    const handleNext = (id) => {
        if(id ===0 && phoneInput !== ""){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }else if(id ===1 && phoneInput !== ""){

        }else if(id ===2 && phoneInput !== ""){
            
        }else{
            return;
        }
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                            <StepLabel>
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    {index === 0 ? <BookingPhone/> : ''}
                                    {/* {index === 1 ? <BookingPhone/> : ''} */}
                                    {index === 2 ? <BookingTime/> : ''}
                                    <div>
                                        <Button
                                            className='btn-next'
                                            variant="contained"
                                            onClick={(e)=>handleNext(index)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            className='btn-back'
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


export default BookingBody