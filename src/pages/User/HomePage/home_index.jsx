import React from 'react'
import AppBar from '../../../global_components/user/appbar'
import Carousels from '../../../global_components/user/carousels'
import HomeBody from './component/home_body'
import '../../../assets/scss/user_css/pageIndex.scss'
import { Col } from 'react-bootstrap'
import Footer from '../../../global_components/user/footer'

const HomeIndex = () => {
  return (
    <>
      <AppBar id={1}></AppBar>
      <main>
        <Col className='carousels'>
          <Carousels></Carousels>
        </Col>
        <Col className='body'>
          <HomeBody></HomeBody>
        </Col>
      </main>
      <Footer></Footer>
    </>
  )
}

export default HomeIndex