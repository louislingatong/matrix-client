import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {Badge, Card, Col, Container, Nav, Row, Tab} from 'react-bootstrap';
import {FaStore} from 'react-icons/fa';
import {fetchOrdersByOrderNumber} from '../../../services/orderService';
import {orderData} from '../../../store/orderSlice';

function OrderView() {
  const params = useParams();
  const dispatch = useDispatch();
  const order = useSelector(orderData);
  const [loadOrder, setLoadOrder] = useState(true);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [items, setItems] = useState({});

  useEffect(() => {
    if (loadOrder) {
      dispatch(fetchOrdersByOrderNumber(params.orderNumber))
        .then(() => setLoadOrder(false));
    }
  }, [loadOrder]);

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
            _.map(items[status], (groupedItem) => (
              <Card key={groupedItem._id}>
                <Card.Body>
                  <Col>
                    {
                      _.map(groupedItem.items, ({item, quantity}, i) => (
                        <React.Fragment key={item._id}>
                          <React.Fragment>
                            <p>
                              <FaStore/> {item.owner && item.owner.name}
                            </p>
                            <hr/>
                          </React.Fragment>
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

  const noOrdersAvailable = () => <p>There are no items available.</p>;

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
                  !_.isEmpty(items) && items['PENDING'] ? orderItems('PENDING') : noOrdersAvailable()
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