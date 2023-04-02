import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';
import '../../assets/css/user_css/footer.scss';

const Footer = () => {
    return (
        <section id='footer'>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={4}>
                        <Nav className='nav-list quick-links flex-column' style={{ marginTop: '-12%' }}>
                            <Nav.Item className='nav-item'>
                                <Image className='nav-item-image' src={require('../../assets/images/mien_spa_white.png')}></Image>
                                <h4>VIETNAM's TOP BEAUTY SYSTEM</h4>
                                <h6>Mien Spa always tries to bring customers the most perfect services.</h6>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col xs={6} sm={6} md={4}>
                        <h5>Quick links</h5>
                        <Nav className='nav-list quick-links flex-column' >
                            <Nav.Item className='nav-item'>
                                <Nav.Link className='nav-link' href='!#'><FontAwesomeIcon className='nav-icon' icon={['fa', 'angle-double-right']} />Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='nav-item'>
                                <Nav.Link className='nav-link' href='https://www.fiverr.com/share/qb8D02'><FontAwesomeIcon className='nav-icon' icon={['fas', 'angle-double-right']} />About</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='nav-item'>
                                <Nav.Link className='nav-link' href='https://www.fiverr.com/share/qb8D02'><FontAwesomeIcon className='nav-icon' icon={['fas', 'angle-double-right']} />FAQ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='nav-item'>
                                <Nav.Link className='nav-link' href='https://www.fiverr.com/share/qb8D02' >
                                    <FontAwesomeIcon className='nav-icon' icon={['fas', 'angle-double-right']} />Get Started
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='nav-item'>
                                <Nav.Link className='nav-link' href='https://www.fiverr.com/share/qb8D02' >
                                    <FontAwesomeIcon className='nav-icon' icon={['fas', 'angle-double-right']} />Videos
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col xs={6} sm={6} md={4}>
                        <h5>Information</h5>
                        <Nav className='nav-list quick-links flex-column' >
                            <Nav.Item className='nav-item'>
                                <Nav.Link className='nav-link' >
                                    <FontAwesomeIcon className='nav-icon' icon={['fa', 'phone']} /> 0869177683
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='nav-item'>
                                <Nav.Link className='nav-link' >
                                    <FontAwesomeIcon className='nav-icon' icon={['fa', 'envelope']} /> hd6112002@gmail.com
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='nav-item'>
                                <Nav.Link className='nav-link' >
                                    <FontAwesomeIcon className='nav-icon' icon={['fa', 'map-marker-alt']} /> 17 Mieu Noi, Ward 2, Phu Nhuan District, Ho Chi Minh City
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='nav-item'>
                                <Nav.Link className='nav-link' href='https://www.fiverr.com/share/qb8D02' >
                                    <FontAwesomeIcon className='nav-icon' icon={['fa', 'calendar-alt']} /> 8:30 - 19:30 Monday - Sunday (Including Holidays and New Year's Eve)
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Row>
                        <Col xs={12} sm={12} md={12}>
                            <Nav className='nav-list-brand text-center' >
                                <Nav.Item className='nav-item-brand'>
                                    <Nav.Link className='nav-link-brand' href='https://www.facebook.com/anmienspahcm'><FontAwesomeIcon className='nav-icon-brand' icon={['fab', 'facebook']} /></Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='nav-item-brand'>
                                    <Nav.Link className='nav-link-brand' href='!#'><FontAwesomeIcon className='nav-icon-brand' icon={['fab', 'instagram']} /></Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='nav-item-brand'>
                                    <Nav.Link className='nav-link-brand' href='https://www.fiverr.com/share/qb8D02' ><FontAwesomeIcon className='nav-icon-brand' icon={['fab', 'google']} /></Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='nav-item-brand'>
                                    <Nav.Link className='nav-link-brand' href='mailto:hd6112002@gmail.com' ><FontAwesomeIcon className='nav-icon-brand' icon={['fa', 'envelope']} /></Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <hr />
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12}>
                            <div className=' text-center text-white'>
                                <p>Copyright © 2023 Mien Spa. All right reserved</p>
                            </div>
                        </Col>
                        <hr />
                    </Row>
                </Row>
            </Container>
        </section>
    );
}

export default Footer