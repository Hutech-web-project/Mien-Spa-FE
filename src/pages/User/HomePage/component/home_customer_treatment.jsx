import React from 'react'
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap'
import '../../../../assets/scss/user_css/home_page/customer_treatment.scss'

const HomeCustomerTreatment = () => {
    return (
        <Col className='customer-treatment'>
            <Container>
                <Row>
                    <h3>Modern Facilities</h3>
                    <Col className='decription' >
                        The entire system of Mien Spa Beauty Salon is designed with modern architecture, reaching 5-star standards.
                        The space from the waiting room to the luxurious service room is equipped with high-class furniture, delicately decorated and comfortable.
                        In particular, the equipment, machinery and technology are all imported high-class, with clear origin, meeting safety standards with many outstanding features.
                    </Col>
                    <CardGroup className='list-card'>
                        <Col xs={12} md={'auto'} >
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/treatment1.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'} >
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/treatment2.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'} >
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/treatment3.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/treatment4.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/treatment5.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/treatment6.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/treatment7.jpg")} />
                            </Card>
                        </Col>
                        <Col xs={12} md={'auto'}>
                            <Card className='card-item'>
                                <Card.Img className='card-item-img' src={require("../../../../assets/images/treatment8.jpg")} />
                            </Card>
                        </Col>
                    </CardGroup>
                </Row>
            </Container>
        </Col>
    )
}

export default HomeCustomerTreatment