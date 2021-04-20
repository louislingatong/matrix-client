import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {Card, Col, Container, Row, Figure, Button} from 'react-bootstrap';
import {FaStore} from 'react-icons/fa';
import Loader from '../../components/loader/Loader';
import {orderData} from '../../store/orderSlice';
import {loaderStatus} from "../../store/loaderSlice";
import {fetchOrdersByOrderNumber, updateOrderStatusByOrderNumber} from '../../services/orderService';

function OrderConfirm() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const order = useSelector(orderData);
  const isLoading = useSelector(loaderStatus);
  const [loadOrder, setLoadOrder] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [orderItem, setOrderItem] = useState({});

  useEffect(() => {
    if (loadOrder) {
      dispatch(fetchOrdersByOrderNumber(params.orderNumber))
        .then(() => setLoadOrder(false));
    }
  }, [loadOrder]);

  useEffect(() => {
    if (_.chain(order).keys().head().value() === params.orderNumber) {
      const groupedOrder = _.chain(order).values().head().groupBy((o) => o.status).value();
      const oStatus = _.chain(groupedOrder).keys().head().value();
      const oItems = _.chain(groupedOrder).values().head().value();
      const oItem = _.head(oItems);
      setOrderStatus(oStatus);
      setOrderItems(oItems);
      setOrderItem(oItem);
    }
  }, [order]);

  const onConfirmPayment = () => {
    dispatch(updateOrderStatusByOrderNumber(params.orderNumber, 'CONFIRMED'))
      .then(() => {
        history.push('/orders', {from: {path: history.location.pathname}});
      });
  };

  const totalPayableAmount = () => _.sumBy(orderItems, (o) => _.sumBy(o.items, ({item, quantity}) => quantity * (item.memberPrice || item.product.price)));

  const items = () => {
    return (
      <Row className="mb-3">
        <Col>
          {
            _.map(orderItems, (groupedItem, i) => (
              <Card key={i}>
                <Card.Body>
                  <Col>
                    {
                      _.map(groupedItem.items, ({item, quantity}, i) => (
                        <React.Fragment key={i}>
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

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text>
                Order Number: <span className="h6">{params.orderNumber}</span>
              </Card.Text>
              <Card.Text>
                Order Status: <span className="h6">{orderStatus}</span>
              </Card.Text>
              <Card.Text>
                Total Payable Amount: <span className="h6">₱{totalPayableAmount()}</span>
              </Card.Text>
              <Card.Text>
                Items:
              </Card.Text>
              {items()}
            </Card.Body>
          </Card>
        </Col>
        <hr/>
        <Col>
          <Card>
            <Card.Body>
              <Card.Text>
                Payment Method: <span className="h6">{orderItem.paymentMethod && orderItem.paymentMethod.name}</span>
              </Card.Text>
              <Card.Text>
                Payment Amount: <span className="h6">₱{orderItem.payment && orderItem.payment.amount}</span>
              </Card.Text>
              <Card.Text>
                Control / Reference Number: <span className="h6">{orderItem.payment && orderItem.payment.ctrlRefNumber}</span>
              </Card.Text>
              <Card.Text>
                Receipt:
              </Card.Text>
              {
                orderItem.payment &&
                <Figure>
                  <Figure.Image
                    src={process.env.REACT_APP_API_URL + orderItem.payment.receipt.path}
                  />
                </Figure>
              }
              <Button variant="dark" className="btn-block" onClick={onConfirmPayment} disabled={isLoading}>
                {isLoading ? <Loader type="beat" color="light"/> : 'Confirm Payment'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderConfirm;