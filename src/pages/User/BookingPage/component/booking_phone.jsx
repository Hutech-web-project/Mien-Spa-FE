import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addPhone } from '../../../../redux/booking/booking_page_reducer';
import { Col, Form } from 'react-bootstrap';
import { async, validate } from 'validate.js';
import { BookingPageValidate } from '../../../../utils/validates';
import { useSelector } from 'react-redux';
import { selectPhone } from '../../../../redux/booking/booking_page_selecter';
const BookingPhone = () => {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState(useSelector(selectPhone)??"");
    const [count,setCount] = useState(0);
    const [validation, setValidation] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });
    

    const  _hanldeChange = (e) => {
        if(count === 0 ){
            setCount(1)
        }
        setPhone(e.target.value);
        setValidation((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: count === 0? false : true,
            },
        }));
        if (e.target.value !== undefined &&  hasError('phone') === true) {
            dispatch(addPhone(phone));
        }
    }


    useEffect(() => {
        const errors = validate({phone:phone}, BookingPageValidate);
        setValidation((pre) => ({
          ...pre,
          isvalid: errors ? false : true,
          errors: errors || {},
        }));
    }, [phone]);

    const hasError = (field) => {
        return validation.touched[field] && validation.errors[field] ? true : false;
      };

    return (
        <Col md={6}>
            <Form.Group
                as={Col}
                className='position-relative'
            >
                <Form.Control
                    type='text'
                    placeholder='Enter phone number.......'
                    onChange={_hanldeChange}
                    onSelect={_hanldeChange}
                    defaultValue={phone}
                    name='phone'
                    isInvalid={hasError('phone')}
                />
                <Form.Control.Feedback type='invalid' >
                    {hasError('phone') ? validation.errors.phone?.[0] : null}
                </Form.Control.Feedback>
            </Form.Group>
        </Col>
    )
}

export default BookingPhone