import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "../../../../assets/scss/user_css/booking_page/booking_page.scss";
import BookingTime from "./booking_time";
import {
  selectCheckPhone,
  selectDate,
  selectTime,
  selectServices,
  selectPhone,
} from "../../../../redux/Booking/booking_page_selecter";
import BookingPhone from "./booking_phone";
import { ToastContainer, toast } from 'react-toastify'
import BookingServices from "./booking_services";
import { postOrderSer } from "../../../../redux/Booking/booking_page_thunk.js";
import { useNavigate } from "react-router-dom";
const steps = [
  {
    label: "Phone number",
  },
  {
    label: "Choose a service",
  },
  {
    label: "Select date and time",
  },
];
const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const BookingBody = () => {
  // const [valueSearch, setValueSearch] = useState(false);
  const [booking, setBooking] = useState({
    listSer: [""],
    orSerStartTime: "",
    orSerEndTime: "",
    orSerPhoneNo: "",
    orSerStatus: "Đang tiến hành",
    orSerUserId: "",
    orSer_Note: "",
    orSer_Total: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [error,setError]  = useState(false);
  const [errorTime,setErrorTime]  = useState(false);
  const timeSelect = useSelector(selectTime);
  const dateSelect = useSelector(selectDate);
  const phoneInput = useSelector(selectCheckPhone);
  const phone = useSelector(selectPhone);
  const services = useSelector(selectServices);

  const handleNext = (id) => {
    console.log(services)
    if (id === 0 && phoneInput === true) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setBooking((preState) => ({
        ...preState,
        orSerPhoneNo: phone,
      }));
    } else if (id === 1) {
      if(services.length > 0){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        const list = [];
        services.forEach((element) => {
          list.push({
            ordSerServiceId: element.seId,
            ordSerServiceName: element.seName,
            ordSerServicePrice: element.sePrice,
          });
        });
        const total = services?.reduce(
          (preValue, currentValue) => preValue + currentValue.sePrice,
          0
        );
        setBooking((preState) => ({
          ...preState,
          listSer: list,
          orSer_Total: total,
        }));
      }else{
        setError(true);
      }
     
    }  else {
      return;
    };
  };

  useEffect(() => {
    if (activeStep === 2) {
      if(timeSelect !== ""){
        let endTime = parseInt(timeSelect.slice(0, timeSelect.indexOf(":"))) + 1;
        setBooking((preState) => ({
          ...preState,
          orSerStartTime: `${dateSelect}T${timeSelect}:00:00Z`,
          orSerEndTime:
            endTime >= 10
              ? `${dateSelect}T${endTime}:00:00Z`
              : `${dateSelect}T0${endTime}:00:00Z`,
        }));
      }
     
    }
  }, [activeStep,phoneInput,timeSelect,dateSelect]);

  useEffect(() => {
    if (services.length > 0) {
      setError(false);
    }
    if(timeSelect !== ""){
      setErrorTime(false);
    }
  }, [services,timeSelect]);

  const hanldeOrder = () => {
    if(timeSelect !== ""){
      if (booking.orSerEndTime !== "" && booking.orSerStartTime !== "") {   
        dispatch(postOrderSer(booking)).then(async(res1) => {
          if (res1.payload === 201) {
            toast.success('Booking success !', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600
            });
            await delay(800);
            navigate(0);
          } else {
            toast.error('Booking fail !', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600
            });
          }
      });
      }
    }else{
      setErrorTime(true);
    }   
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <Container className="booking">
        <h4> Booking services</h4>
        {/* <BookingTime/> */}
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  {index === 0 ? <BookingPhone /> : ""}
                  {index === 1 ? <BookingServices error={error} /> : ""}
                  {index === 2 ? <BookingTime error={errorTime} /> : ""}
                  <div>
                    <Button
                      className="btn-next"
                      variant="contained"
                      onClick={index === steps.length - 1 ?hanldeOrder :() => handleNext(index)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      className="btn-back"
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
        <ToastContainer />
      </Container>
    </>
  );
};

export default BookingBody;
