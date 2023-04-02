import React from 'react'
import { Col } from 'react-bootstrap'
import AppBar from '../../../global_components/user/appbar'
import Footer from '../../../global_components/user/footer'
import ShopBody from './components/shop_body'
import '../../../assets/css/user_css/pageIndex.scss'
const ShopIndex = () => {
    return (
        <>
            <AppBar id={2}></AppBar>
            <main>
                <Col className='body'>
                    <ShopBody></ShopBody>
                </Col>
            </main>
            <Footer></Footer>
        </>
    )
}

export default ShopIndex