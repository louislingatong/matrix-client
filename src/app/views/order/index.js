import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Col, Container, Row, Table} from 'react-bootstrap';
import {FaFileDownload} from 'react-icons/fa';
import _ from 'lodash';
import {orderList} from '../../store/orderSlice';
import {loggedInUser} from '../../store/authSlice';
import {fetchAllOrders} from '../../services/orderService';
import {downloadReceipt} from '../../services/paymentService';

function Order() {
  const location = useLocation();
  const dispatch = useDispatch();
  const orders = useSelector(orderList);
  const profile = useSelector(loggedInUser);
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

  const paymentStatus = (data) => {
    switch (data.status) {
      case 'PROCESSING':
        return profile.user.role === 'ADMIN' ?
          <Button variant="link" to={{pathname: `/order/confirm/${data.orderNumber}`, state: {from: location.pathname}}} as={Link}>
            For Confirmation
          </Button> : 'For Confirmation';
      case 'CONFIRMED':
        return 'Confirmed';
      case 'COMPLETED':
        return 'Completed';
      default:
        return 'For Payment';
    }
  };

  const loadRows = ([key, value]) => (
    <tr key={key}>
      <td className="text-center">
        <Button variant="link"
                to={{pathname: `/order/view/${key}`, state: {from: location.pathname}}} as={Link}>
          {key}
        </Button>
      </td>
      <td className="text-center align-middle">{`${_.head(value).deliveryAddress.firstName} ${_.head(value).deliveryAddress.lastName}`}</td>
      <td className="text-center align-middle">₱{_.sumBy(value, (o) => o.totalAmount)}</td>
      <td className="text-center align-middle">{_.head(value).paymentMethod.name}</td>
      <td className="text-center">
        {
          _.head(value).payment &&
          <Button variant="link" onClick={() => onReceiptDownload(_.head(value).payment._id)}>
            <FaFileDownload size={20}/>
          </Button>
        }
      </td>
      <td className="text-center align-middle">
        {paymentStatus(_.head(value))}
      </td>
    </tr>
  )

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h3>Orders</h3>
        </Col>
      </Row>
      <Row>
        <Col>
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
              orders.map(loadRows)
            }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default Order;