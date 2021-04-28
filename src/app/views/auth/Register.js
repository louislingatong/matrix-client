import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Card, Col, Container, Image, Row} from 'react-bootstrap';
import _ from 'lodash';
import logo from '../../../assets/images/rt_logo_detailed.png';
import RegisterForm from './forms/RegisterForm';
import {register} from '../../services/authService';
import {loaderStatus} from '../../store/loaderSlice';

function Register() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderStatus);
  const [error, setError] = useState({});
  const [alertMessage, setAlertMessage] = useState({});

  const handleSubmitForm = data => {
    dispatch(register(data))
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
          <Image src={logo} width={297} height={260}/>
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
                </Alert>
              }
              <RegisterForm handleSubmitForm={handleSubmitForm} error={error} isLoading={isLoading}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={6} className="text-center">
          <p className="text-muted">
            Already have an account? <Link className="text-decoration-none"
                                           to={{pathname: '/login', state: {from: location.pathname}}}>Login here</Link>
          </p>
        </Col>
      </Row>
    </Container>

  );
}

export default Register;