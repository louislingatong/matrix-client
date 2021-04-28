import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams, Link} from 'react-router-dom';
import {Alert, Card, Col, Container, Image, Row} from 'react-bootstrap';
import _ from 'lodash';
import logo from '../../../assets/images/rt_logo_detailed.png';
import ResendVerifyEmailLinkForm from './forms/ResendVerifyEmailLinkForm';
import {verifyEmail, resendVerifyEmailLink} from '../../services/authService';
import {loaderStatus} from '../../store/loaderSlice';

function VerifyEmail() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderStatus);
  const [error, setError] = useState({});
  const [alertMessage, setAlertMessage] = useState({});

  useEffect(() => {
    if (params.token) {
      dispatch(verifyEmail(params.token))
        .then(() => history.replace('/login'))
        .catch(err =>
          setAlertMessage({
            type: 'danger',
            message: err.error
          })
        );
    }
  }, []);

  const handleSubmitForm = data => {
    dispatch(resendVerifyEmailLink(data))
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

  return (
    <Container>
      <Row className="justify-content-center">
        <Link to={{pathname: '/', state: {from: history.location.pathname}}}>
          <Image src={logo} width={297} height={260}/>
        </Link>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Card.Body>
              {
                !_.isEmpty(alertMessage) &&
                <Alert variant={alertMessage.type}>
                  {
                    alertMessage.message
                  }
                  {' '}
                  {
                    alertMessage.type === 'success' &&
                    <Link className="text-decoration-none" to="/login" replace>Continue</Link>
                  }
                </Alert>
              }
              <ResendVerifyEmailLinkForm handleSubmitForm={handleSubmitForm} error={error} isLoading={isLoading}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default VerifyEmail;