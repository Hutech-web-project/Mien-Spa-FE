import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addPhone, clearPhone } from "../../../../redux/Booking/booking_page_reducer";
import { Col, Form } from 'react-bootstrap';
import { selectPhone } from '../../../../redux/Booking/booking_page_selecter';
import { validate } from 'validate.js';
import { BookingPagevalidate } from '../../../../util/validate';

const BookingPhone = () => {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState(useSelector(selectPhone));
    // validation
    const [validation, setValidation] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });
    const [count,setCount] = useState(0);
    useEffect(() => {
        const errors = validate.validate({ phone: phone }, BookingPagevalidate);
        console.log(errors)
        setValidation((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [phone]);

    const hasError = (field) => {
        return validation.touched[field] && validation.errors[field] ? true : false;
    };

    const handleChange = (e) =>  { 
        setPhone(e.target.value);
        if(count !== 0){
            setValidation((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    [e.target.name]: true,
                },
            }));
            if(e.target.value !== "" && hasError("phone")){
                dispatch(addPhone(e.target.value));
            }else{
                dispatch(clearPhone())
            }
        }else{
            setValidation((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    [e.target.name]: false,
                },
            }));
            if(e.target.value !== "" && hasError("phone")){
                dispatch(addPhone(e.target.value));
            }else{
                dispatch(clearPhone())
            }
        }
        setCount(1);
        
        if(e.target.value !== "" && hasError("phone")){
            dispatch(addPhone(e.target.value));
        }else{
            dispatch(clearPhone())
        }
    };

    return (
        <Col md={6}>
            <Form.Group as={Col} >
                <Form.Control
                    value={phone??""}
                    name="phone"
                    type="text"                   
                    placeholder="Enter phone number......."
                    onChange={handleChange}
                    onClick={handleChange}        
                    isInvalid={hasError("phone")}
                />
                <Form.Control.Feedback type="invalid">
                    {hasError("phone") ? validation.errors.phone?.[0] : null}
                </Form.Control.Feedback>
            </Form.Group>
        </Col>
    )
}

export default BookingPhone
