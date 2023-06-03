import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { OffChekOut } from '../../../../redux/Storage/storage_page_reducer';
import { selectUser } from '../../../../redux/User/user_page_selecter';
import { date } from "../../../../util/custom";
import { selectCartPro } from '../../../../redux/Cart/cart_page_selecter';
import { ToastContainer, toast } from 'react-toastify'
import { validate } from 'validate.js';
import { OrderPage } from '../../../../util/validate';
import { PayPalButton } from 'react-paypal-button-v2';
import { postOrderPro } from '../../../../redux/OrderPro/order_page_thunk'
import { clearCart } from '../../../../redux/Cart/cart_page_reducer';
import { useNavigate } from 'react-router-dom';

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

const CartCheckOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [totalPro, setTotalPro] = useState(0.0);
    const cartList = useSelector(selectCartPro);
    const [address, setAddress] = useState(user?.usAddress === undefined ? "" : user?.usAddress);
    const [ship, setShip] = useState(0)
    const [valueAdd, setValueAddd] = useState("");
    const autoCompleteRef = useRef();
    const valueDirection = useRef();
    const [map, setMap] = useState({
        distance: "0 km",
    });
    const [validation, setValidation] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    const [order, setOrder] = useState({
        orProAddress: user ? user.usAddress : "",
        orProDob: new Date(new Date(date).setDate(new Date(date).getDate() + 5))
            .toISOString()
            .replace(/.\d+Z$/g, "Z"),
        orProNote: "NULL",
        orProPayStatus: "Unpaid",
        orProPayment: "Payment on delivery",
        orProPhoneNo: user ? user.usPhoneNo : "",
        orProStatus: "Wait for confirmation",
        orProTotal: 0.0,
        orProShip: 0.0,
        orProUserId: user ? user.usId : null,
        orProUserName: user ? user.usUserName : "",
        listProId: [
            {
                proProductName: "",
                proProductPrice: 0,
                proQuantity: 0,
                productId: ""
            },
        ],
    });
    useEffect(() => {
        const errors = validate.validate(order, OrderPage);
        setValidation((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));

    }, [order]);
    console.log(cartList)
    useEffect(() => {
        const list = [];
        cartList.forEach((element) => {
            list.push({
                proProductName: element.proProductName,
                proProductPrice: element.proProductPrice,
                proQuantity: element.proQuantity,
                productId: element.productId,
            });
        });

        let total = 0;
        cartList?.forEach((cart) => {
            total = total + (cart.proProductPrice * cart.proQuantity)
        })
        total = parseFloat(total) + parseFloat(order.orProShip)
        setOrder((preState) => ({
            ...preState,
            listProId: list,
            orProTotal: total.toFixed(2) ,
        }));
        setTotalPro(total.toFixed(2));
    }, [cartList, order.orProPayment, order.orProShip]);

    useEffect(() => {
        const options = {
            componentRestrictions: { country: "vn" },
            fields: ["address_components", "geometry", "icon", "name", "adr_address", "formatted_address"],
            strictBounds: false,
        };
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            valueDirection.current,
            options
        );
    }, []);

    useEffect(() => {
        setOrder((preState) => ({
            ...preState,
            orProAddress: address,
        }));
    }, [address]);

    useEffect(() => {
        setOrder((preState) => ({
            ...preState,
            orProShip: parseFloat(ship),
        }));
    }, [ship]);

    const hasError = (field) => {
        return validation.touched[field] && validation.errors[field] ? true : false;
    };

    const handleChange = (event) => {
        setOrder((preState) => ({
            ...preState,
            [event.target.name]: event.target.value,
        }));
        setValidation((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [event.target.name]: true,
            },
        }));
    };

    const calculateRoute = async (e) => {
        const google = window.google;
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin:
                "17 Đường Miếu Nổi, Phường 7, Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam",
            destination: valueDirection.current.value,
            travelMode: google.maps.TravelMode.DRIVING,
        });

        let lastDistance = 0;
        const setDistance = results.routes[0].legs[0].distance.text.split(/\s/)?.[0]; // chuyển doi
        if (setDistance.includes(",") === true) {
            lastDistance = Math.ceil(Number(setDistance.replace(",", ".")));
        } else if (setDistance.includes(".") === true) {
            lastDistance = Math.ceil(Number(setDistance.replace(".", "")));
        } else {
            lastDistance = Math.ceil(Number(setDistance));
        }
        setShip((0.21 * lastDistance).toFixed(2));
        setMap({ distance: results.routes[0].legs[0].distance.text });
    };

    const hanldeLeaveMouse = () => {

        var place;
        autoCompleteRef.current.addListener("place_changed", async function () {
            place = await autoCompleteRef.current.getPlace();
            setAddress(place.formatted_address);
            const add = document.getElementById('address');
            add.value = place.formatted_address;
            calculateRoute();
            return;
        });
        if (address !== "") {
            const add = document.getElementById('address');
            add.value = address;
        }
        else {
            const add = document.getElementById('address');
            add.value = "";
        }
    }

    const hanldeClick = () => {
        if (address !== "") {
            const add = document.getElementById('address');
            add.value = address;
        } else {
            const add = document.getElementById('address');
            add.value = valueAdd;
        }
    }

    const hanldeAddress = (e) => {
        setValueAddd(e.target.value);
    }

    const hanldeBack = () => {
        dispatch(OffChekOut());
    }

    const hanldeCheckIn = () => {
        setValidation((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                orProAddress: true,
                orProPhoneNo: true,
                orProUserName: true,
            },
        }));
    };

    const hanldeOrder = ()=> {
        setValidation((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                orProAddress: true,
                orProPhoneNo: true,
                orProUserName: true,
            },
        }));
        console.log(order);
        if (validation.isvalid === true) {
            dispatch(postOrderPro(order)).then(async(res) => {
                console.log(res);
                if (res.payload === 201) {
                    toast.success('Update category success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    await delay(700);
                    dispatch(clearCart());
                    navigate("/shop");                  
                } else {
                    toast.error('Update category fail !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                }
            });
        }
    }
    return (
        <div className="checkout">
            <section className="py-5">
                <Container className="px-4 px-lg-5 my-5">
                    <Row>
                        <Col md={4} className="order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your cart</span>
                                <span className="badge badge-secondary badge-pill">3</span>
                            </h4>
                            <ul className="list-group mb-3">
                                {React.Children.toArray(cartList?.map((cart) => {
                                    return (
                                        <>
                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <div>
                                                    <h6 className="my-0">{cart.proProductName}</h6>
                                                </div>
                                                <span className="text-muted">${(cart.proProductPrice * cart.proQuantity).toFixed(2)}</span>
                                            </li>
                                        </>
                                    )
                                }))}
                                <li className="list-group-item d-flex justify-content-between bg-light">
                                    <div className="text-success">
                                        <h6 className="my-0">Transport fee</h6>
                                        <small>{map.distance}</small>
                                    </div>
                                    <span className="text-success">$ {ship}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (USD)</span>
                                    <strong>$ {totalPro}</strong>
                                </li>
                            </ul>
                        </Col>
                        <Col md={8} className="order-md-1">
                            <h4 className="mb-3">Billing product</h4>
                            <Form className="needs-validation" as={Col}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>User name</Form.Label>
                                    <Form.Control
                                        name="orProUserName"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter user name"
                                        defaultValue={order.orProUserName}
                                        isInvalid={hasError("orProUserName")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {hasError("orProUserName") ? validation.errors.orProUserName?.[0] : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        name="orProPhoneNo"
                                        type="text"
                                        placeholder="Enter number"
                                        defaultValue={order.orProPhoneNo}
                                        isInvalid={hasError("orProPhoneNo")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {hasError("orProPhoneNo") ? validation.errors.orProPhoneNo?.[0] : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        onChange={hanldeAddress}
                                        onClick={hanldeClick}
                                        id="address"
                                        name="orProAddress"
                                        defaultValue={address}
                                        placeholder="Enter address"
                                        aria-describedby="basic-addon2"
                                        ref={valueDirection}
                                        onBlur={hanldeLeaveMouse}
                                        isInvalid={hasError("orProAddress")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {hasError("orProAddress") ? validation.errors.orProAddress?.[0] : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <hr className="mb-4" />
                                <h4 className="mb-3">Payment</h4>
                                <div className="d-block my-3">
                                    <div className="mb-3">
                                        <Form.Check
                                            label="Cash"
                                            value="Payment on delivery"
                                            name="orProPayment"
                                            onChange={handleChange}
                                            type="radio"
                                            id="1"
                                            defaultChecked
                                        />
                                        <Form.Check
                                            label="Paypal"
                                            name="orProPayment"
                                            value="Paypal"
                                            onChange={handleChange}
                                            onClick={hanldeCheckIn}
                                            type="radio"
                                            id="2"
                                        />
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                {order?.orProPayment === "Paypal" ?
                                    validation.isvalid === true ? (
                                        <div style={{ marginLeft: 100, marginRight: 100 }}>
                                            <PayPalButton
                                                options={{
                                                    clientId: process.env.REACT_APP_PAYPAL,
                                                    currency: "USD",
                                                }}
                                                amount={totalPro}
                                                onSuccess={() => {
                                                    setOrder((preState) => ({
                                                        ...preState,
                                                        orProPayStatus: "Đã thanh toán",
                                                    }));
                                                    hanldeOrder();
                                                }}
                                            />
                                        </div>
                                    ) :
                                        <Alert key={'danger'} variant={'danger'}>
                                            Please enter all information before ordering
                                        </Alert>
                                    : (
                                        <button className="btn btn-dark px-4 rounded-pill" type="button" onClick={hanldeOrder}>Place Order</button>
                                    )}
                            </Form>
                        </Col>
                    </Row>
                    <ToastContainer />
                </Container>
                <Col>
                    <div className="back-to-shop">
                        <a href="#!" style={{
                            textDecoration: 'none',
                            color: "#000000",
                            marginLeft: 50,
                        }}
                            onClick={hanldeBack}
                        ><FontAwesomeIcon icon={['fa', 'arrow-left']} /><span className="text-muted"> Back to shop</span></a> </div>
                </Col>
            </section>

        </div>
    )
}

export default CartCheckOut;