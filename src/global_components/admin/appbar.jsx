import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { selectUser } from '../../redux/User/user_page_selecter';
import { useSelector } from 'react-redux';
function Appbar() {
  const user = useSelector(selectUser);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container fluid>
      <Navbar.Brand>Categories</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />    
    </Container>
  </Navbar>
  )
}

export default Appbar