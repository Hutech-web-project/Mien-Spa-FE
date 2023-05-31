
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Modal, Pagination, Row, Table, Toast, ToastContainer } from 'react-bootstrap'
import "../../../assets/scss/admin_css/product.scss"
import { validate } from 'validate.js'
import { ProductPageValidate } from '../../../util/validate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { selectStatusPro } from '../../../redux/Product/product_page_selecter'
import { postProducts, deleteProducts, getProducts, putProducts } from '../../../redux/Product/product_page_thunk'
const Product = () => {
    const [createShow, setCreateShow] = useState(false);
    const [deleteshow, setDeleteShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [dataEdit, setDataEdit] = useState({})
    const [idDel, setIdDel] = useState(0);
    const [dataListProduct, setDataListProduct] = useState([]);
    const [dataListSearch, setDataListSearch] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage,] = useState(10);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts()).then((res) => {
            setDataListProduct(res.payload);
        });
    }, [createShow, editShow, deleteshow, dispatch])
    useEffect(() => {
        if (search !== null) {
            setDataListSearch(dataListProduct?.filter((pro) => (pro?.proName.toLowerCase()).includes(search.toLowerCase())));
        } else {
            setDataListSearch(dataListProduct);
        }
    }, [search, dataListProduct])
    const convertProParent = (e) => {
        let check = false;
        let name = "";
        dataListProduct.forEach((item) => {
            if (item.proID === e) {
                check = true;
                name = item.proName;
            }
        })
        if (check === false) {
            return "main";
        } else {
            return name;
        }
    }
    useEffect(() => {
        dispatch(getProducts()).then((res) => {
            setDataListProduct(res.payload);
        });
    }, [createShow, editShow, deleteshow, dispatch])

    const hanldeSearch = (e) => {
        setSearch(e.target.value);
    }

    const hanldeClickEdit = (data) => {
        setEditShow(true);
        setDataEdit(data);
    }

    const hanldeDelete = (id) => {
        setDeleteShow(true);
        setIdDel(id);
    }

    const NextPage = () => {
        setPage(page + 1);
    }

    const PrevPage = () => {
        setPage(page - 1);
    }

    const ClickPage = (e) => {
        setPage(e - 1);
    }

    let rows = [];
    for (let i = 1; i < (dataListProduct.length / rowsPerPage) + 1; i++) {
        if (i - 1 === page) {
            rows.push(<Pagination.Item key={i} active onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
        } else {
            rows.push(<Pagination.Item key={i} onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
        }
    }

    return (
        <>
            <section className='product'>
                <Container>
                    <Row className='product-top'>
                        <Col xs={12} sm={12} md={12} lg={4} className='add'>
                            <div >
                                <Button variant="success" onClick={() => setCreateShow(true)}>Add Product</Button>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={8}>
                            <div className='product-search'>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        className="search"
                                        placeholder="Input category name"
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
                    <Row className='product-center'>
                        <Col>
                            <AddProduct
                                show={createShow}
                                onHide={() => setCreateShow(false)}
                            />
                           <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Feature_img_path</th>
                                    <th>Content</th>
                                    <th>Brand</th>
                                    {/* <th>turnOn</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((index) => {
                                    return (
                                        <tr key={index.proId}>
                                            <td>{index.proId}</td>
                                            <td>{index.proName}</td>
                                            <td>{index.proPrice}</td>
                                            <td><img src={
                                                process.env.REACT_APP_API_URL +
                                                "/image/product/" +
                                                index.featureImgPath} style={{
                                                    backgroundColor: "#22d3ee",
                                                    color: "white",
                                                    borderRadius: "30px",
                                                    padding: 6,
                                                    cursor: "pointer",
                                                    height: 200,
                                                    width: 200,
                                                }} alt="" /></td>
                                            <td>{index.proContent}</td>
                                            <td>{index.proBrand}</td>
                                            <td >
                                                <Button className='btn-action' variant="primary" onClick={() => hanldeClickEdit(index)}>Edit</Button>

                                                <Button className='btn-action' variant="danger" onClick={() => hanldeDelete(index.proId)}>Delete</Button>
                                                {/* <Button className='btn-action' variant="success" onClick={() => hanldeBlock(index.cateId)}>Delete</Button> */}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        </Col>
                        <ToastContainer />
                    </Row>
                    <Row className='category-bottom'>
                        {Math.floor(dataListProduct.length / rowsPerPage) !== 0 ?
                            <Col md={{ span: 10, offset: 10 }}>
                                <Pagination>
                                    {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                                    {rows}
                                    {page === Math.floor(dataListProduct.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
                                </Pagination>
                            </Col> : null
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}

function AddProduct(props) {
    const [dataPost, setDataPost] = useState({
        category_id: 0,
        proName: "",
        proPrice: "",
        featureImgPath: "",
        proContent: "",
        proBrand: "",
        turnOn: 0,
        isDelete: false,
    });
    const [validationPost, setValidationPost] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });
    useEffect(() => {
        const errors = validate.validate(dataPost, ProductPageValidate);
        setValidationPost((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [dataPost]);
    const hasErrorPost = (field) => {
        return validationPost.touched[field] && validationPost.errors[field]
            ? true
            : false;
    };
    const hanldeChangePost = (e) => {
        setDataPost((preState) => ({
            ...preState,
            proName: e.target.value,
            proPrice: e.target.value,
            featureImgPath: e.target.value,
            proBrand: e.target.value,
            proContent: e.target.value
        }));
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicProName">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product name"
                            name="proName"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proName")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proName") ? validationPost.errors.proName?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProPrice">
                        <Form.Label>Product price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product price"
                            name="proPrice"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proPrice")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proPrice") ? validationPost.errors.proPrice?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicProImg" className="mb-3">
                        <Form.Label>Choose Product image</Form.Label>
                        <Form.Control type="file"
                            accept="image/*"
                            name='featureImgPath'
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("featureImgPath")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("featureImgPath") ? validationPost.errors.featureImgPath?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProContent">
                        <Form.Label>Product Content</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Content"
                            name="proContent"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proContent")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proContent") ? validationPost.errors.proContent?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProBrand">
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Brand"
                            name="proBrand"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proBrand")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proBrand") ? validationPost.errors.proBrand?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicTurnOn">
                        <Form.Label>Turn on or off product</Form.Label>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="On"
                                    name="turnOn"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Off"
                                    name="turnOn"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                            </div>
                        ))}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.onHide}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
function EditProduct(props) {
    const showToastMessage = () => {
        Toast.success('Success Notification !', {
            position: Toast.POSITION.TOP_RIGHT
        });
        props.onHide();
    };
    const [dataPost, setDataPost] = useState({
        category_id: 0,
        proName: "",
        proPrice: "",
        featureImgPath: "",
        proContent: "",
        proBrand: "",
        turnOn: 0,
        isDelete: false,
    });
    const [validationPost, setValidationPost] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });
    useEffect(() => {
        const errors = validate.validate(dataPost, ProductPageValidate);
        setValidationPost((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [dataPost]);
    const hasErrorPost = (field) => {
        return validationPost.touched[field] && validationPost.errors[field]
            ? true
            : false;
    };
    const hanldeChangePost = (e) => {
        setDataPost((preState) => ({
            ...preState,
            proName: e.target.value,
            proPrice: e.target.value,
            featureImgPath: e.target.value,
            proBrand: e.target.value,
            proContent: e.target.value
        }));
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicProName">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product name"
                                name="proName"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("proName")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("proName") ? validationPost.errors.proName?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProPrice">
                            <Form.Label>Product price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product price"
                                name="proPrice"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("proPrice")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("proPrice") ? validationPost.errors.proPrice?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicProImg" className="mb-3">
                            <Form.Label>Choose Product image</Form.Label>
                            <Form.Control type="file"
                                accept="image/*"
                                name='featureImgPath'
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("featureImgPath")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("featureImgPath") ? validationPost.errors.featureImgPath?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProContent">
                            <Form.Label>Product Content</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Content"
                                name="proContent"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("proContent")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("proContent") ? validationPost.errors.proContent?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProBrand">
                            <Form.Label>Product Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Brand"
                                name="proBrand"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("proBrand")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("proBrand") ? validationPost.errors.proBrand?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicTurnOn">
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="On"
                                        name="turnOn"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Off"
                                        name="turnOn"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                </div>
                            ))}
                        </Form.Group>
                    </Form>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={showToastMessage}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default Product
