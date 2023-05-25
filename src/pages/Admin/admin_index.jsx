import React, { useState } from 'react'
import Appbar from '../../global_components/admin/appbar'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import '../../assets/scss/admin_css/admin.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoriesPage from './Categories/categories_page'
import ProductsPage from './Products/products_page'
import ServicesPage from './Services/services_page'
import AccountsPage from './Accounts/accounts_page'
const AdminIndex = () => {
  const [Id,setId]= useState(1)
  const handleSelect = (id)=>{
    let collapseOld = document.getElementById('item-'+Id);
    collapseOld.classList.remove('active');
    let collapse = document.getElementById('item-'+id);
    collapse.classList.add('active'); 
    setId(id);
  }
  return (
    <Container fluid className='admin'>
      <Row className='admin_body'>
        <Col xs={12} sm={12} md={2} className='admin_sidebar'>
          <ListGroup as="ul" className='sidebar_list'defaultActiveKey="#1">
            <ListGroup.Item className='sidebar_logo' as="li" >
              <FontAwesomeIcon icon={['fas', 'dashboard']} size='lg'/> Dashboard
            </ListGroup.Item>
            <ListGroup.Item  action className='sidebar_item active' id='item-1'  onClick={()=>handleSelect(1)}>Categories</ListGroup.Item>
            <ListGroup.Item action className='sidebar_item' id='item-2'  onClick={()=>handleSelect(2)}>Products</ListGroup.Item>
            <ListGroup.Item action className='sidebar_item' id='item-3'  onClick={()=>handleSelect(3)}>Service</ListGroup.Item>
            <ListGroup.Item action className='sidebar_item' id='item-4'  onClick={()=>handleSelect(4)}>Order</ListGroup.Item>
            <ListGroup.Item action className='sidebar_item' id='item-5'  onClick={()=>handleSelect(5)}>Booking</ListGroup.Item>
            <ListGroup.Item action className='sidebar_item' id='item-6'  onClick={()=>handleSelect(6)}>Account</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={12} sm={12} md={10}  className='admin_page'>
          <Appbar />
          <Container fluid className='admin_page_body'>
            {Id === 1?<CategoriesPage/>:''}
            {Id === 2?<ProductsPage/>:''}
            {Id === 3?<ServicesPage/>:''}
            {Id === 4?<CategoriesPage/>:''}
            {Id === 5?<CategoriesPage/>:''}
            {Id === 6?<AccountsPage/>:''}
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminIndex