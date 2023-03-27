import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import {Col, Container, Form, Modal, Nav, Navbar, Row, Tab, Tabs } from 'react-bootstrap'
import '../../assets/css/user_css/appbar.scss'

const AppBar = (props) => {
  const [show, setShow] = useState(false);

  const [activePage, setActivePage] = useState(props.id);
  const handleShow = () => {
    setShow(true);
    setActivePage(6);
    let collapse = document.getElementById('responsive-navbar-nav');
    collapse.classList.remove('show');
  }

  const handleClose = () => {
    setActivePage(props.id);
    setShow(false);

  };
  return (
    <>
      <header>
        <Navbar collapseOnSelect expand="lg" className="home_navabar" variant="light">
          <Container>
            <Navbar.Brand href="#home"><img
              className='nav_img'
              src={require("../../assets/images/mien_spa_pink.png")}
              alt=""
            /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className='nav-collapse' >
              <Nav className="me-auto nav-collapse-item">
                <Nav.Link className={activePage === 1 ? 'active' : ''} href="/">Home</Nav.Link>
                <Nav.Link className={activePage === 2 ? 'active' : ''} href="/shop">Shop</Nav.Link>
                <Nav.Link className={activePage === 3 ? 'active' : ''} >Service</Nav.Link>
              </Nav >
              <Nav className='nav-collapse-item'>
              {activePage === 2 ?
              <Nav.Link className={activePage === 4 ? 'active' : ''}><FontAwesomeIcon icon={['fas', 'cart-shopping']} /> Cart</Nav.Link>
              :
              <Nav.Link className={activePage === 5 ? 'active' : ''} href="/booking"><FontAwesomeIcon icon={['fas', 'calendar-alt']} /> Booking</Nav.Link>}
                <Nav className='nav_between'></Nav>
                <Nav.Link className={activePage === 6 ? 'active' : ''} onClick={handleShow}><FontAwesomeIcon icon={['fa', 'user']} /> Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size='xl'
        centered
        show={show} onHide={handleClose}>
        <Container className='register'>
          <Modal.Header className='btnClose' color='#ffff' closeButton>
          </Modal.Header>
          <Row>
            <Col className='register-left' md={3}>
              <img src={require('../../assets/images/mien_spa_white.png')} alt="" />
              <h3>Welcome</h3>
            </Col>
            <Col className='register-right' md={9}>
              <Tabs
                defaultActiveKey="login"
                id="justify-tab-example"
                centered='true'
              >
                <Tab eventKey="login" title="Login">
                  <Col sx={12} sm={12} md={12}>
                    <h3 className="register-heading">Login</h3>
                    <Row className='register-form'>
                      <Form as={Col}>
                        <Form.Group className="mb-3" controlId="formLoginUserName">
                          <Form.Control className='form-control input-form' type="text" placeholder="User Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLoginformPassword">
                          <Form.Control className='input-form' type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Control className="btnRegister" type="submit" value="Login" />
                        </Form.Group>
                      </Form>
                    </Row>
                  </Col>
                </Tab>
                <Tab eventKey="register" title="Register">
                  <Col sx={12} sm={12} md={12}>
                    <h3 className="register-heading">Register</h3>
                    <Row className='register-form'>
                      <Form as={Col}>
                        <Form.Group className="mb-3" controlId="formRegisterUserName">
                          <Form.Control className='form-control input-form' type="text" placeholder="User Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formRegisterformPassword">
                          <Form.Control className='input-form' type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Control className='input-form' type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Control className="btnRegister" type="submit" value="Login" />
                        </Form.Group>
                      </Form>
                    </Row>
                  </Col>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
        {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
      </Modal>
    </>


  )
}

export default AppBar