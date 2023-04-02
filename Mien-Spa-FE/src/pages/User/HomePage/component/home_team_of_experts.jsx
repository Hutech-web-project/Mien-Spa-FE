import React from 'react'
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap'
import '../../../../assets/css/user_css/home_page/team_of_experts.scss'

function HomeTeamOfExperts() {
    return (
        <Col className='team-of-experts'>
            <Container>
                <Row>
                    <h3>Well-trained team of professionals</h3>
                    <Col className='decription' >
                    100% of the staff, technicians, doctors and nurses at Mien Spa are all the best professionals in the cosmetology industry,
                     with skills and extensive experience in the profession along with enthusiasm and professionalism. They give their customers the best service.
                    </Col>
                    <CardGroup className='list-card'>
                        <Card className='card-item' aria-autocomplete='inline'>
                            <Card.Img className='card-item-img' src={require("../../../../assets/images/doctor1.jpg")} />
                        </Card>
                        <Card className='card-item'>
                            <Card.Img className='card-item-img' src={require("../../../../assets/images/doctor2.jpg")} />
                        </Card>
                        <Card className='card-item'>
                            <Card.Img className='card-item-img' src={require("../../../../assets/images/doctor3.jpg")} />
                        </Card>
                    </CardGroup>
                </Row>
            </Container>
        </Col>
    );
}
export default HomeTeamOfExperts;