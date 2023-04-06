import React from 'react'
import { Card, CardGroup, Carousel, Col, Container, Image, Row } from 'react-bootstrap'
import '../../../../assets/scss/user_css/home_page/customer_feedback.scss'

const HomeFeedback = () => {
    return (
        <Col className='customer_feedback'>
            <Container>
                <Row>
                    <h3>Customer review</h3>
                    <Carousel className='carousel'  touch={true} indicators={false} >
                        <Carousel.Item className='carousel-item' md={12}>
                            <Row>
                                <Col className='carousel-item-col-img' xs={12} md={2} >
                                    <Image className='carousel-item-img' src={require('../../../../assets/images/user1.jpg')}></Image>
                                </Col>
                                <Col className='carousel-item-col-decription' xs={12} md={8}>
                                    <p> Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                </Col>
                            </Row>
                        </Carousel.Item>
                        <Carousel.Item className='carousel-item' md={12}>
                            <Row>
                                <Col className='carousel-item-col-img' xs={12} md={2} >
                                    <Image className='carousel-item-img' src={require('../../../../assets/images/user1.jpg')}></Image>
                                </Col>
                                <Col className='carousel-item-col-decription' xs={12} md={8}>
                                    <p> Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                </Col>
                            </Row>
                        </Carousel.Item>
                        <Carousel.Item className='carousel-item' md={12}>
                            <Row>
                                <Col className='carousel-item-col-img' xs={12} md={2} >
                                    <Image className='carousel-item-img' src={require('../../../../assets/images/user3.jpg')}></Image>
                                </Col>
                                <Col className='carousel-item-col-decription' xs={12} md={8}>
                                    <p> Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    </Carousel>
                    <CardGroup className='list-card'>
                        <Col xs={12} md={'auto'} >
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/extra1.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'} >
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/extra2.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'} >
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/extra3.jpeg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/extra4.jpeg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/extra5.jpeg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/extra6.jpeg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/extra7.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/extra8.jpg")} />
                            </Card>
                        </Col>
                    </CardGroup>
                </Row>
            </Container>
        </Col>
    )
}

export default HomeFeedback