import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col, Card, InputGroup, FormControl, Button, Jumbotron} from 'react-bootstrap';
import {FaBox, FaStore} from 'react-icons/fa';
import _ from 'lodash';
import Loader from '../../components/common/loader/Loader';
import {fetchProductById, fetchSellerProductById} from '../../services/productService';
import {productData} from '../../store/productSlice';
import {setBagItem} from '../../store/bagSlice';
import {loaderStatus} from '../../store/loaderSlice';
import {loggedInStatus} from '../../store/authSlice';

function ProductView() {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(productData);
  const isLoading = useSelector(loaderStatus);
  const isAuthenticated = useSelector(loggedInStatus);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (_.isEmpty(product) || product._id !== params.id) {
      if (isAuthenticated) {
        dispatch(fetchProductById(params.id));
      } else {
        dispatch(fetchSellerProductById(params.id));
      }
    }
  }, [product]);

  const onQuantityChange = (op) => {
    let q = quantity;
    switch (op) {
      case 'add':
        q += 1;
        break;
      case 'sub':
        q -= 1;
        break;
    }
    setQuantity(q);
  };

  const onAddToBag = (item) => {
    dispatch(setBagItem({
      itemId: item._id,
      owner: isAuthenticated ? 'Admin' : item.owner.name,
      product: isAuthenticated ? item.name : item.product.name,
      price: isAuthenticated ? item.memberPrice : item.product.price,
      quantity,
      refModel: isAuthenticated ? 'product' : 'sellerProduct'
    }));
  };

  const minQty = () => 1;
  const maxQty = () => product.quantity - product.sold;

  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={8}>
          <Card>
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>
                {product.name || (product.product && product.product.name)}
              </Card.Title>
              <Card.Text dangerouslySetInnerHTML={{__html: product.product && product.product.description}} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{product.name || (product.product && product.product.name)}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">₱{product.memberPrice || (product.product && product.product.price)  }</Card.Subtitle>
            </Card.Body>
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <Button variant="outline-secondary"
                              onClick={() => onQuantityChange('sub')}
                              disabled={quantity <= minQty()}>-</Button>
                    </InputGroup.Prepend>
                    <FormControl
                      type="number"
                      placeholder="Quantity"
                      value={quantity}
                      className="text-center"
                      readOnly
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary"
                              onClick={() => onQuantityChange('add')}
                              disabled={!isAuthenticated && (quantity >= maxQty())}>+</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
                {
                  !isAuthenticated &&
                  <Col>
                    <Card.Text>{(product.quantity - product.sold)} available</Card.Text>
                  </Col>
                }
              </Row>
            </Card.Body>
            <Card.Body>
              <Button variant="dark" onClick={() => onAddToBag(product)} disabled={isLoading}>
                {isLoading ? <Loader type="beat" color="light"/> : 'Add To Bag' }
              </Button>
            </Card.Body>
          </Card>
          {
            !isAuthenticated &&
            <Card>
              <Card.Body>
                <Card.Title>
                  <p><FaStore/> {product.owner && product.owner.name}</p>
                </Card.Title>
              </Card.Body>
            </Card>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default ProductView;