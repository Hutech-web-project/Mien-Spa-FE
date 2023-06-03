import { Col, Form, InputGroup,Row, Tab, Tabs} from 'react-bootstrap'
import "../../../assets/scss/admin_css/order.scss"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrdersProWaiting from './compoments/orders_pro_waiting';
import OrdersProDelivered from './compoments/orders_pro_delivered';
import OrdersProCancelled from './compoments/orders_pro_cancelled';
function OrderProPage() {
    const [search, setSearch] = useState("");
    
    const hanldeSearch = (e) => {
        setSearch(e.target.value);
    }
    return (
        <>
            <section className='order'>
                <Row className='order-top justify-content-center'>
                    <Col sm={8}>
                        <div className='order-search'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    className="search"
                                    placeholder="Input Order ID name"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={hanldeSearch}
                                />
                                <InputGroup.Text id="basic-addon1">
                                    <FontAwesomeIcon icon={['fa', 'search']} />
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <div className='order-center'>
                    <Tabs
                        defaultActiveKey="waitting"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="waitting" title="Waitting">
                           <OrdersProWaiting search={search}/>
                        </Tab>
                        <Tab eventKey="delivered" title="Delivered">
                            <OrdersProDelivered search={search}/>
                        </Tab>
                        <Tab eventKey="cancelled" title="Cancelled">
                            <OrdersProCancelled search={search}/>
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </>
    )
}

export default OrderProPage
