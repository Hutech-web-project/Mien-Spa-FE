import React from 'react'
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap'
import '../../../../assets/css/user_css/home_page/facilities.scss'

function HomeFacility() {
    return (
        <Col className='facility'>
            <Container>
                <Row>
                    <h3>Modern Facilities</h3>
                    <Col className='decription' >
                        The entire system of Mien Spa Beauty Salon is designed with modern architecture, reaching 5-star standards.
                        The space from the waiting room to the luxurious service room is equipped with high-class furniture, delicately decorated and comfortable.
                        In particular, the equipment, machinery and technology are all imported high-class, with clear origin, meeting safety standards with many outstanding features.
                    </Col>
                    <CardGroup className='list-card'>
                        <Card className='card-item'>
                            <Card.Img className='card-item-img' src={require("../../../../assets/images/facility1.jpg")} />
                        </Card>
                        <Card className='card-item'>
                            <Card.Img className='card-item-img' src={require("../../../../assets/images/facility2.jpg")} />
                        </Card>
                        <Card className='card-item'>
                            <Card.Img className='card-item-img' src={require("../../../../assets/images/facility3.jpg")} />
                        </Card>
                        <Card className='card-item'>
                            <Card.Img className='card-item-img' src={require("../../../../assets/images/facility4.jpg")} />
                        </Card>
                    </CardGroup>
                </Row>
            </Container>
        </Col>
    )
}

export default HomeFacility