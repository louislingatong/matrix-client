import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Col, Container, Row} from 'react-bootstrap';
import _ from 'lodash';
import {updateProductById, fetchProductById} from '../../../services/productService';
import {productData} from '../../../store/productSlice';
import ProductEditForm from './forms/ProductEditForm';

function ProductEdit() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(productData);
  const [error, setError] = useState({});

  useEffect(() => {
    if (_.isEmpty(product) || product._id !== params.id) {
      dispatch(fetchProductById(params.id));
    }
  }, [product]);

  const onSubmitForm = data => {
    dispatch(updateProductById(params.id, data))
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
          <h3>Edit Product</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="d-flex flex-column justify-content-center">
              <ProductEditForm product={product} handleSubmitForm={onSubmitForm} error={error}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductEdit;