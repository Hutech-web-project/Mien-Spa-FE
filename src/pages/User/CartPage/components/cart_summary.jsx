import { Col, Row } from 'react-bootstrap'
import "../../../../assets/scss/user_css/cart_page/cart_body.scss"
import { useDispatch, useSelector } from 'react-redux'
import { selectCartPro } from '../../../../redux/Cart/cart_page_selecter'
import React from 'react'
import { OnChekOut } from '../../../../redux/Storage/storage_page_reducer'


const CartSummary = () => {
    const dispatch = useDispatch();
    const cartList = useSelector(selectCartPro);
    const totalPrice = () => {
        let total = 0;
        cartList?.map((cart) => {
            total = total + (cart.proProductPrice * cart.proQuantity)
        })
        return total.toFixed(2);
    }

    const hanldeCheckOut = () => {
        dispatch(OnChekOut());
    }
    return (
        <>
            <div><h5><b>Summary</b></h5></div>
            <hr />
            {React.Children.toArray(cartList?.map((cart) => {
                return (
                    <>
                        <Row>
                            <Col className='col-title'>ITEMS {cart.proProductName}</Col>
                            <Col className="text-right">$ {(cart.proProductPrice * cart.proQuantity).toFixed(2)}</Col>
                        </Row>
                    </>
                )
            }))}
            <Row className='row-title'>
                <Col>TOTAL PRICE</Col>
                <Col className="text-right">$ {totalPrice()}</Col>
            </Row>
            {cartList.length > 0?
                <button className="btn" onClick={hanldeCheckOut}>CHECKOUT</button>: <button className="btn" disabled>CHECKOUT</button>
            }
        </>
    )
}

export default CartSummary
