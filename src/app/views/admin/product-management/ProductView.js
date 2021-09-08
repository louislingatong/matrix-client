import React, {useEffect} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import _ from 'lodash';
import {fetchProductById} from '../../../services/productService';
import {productData} from '../../../store/productSlice';

function ProductView() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector(productData);

  useEffect(() => {
    if (_.isEmpty(product) || product._id !== params.id) {
      dispatch(fetchProductById(params.id));
    }
  }, [product]);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body className="d-flex flex-column justify-content-center">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <div className="form-control">{product.name}</div>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <div className="form-control h-auto" dangerouslySetInnerHTML={{__html: product.description}} />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <div className="form-control">{product.price}</div>
              </Form.Group>
              <Form.Group controlId="formMemberPrice">
                <Form.Label>Member Price</Form.Label>
                <div className="form-control">{product.memberPrice}</div>
              </Form.Group>
              <div className="text-right">
                <Button type="button" variant="light" onClick={history.goBack}>
                  Back
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductView;
