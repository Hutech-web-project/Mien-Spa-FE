
import { Col, Tab, Row, Nav } from 'react-bootstrap'
import UserProfile from './user_profile'
import ChangePassword from './change_password'
import Orders from './orders'
import "../../../../assets/scss/user_css/user_page/user_body.scss"
import { useState } from 'react'

const UserBody = () => {
    const [activeKey, setActiveKey] = useState('first');
    const handleSelect = (key) => {
        console.log('Selected key:', key);
        setActiveKey(key);
    }
    return (
        <>
            <Tab.Container id="left-tabs-example" activeKey={activeKey} onSelect={handleSelect}>
                <Row>
                    <Col sm={3} className='tabs'>
                        <hr />
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">User profile</Nav.Link>
                            </Nav.Item>
                            <hr />
                            <Nav.Item>
                                <Nav.Link eventKey="second">Change password</Nav.Link>
                            </Nav.Item>
                            <hr />
                            <Nav.Item>
                                <Nav.Link eventKey="third">Orders</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <UserProfile />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <ChangePassword/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Orders/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default UserBody
