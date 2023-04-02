import { Col, Row } from 'react-bootstrap'
import "../../../../assets/css/user_css/cart_page/cart_body.scss"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CartShoppingCart = () => {
  return (
    <>
      <div className="title">
        <Row>
          <Col><h4><b>Shopping Cart</b></h4></Col>
          <Col className="align-self-center text-right text-muted">3 items</Col>
        </Row>
      </div>
      <Row className="border-top border-bottom">
        <Row className="main align-items-center">
          <Col><img className="img-fluid" src="https://i.imgur.com/1GrakTl.jpg" /></Col>
          <Col>
            <Row className="text-muted">Shirt</Row>
            <Row>Cotton T-shirt</Row>
          </Col>
          <Col>
            <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
          </Col>
          <Col>&euro; 44.00 <span className="close">&#10005;</span></Col>
        </Row>
      </Row>
      <Row className="border-top border-bottom">
        <Row className="main align-items-center">
          <Col><img className="img-fluid" src="https://i.imgur.com/ba3tvGm.jpg" /></Col>
          <Col>
            <Row className="text-muted">Shirt</Row>
            <Row>Cotton T-shirt</Row>
          </Col>
          <Col>
            <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
          </Col>
          <Col>&euro; 44.00 <span className="close">&#10005;</span></Col>
        </Row>
      </Row>
      <Row className="border-top border-bottom">
        <Row className="main align-items-center">
          <Col><img className="img-fluid" src="https://bizweb.dktcdn.net/100/331/067/products/291980241-2328475077308225-2156087647936283972-n.jpg?v=1657283430660" /></Col>
          <Col>
            <Row className="text-muted">Shirt</Row>
            <Row>Cotton T-shirt</Row>
          </Col>
          <Col>
            <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
          </Col>
          <Col>&euro; 44.00 <span className="close">&#10005;</span></Col>
        </Row>
      </Row>
      <div className="back-to-shop"><a href="#"></a><FontAwesomeIcon icon={['fa', 'arrow-left']} /><span className="text-muted"> Back to shop</span></div>
    </>
  )
}

export default CartShoppingCart
