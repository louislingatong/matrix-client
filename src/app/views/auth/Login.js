import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Col, Container, Row, Image, Alert} from 'react-bootstrap';
import _ from 'lodash';
import logo from '../../../assets/images/logo_b.png';
import LoginForm from './forms/LoginForm';
import {login} from '../../services/authService';
import {loaderStatus} from '../../store/loaderSlice';

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderStatus);
  const [error, setError] = useState({});
  const [alertMessage, setAlertMessage] = useState({});

  const handleSubmitForm = data => {
    dispatch(login(data))
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
              <LoginForm handleSubmitForm={handleSubmitForm} error={error} isLoading={isLoading}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={6} className="text-center">
          <p className="text-muted">
            No account yet? <Link className="text-decoration-none"
                                  to={{pathname: '/register', state: {from: location.pathname}}}>Register here</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;