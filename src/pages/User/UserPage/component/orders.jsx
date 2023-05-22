import React from 'react'
import "../../../../assets/scss/user_css/user_page/orders.scss"
import { Col, Row } from 'react-bootstrap'
const Orders = () => {
    return (
        <>
            <Col className='main-body'>
                <div className='text-title'>
                    <h4>Orders</h4>
                    <div>Product that you have ordered</div>
                </div>
                <hr />
                <Row className='shop-cursor'>
                    <Col md={2} className='img'>
                        <img src="http://localhost:3000/static/media/bongtaytrang_ipek.d824196cac408923b701.jpg" alt="ProductImage" width="150px" height="150px" />
                    </Col>
                    <Col className='title'>
                        Women's Top design
                    </Col>
                    <Col>
                        <h6 className='price'>Price:</h6>
                        <div>$599</div>
                    </Col>
                    <Col>
                        <h6  className='quanity'>Quanity:</h6>
                        <div>1</div>
                    </Col>
                    <Col>
                        <h6 className='status'>Status:</h6>
                        <div className='delivered'>Delivered</div>
                    </Col>
                </Row>
                <hr />
                <Row className='shop-cursor'>
                    <Col md={2} className='img'>
                        <img src="http://localhost:3000/static/media/bongtaytrang_simple.51fe50f482cb8686048c.jpg" alt="ProductImage" width="150px" height="150px" />
                    </Col>
                    <Col className='title'>
                        Men's Top design
                    </Col>
                    <Col>
                        <h6 className='price'>Price:</h6>
                        <div>$1000</div>
                    </Col>
                    <Col>
                        <h6  className='quanity'>Quanity:</h6>
                        <div>2</div>
                    </Col>
                    <Col>
                        <h6 className='status'>Status:</h6>
                        <div className='delivering'>Delivering</div>
                    </Col>
                </Row>
                <hr />
                <Row className='shop-cursor'>
                    <Col md={2} className='img'>
                        <img src="http://localhost:3000/static/media/bongtaytrang_simple.51fe50f482cb8686048c.jpg" alt="ProductImage" width="150px" height="150px" />
                    </Col>
                    <Col className='title'>
                        Kid's Top design
                    </Col>
                    <Col>
                        <h6 className='price'>Price:</h6>
                        <div>$1500</div>
                    </Col>
                    <Col>
                        <h6  className='quanity'>Quanity:</h6>
                        <div>3</div>
                    </Col>
                    <Col>
                        <h6 className='status'>Status:</h6>
                        <div className='delivered'>Delivered</div>
                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default Orders
