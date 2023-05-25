import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
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
function CategoriesPage() {
  const [createShow, setCreateShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
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
              <Form className="d-flex" as={Col}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 rounded-pill search"
                  aria-label="Search"
                />
                <Button className="rounded-pill" variant="outline-primary">
                  Search
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <Row className='category-center'>
          <Col>
            <AddCategory
              show={createShow}
              onHide={() => setCreateShow(false)}
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
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>
                    <Button className='btn-action' variant="primary" onClick={() => setEditShow(true)}>Edit</Button>
                    <EditCategory
                      show={editShow}
                      onHide={() => setEditShow(false)}
                    />
                    <Button className='btn-action' variant="danger">Delete</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <ToastContainer />
        </Row>
        <Row className='category-bottom'>
          <Col md={{ span: 10, offset: 10 }}>
            <Pagination>
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item active>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Next />
            </Pagination>
          </Col>
        </Row>
      </section>
    </>
  )
}

function AddCategory(props) {
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
      cateName: e.target.value,
    }));
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  }

  const hanldeSelectPost= (e) =>{
    setDataPost((preState) => ({
      ...preState,
      cateIdParent: e.target.value,
    }));
  }
  const handleCreateCate = () => {

  }
  return (
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
              isInvalid={hasErrorPost("cateName")}
            />
            <Form.Control.Feedback type="invalid">
              {hasErrorPost("cateName") ? validationPost.errors.cateName?.[0] : null}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Select >
              <option value={0} onSelect={hanldeSelectPost}>Not selected</option>
            </Form.Select>
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

function EditCategory(props) {
  const showToastMessage = () => {
    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_RIGHT
    });
    props.onHide();
  };
  return (
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
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

export default CategoriesPage