import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import "../../../../assets/scss/user_css/user_page/user_page.scss"
import { TextField } from '@mui/material';
import { useJsApiLoader } from "@react-google-maps/api";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/User/user_page_selecter';
import validate from 'validate.js';
import { UserPage } from '../../../../util/validate';
import moment from 'moment';

const options = {
    componentRestrictions: { country: "vn" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
};
const UserProfile = () => {
    const [show, setShow] = useState(false);
    const libraries = "places";
    const user = useSelector(selectUser);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

 


    const [userUpdate, setUserUpdate] = useState({
        ...user,
    });

    const [validation, setValidation] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });


    useEffect(() => {
        const errors = validate.validate(userUpdate, UserPage);
        setValidation((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [userUpdate]);

    const hasError = (field) => {
        return validation.touched[field] && validation.errors[field] ? true : false;
    };

    const handleChange = (event) => {
        setUserUpdate((preState) => ({
            ...preState,
            [event.target.name]: event.target.value,
        }));
        setValidation((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [event.target.name]: true,
            },
        }));
    };

    const handleDob = (event) => {
        setUserUpdate((preState) => ({
            ...preState,
            usDob: moment(event.target.value).format("DD/MM/YYYY")
        }));
        setValidation((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [event.target.name]: true,
            },
        }));

    }

    console.log(isLoaded)
    return (
        <>
            <div className="container">
                <div className="main-body">
                    <div>
                        <h4>Manage User profile</h4>
                        <div>Manage profile information for account security</div>
                    </div>
                    <hr />
                    <Row className="gutters-sm">
                        <Col md={3} className="mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className='avatar-body'>
                                        <div className="d-flex flex-column align-items-center">
                                            <div className='avatar'>
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Avatar" className="rounded-circle" width="150" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={9}>
                            <div className="card mb-3">
                                <div className="card-body-information">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2" >User name</InputGroup.Text>
                                        <Form.Control
                                            placeholder="Enter user name"
                                            aria-describedby="basic-addon2"
                                            onChange={handleChange}
                                            name="usUserName"
                                            defaultValue={user?.usUserName}
                                            isInvalid={hasError("usUserName")}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {hasError("usUserName") ? validation.errors.usUserName?.[0] : null}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
                                        <Form.Control
                                            placeholder="Enter email"
                                            aria-describedby="basic-addon2"
                                            defaultValue={user?.usEmailNo}
                                            disabled
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2">Phone number</InputGroup.Text>
                                        <Form.Control
                                            placeholder="Enter phone number"
                                            aria-describedby="basic-addon2"
                                            onChange={handleChange}
                                            name="usPhoneNo"
                                            defaultValue={user?.usPhoneNo}
                                            isInvalid={hasError("usPhoneNo")}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {hasError("usPhoneNo") ? validation.errors.usPhoneNo?.[0] : null}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2">Day of birth</InputGroup.Text>
                                        <Form.Control
                                            placeholder="Enter phone number"
                                            aria-describedby="basic-addon2"
                                            onChange={handleDob}
                                            name="usDob"
                                            type="date"
                                            defaultValue={user?.usDob}
                                            isInvalid={hasError("usDob")}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {hasError("usDob") ? validation.errors.usDob?.[0] : null}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2">Address</InputGroup.Text>
                                        <Form.Control
                                            placeholder="Enter address"
                                            aria-describedby="basic-addon2"
                                            type='button'
                                            onClick={() => setShow(true)}
                                        />
                                    </InputGroup>
                                    {isLoaded?
                                        <GetAddress
                                            show={show}
                                            onHide={() => setShow(false)}
                                        />
                                    :null}
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )

    function GetAddress(props) {
        const autoCompleteRef = useRef();
        const valueDirection = useRef();
        useEffect(() => {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
                valueDirection.current,
                options
            );
        }, []);
        console.log(props)
        return (
            <Modal
                {...props}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <TextField
                                                type="text"
                                                label="Địa chỉ "
                                                name="usAddress"
                                                onBlur={handleChange}
                                                fullWidth
                                                inputRef={isLoaded ? valueDirection : null}
                                                error={hasError("usAddress")}
                                                helperText={
                                                    hasError("usAddress")
                                                        ? validation.errors.usAddress?.[0]
                                                        : null
                                                }
                                            /> */}
                     <input
                            type="text"
                            label="Địa chỉ giao hàng"
                            name="address"
                            ref={valueDirection}
                            onBlur={(e) => {
                                console.log(valueDirection.current?.value)
                            }}
                        /> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UserProfile
