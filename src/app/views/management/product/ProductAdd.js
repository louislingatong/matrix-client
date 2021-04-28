import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Card, Col, Container, Row} from 'react-bootstrap';
import {createProduct} from '../../../services/productService';
import ProductAddForm from './forms/ProductAddForm';

function ProductAdd() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  const onSubmitForm = data => {
    dispatch(createProduct(data))
      .then(() => history.push('/manage/products', {from: {path: history.location.pathname}}))
      .catch(err => {
        if (err.status === 422) {
          setError(err.error);
        }
      });;
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h3>Add Product</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="d-flex flex-column justify-content-center">
              <ProductAddForm handleSubmitForm={onSubmitForm} error={error}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductAdd;