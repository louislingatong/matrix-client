import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Container, Row, Nav, Tab, Card, Button, Badge} from 'react-bootstrap';
import {FaStore} from 'react-icons/fa';
import _ from 'lodash';
import {orderData} from '../../store/orderSlice';
import {loggedInStatus} from '../../store/authSlice';
import {fetchOrdersByOrderNumber} from '../../services/orderService';

function OrderCheck() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const order = useSelector(orderData);
  const isAuthenticated = useSelector(loggedInStatus);
  const [loadOrders, setLoadOrders] = useState(true);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [items, setItems] = useState({});

  useEffect(() => {
    if (loadOrders) {
      dispatch(fetchOrdersByOrderNumber(params.orderNumber))
        .then(() => setLoadOrders(false));
    }
  }, [loadOrders]);

  useEffect(() => {
    if (_.chain(order).keys().head().value() === params.orderNumber) {
      onSelectTab('PENDING');
    }
  }, [order]);

  const onSelectTab = tab => {
    setItems(_.chain(order).values().head().groupBy((o) => o.status).value());
    setActiveTab(tab);
  };

  const orderItems = status => {
    return (
      <Row className="mb-3">
        <Col>
          {
            _.map(items[status], (groupedItem, i) => (
              <Card key={groupedItem._id}>
                <Card.Body>
                  <Col>
                    {
                      _.map(groupedItem.items, ({item, quantity}, i) => (
                        <React.Fragment key={item._id}>
                          {
                            !isAuthenticated &&
                              <React.Fragment>
                                <p>
                                  <FaStore/> {item.owner && item.owner.name}
                                </p>
                                <hr/>
                              </React.Fragment>
                          }
                          <Row className="align-items-center">
                            <Col>
                              <h5>
                                {item.name || item.product.name}
                              </h5>
                              <p>
                                Qty {quantity}
                              </p>
                            </Col>
                            <Col className="flex-grow-0">
                              <p>₱{item.memberPrice || item.product.price}</p>
                            </Col>
                          </Row>
                          {((i + 1) < groupedItem.items.length) && <hr/>}
                        </React.Fragment>
                      ))
                    }
                  </Col>
                </Card.Body>
              </Card>
            ))
          }
        </Col>
      </Row>
    )
  };

  const payableAmount = () => (
    <Row className="text-right mb-3">
      <Col>
        Total Payable: <span className="h1">₱{_.sumBy(items['PENDING'], (o) => o.totalAmount)}</span>
      </Col>
    </Row>
  );

  const payment = () => (
    <Row>
      <Col>
        <small>Pay with {_.chain(items['PENDING']).groupBy((o) => o.paymentMethod.name).keys().head().value()}</small>
      </Col>
      <Col className="text-right">
        <Button variant="dark" onClick={onPayNow}>Pay Now</Button>
      </Col>
    </Row>
  );

  const noOrdersAvailable = () => <p>There are no items available.</p>;

  const onPayNow = () => {
    history.push(`/payment/${params.orderNumber}`, {from: {path: history.location.pathname}});
  };

  return (
    <Container>
      <p>
        Order Number: <span className="h3">{params.orderNumber}</span>
      </p>
      <Row>
        <Col>
          <Tab.Container defaultActiveKey={activeTab} onSelect={onSelectTab}>
            <Nav fill variant="pills" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="PENDING">To Pay&nbsp;
                  <Badge pill variant="light">
                    {items['PENDING'] && items['PENDING'].length}
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="PROCESSING">To Deliver&nbsp;
                  <Badge pill variant="light">
                    {items['PROCESSING'] && items['PROCESSING'].length}
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="CONFIRMED">To Receive&nbsp;
                  <Badge pill variant="light">
                    {items['CONFIRMED'] && items['CONFIRMED'].length}
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="COMPLETED">Completed&nbsp;
                  <Badge pill variant="light">
                    {items['COMPLETED'] && items['COMPLETED'].length}
                  </Badge>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="PENDING" transition={false}>
                {
                  !_.isEmpty(items) && items['PENDING'] ?
                    <React.Fragment>
                      {orderItems('PENDING')}
                      {payableAmount()}
                      {payment()}
                    </React.Fragment> :
                    noOrdersAvailable()
                }
              </Tab.Pane>
              <Tab.Pane eventKey="PROCESSING" transition={false}>
                {
                  !_.isEmpty(items) && items['PROCESSING'] ? orderItems('PROCESSING') : noOrdersAvailable()
                }
              </Tab.Pane>
              <Tab.Pane eventKey="CONFIRMED" transition={false}>
                {
                  !_.isEmpty(items) && items['CONFIRMED'] ? orderItems('CONFIRMED') : noOrdersAvailable()
                }
              </Tab.Pane>
              <Tab.Pane eventKey="COMPLETED" transition={false}>
                {
                  !_.isEmpty(items) && items['COMPLETED'] ? orderItems('COMPLETED') : noOrdersAvailable()
                }
              </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderCheck;