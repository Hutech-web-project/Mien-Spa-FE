import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import { Table } from "react-bootstrap";
import "../../../assets/scss/admin_css/category.scss";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { validate } from "validate.js";
import { ServicePageValidatePost, ServicePageValidatePut } from "../../../util/validate";
import { useDispatch, useSelector } from "react-redux";
import { selectStatusSer } from "../../../redux/Service/service_page_selecter";
import {
  blockServices,
  deleteServices,
  getServices,
  postServices,
  putServices,
} from "../../../redux/Service/service_page_thunk";

function ServicesPage() {
  const [createShow, setCreateShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteshow, setDeleteShow] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [idDel, setIdDel] = useState(0);
  const [dataListSer, setDataListSer] = useState([]);
  const [dataListSearch, setDataListSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices()).then((res) => {
      setDataListSer(res.payload);
      setDataListSearch(res.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    if (search !== null) {
      setDataListSearch(
        dataListSer?.filter((cate) =>
          cate?.seName.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setDataListSearch(dataListSer);
    }
  }, [search, dataListSer]);

  useEffect(() => {
    dispatch(getServices()).then((res) => {
      setDataListSer(res.payload);
    });
  }, [createShow, editShow, deleteshow, dispatch]);

  const hanldeSearch = (e) => {
    setSearch(e.target.value);
  };

  const hanldeClickEdit = (data) => {
    setEditShow(true);
    setDataEdit(data);
  };

  const hanldeDelete = (id) => {
    setDeleteShow(true);
    setIdDel(id);
  };

  const hanldeStatus = (ser) => {
    dispatch(blockServices(ser)).then((res1) => {
      if (res1.payload === 200) {
        dispatch(getServices()).then((res) => {
          setDataListSer(res.payload);
          setDataListSearch(res.payload);
        });
        toast.success('Create product success !', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600
        });
      } else {
        toast.error('Create product fail !', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600
        });
      }
    });
  };

  const NextPage = () => {
    setPage(page + 1);
  };

  const PrevPage = () => {
    setPage(page - 1);
  };

  const ClickPage = (e) => {
    setPage(e - 1);
  };

  let rows = [];
  for (let i = 1; i < dataListSer.length / rowsPerPage + 1; i++) {
    if (i - 1 === page) {
      rows.push(
        <Pagination.Item key={i} active onClick={() => ClickPage(i)}>
          {i}
        </Pagination.Item>
      );
    } else {
      rows.push(
        <Pagination.Item key={i} onClick={() => ClickPage(i)}>
          {i}
        </Pagination.Item>
      );
    }
  }

  return (
    <>
      <section className="category">
        <Row className="category-top">
          <Col xs={12} sm={12} md={12} lg={4} className="add">
            <div>
              <Button variant="success" onClick={() => setCreateShow(true)}>
                Add Service
              </Button>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8}>
            <div className="category-search">
              <InputGroup className="mb-3">
                <Form.Control
                  className="search"
                  placeholder="Input service name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={hanldeSearch}
                />
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={["fa", "search"]} />
                </InputGroup.Text>
              </InputGroup>
            </div>
          </Col>
        </Row>
        <Row className="category-center">
          <Col>
            <AddService show={createShow} onHide={() => setCreateShow(false)} />
            <EditService
              show={editShow}
              ser={dataEdit}
              onHide={() => setEditShow(false)}
            />
            <DeleteService
              show={deleteshow}
              serid={idDel}
              onHide={() => setDeleteShow(false)}
            />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="col-1">Service name</th>
                  <th className="col-1">Service price</th>
                  <th className="col-3">Service description</th>
                  <th>Service image</th>
                  <th className="col-2">Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(dataListSearch
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((index) => {
                    return (
                      <tr key={index.seId}>
                        <td>{index.seId}</td>
                        <td>{index.seName}</td>
                        <td>{index.sePrice} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                        <td>{index.seDescription}</td>
                        <td>
                          <img
                            src={
                              process.env.REACT_APP_API_URL +
                              "/image/service/" +
                              index.seImage
                            }
                            style={{
                              backgroundColor: "#22d3ee",
                              color: "white",
                              borderRadius: "30px",
                              padding: 6,
                              cursor: "pointer",
                              height: 200,
                              width: 200,
                            }}
                            alt=""
                          />
                        </td>
                        <td> {index.seTurnOn === true ? <Button variant="success" onClick={() => hanldeStatus(index)}>On</Button> : <Button variant="danger" onClick={() => hanldeStatus(index)}>Off</Button>}</td>
                        <td>
                          <Button
                            className="btn-action"
                            variant="primary"
                            onClick={() => hanldeClickEdit(index)}
                          >
                            Edit
                          </Button>

                          <Button
                            className="btn-action"
                            variant="danger"
                            onClick={() => hanldeDelete(index.seId)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  }))}
              </tbody>
            </Table>
          </Col>
          <ToastContainer />
        </Row>
        <Row className="category-bottom">
          {Math.floor(dataListSer.length / rowsPerPage) !== 0 ? (
            <Col md={{ span: 10, offset: 10 }}>
              <Pagination>
                {page === 0 ? (
                  <Pagination.Prev onClick={PrevPage} disabled />
                ) : (
                  <Pagination.Prev onClick={PrevPage} />
                )}
                {rows}
                {page === Math.floor(dataListSer.length / rowsPerPage) ? (
                  <Pagination.Next onClick={NextPage} disabled />
                ) : (
                  <Pagination.Next onClick={NextPage} />
                )}
              </Pagination>
            </Col>
          ) : null}
        </Row>
      </section>
    </>
  );
}

function AddService(props) {
  const [dataListSer, setDataListSer] = useState([]);
  const isLoading = useSelector(selectStatusSer);
  const dispatch = useDispatch();
  const [dataPost, setDataPost] = useState({
    sePrice: "",
    seName: "",
    seDescription: "",
    seNote: "",
    seImage: "",
    seTurnOn: 1,
    isDelete: false,
  });
  const [validationPost, setValidationPost] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  const [checkDuplicatePost, setCheckDuplicatePost] = useState(false);

  useEffect(() => {
    dispatch(getServices()).then((res) => {
      setDataListSer(res.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    // console.log(dataListCate?.find((cate) => cate?.cateName.includes(dataPost?.cateName) && cate?.cateIdParent === dataPost?.cateIdParent))
    if (
      dataListSer?.some(
        (ser) =>
          ser?.seName === dataPost?.seName.trim()
      ) === true
    ) {
      setCheckDuplicatePost(true);
    } else {
      setCheckDuplicatePost(false);
    }
  }, [
    dataListSer,
    dataPost?.seName,
    dataPost?.sePrice,
    dataPost?.seDescription,
    dataPost?.seNote,
    dataPost?.seImage,
  ]);

  useEffect(() => {
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        seName: false,
        sePrice: false,
        seDescription: false,
        seNote: false,
        seImage: false,
      },
    }));
  }, [props]);

  useEffect(() => {
    const errors = validate.validate(
      {
        seName: dataPost.seName,
        sePrice: dataPost.sePrice,
        seDescription: dataPost?.seDescription,
        seNote: dataPost?.seNote,
        seImage: dataPost?.seImage,
      },
      ServicePageValidatePost
    );
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
      [e.target.name]: e.target.value.trim(),
    }));
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  };

  const handlePostSer = () => {
    console.log(dataPost);
    console.log(validationPost.isvalid);
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        seName: true,
        sePrice: true,
        seDescription: true,
        seNote: true,
        seImage: true,
      },
    }));
    if (
      (validationPost.isvalid === true) === true &&
      checkDuplicatePost === false
    ) {
      setValidationPost((pre) => ({
        ...pre,
        touched: {
          ...pre.touched,
          seName: false,
          sePrice: false,
          seDescription: false,
          seNote: false,
          seImage: false,
        },
      }));
      dispatch(postServices(dataPost)).then((res1) => {
        console.log(res1);
        if (res1.payload === 201) {
          dispatch(getServices()).then((res2) => {
            setDataListSer(res2.payload);
            setDataPost((preState) => ({
              ...preState,
              seName: "",
              sePrice: "",
              seDescription: "",
              seNote: "",
              seImage: "",
            }));
          });
          toast.success("Create service success !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.onHide();
        } else {
          toast.error("Create service fail !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.onHide();
        }
      });
    }
  };

  const handleChangeImageCreate = async (e) => {
    const files = e.target.files;
    setDataPost((preState) => ({
      ...preState,
      seImage: files[0],
    }));
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicSerName">
              <Form.Label>Service name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service name"
                name="seName"
                onChange={hanldeChangePost}
                isInvalid={hasErrorPost("seName") || checkDuplicatePost}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorPost("seName")
                  ? validationPost.errors.seName?.[0]
                  : null || checkDuplicatePost === true
                    ? "Genre name already exists"
                    : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSerPrice">
              <Form.Label>Service price</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  type="text"
                  placeholder="Enter service price"
                  name="sePrice"
                  onChange={hanldeChangePost}
                  isInvalid={hasErrorPost("sePrice")}
                />
                <InputGroup.Text id="basic-addon2"><FontAwesomeIcon icon={['fas', 'dollar-sign']} /></InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {hasErrorPost("sePrice")
                    ? validationPost.errors.sePrice?.[0]
                    : null}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSerImg">
              <Form.Label>Service image</Form.Label>
              <Form.Control
                type="file"
                name="seImage"
                accept="image/png, image/gif, image/jpeg"
                className="mb-3"
                onChange={handleChangeImageCreate}
                isInvalid={hasErrorPost("seImage")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorPost("sePrice")
                  ? validationPost.errors.seImage?.[0]
                  : null}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicSerDes">
              <Form.Label>Service description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service description"
                name="seDescription"
                onChange={hanldeChangePost}
                isInvalid={hasErrorPost("seDescription")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorPost("seDescription")
                  ? validationPost.errors.seDescription?.[0]
                  : null}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSerNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service note"
                name="seNote"
                onChange={hanldeChangePost}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePostSer}>
            {isLoading === true ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Create"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function EditService(props) {
  const [dataListSer, setDataListSer] = useState([]);
  const isLoading = useSelector(selectStatusSer);
  const dispatch = useDispatch();
  const [dataPut, setDataPut] = useState({
    seId: 0,
    sePrice: "",
    seName: "",
    seDescription: "",
    seNote: "",
    seImage: "",
    seTurnOn: 1,
    isDelete: false,
  });
  const [validationPut, setValidationPut] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  const [checkDuplicatePut, setCheckDuplicatePut] = useState(false);

  useEffect(() => {
    setDataPut(props.ser);
  }, [props]);

  useEffect(() => {
    dispatch(getServices()).then((res) => {
      setDataListSer(res.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    const errors = validate.validate(
      {
        seName: dataPut.seName,
        sePrice: dataPut.sePrice,
        seDescription: dataPut?.seDescription,
        seNote: dataPut?.seNote,
      },
      ServicePageValidatePut
    );
    setValidationPut((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataPut]);

  useEffect(() => {
    if (dataPut?.seName !== undefined) {
      if (
        dataListSer?.some((ser) => ser.serId === dataPut?.seId && ser?.seName === dataPut?.seName) === true
      ) {
        setCheckDuplicatePut(true);
      } else {
        setCheckDuplicatePut(false);
      }
    }
  }, [
    dataListSer,
    dataPut?.seName,
    dataPut?.seId,
  ]);

  const hasErrorPut = (field) => {
    return validationPut.touched[field] && validationPut.errors[field]
      ? true
      : false;
  };

  const hanldeChangePut = (e) => {
    setDataPut((preState) => ({
      ...preState,
      [e.target.name]: e.target.value.trim(),
    }));
    setValidationPut((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  };

  const handlePutSer = () => {
    setValidationPut((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        seName: true,
      },
    }));
    if ((validationPut.isvalid === true) === true && checkDuplicatePut === false) {
      setValidationPut((pre) => ({
        ...pre,
        touched: {
          ...pre.touched,
          seName: false,
        },
      }));
      dispatch(putServices(dataPut)).then((res1) => {
        console.log(res1.payload);
        if (res1.payload === 201) {
          dispatch(getServices()).then((res2) => {
            setDataListSer(res2.payload);
          });
          toast.success("Update service success !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.onHide();
        } else {
          toast.error("Update service fail !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.onHide();
        }
      });
    }
  };

  const handleChangeImageUpdate = async (e) => {
    const files = e.target.files;
    setDataPut((preState) => ({
      ...preState,
      seImage: files[0],
    }));
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicSerName">
              <Form.Label>Service name</Form.Label>
              <Form.Control
                defaultValue={props.ser?.seName}
                type="text"
                placeholder="Enter service name"
                name="seName"
                onChange={hanldeChangePut}
                isInvalid={hasErrorPut("seName") || checkDuplicatePut}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorPut("seName")
                  ? validationPut.errors.seName?.[0]
                  : null || checkDuplicatePut === true
                    ? "Genre name already exists"
                    : null}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSerPrice">
                  <Form.Label>Service price</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      defaultValue={props.ser?.sePrice}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      type="text"
                      placeholder="Enter service price"
                      name="sePrice"
                      onChange={hanldeChangePut}
                      isInvalid={hasErrorPut("sePrice")}
                    />
                    <InputGroup.Text id="basic-addon2">.0 $</InputGroup.Text>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    {hasErrorPut("sePrice")
                      ? validationPut.errors.sePrice?.[0]
                      : null}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicSerImg">
                  <Form.Label>Service image</Form.Label>

                  <Form.Control
                    className="mb-3"
                    type="file"
                    name="seImage"
                    onChange={handleChangeImageUpdate}
                    accept="image/png, image/gif, image/jpeg"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicSerDes">
              <Form.Label>Service description</Form.Label>
              <Form.Control
                defaultValue={props.ser?.seDescription}
                type="text"
                placeholder="Enter service description"
                name="seDescription"
                onChange={hanldeChangePut}
                isInvalid={hasErrorPut("seDescription")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorPut("seDescription")
                  ? validationPut.errors.seDescription?.[0]
                  : null}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSerNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                defaultValue={props.ser?.seNote}
                type="text"
                placeholder="Enter service note"
                name="seNote"
                onChange={hanldeChangePut}
                isInvalid={hasErrorPut("seNote")}
              />
              <Form.Control.Feedback type="invalid">
                {hasErrorPut("seNote")
                  ? validationPut.errors.seNote?.[0]
                  : null}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePutSer}>
            {isLoading === true ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Update"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DeleteService(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectStatusSer);
  const hanldeDel = () => {
    dispatch(deleteServices(props.seId)).then((res1) => {
      if (res1.payload === 200) {
        toast.success("Delete service success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.onHide();
      } else {
        toast.error("Delete service fail !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.onHide();
      }
    });
  };
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title className="title-modal">
          {" "}
          <FontAwesomeIcon icon={["fa", "exclamation-triangle"]} /> Warning !!!!
        </Modal.Title>
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
          ) : (
            "Delete"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ServicesPage;
