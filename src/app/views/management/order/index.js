import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Col, Container, Row, Table} from 'react-bootstrap';
import {FaRegFile} from 'react-icons/fa';
import _ from 'lodash';
import Loader from '../../../components/common/loader/Loader';
import {orderList} from '../../../store/orderSlice';
import {loaderStatus} from '../../../store/loaderSlice';
import {fetchAllOrders, updateOrderStatusByOrderNumber} from '../../../services/orderService';
import {downloadReceipt} from '../../../services/paymentService';

function Order() {
  const location = useLocation();
  const dispatch = useDispatch();
  const orders = useSelector(orderList);
  const isLoading = useSelector(loaderStatus);
  const [loadOrders, setLoadOrders] = useState(true);

  useEffect(() => {
    if (loadOrders) {
      dispatch(fetchAllOrders())
        .then(() => setLoadOrders(false));
    }
  }, [loadOrders]);

  const onReceiptDownload = (id) => {
    dispatch(downloadReceipt(id));
  };

  const onCompeteOrder = (orderNumber) => {
    dispatch(updateOrderStatusByOrderNumber(orderNumber, 'COMPLETED'))
      .then(() => setLoadOrders(true));
  };

  const paymentStatus = (data) => {
    switch (data.status) {
      case 'PROCESSING':
        return (
          <Button variant="link" to={{pathname: `/manage/order/confirm/${data.orderNumber}`, state: {from: location.pathname}}} as={Link}>
            For Confirmation
          </Button>
        );
      case 'CONFIRMED':
        return (
          <Button variant="link" onClick={() => onCompeteOrder(data.orderNumber)} disabled={isLoading}>
            {isLoading ? <Loader type="beat" color="light"/> : 'Complete Order' }
          </Button>
        );
      case 'COMPLETED':
        return 'Completed';
      default:
        return 'For Payment';
    }
  };

  const renderRows = ([key, value]) => (
    <tr key={key}>
      <td className="text-center">
        <Button variant="link"
                to={{pathname: `/manage/order/view/${key}`, state: {from: location.pathname}}} as={Link}>
          {key}
        </Button>
      </td>
      <td className="text-center align-middle">{`${_.head(value).deliveryAddress.firstName} ${_.head(value).deliveryAddress.lastName}`}</td>
      <td className="text-center align-middle">₱{_.sumBy(value, (o) => o.totalAmount)}</td>
      <td className="text-center align-middle">{_.head(value).paymentMethod.name}</td>
      <td className="text-center">
        {
          _.head(value).payment &&
          <Button variant="secondary" onClick={() => onReceiptDownload(_.head(value).payment._id)}>
            <FaRegFile/>
          </Button>
        }
      </td>
      <td className="text-center align-middle">
        {paymentStatus(_.head(value))}
      </td>
    </tr>
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h3>Orders</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                <tr>
                  <th className="text-center">Order Number</th>
                  <th className="text-center">Shopper</th>
                  <th className="text-center">Payable Amount</th>
                  <th className="text-center">Payment Method</th>
                  <th className="text-center">Payment Receipt</th>
                  <th className="text-center">Status</th>
                </tr>
                </thead>
                <tbody>
                {
                  orders.map(renderRows)
                }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Order;