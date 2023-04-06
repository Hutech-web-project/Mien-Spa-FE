import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Accordion, Col, Container, Form, Pagination, Row } from 'react-bootstrap'
import '../../../../assets/scss/user_css/shop_page/shop_body.scss'
const ShopBody = () => {
  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
      e.target.value = '';
    }
  }
  return (
    <>
      <section className='shop'>
        <Container>
          <Row>
            <Col md={3} sm={12} xs={12}>
              <div className='shop-siderbar'>
                <div className="shop-sidebar-search">
                  <Form className='form' as={Col} >
                    <Form.Group>
                      <Col className='form-item'>
                        <Form.Control className='form-item-input' type="text" placeholder="Enter email" onError={true} onKeyDown={_handleKeyDown} />
                        <FontAwesomeIcon className='form-item-icon' icon={['fa', 'search']} />
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
                <div className="shop-sidebar-accordion">
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Categories</Accordion.Header>
                          <Accordion.Body>
                            <div className="card-body">
                              <div className="shop__sidebar__categories">
                                <ul className="nice-scroll">
                                  <li><a href="!#">Men (20)</a></li>
                                  <li><a href="!#">Women (20)</a></li>
                                  <li><a href="!#">Bags (20)</a></li>
                                  <li><a href="!#">Clothing (20)</a></li>
                                  <li><a href="!#">Shoes (20)</a></li>
                                  <li><a href="!#">Accessories (20)</a></li>
                                  <li><a href="!#">Kids (20)</a></li>
                                  <li><a href="!#">Kids (20)</a></li>
                                  <li><a href="!#">Kids (20)</a></li>
                                </ul>
                              </div>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={9} sm={12} xs={12}>
              <Row className='demo' >
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={require('../../../../assets/images/bongtaytrang_ipek.jpg')} alt='pic-1' />
                          <img className="pic-2" src={require('../../../../assets/images/bongtaytrang_ipek.jpg')} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="!#" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="!#" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="!#" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="!#">Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="!#">Women's Designer Top</a></h3>
                      <span className="price">$599.99</span>
                    </div>
                  </Col>
                </Col>
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={require('../../../../assets/images/bongtaytrang_simple.jpg')} alt='pic-1' />
                          <img className="pic-2" src={require('../../../../assets/images/bongtaytrang_simple.jpg')} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="!#" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="!#" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="!#" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="!#">Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="!#">Women's Designer Top</a></h3>
                      <span className="price">$599.99</span>
                    </div>
                  </Col>
                </Col>
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={require('../../../../assets/images/bongtaytrang_ipek.jpg')} alt='pic-1' />
                          <img className="pic-2" src={require('../../../../assets/images/bongtaytrang_ipek.jpg')} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="!#" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="!#" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="!#" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="!#">Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="!#">Women's Designer Top</a></h3>
                      <span className="price">$599.99</span>
                    </div>
                  </Col>
                </Col>
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={require('../../../../assets/images/bongtaytrang_simple.jpg')} alt='pic-1' />
                          <img className="pic-2" src={require('../../../../assets/images/bongtaytrang_simple.jpg')} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="!#" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="!#" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="!#" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="!#">Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="!#">Women's Designer Top</a></h3>
                      <span className="price">$599.99</span>
                    </div>
                  </Col>
                </Col>
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={require('../../../../assets/images/bongtaytrang_ipek.jpg')} alt='pic-1' />
                          <img className="pic-2" src={require('../../../../assets/images/bongtaytrang_ipek.jpg')} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="!#" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="!#" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="!#" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="!#">Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="!#">Women's Designer Top</a></h3>
                      <span className="price">$599.99</span>
                    </div>
                  </Col>
                </Col>
              </Row>
            </Col>
            <Col>
              <Pagination >
                <Pagination.First />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item active>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Last />
              </Pagination>
            </Col>
          </Row>
        </Container>

      </section>
    </>
  )
}

export default ShopBody