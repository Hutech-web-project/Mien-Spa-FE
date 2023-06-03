import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import "../../../../assets/scss/user_css/user_page/change_password.scss"
import validate from 'validate.js';
import { ChangePasswordWord } from "../../../../util/validate"
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectUserError } from '../../../../redux/User/user_page_selecter';
import { changePassword } from '../../../../redux/User/user_page_thunk';

const UserChangePassword = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [error,setError] =  useState(useSelector(selectUserError));
    const [error2,setError2] =  useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const [dataChangePassword, setDataChangePassword] = useState({
        passwordOld: "",
        passwordNew: "",
        confirmPassword: "",
    });
    const [validation, setValidation] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    useEffect(() => {
        const errors = validate.validate(dataChangePassword, ChangePasswordWord);
        setValidation((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [dataChangePassword]);

    const hasError = (field) => {
        return validation.touched[field] && validation.errors[field] ? true : false;
    };
    const handleChange = (event) => {
        setDataChangePassword((preState) => ({
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

    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const toggleShowPassword3 = () => {
        setShowPassword3(!showPassword3);
    };


    const handleUpdatePassword = () => {
        setValidation((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                passwordOld: true,
                passwordNew: true,
                confirmPassword: true,
            },
        }));
        if (validation.isvalid === true) {
            let obj = {
                newPassword: dataChangePassword.passwordNew,
                oldPassword: dataChangePassword.passwordOld,
                userId: user?.usId,
            };
            dispatch(changePassword(obj)).then((res) => {
                if (!res.error) {
                    if(res.payload === 202){
                        setError(false);
                        setError2(true);
                    }else{
                        const Opass = document.getElementById('passOld');   
                        Opass.value = ''
                        const Npass = document.getElementById('passNew');   
                        Npass.value = ''
                        const Cpass = document.getElementById('confirmPass');   
                        Cpass.value = ''
                        toast.success('Create category success !', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }        
                }
            });
        }
    };

    return (
        <>
            <div className='main-body'>
                <div>
                    <h4>Change your Password</h4>
                    <div>For account security, please do not share your password with others</div>
                </div>
                <hr />
                <div className='contain'>
                    {error === true ? (
                        <Alert key={'warning'} variant={'warning'}>
                            Email already exists!
                        </Alert>
                    ) : null}
                    {error2 === true ? (
                        <Alert key={'warning'} variant={'warning'}>
                            The new password cannot be the same as the old password!
                        </Alert>
                    ) : null}
                    <Row>
                        <Col xs={8}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon2">Old password</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter old password"
                                    aria-describedby="basic-addon2"
                                    onChange={handleChange}
                                    name="passwordOld"
                                    id="passOld"
                                    type={showPassword1 ? 'text' : 'password'}
                                    isInvalid={hasError("passwordOld")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {hasError("passwordOld") ? validation.errors.passwordOld?.[0] : null}
                                </Form.Control.Feedback>
                            </InputGroup>

                        </Col>
                        <Col xs={4}>
                            <span onClick={toggleShowPassword1}>{showPassword1 ? <FontAwesomeIcon icon={['fa', 'eye']} className='icon' /> : <FontAwesomeIcon icon={['fa', 'eye-slash']} className='icon' />}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon2">Old password</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter new password"
                                    aria-describedby="basic-addon2"
                                    onChange={handleChange}
                                    name="passwordNew"
                                    id="passNew"
                                    type={showPassword2 ? 'text' : 'password'}
                                    isInvalid={hasError("passwordNew")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {hasError("passwordNew") ? validation.errors.passwordNew?.[0] : null}
                                </Form.Control.Feedback>
                            </InputGroup>

                        </Col>
                        <Col xs={4}>
                            <span className='icon' onClick={toggleShowPassword2}>{showPassword2 ? <FontAwesomeIcon icon={['fa', 'eye']} className='icon' /> : <FontAwesomeIcon icon={['fa', 'eye-slash']} className='icon' />}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon2">Confirm password</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter old password"
                                    aria-describedby="basic-addon2"
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    id="confirmPass"
                                    type={showPassword3 ? 'text' : 'password'}
                                    isInvalid={hasError("confirmPassword")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {hasError("confirmPassword") ? validation.errors.confirmPassword?.[0] : null}
                                </Form.Control.Feedback>
                            </InputGroup>

                        </Col>
                        <Col xs={4}>
                            <span className='icon' onClick={toggleShowPassword3}>{showPassword3 ? <FontAwesomeIcon icon={['fa', 'eye']} className='icon' /> : <FontAwesomeIcon icon={['fa', 'eye-slash']} className='icon' />}</span>
                        </Col>
                    </Row>
                    <Button variant="primary" onClick={handleUpdatePassword}>Change Password</Button>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default UserChangePassword