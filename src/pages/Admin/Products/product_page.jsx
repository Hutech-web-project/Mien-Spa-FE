
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Modal, Pagination, Row, Table, Toast } from 'react-bootstrap'
import "../../../assets/scss/admin_css/product.scss"
import { validate } from 'validate.js'
import { ProductPageValidatePost, ProductPageValidatePut } from '../../../util/validate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { selectStatusPro } from '../../../redux/Product/product_page_selecter'
import { postProducts, deleteProducts, getProducts, postProduct, putProducts } from '../../../redux/Product/product_page_thunk'
import { getCategories } from '../../../redux/Category/category_page_thunk'
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
            setDataListSearch(res.payload)
        });
    }, [dispatch])
    useEffect(() => {
        if (search !== null) {
            setDataListSearch(dataListProduct?.filter((pro) => (pro?.proName.toLowerCase()).includes(search.trim().toLowerCase())));
        } else {
            setDataListSearch(dataListProduct);
        }
    }, [search, dataListProduct])

    useEffect(() => {
        dispatch(getProducts()).then((res) => {
            setDataListProduct(res.payload);
            setDataListSearch(res.payload)
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
                <Container fluid>
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
                            <EditProduct
                                show={editShow}
                                onHide={() => setEditShow(false)}
                                pro={dataEdit}
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
                                        <th>turnOn</th>
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
                                                <td>{index.proTurnOn.toString()}</td>
                                                <td >
                                                    <Button className='btn-action' variant="primary" onClick={() => hanldeClickEdit(index)}>Edit</Button>
                                                    <Button className='btn-action' variant="danger" onClick={() => hanldeDelete(index.proId)}>Delete</Button>
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
    const [checkDuplicatePost, setCheckDuplicatePost] = useState(false);
    const [dataListCate, setDataListCate] = useState([]);
    const [dataListProduct, setDataListProduct] = useState([]);
    const [dataPost, setDataPost] = useState({
        category_id: null,
        proName: "",
        proPrice: "",
        featureImgPath: "",
        proContent: "",
        proBrand: "",
        proTurnOn: true,
        isDelete: false,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts()).then((res) => {
            setDataListProduct(res.payload);
        });
    }, [dispatch])
    const [validationPost, setValidationPost] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    useEffect(() => {
        const errors = validate.validate(dataPost, ProductPageValidatePost);
        setValidationPost((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [dataPost]);

    useEffect(() => {
        dispatch(getCategories()).then((res) => {
            setDataListCate(res.payload);
        });
    }, [dispatch]);

    useEffect(() => {
        if (
            dataListProduct?.some((pro) => pro?.proName === dataPost?.proName.trim() && pro?.category_id === dataPost?.category_id) === true
        ) {
            setCheckDuplicatePost(true);
        } else {
            setCheckDuplicatePost(false);
        }
    }, [dataListProduct, dataPost?.proName, dataPost?.category_id]);
    const hasErrorPost = (field) => {
        return validationPost.touched[field] && validationPost.errors[field]
            ? true
            : false;
    };

    const hanldeChangePost = (e) => {
        setDataPost((preState) => ({
            ...preState,
            [e.target.name]: e.target.value,
        }));
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
    };

    const handleChangeImageCreate = async (e) => {
        const files = e.target.files;
        setDataPost((preState) => ({
            ...preState,
            featureImgPath: files[0],
        }));
    };
    const hanldeSelectPost = (e) => {
        if (parseInt(e.target.value) === 0) {
            setDataPost((preState) => ({
                ...preState,
                category_id: null,
            }));
        } else {
            setDataPost((preState) => ({
                ...preState,
                category_id: parseInt(e.target.value),
            }));
        }

    }

    const hanldePostPro = (e) => {
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                proName: true,
                proContent: true,
                proBrand: true,
                proPrice: true,
                featureImgPath: true,
                category_id: true,
            },
        }));
        if (validationPost.isvalid === true && checkDuplicatePost === false) {
            setValidationPost((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    proName: false,
                    proContent: false,
                    proBrand: false,
                    proPrice: false,
                    featureImgPath: false,
                    category_id: false,
                },
            }));
            dispatch(postProduct(dataPost)).then((res1) => {
                console.log(res1)
                if (res1.payload === 201) {
                    dispatch(getProducts()).then((res2) => {
                        setDataListProduct(res2.payload);
                    });
                    toast.success('Create product success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error('Create product fail !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                }
            });
        }
    };

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
                            {hasErrorPost("proName") ? validationPost.errors.proName?.[0] : null
                                || checkDuplicatePost === true ? "Genre name already exists" : null}
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
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='featureImgPath'
                            onChange={(e) => handleChangeImageCreate(e)}
                            // accept="image/png, image/jpg, image/jpeg"
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
                            as="textarea"
                            placeholder="Enter Product Content"
                            name="proContent"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proContent")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proContent") ? validationPost.errors.proContent?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProContent">
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Content"
                            name="proBrand"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proBrand")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proBrand") ? validationPost.errors.proBrand?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProBrand">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category_id"
                            isInvalid={hasErrorPost("category_id")}
                            onChange={hanldeSelectPost}
                        >
                            <option value={0} >Not selected</option>
                            {React.Children.toArray(dataListCate.map((item) => {
                                let id = 0;
                                if (item.cateIdParent === 0) {
                                    id = item.cateId;
                                    return (
                                        <>
                                            <option value={item.cateId}>{item.cateName}</option>
                                            {
                                                React.Children.toArray(dataListCate.map((chilItem) => {
                                                    if (chilItem.cateIdParent === id) {
                                                        return <option value={chilItem.cateId}>--{chilItem.cateName}</option>;
                                                    }
                                                    return null;
                                                }))
                                            }
                                        </>
                                    )
                                }
                                return null;
                            }))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("category_id") ? validationPost.errors.category_id?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicTurnOn">
                        <Form.Label>Turn on or off product</Form.Label>
                        <div className="mb-3">
                            <Form.Check
                                inline
                                value={true}
                                label="On"
                                onChange={hanldeChangePost}
                                name="proTurnOn"
                                type="radio"
                                defaultChecked
                            />
                            <Form.Check
                                inline
                                value={false}
                                label="Off"
                                onChange={hanldeChangePost}
                                name="proTurnOn"
                                type="radio"
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={hanldePostPro}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
function EditProduct(props) {
    const [checkDuplicatePut, setCheckDuplicatePost] = useState(false);
    const [dataListCate, setDataListCate] = useState([]);
    const [dataListProduct, setDataListProduct] = useState([]);
    const [dataPut, setDataPut] = useState({
        proId: "",
        category_id: 0,
        proName: "",
        proPrice: "",
        featureImgPath: null,
        proContent: "",
        proBrand: "",
        proTurnOn: true,
        isDelete: false,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts()).then((res) => {
            setDataListProduct(res.payload);
        });
        dispatch(getCategories()).then((res) => {
            setDataListCate(res.payload);
        });
    }, [dispatch])

    useEffect(() => {
        setDataPut(props.pro);
        setDataPut((preState) => ({
            ...preState,
            featureImgPath: null,
        }));
    }, [props])

    const [validationPut, setValidationPut] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    useEffect(() => {
        const errors = validate.validate(dataPut, ProductPageValidatePut);
        setValidationPut((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [dataPut]);

    const hasErrorPut = (field) => {
        return validationPut.touched[field] && validationPut.errors[field]
            ? true
            : false;
    };

    useEffect(() => {
        if (
            dataListProduct?.some((pro) => pro.proId !== dataPut?.proId && pro?.proName === dataPut?.proName && pro?.category_id === dataPut?.category_id) === true
        ) {
            setCheckDuplicatePost(true);
        } else {
            setCheckDuplicatePost(false);
        }
    }, [dataListProduct, dataPut?.proName, dataPut?.category_id]);

    const hanldeChangePut = (e) => {
        setDataPut((preState) => ({
            ...preState,
            [e.target.name]: e.target.value,
        }));
        setValidationPut((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
    }

    const handleChangeImageUpdate = async (e) => {
        const files = e.target.files;
        setDataPut((preState) => ({
            ...preState,
            featureImgPath: files[0],
        }));
    };

    const hanldeSelectPut = (e) => {
        if (parseInt(e.target.value) === 0) {
            setDataPut((preState) => ({
                ...preState,
                category_id: null,
            }));
        } else {
            setDataPut((preState) => ({
                ...preState,
                category_id: parseInt(e.target.value),
            }));
        }

    }

    const hanldeProPut = (e) => {
        setValidationPut((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                proName: true,
                proContent: true,
                proBrand: true,
                proPrice: true,
                category_id: true,
            },
        }));
        if (validationPut.isvalid === true && checkDuplicatePut === false) {
            setValidationPut((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    proName: false,
                    proContent: false,
                    proBrand: false,
                    proPrice: false,
                    category_id: false,
                },
            }));
            dispatch(putProducts(dataPut)).then((res1) => {
                console.log(res1)
                if (res1.payload === 200) {
                    dispatch(getProducts()).then((res2) => {
                        setDataListProduct(res2.payload);
                    });
                    toast.success('Create product success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error('Create product fail !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                }
            });
        }
    };
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
                        <Form.Group className="mb-3" controlId="formBasicProName">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={props.pro.proName}
                                placeholder="Enter Product name"
                                name="proName"
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("proName")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("proName") ? validationPut.errors.proName?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProPrice">
                            <Form.Label>Product price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product price"
                                name="proPrice"
                                defaultValue={props.pro.proPrice}
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("proPrice")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("proPrice") ? validationPut.errors.proPrice?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicProImg" className="mb-3">
                            <Form.Label>Choose Product image</Form.Label>
                            <Form.Control type="file"
                                accept="image/*"
                                name='featureImgPath'
                                onChange={handleChangeImageUpdate}
                                isInvalid={hasErrorPut("featureImgPath")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("featureImgPath") ? validationPut.errors.featureImgPath?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProContent">
                            <Form.Label>Product Content</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Content"
                                name="proContent"
                                defaultValue={props.pro.proContent}
                                as="textarea"
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("proContent")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("proContent") ? validationPut.errors.proContent?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProBrand">
                            <Form.Label>Product Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product Brand"
                                name="proBrand"
                                defaultValue={props.pro.proBrand}
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("proBrand")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("proBrand") ? validationPut.errors.proBrand?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProBrand">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category_id"
                                isInvalid={hasErrorPut("category_id")}
                                onChange={hanldeSelectPut}
                                defaultValue={props.pro.category_id}
                            >
                                <option value={0} >Not selected</option>
                                {React.Children.toArray(dataListCate.map((item) => {
                                    let id = 0;
                                    if (item.cateIdParent === 0) {
                                        id = item.cateId;
                                        return (
                                            <>
                                                <option value={item.cateId}>{item.cateName}</option>
                                                {
                                                    React.Children.toArray(dataListCate.map((chilItem) => {
                                                        if (chilItem.cateIdParent === id) {
                                                            return <option value={chilItem.cateId}>--{chilItem.cateName}</option>;
                                                        }
                                                        return null;
                                                    }))
                                                }
                                            </>
                                        )
                                    }
                                    return null;
                                }))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("category_id") ? validationPut.errors.category_id?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicTurnOn">
                            <div className="mb-3">
                                <Form.Check
                                    inline
                                    value={true}
                                    label="On"
                                    onChange={hanldeChangePut}                   
                                    name="proTurnOn"
                                    type="radio"
                                    defaultChecked ={props.pro.proTurnOn === true?true:false}
                                />
                                <Form.Check
                                    inline
                                    value={false}
                                    label="Off"
                                    onChange={hanldeChangePut}
                                    defaultChecked ={props.pro.proTurnOn === false?true:false}
                                    name="proTurnOn"
                                    type="radio"
                                />
                            </div>
                        </Form.Group>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={hanldeProPut}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default Product
