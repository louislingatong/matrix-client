import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Container, Row, Card, Button} from 'react-bootstrap';
import {FaStore, FaTrash} from 'react-icons/fa';
import _ from 'lodash'
import Loader from '../../components/common/loader/Loader';
import {unsetBagItem, bagItems} from '../../store/bagSlice';
import {loaderStatus} from '../../store/loaderSlice';
import {loggedInStatus} from '../../store/authSlice';

function Bag() {
  const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector(bagItems);
  const isLoading = useSelector(loaderStatus);
  const isAuthenticated = useSelector(loggedInStatus)
  const [recompute, setRecompute] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (recompute || (!_.isEmpty(items) && !subTotal && !total)) {
      setSubTotal(calculateSubTotal(items));
      setTotal(calculateTotal(items));
      setRecompute(false);
    }
  }, [recompute, items, total, subTotal]);

  const calculateSubTotal = items => (
    _.chain(items).toPairs().map(([key, value], index) => (
      _.chain(value).toPairs().map(([k, v], i) => (
        _.sumBy(v, (o) => o.quantity * o.price)
      )).sum().value()
    )).sum().value()
  );

  const calculateTotal = items => (
    _.chain(items).toPairs().map(([key, value], index) => (
      _.chain(value).toPairs().map(([k, v], i) => (
        _.sumBy(v, (o) => o.quantity * o.price)
      )).sum().value()
    )).sum().value()
  );

  const onRemoveItem = (owner, product) => {
    setRecompute(true);
    dispatch(unsetBagItem(owner, product));
  };

  const onCheckout = () => {
    history.push('/checkout', {from: {path: history.location.pathname}});
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Bag</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={9}>
          {
            _.isEmpty(items) && <p>There are no items in your bag.</p>
          }
          {
            _.chain(items).toPairs().map(([key, value]) => (
              <Card key={key}>
                <Card.Body>
                  {
                    !isAuthenticated &&
                    <Card.Title>
                      <p><FaStore/> {key}</p>
                    </Card.Title>
                  }
                  {
                    _.chain(value).toPairs().map(([k, v], i) => (
                      <React.Fragment key={_.head(v).itemId}>
                        <Row className="align-items-center">
                          <Col xs={12} sm={12} md={5}>{k}</Col>
                          <Col xs={3} sm={3} md={2} className="text-center text-nowrap">
                            ₱{_.chain(v).uniqBy('price').head().value().price}
                          </Col>
                          <Col xs={3} sm={3} md={1} className="text-center text-nowrap">x</Col>
                          <Col xs={3} sm={3} md={1} className="text-center text-nowrap">
                            {_.sumBy(v, (o) => o.quantity)}
                          </Col>
                          <Col xs={3} sm={3} md={2} className="text-center text-nowrap">
                            ₱{_.sumBy(v, (o) => o.quantity * o.price)}
                          </Col>
                          <Col xs={3} sm={3} md={1} className="text-center text-nowrap">
                            <Button variant="link" className="text-dark" onClick={() => onRemoveItem(key, k)}>
                              <FaTrash/>
                            </Button>
                          </Col>
                        </Row>
                        {((i + 1) < _.toPairs(value).length) && <hr />}
                      </React.Fragment>
                    )).value()
                  }
                </Card.Body>
              </Card>
            )).value()
          }
        </Col>
        <Col xs={12} sm={12} md={3}>
          <Card>
            <Card.Body>
              <Card.Title>
                Summary
              </Card.Title>
              <Card.Subtitle>
                <Row>
                  <Col className="text-left">Subtotal</Col>
                  <Col className="text-right">
                    ₱{subTotal}
                  </Col>
                </Row>
              </Card.Subtitle>
            </Card.Body>
            <Card.Footer className="font-weight-bolder">
              <Row>
                <Col className="text-left">Total</Col>
                <Col className="text-right">
                  ₱{total}
                </Col>
              </Row>
            </Card.Footer>
          </Card>
          <Button variant="dark" className="btn-block" onClick={onCheckout} disabled={_.isEmpty(items) || isLoading}>
            {isLoading ? <Loader type="beat" color="light"/> : 'Checkout' }
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Bag;