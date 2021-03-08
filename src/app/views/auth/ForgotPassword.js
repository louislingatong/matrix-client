import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Card, Col, Container, Image, Row} from 'react-bootstrap';
import _ from 'lodash';
import logo from '../../../assets/images/logo_b.png';
import ForgotPasswordForm from './forms/ForgotPasswordForm';
import {forgotPassword} from '../../services/authService';
import {loaderStatus} from '../../store/loaderSlice';

function ForgotPassword() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderStatus);
  const [error, setError] = useState({});
  const [alertMessage, setAlertMessage] = useState({});

  const handleSubmitForm = data => {
    dispatch(forgotPassword(data))
      .then(res => setAlertMessage({
        type: 'success',
        message: res.message
      }))
      .catch(err => {
        if (err.status === 422) {
          setError(err.error);
        } else {
          setAlertMessage({
            type: 'danger',
            message: err.error
          });
        }
      });
  };

  const handleCloseAlertMessage = () => {
    setAlertMessage({});
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Link to={{pathname: '/', state: {from: location.pathname}}}>
          <Image src={logo} fluid/>
        </Link>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Card.Body>
              {
                !_.isEmpty(alertMessage) &&
                <Alert variant={alertMessage.type} onClose={handleCloseAlertMessage} dismissible>
                  {alertMessage.message}
                  {' '}
                  {
                    alertMessage.message === 'Email is not verified' &&
                    <Link className="text-decoration-none"
                          to={{pathname: '/verify-email', state: {from: location.pathname}}}>
                      Resend email verification link
                    </Link>
                  }
                </Alert>
              }
              <ForgotPasswordForm handleSubmitForm={handleSubmitForm} error={error} isLoading={isLoading}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;