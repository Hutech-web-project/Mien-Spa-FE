import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "../../../../assets/css/user_css/user_page/change_password.scss"
const ChangePassword = () => {
    return (
        <>
            <div className='main-body'>
                <div>
                    <h4>Change your Password</h4>
                    <div>For account security, please do not share your password with others</div>
                </div>
                <hr />
                <div className='card'>
                    <Row>
                        <Col md={8}>
                            <label>New Password</label>
                            <div className="form-group pass_show">
                                <input type="password" value="faisal.khan@123" className="form-control" placeholder="New Password" />
                            </div>
                        </Col>
                        <Col md={4}>
                            <a href='!#' className='FP'>Forget password?</a>
                        </Col>
                    </Row>
                </div>
                <Row>


                    <div className='card'>
                        <label>New Password</label>
                        <div className="form-group pass_show">
                            <input type="password" value="faisal.khan@123" className="form-control" placeholder="New Password" />
                        </div>
                    </div>

                    <div className='card'>
                        <label>Repeat Password</label>
                        <div className="form-group pass_show">
                            <input type="password" value="faisal.khan@123" className="form-control" placeholder="Confirm Password" />
                        </div>
                    </div>


                </Row>
            </div>
        </>
    )
}

export default ChangePassword