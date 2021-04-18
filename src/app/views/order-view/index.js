import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Container, Row, Nav, Tab, Card, Button, Badge} from 'react-bootstrap';
import {FaStore} from 'react-icons/fa';
import _ from 'lodash';
import {orderNumber, orderList} from '../../store/orderSlice';
import {loggedInStatus} from '../../store/authSlice';
import {fetchOrdersByOrderNumber} from '../../services/paymentService';

function OrderView() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const order = useSelector(orderNumber);
  const orders = useSelector(orderList);
  const isAuthenticated = useSelector(loggedInStatus)
  const [activeTab, setActiveTab] = useState('PENDING');
  const [items, setItems] = useState({});

  useEffect(() => {
    if (_.isEmpty(order)) {
      dispatch(fetchOrdersByOrderNumber(params.orderNumber));
    }
  }, [order]);

  useEffect(() => {
    setItems([]);
    if (order && _.isEmpty(items)) {
      onSelectTab('PENDING');
    }
  }, [order]);

  const orderItems = (status) => {
    return (
      <Row className="mb-3">
        <Col>
          {
            _.map(items[status], (groupedItem, i) => (
              <Card key={i}>
                <Card.Body>
                  <Col>
                    {
                      _.map(groupedItem.items, ({item, quantity}, i) => (
                        <React.Fragment key={i}>
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
        <small>Pay with {_.chain(items['PENDING']).groupBy((o) => o.paymentMethod.name).keysIn().head().value()}</small>
      </Col>
      <Col className="text-right">
        <Button variant="dark" onClick={onPayNow}>Pay Now</Button>
      </Col>
    </Row>
  );

  const onSelectTab = tab => {
    const groupedItems = _.chain(orders).groupBy((o) => o.status).value();
    setItems(groupedItems);
    setActiveTab(tab);
  };

  const noOrdersAvailable = () => <p>There are no items available.</p>;

  const onPayNow = () => {
    history.push(`/payment/${params.orderNumber}`, {from: {path: history.location.pathname}});
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          Order Number: <span className="h3">{order}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tab.Container defaultActiveKey={activeTab} onSelect={onSelectTab}>
            <Nav fill variant="pills" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="PENDING">To Pay&nbsp;
                  <Badge pill variant="light">
                    {items['PENDING'] && _.head(items['PENDING']).items.length}
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="PROCESSING">To Deliver&nbsp;
                  <Badge pill variant="light">
                    {items['PROCESSING'] && _.head(items['PROCESSING']).items.length}
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="CONFIRMED">To Receive&nbsp;
                  <Badge pill variant="light">
                    {items['CONFIRMED'] && _.head(items['CONFIRMED']).items.length}
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="COMPLETED">Completed&nbsp;
                  <Badge pill variant="light">
                    {items['COMPLETED'] && _.head(items['COMPLETED']).items.length}
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

export default OrderView;