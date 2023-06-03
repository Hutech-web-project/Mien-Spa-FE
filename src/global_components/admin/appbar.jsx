import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
const Appbar = (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container fluid>
      <Navbar.Brand>{props.title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />    
    </Container>
  </Navbar>
  )
}

export default Appbar