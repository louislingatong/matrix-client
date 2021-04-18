import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {Alert, Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import {FaUserEdit} from 'react-icons/fa'
import _ from 'lodash';
import Avatar from '../../components/avatar/Avatar';
import {updateAvatar} from '../../services/profileService';
import {loggedInUser} from '../../store/authSlice';

function ProfileView() {
  const location = useLocation();
  const dispatch = useDispatch();
  const profile = useSelector(loggedInUser);
  const [alertMessage, setAlertMessage] = useState({});

  const handleAvatarUpdate = avatar => {
    dispatch(updateAvatar(avatar));
  }

  const handleCloseAlertMessage = () => {
    setAlertMessage({});
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Profile</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={4}>
          <Card>
            <Card.Body className="text-center">
              {
                !_.isEmpty(alertMessage) &&
                <Alert variant={alertMessage.type} onClose={handleCloseAlertMessage} dismissible>
                  {alertMessage.message}
                </Alert>
              }
              <Avatar handleAvatarUpdate={handleAvatarUpdate} avatarPath={profile.avatar && profile.avatar.path} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8}>
          <Card>
            <Card.Body>
              <Button variant="default" to={{pathname: `/profile/edit`, state: {from: location.pathname}}} as={Link}
                      style={{position: 'absolute', right: 0, top: 0, zIndex: 1}}>
                <FaUserEdit size={30} className="text-secondary" />
              </Button>
              <Form>
                <Form.Group controlId="formCode">
                  <Form.Label>Code</Form.Label>
                  <Form.Control name="code"
                                defaultValue={profile.user && profile.user.code}
                                readOnly/>
                </Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control name="firstName"
                                    defaultValue={profile.firstName}
                                    readOnly/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control name="lastName"
                                    defaultValue={profile.lastName}
                                    readOnly/>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="username"
                                defaultValue={profile.user && profile.user.username}
                                readOnly/>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email"
                                name="email"
                                defaultValue={profile.user && profile.user.email}
                                readOnly/>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileView;