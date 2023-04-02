import React from 'react'
import AppBar from '../../../global_components/user/appbar'
import BookingBody from './component/booking_body'
import '../../../assets/css/user_css/pageIndex.scss'
import { Col } from 'react-bootstrap'
import Footer from '../../../global_components/user/footer'


const BookingIndex = () => {
  return (
    <>
      <AppBar id={5}></AppBar>
      <main>
        <Col className='body'>
          <BookingBody></BookingBody>
        </Col>
      </main>
      <Footer></Footer>
    </>
  )
}

export default BookingIndex