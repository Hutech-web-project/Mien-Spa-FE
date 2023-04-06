import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../../../../assets/scss/user_css/cart_page/cart_body.scss"
import CartShoppingCart from './cart_shoppingCart'
import CartSummary from './cart_summary'

const CartBody = () => {
    return (
        <>
            <section className='shopping-cart'>
                <Container className="card">
                    <Row>
                        <Col md={8} className="cart">
                            <CartShoppingCart/>
                        </Col>
                        <Col md={4} className="summary">
                            <CartSummary/>
                        </Col>  
                    </Row>

                </Container>
            </section>
        </>
    )
}

export default CartBody

