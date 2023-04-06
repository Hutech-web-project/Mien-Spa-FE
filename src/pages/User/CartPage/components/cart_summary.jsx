import { Col, Row } from 'react-bootstrap'
import "../../../../assets/scss/user_css/cart_page/cart_body.scss"

import React from 'react'

const CartSummary = () => {
    return (
        <>
                <div><h5><b>Summary</b></h5></div>
                <hr />
                <Row>
                    <Col className='col-title'>ITEMS 3</Col>
                    {/* style="padding-left:0;" */}
                    <Col className="text-right">&euro; 132.00</Col>
                </Row>
                <form>
                    <p>SHIPPING</p>
                    <select><option className="text-muted">Standard-Delivery- &euro;5.00</option></select>
                    <p>GIVE CODE</p>
                    <input id="code" placeholder="Enter your code" />
                </form>
                <Row className='row-title'>
                    {/* style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;" */}
                    <Col>TOTAL PRICE</Col>
                    <Col className="text-right">&euro; 137.00</Col>
                </Row>
                <button className="btn">CHECKOUT</button>  
        </>
    )
}

export default CartSummary
