import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "../../../../assets/scss/user_css/user_page/user_page.scss"
const UserProfile = () => {
    return (
        <>
            <div className="container">
                <div className="main-body">
                    <div>
                        <h4>Manage User profile</h4>
                        <div>Manage profile information for account security</div>
                    </div>
                    <hr/>
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
                                    <Row>
                                        <Col sm={3}>
                                            <h6 className="mb-0">Full Name</h6>
                                        </Col>
                                        <Col sm={9} className="text-secondary">
                                            Kenneth Valdez
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}>
                                            <h6 className="mb-0">Gender</h6>
                                        </Col>
                                        <Col sm={9} className="text-secondary">
                                            Male
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col sm={3}>
                                            <h6 className="mb-0">Email</h6>
                                        </Col>
                                        <Col sm={9} className="text-secondary">
                                            fip@jukmuh.al
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={3}>
                                            <h6 className="mb-0">Phone</h6>
                                        </Col>
                                        <Col sm={9} className="text-secondary">
                                            (239) 816-9029
                                        </Col>
                                    </Row>
                                    
                                    <hr />
                                    <Row>
                                        <Col sm={3}>
                                            <h6 className="mb-0">Address</h6>
                                        </Col>
                                        <Col sm={9} className="text-secondary">
                                            Bay Area, San Francisco, CA
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={12}>
                                            <a className="btn btn-info" href='/edit-profile'>Edit Profile</a>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
}

export default UserProfile
