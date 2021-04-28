import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Card, Col, Container, Row, Form, Button, Modal} from 'react-bootstrap';
import {FaStore} from 'react-icons/fa';
import _ from 'lodash';
import DeliveryAddress from './components/DeliveryAddress';
import PaymentMethod from './components/PaymentMethod';
import {bagItemsOG, bagItems} from '../../store/bagSlice';
import Loader from '../../components/common/loader/Loader';
import {
  deliveryAddressData,
  paymentMethodData,
  emailStatus
} from '../../store/checkoutSlice';
import {loggedInStatus, loggedInUser} from '../../store/authSlice';
import {loaderStatus} from '../../store/loaderSlice';
import {
  checkEmailStatus,
  sendEmailVerificationCode,
  verifyEmail
} from '../../services/checkoutService';
import {createOrder, createOrderGuest} from '../../services/orderService';

function EmailVerificationModal({show, handleClose, handleError}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector(bagItemsOG);
  const isLoading = useSelector(loaderStatus);
  const deliveryAddress = useSelector(deliveryAddressData);
  const paymentMethod = useSelector(paymentMethodData);
  const isVerifiedEmail = useSelector(emailStatus);
  const isAuthenticated = useSelector(loggedInStatus);
  const profile = useSelector(loggedInUser);
  const {register, errors, handleSubmit, setError} = useForm();

  useEffect(() => {
    if (show && (profile.user.email !== deliveryAddress.email)) {
      dispatch(checkEmailStatus(deliveryAddress.email))
        .then(({isVerified}) => {
          if (!isVerified) {
            sendEmailVerifyCode();
          }
        });
    }
  }, [show])

  const sendEmailVerifyCode = () => dispatch(sendEmailVerificationCode(deliveryAddress.email));

  const onVerifyEmail = data => {
    dispatch(verifyEmail(data))
      .catch(err => {
        if (err.status === 422) {
          setError(err.error.name, err.error.value);
        }
      });
  };

  const onPay = () => {
    const formData = {
      ...deliveryAddress,
      ...paymentMethod,
      items
    };

    if (isAuthenticated) {
      dispatch(createOrder(formData))
        .then(({orderNumber}) => {
          redirectToPayment(orderNumber);
        })
        .catch(err => {
          if (err.status === 422) {
            handleError(err.error);
            onClose();
          }
        });
    } else {
      dispatch(createOrderGuest(formData))
        .then(({orderNumber}) => {
          redirectToPayment(orderNumber);
        })
        .catch(err => {
          if (err.status === 422) {
            handleError(err.error);
            onClose();
          }
        });
    }
  };

  const redirectToPayment = (orderNumber) => {
    history.push(`/payment/${orderNumber}`, {from: {path: history.location.pathname}});
  };

  const onClose = () => {
    handleClose(false);
  };

  return (
    <Modal show={show} onHide={onClose} centered animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Email Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>{deliveryAddress.email}</p>
        {
          (((profile.user.email === deliveryAddress.email) && (profile.user.status === 'PENDING')) ||
          ((profile.user.email !== deliveryAddress.email) && !isVerifiedEmail)) ?
            <small className="text-danger">Not yet verified</small> :
            <small className="text-success">Verified</small>
        }
        {
          (profile.user.email === deliveryAddress.email) && (profile.user.status === 'PENDING') &&
            <div>
              Please verify the email associated with your account
            </div>
        }
        {
          (profile.user.email !== deliveryAddress.email) && !isVerifiedEmail &&
          <div>
            <Form onSubmit={handleSubmit(onVerifyEmail)}>
              <Form.Group>
                <Form.Text>
                  To verify your email address, input the verification code that has been sent to your email to the field below
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="text-center"
                  placeholder="Verification Code"
                  name="code"
                  maxLength={6}
                  isInvalid={!!errors.code}
                  ref={
                    register({
                      required: 'Code is required.'
                    })
                  }/>
                {
                  errors.code &&
                  <Form.Text className="text-danger">
                    {errors.code.message}
                  </Form.Text>
                }
              </Form.Group>
              <Button type="submit" variant="dark" className="btn-block" disabled={isLoading}>
                {isLoading ? <Loader type="beat" color="light"/> : 'Verify'}
              </Button>
              <Button variant="light" className="btn-block" onClick={sendEmailVerifyCode} disabled={isLoading}>
                {isLoading ? <Loader type="beat" color="light"/> : 'Resend Verification Code'}
              </Button>
            </Form>
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onClose}>
          Close
        </Button>
        <Button variant="dark" onClick={onPay} disabled={
          (((profile.user.email === deliveryAddress.email) && (profile.user.status === 'PENDING')) ||
          ((profile.user.email !== deliveryAddress.email) && !isVerifiedEmail)) || isLoading
        }>
          {isLoading ? <Loader type="beat" color="light"/> : 'Pay'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function Checkout() {
  const history = useHistory();
  const items = useSelector(bagItems);
  const itemsOG = useSelector(bagItemsOG);
  const deliveryAddress = useSelector(deliveryAddressData);
  const paymentMethod = useSelector(paymentMethodData);
  const isAuthenticated = useSelector(loggedInStatus);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState({});
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);

  useEffect(() => {
    if (_.isEmpty(items)) {
      history.push('/', {from: {path: history.location.pathname}});
    }
  }, [items]);

  useEffect(() => {
    if (!_.isEmpty(items) && !subTotal && !total) {
      setSubTotal(calculateSubTotal(items));
      setTotal(calculateTotal(items));
    }
  }, [items, total, subTotal]);

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

  const onPlaceOrder = () => {
    setShowEmailVerificationModal(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Checkout</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={9}>
          <DeliveryAddress error={error}/>
          <PaymentMethod error={error}/>
          <Button variant="dark" className="btn-block" onClick={onPlaceOrder}
                 disabled={_.isEmpty(deliveryAddress) || _.isEmpty(paymentMethod) || _.isEmpty(itemsOG)}>Place Order</Button>
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
                        <Row  className="align-items-center">
                          <Col>{k}</Col>
                          <Col>
                            <Col className="text-center text-nowrap">
                              Qty {_.sumBy(v, (o) => o.quantity)}
                            </Col>
                            <Col className="text-center text-nowrap">
                              ₱{_.chain(v).uniqBy('price').head().value().price}
                            </Col>
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
      </Row>
      {
        !_.isEmpty(deliveryAddress) &&
        !_.isEmpty(paymentMethod) &&
        <EmailVerificationModal show={showEmailVerificationModal}
                                handleClose={setShowEmailVerificationModal}
                                handleError={setError}/>
      }
    </Container>
  )
}

export default Checkout;