import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Card, ListGroup, Jumbotron, Container} from 'react-bootstrap';
import {FaList} from 'react-icons/fa';
import _ from 'lodash';
import {fetchAllProducts, fetchAllSellerProducts, fetchCategoryOwners, fetchCategoryProducts} from '../../services/productService';
import {productCategories, productList} from '../../store/productSlice';
import {loggedInStatus, loggedInUser} from '../../store/authSlice';

function ProductSearch() {
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector(productList);
  const categories = useSelector(productCategories);
  const isAuthenticated = useSelector(loggedInStatus);
  const profile = useSelector(loggedInUser);
  const [loadCategoryOwners, setLoadCategoryOwners] = useState(true);
  const [loadCategoryProducts, setLoadCategoryProducts] = useState(true);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    if (isAuthenticated && _.isString(profile.user.role) && profile.user.role !== 'ADMIN') {
      dispatch(fetchAllProducts());
    }

    if (!isAuthenticated) {
      dispatch(fetchAllSellerProducts(filter));
    }
  }, [isAuthenticated, filter]);

  useEffect(() => {
    if (!isAuthenticated && loadCategoryOwners) {
      dispatch(fetchCategoryOwners())
        .then(() => setLoadCategoryOwners(false));
    }
  }, [isAuthenticated, loadCategoryOwners]);

  useEffect(() => {
    if (!isAuthenticated && loadCategoryProducts) {
      dispatch(fetchCategoryProducts())
        .then(() => setLoadCategoryProducts(false));
    }
  }, [isAuthenticated, loadCategoryProducts]);

  const onCategoryChange = (category, id) => {
    const categoryKey = `${category.slice(0, -1)}Id`
    if (id) {
      setFilter({
        ...filter,
        [categoryKey]: id
      });
    } else {
      setFilter(prevState => {
        let state = Object.assign({}, prevState);
        delete state[categoryKey];
        return state;
      });
    }
  };

  const renderCategories = () => (
    <Card>
      <Card.Header>
        <FaList className="mr-2"/>
        Category
      </Card.Header>
      {
        Object.entries(categories).map(([key, value]) => (
          <ListGroup key={key} defaultActiveKey={`all-${key}`} variant="flush">
            <ListGroup.Item action eventKey={`all-${key}`} variant="light"
                            onClick={() => onCategoryChange(key)}>
              All {key.charAt(0).toUpperCase() + key.slice(1)}
            </ListGroup.Item>
            {
              value.map((item) => (
                <ListGroup.Item key={item._id} action eventKey={item.name} variant="light"
                                onClick={()=> onCategoryChange(key, item._id)}>{item.name}</ListGroup.Item>
              ))
            }
          </ListGroup>
        ))
      }
    </Card>
  );

  const renderProducts = () => (
    <Row>
      {
        products.map(({_id, name, memberPrice, product}, i) => (
          <Col key={_id} xs={12} sm={12} md={4}>
            <Card to={{pathname: `/product/view/${_id}`, state: {from: location.pathname}}} as={Link}
                  className="text-decoration-none">
              <Card.Body>
                <Card.Title className="text-truncate">{name || product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">₱{memberPrice || product.price}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))
      }
    </Row>
  );

  return (
    <Row>
      <Col xs={12} sm={12} md={4}>
        {
          !_.isEmpty(categories) && renderCategories()
        }
      </Col>
      <Col xs={12} sm={12} md={_.isEmpty(categories) ? 12 : 8}>
        <Card>
          <Card.Body>
            {
              _.isEmpty(products) ? <Card.Text>There are no products available.</Card.Text> : renderProducts()
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ProductSearch;