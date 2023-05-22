import React from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import "../../../../../../assets/scss/user_css/user_page/edit_profile/edit_profile_body.scss"
const EditProfileBody = () => {
  return (
    <>
      <Container px={4} mt={4}>
        <hr className="mt-0 mb-4" />
        <Row>
          <Col xl={4}>
            <Card mb={4} mb-xl={0}>
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                <div className='image'>
                  <a href=''>Upload your image</a>
                </div>
              </div>
            </Card>
          </Col>
          <Col xl={8}>
            <Card mb={4}>
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" for="inputUsername">Username</label>
                    <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="username" />
                  </div>
                  <Row gx={3} mb={3}>
                    <div className="mb-3">
                      <label className="small mb-1" for="inputUsername">Full name</label>
                      <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="Full name" />
                    </div>
                  </Row>
                  <Row gx={3} mb={3}>
                    <Col md={6}>
                      <label className="small mb-1" for="inputLocation">Gender</label>
                      <Form.Select aria-label="Default select example">
                        <option>Choose your gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Unknow</option>
                      </Form.Select>
                    </Col>
                    <Col md={6} className="col-md-6">
                      <label className="small mb-1" for="inputLocation">Address</label>
                      <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="San Francisco, CA" />
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <label className="small mb-1" for="inputEmailAddress">Email address</label>
                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com" />
                  </div>
                  <Row gx={3} mb={3}>
                    <Col md={6} className="col-md-6">
                      <label className="small mb-1" for="inputPhone">Phone number</label>
                      <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567" />
                    </Col>
                    <Col md={6}>
                      <label className="small mb-1" for="inputBirthday">Birthday</label>
                      <Form.Group controlId="dob">                        
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </Col>
                  </Row>
                  <div className='save'>
                    <a href=''>Save</a>
                  </div>
                </form>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EditProfileBody
