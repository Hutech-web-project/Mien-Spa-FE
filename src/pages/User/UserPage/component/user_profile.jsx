import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import "../../../../assets/scss/user_css/user_page/user_page.scss"
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/User/user_page_selecter';
import validate from 'validate.js';
import { UserPage } from '../../../../util/validate';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify'
import { putUser } from '../../../../redux/User/user_page_thunk';
import { convertBase64 } from '../../../../util/custom';


const UserProfile = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [address, setAddress] = useState(user?.usAddress===undefined?"":user?.usAddress);
    const [valueAdd, setValueAddd] = useState("");
    const autoCompleteRef = useRef();
    const valueDirection = useRef();
    const [baseImage, setBaseImage] = useState(null);
    var date = new Date();
    const [userUpdate, setUserUpdate] = useState({
        ...user,
    });

    const [validation, setValidation] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });



    useEffect(() => {
        const options = {
            componentRestrictions: { country: "vn" },
            fields: ["address_components", "geometry", "icon", "name", "adr_address", "formatted_address"],
            strictBounds: false,
        };
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            valueDirection.current,
            options
        );
    }, []);

    useEffect(() => {
        setUserUpdate((preState) => ({
            ...preState,
            usAddress: address,
        }));

    }, [address]);

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

    const handlePhoto = async (event) => {
        const files = event.target.files;
        const base64 = await convertBase64(files[0]);
        setBaseImage(base64);
        setUserUpdate((preState) => ({
          ...preState,
          usImage: files[0],
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


    const hanldeLeaveMouse = () => {
        var place;
        autoCompleteRef.current.addListener("place_changed", async function () {
            place = await autoCompleteRef.current.getPlace();
            setAddress(place.formatted_address);
            const add = document.getElementById('address');
            add.value = place.formatted_address;
            return;
        });
        if (address !== "") {
            const add = document.getElementById('address');
            add.value = address;
        }
        else {
            const add = document.getElementById('address');
            add.value = '';
        }
    }


    const hanldeClick = () => {
        if (address !== "") {
            const add = document.getElementById('address');
            add.value = address;
        } else {
            const add = document.getElementById('address');
            add.value = valueAdd;
        }
    }

    const hanldeAddress = (e) => {
        setValueAddd(e.target.value);
    }

    const hanldeUpdateUs = (e) => {
        setValidation((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                usUserName: true,
                usDob: true,
                usPhoneNo: true,
            },
        }));
        if (validation.isvalid === true) {
            dispatch(putUser(userUpdate)).then((res1) => {
                if (res1.payload === 200) {
                    toast.success('Update profile success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                } else {
                    toast.error('Update profile fail !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                }
            });
        }
    }

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
                                            {baseImage === null?
                                             <img src={user?.usImage === null? require("../../../../assets/images/avatar-trang-4.jpg") : user?.usImage} alt="Avatar" className="rounded-circle" width="160" height="150"/>
                                             :
                                             <img src={baseImage} alt="Avatar" className="rounded-circle" width="160" height="150"/>
                                            }
                                               
                                            </div>
                                            <label className="custom-file-upload">
                                                <input type="file" accept=".png, .jpg, .jpeg" onChange={handlePhoto}/>
                                                Choose
                                            </label>
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
                                            max={moment(new Date(date)).subtract(18, "years").format("YYYY-MM-DD")}
                                            name="usDob"
                                            type="date"
                                            defaultValue={moment(new Date(user?.usDob)).format("YYYY-MM-DD")}
                                            isInvalid={hasError("usDob")}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {hasError("usDob") ? validation.errors.usDob?.[0] : null}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2">Address</InputGroup.Text>
                                        <Form.Control
                                            onChange={hanldeAddress}
                                            onClick={hanldeClick}
                                            id="address"
                                            defaultValue={address}
                                            placeholder="Enter address"
                                            aria-describedby="basic-addon2"
                                            ref={valueDirection}
                                            onBlur={hanldeLeaveMouse}
                                        />
                                    </InputGroup>

                                    <Button variant="primary" onClick={hanldeUpdateUs}>Primary</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default UserProfile
