import React from 'react'
import { Col } from 'react-bootstrap'
import AppBar from "../../../global_components/user/appbar"
import Footer from '../../../global_components/user/footer'
import '../../../assets/scss/user_css/pageIndex.scss'
import CartBody from './components/cart_body'
const CartIndex = () => {
  return (
    <>
    <AppBar id={4}></AppBar>
    <main>
      <Col className='body'>
        <CartBody></CartBody>
      </Col>
    </main>
    <Footer></Footer>
  </>
  )
}

export default CartIndex