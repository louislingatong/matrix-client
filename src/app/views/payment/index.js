import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Col, Container, Row, Nav, Card} from 'react-bootstrap';
import PaymentForm from './forms/PaymentForm';
import {loaderStatus} from '../../store/loaderSlice';
import {payOrder} from '../../services/paymentService';

function Payment() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderStatus);
  const [error, setError] = useState({});

  const onSubmitForm = data => {
    dispatch(payOrder(params.orderNumber, data))
      .then(() => {
        history.push(`/order/check/${params.orderNumber}`, {from: {path: history.location.pathname}});
      })
      .catch(err => {
        if (err.status === 422) {
          setError(err.error);
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={12} lg={6} className="text-center">
          <h3>Payment</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card>
            <Card.Body>
              <PaymentForm handleSubmitForm={onSubmitForm} error={error} isLoading={isLoading}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Payment;