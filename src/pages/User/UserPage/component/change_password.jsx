import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import "../../../../assets/scss/user_css/user_page/change_password.scss"
import validate from 'validate.js';
import { schemaChangePassword } from "../../../../util/validate"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChangePassword = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});


    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const toggleShowPassword3 = () => {
        setShowPassword3(!showPassword3);
    };

    const handleCurrentPasswordChange = event => {
        setCurrentPassword(event.target.value);
    };

    const handleNewPasswordChange = event => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const validationErrors = validate(
            {
                passwordOld: currentPassword,
                passwordNew: newPassword,
                confirmPassword: confirmPassword
            },
            schemaChangePassword,
            { fullMessages: false }
        );

        if (validationErrors) {
            setErrors(validationErrors);
        } else {
            setErrors();
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
                    <form onSubmit={handleSubmit}>
                        <div className='card'>

                            <Row>
                                <Col md={8}>
                                    <div className='input-form'>
                                        <label>Current Password</label>
                                        <div className="form-group pass_show">
                                            <input type={showPassword1 ? 'text' : 'password'} className="form-control" value={currentPassword} onChange={handleCurrentPasswordChange} />
                                        </div>

                                        <span className='icon' onClick={toggleShowPassword1}>{showPassword1 ?<FontAwesomeIcon icon={['fa', 'eye']} /> : <FontAwesomeIcon icon={['fa', 'eye-slash']} />}</span>
                                    </div>
                                </Col>
                                <Col md={4} className='fp'>
                                    <a href='!#'>Forgot password?</a>
                                </Col>

                            </Row>

                        </div>
                        <Row className="error-tag">
                            {errors.passwordOld && <div className='error'>{errors.passwordOld}</div>}
                        </Row>
                        <Row>
                            <div className='card'>
                                <div className='input-form'>
                                    <label>New Password</label>
                                    <div className="form-group pass_show">
                                        <input type={showPassword2 ? 'text' : 'password'} className="form-control" value={newPassword} onChange={handleNewPasswordChange} />
                                    </div>

                                    <span className='icon' onClick={toggleShowPassword2}>{showPassword2 ? <FontAwesomeIcon icon={['fa', 'eye']} /> : <FontAwesomeIcon icon={['fa', 'eye-slash']} />}</span>
                                </div>
                            </div>
                            <Row className="error-tag">
                                 {errors.passwordNew && (
                                        <div className='row-error'>
                                            <span className="icon"></span>
                                            <div>{errors.passwordNew[0]}</div>
                                            {errors.passwordNew[1] && <div>{errors.passwordNew[1]}</div>}
                                        </div>
                                    )}
                            </Row>
                        </Row>
                        <Row>
                            <div className='card'>
                                <div className='input-form'>
                                    <label>Comfirm Password</label>
                                    <div className="form-group pass_show">
                                        <input type={showPassword3 ? 'text' : 'password'} className="form-control" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                    </div>
                                    <span className='icon' onClick={toggleShowPassword3}>{showPassword3 ? <FontAwesomeIcon icon={['fa', 'eye']} /> : <FontAwesomeIcon icon={['fa', 'eye-slash']} />}</span>
                                </div>
                                <Row className="error-tag">
                                    {errors.confirmPassword && (
                                        <div className='row-error'>
                                            <span className="icon"></span>
                                            <div>{errors.confirmPassword[0]}</div>
                                            {errors.confirmPassword[1] && <div>{errors.confirmPassword[1]}</div>}
                                        </div>
                                    )}
                                </Row>
                            </div>
                        </Row>

                        <Row>
                            <div className='sub'>
                                <Button variant="primary">Change Password</Button>
                            </div>
                        </Row>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword