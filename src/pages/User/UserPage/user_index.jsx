import React from 'react'
import AppBar from '../../../global_components/user/appbar'
import UserBody from './component/user_body'
import { Col } from 'react-bootstrap'
import Footer from '../../../global_components/user/footer'
const UserIndex = () => {
  return (
    <div>
        <>
      <AppBar id={7}></AppBar>
      <main>
        <Col className='body'>
          <UserBody></UserBody>
        </Col>
      </main>
      <Footer></Footer>
    </>
    </div>
  )
}

export default UserIndex
