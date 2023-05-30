import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Alert, Col, Container, Form, Modal, Nav, NavDropdown, Navbar, Row, Spinner, Tab, Tabs } from 'react-bootstrap'
import '../../assets/scss/user_css/appbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validate } from 'validate.js'
import { LoginPageValidate, RegisterPageValidate } from '../../util/validate'
import { login, register } from "../../redux/Auth/auth_page_thunk";
import { selectError, selectLoading } from '../../redux/Auth/auth_page_selecter'
import { logout, turnOffError } from '../../redux/Auth/auth_page_reducer'
import { selectUser, selectUserLoading } from '../../redux/User/user_page_selecter'
import { ToastContainer, toast } from 'react-toastify'

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const AppBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [activePage, setActivePage] = useState(props.id);

  const user = useSelector(selectUser);

  const hanldeLogOut = () => {
    dispatch(logout());
    navigate(0);
  }

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
                {user !== null ?
                  <NavDropdown title={user?.usUserName} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/user"><FontAwesomeIcon icon={['fa', 'user']} /> Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={hanldeLogOut}>
                      <FontAwesomeIcon icon={['fa', 'sign-out']} /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  :
                  <Nav.Link className={activePage === 6 ? 'active' : ''} onClick={handleShow}><FontAwesomeIcon icon={['fa', 'user']} /> Login</Nav.Link>
                }
              </Nav>
            </Navbar.Collapse>
            <ToastContainer />
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
                  <Login />
                </Tab>
                <Tab eventKey="register" title="Register">
                  <Register />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  )

  function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectLoading);
    const errorLogin = useSelector(selectError);
    const [checkOut, setCheckOut] = useState(false);
    const [dataLogin, setDataLogin] = useState({
      email: "",
      password: "",
    });
    const [validationLogin, setValidationLogin] = useState({
      touched: {},
      errors: {},
      isvalid: false,
    });

    useEffect(() => {
      dispatch(turnOffError())
    }, [dispatch])

    useEffect(() => {
      const errors = validate.validate({ email: dataLogin.email, password: dataLogin.password }, LoginPageValidate);
      setValidationLogin((pre) => ({
        ...pre,
        isvalid: errors ? false : true,
        errors: errors || {},
      }));
    }, [dataLogin]);

    const hasErrorLogin = (field) => {
      return validationLogin.touched[field] && validationLogin.errors[field] ? true : false;
    };

    const hanldeCheckOut = (e) => {
      setCheckOut(e.target.checked);
    }

    const handleChangeLogin = (event) => {
      setDataLogin((preState) => ({
        ...preState,
        [event.target.name]: event.target.value,
      }));
      setValidationLogin((pre) => ({
        ...pre,
        touched: {
          ...pre.touched,
          [event.target.name]: true,
        },
      }));
    };

    const handleLogin = () => {
      setValidationLogin((pre) => ({
        ...pre,
        touched: {
          ...pre.touched,
          password: true,
          email: true,
        },
      }));
      if (validationLogin.isvalid === true) {
        dispatch(login({ dataLogin, checkOut }))
          .then((res) => {
            console.log(res);
            console.log(res.error);
            if (!res.error) {
              if (res.payload?.roles.some((rol) => rol === "ROLE_USER") === true) {
                navigate(0)
              } else {
                navigate('/system_mienspa')
              }
            }

          })
      }
    };

    return (
      <Col sx={12} sm={12} md={12}>
        <h3 className="register-heading">Login</h3>
        <Row className='register-form'>
          {errorLogin === true ? (
            <Alert key={'warning'} variant={'warning'}>
              Email or password is incorrect!
            </Alert>
          ) : null}
          <Form as={Col}>
            <Form.Group className="mb-3" controlId="formLoginUserName">
              <Form.Control
                className='form-control input-form'
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChangeLogin}
                isInvalid={hasErrorLogin("email")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorLogin("email") ? validationLogin.errors.email?.[0] : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLoginformPassword">
              <Form.Control
                className='input-form'
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChangeLogin}
                isInvalid={hasErrorLogin("password")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorLogin("password") ? validationLogin.errors.password?.[0] : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" onChange={hanldeCheckOut} />
            </Form.Group>
            <Form.Group className="mb-3" >
              {loading === true ? (
                <Spinner animation="border" role="status" style={{ marginLeft: "48%" }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : <Form.Control
                className="btnRegister"
                type="submit"
                onClick={handleLogin}
              />}
            </Form.Group>
          </Form>
        </Row>
      </Col>
    )
  }

  function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectLoading);
    const errorRegister = useSelector(selectError);
    const [dataRegister, setDataRegister] = useState({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    });
    const [validationRegister, setValidationRegister] = useState({
      touched: {},
      errors: {},
      isvalid: false,
    });

    useEffect(() => {
      dispatch(turnOffError())
    }, [dispatch])

    useEffect(() => {
      const errors = validate.validate({ username: dataRegister.username, password: dataRegister.password, confirmPassword: dataRegister.confirmPassword, email: dataRegister.email }, RegisterPageValidate);
      setValidationRegister((pre) => ({
        ...pre,
        isvalid: errors ? false : true,
        errors: errors || {},
      }));
    }, [dataRegister]);
    
    const hasErrorRegister = (field) => {
      return validationRegister.touched[field] && validationRegister.errors[field] ? true : false;
    };
  
    const handleChangeRegister = (event) => {
      setDataRegister((preState) => ({
        ...preState,
        [event.target.name]: event.target.value,
      }));
      setValidationRegister((pre) => ({
        ...pre,
        touched: {
          ...pre.touched,
          [event.target.name]: true,
        },
      }));
    };
  
     const handleRegister = async()=> {
      setValidationRegister((pre) => ({
        ...pre,
        touched: {
          ...pre.touched,
          password: true,
          email: true,
        },
      }));
      if (validationRegister.isvalid === true) {
        dispatch(register({ dataRegister }))
          .then(async (res) => {
            if (!res.error) {
              toast.success('Resgister success !', {
                position: toast.POSITION.TOP_RIGHT
              });
              await delay(700)
              navigate(0);
            }
          })
      }
    };
    return (
      <Col sx={12} sm={12} md={12}>
        <h3 className="register-heading">Register</h3>
        <Row className='register-form'>
          {errorRegister === true ? (
            <Alert key={'warning'} variant={'warning'}>
              Email already exists!
            </Alert>
          ) : null}
          <Form as={Col}>
            <Form.Group className="mb-3" controlId="formRegisterUserName">
              <Form.Control
                className='input-form'
                type="text"
                name="username"
                placeholder="Enter user name"
                onChange={handleChangeRegister}
                isInvalid={hasErrorRegister("username")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorRegister("username") ? validationRegister.errors.username?.[0] : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegisterEmail">
              <Form.Control
                className='input-form'
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChangeRegister}
                isInvalid={hasErrorRegister("email")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorRegister("email") ? validationRegister.errors.email?.[0] : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegisterformPassword">
              <Form.Control
                className='input-form'
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChangeRegister}
                isInvalid={hasErrorRegister("password")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorRegister("password") ? validationRegister.errors.password?.[0] : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                className='input-form'
                type="password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                onChange={handleChangeRegister}
                isInvalid={hasErrorRegister("confirmPassword")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorRegister("confirmPassword") ? validationRegister.errors.confirmPassword?.[0] : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
              {loading === true ? (
                <Spinner animation="border" role="status" style={{ marginLeft: "48%" }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) :
                <Form.Control
                  className="btnRegister"
                  type="submit"
                  value="Register"
                  onClick={handleRegister}
                />
              }
            </Form.Group>
          </Form>
        </Row>
      </Col>
    )
  }
}

export default AppBar