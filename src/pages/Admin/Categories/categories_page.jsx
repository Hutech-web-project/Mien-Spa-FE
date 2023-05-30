import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Form, InputGroup, Spinner } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Pagination } from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import '../../../assets/scss/admin_css/category.scss'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { validate } from 'validate.js'
import { CategoriesPageValidate } from '../../../util/validate'
import { useDispatch, useSelector } from 'react-redux'
import { selectStatusCate } from '../../../redux/Category/category_page_selecter'
import { deleteCategories, getCategories, postCategories, putCategories } from '../../../redux/Category/category_page_thunk'
function CategoriesPage() {
  const [createShow, setCreateShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteshow, setDeleteShow] = useState(false);
  const [dataEdit, setDataEdit] = useState({})
  const [idDel, setIdDel] = useState(0);
  const [dataListCate, setDataListCate] = useState([]);
  const [dataListSearch, setDataListSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage,] = useState(10);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories()).then((res) => {
      setDataListCate(res.payload);
      setDataListSearch(res.payload);
    });

  }, [dispatch]);

  useEffect(() => {
    if (search !== null) {
      setDataListSearch(dataListCate?.filter((cate) => (cate?.cateName.toLowerCase()).includes(search.toLowerCase())));
    } else {
      setDataListSearch(dataListCate);
    }
  }, [search, dataListCate])
  const convertCateParent = (e) => {
    let check = false;
    let name = "";
    dataListCate.forEach((item) => {
      if (item.cateId === e) {
        check = true;
        name = item.cateName;
      }
    })
    if (check === false) {
      return "main";
    } else {
      return name;
    }
  }

  useEffect(() => {
    dispatch(getCategories()).then((res) => {
      setDataListCate(res.payload);
    });
  }, [createShow, editShow, deleteshow,dispatch])

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
  for (let i = 1; i < (dataListCate.length / rowsPerPage) + 1; i++) {
    if (i - 1 === page) {
      rows.push(<Pagination.Item key={i} active onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    } else {
      rows.push(<Pagination.Item key={i} onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    }
  }
  return (
    <>
      <section className='category'>
        <Row className='category-top'>
          <Col xs={12} sm={12} md={12} lg={4} className='add'>
            <div >
              <Button variant="success" onClick={() => setCreateShow(true)}>Add Category</Button>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8}>
            <div className='category-search'>
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
        <Row className='category-center'>
          <Col>
            <AddCategory
              show={createShow}
              onHide={() => setCreateShow(false)}
            />
            <EditCategory
              show={editShow}
              cate={dataEdit}
              onHide={() => setEditShow(false)}
            />
            <DeleteCategory
              show={deleteshow}
              cateid={idDel}
              onHide={() => setDeleteShow(false)}
            />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category name</th>
                  <th>Category parent</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((index) => {
                  return (
                    <tr key={index.cateId}>
                      <td>{index.cateId}</td>
                      <td>{index.cateName}</td>
                      <td>{convertCateParent(index.cateIdParent)}</td>
                      <td>
                        <Button className='btn-action' variant="primary" onClick={() => hanldeClickEdit(index)}>Edit</Button>

                        <Button className='btn-action' variant="danger" onClick={() => hanldeDelete(index.cateId)}>Delete</Button>

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
          {Math.floor(dataListCate.length / rowsPerPage) !== 0 ?
            <Col md={{ span: 10, offset: 10 }}>
              <Pagination>
                {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                {rows}
                {page === Math.floor(dataListCate.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
              </Pagination>
            </Col> : null
          }
        </Row>
      </section>
    </>
  )
}

function AddCategory(props) {
  const [dataListCate, setDataListCate] = useState([]);
  const isLoading = useSelector(selectStatusCate);
  const dispatch = useDispatch();
  const [dataPost, setDataPost] = useState({
    cateIdParent: 0,
    cateName: "",
    isDelete: false,
  });
  const [validationPost, setValidationPost] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  const [checkDuplicatePost, setCheckDuplicatePost] = useState(false);

  useEffect(() => {
    dispatch(getCategories()).then((res) => {
      setDataListCate(res.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    // console.log(dataListCate?.find((cate) => cate?.cateName.includes(dataPost?.cateName) && cate?.cateIdParent === dataPost?.cateIdParent))
    if (
      dataListCate?.some((cate) => cate?.cateName === dataPost?.cateName.trim() && cate?.cateIdParent === dataPost?.cateIdParent) ===
      true || dataListCate?.some((cate) => cate?.cateName === dataPost?.cateName && cate?.cateIdParent === 0) === true
    ) {
      setCheckDuplicatePost(true);
    } else {
      setCheckDuplicatePost(false);
    }
  }, [dataListCate, dataPost?.cateName, dataPost?.cateIdParent]);

  useEffect(() => {
    const errors = validate.validate(dataPost, CategoriesPageValidate);
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
      cateName: e.target.value.trim(),
    }));
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  }

  const hanldeSelectPost = (e) => {
    setDataPost((preState) => ({
      ...preState,
      cateIdParent: parseInt(e.target.value),
    }));
  }
  const handlePostCate = () => {
    if (validationPost.isvalid === true && checkDuplicatePost === false) {
      setValidationPost((pre) => ({
        ...pre,
        touched: {
          ...pre.touched,
          cateName: false,
        },
      }));
      dispatch(postCategories(dataPost)).then((res1) => {
        if (res1.payload === 201) {
          dispatch(getCategories()).then((res2) => {
            setDataListCate(res2.payload);
            setDataPost((preState) => ({
              ...preState,
              cateName: "",
            }));
          });
          toast.success('Create category success !', {
            position: toast.POSITION.TOP_RIGHT
          });
          props.onHide();
        } else {
          toast.error('Create category fail !', {
            position: toast.POSITION.TOP_RIGHT
          });
          props.onHide();
        }
      });
    }
  }

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                name="cateName"
                onChange={hanldeChangePost}
                isInvalid={hasErrorPost("cateName") || checkDuplicatePost}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorPost("cateName") ? validationPost.errors.cateName?.[0] : null
                  || checkDuplicatePost === true ? "Genre name already exists" : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Select onChange={hanldeSelectPost}>
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
                              return <option value={chilItem.cateId} disabled>--{chilItem.cateName}</option>;
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePostCate}>
            {isLoading === true ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function EditCategory(props) {
  const [dataListCate, setDataListCate] = useState([]);
  const isLoading = useSelector(selectStatusCate);
  const dispatch = useDispatch();
  const [dataPut, setDataPut] = useState({
    cateId: 0,
    cateIdParent: 0,
    cateName: "",
    isDelete: false,
  });
  const [validationPut, setValidationPut] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  const [checkDuplicatePut, setCheckDuplicatePut] = useState(false);

  useEffect(() => {
    setDataPut(props.cate);
  }, [props])

  useEffect(() => {
    dispatch(getCategories()).then((res) => {
      setDataListCate(res.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    const errors = validate.validate(dataPut, CategoriesPageValidate);
    setValidationPut((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataPut]);

  useEffect(() => {
    if (dataPut.cateName !== undefined) {
      if (
        dataListCate?.some((cate) => cate?.cateId !== dataPut?.cateId && cate?.cateName === dataPut?.cateName.trim() && cate?.cateIdParent === dataPut?.cateIdParent) ===
        true || dataListCate?.some((cate) => cate?.cateId !== dataPut?.cateId && cate?.cateName === dataPut?.cateName.trim() && cate?.cateIdParent === 0) === true
      ) {
        setCheckDuplicatePut(true);
      } else {
        setCheckDuplicatePut(false);
      }
    }
  }, [dataListCate, dataPut?.cateName, dataPut?.cateIdParent, dataPut?.cateId]);

  const hasErrorPut = (field) => {
    return validationPut.touched[field] && validationPut.errors[field]
      ? true
      : false;
  };

  const hanldeChangePut = (e) => {
    setDataPut((preState) => ({
      ...preState,
      cateName: e.target.value,
    }));
    setValidationPut((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  }

  const hanldeSelectPut = (e) => {
    setDataPut((preState) => ({
      ...preState,
      cateIdParent: parseInt(e.target.value),
    }));
  }

  const handlePutCate = () => {
    if (validationPut.isvalid === true === true && checkDuplicatePut === false) {
      setValidationPut((pre) => ({
        ...pre,
        touched: {
          ...pre.touched,
          cateName: false,
        },
      }));
      dispatch(putCategories(dataPut)).then((res1) => {
        console.log(res1.payload)
        if (res1.payload === 200) {
          dispatch(getCategories()).then((res2) => {
            setDataListCate(res2.payload);
          });
          toast.success('Update category success !', {
            position: toast.POSITION.TOP_RIGHT
          });
          props.onHide();
        } else {
          toast.error('Update category fail !', {
            position: toast.POSITION.TOP_RIGHT
          });
          props.onHide();
        }
      });
    }
  }
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicCateName">
              <Form.Label>Category name</Form.Label>
              <Form.Control
                defaultValue={props.cate.cateName}
                type="text"
                placeholder="Enter category name"
                name="cateName"
                onChange={hanldeChangePut}
                isInvalid={hasErrorPut("cateName") || checkDuplicatePut}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorPut("cateName") ? validationPut.errors.cateName?.[0] : null
                  || checkDuplicatePut === true ? "Genre name already exists" : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select onChange={hanldeSelectPut} defaultValue={props.cate.cateIdParent}>
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
                              return <option value={chilItem.cateId} disabled>--{chilItem.cateName}</option>;
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePutCate}>
            {isLoading === true ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DeleteCategory(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectStatusCate);
  const hanldeDel = () => {
    dispatch(deleteCategories(props.cateid)).then((res1) => {
      if (res1.payload === 200) {
        toast.success('Delete category success !', {
          position: toast.POSITION.TOP_RIGHT
        });
        props.onHide();
      } else {
        toast.error('Delete category fail !', {
          position: toast.POSITION.TOP_RIGHT
        });
        props.onHide();
      }
    });
  }
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title className='title-modal'> <FontAwesomeIcon icon={['fa', 'exclamation-triangle']} /> Warning !!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={hanldeDel}>
          {isLoading === true ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default CategoriesPage