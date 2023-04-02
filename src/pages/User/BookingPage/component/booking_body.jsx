
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React, {useState } from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../../../assets/css/user_css/booking_page/booking_page.scss';
import BookTime from './booking_time';
import { selectPhone } from '../../../../redux/booking/booking_page_selecter';
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
    const [activeStep, setActiveStep] = useState(0);
    const phone = useSelector(selectPhone);
    const handleNext = (e,id) => {
        if(phone !== "" && id === 0){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if( id === 1){

        }
        if(id === 2){

        }
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
                        <Step key={step.label} >
                            <StepLabel>
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    {index === 0 ? <BookingPhone /> : ''}
                                    {index === 1 ? '' : ''}
                                    {index === 2 ? <BookTime/> : ''}
                                    <div>
                                        <Button
                                            className='btn-left'
                                            variant="contained"
                                            onClick={e=>handleNext(e,index)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            className='btn-right'
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



export default BookingBody