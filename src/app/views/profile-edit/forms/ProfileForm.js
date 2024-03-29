import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {Form, Button, Col} from 'react-bootstrap';
import _ from 'lodash';
import Loader from '../../../components/loader/Loader';

function ProfileForm(props) {
  const {handleSubmitForm, error, isLoading, profile} = props;
  const {register, errors, handleSubmit, setError} = useForm();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error]);

  const onSubmitForm = data => {
    handleSubmitForm(data);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
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
              <Form.Control placeholder="Enter first name"
                            name="firstName"
                            isInvalid={!!errors.firstName}
                            ref={
                              register({
                                required: 'First Name is required.'
                              })
                            }
                            defaultValue={profile.firstName}/>
              {
                errors.firstName &&
                <Form.Text className="text-danger">
                  {errors.firstName.message}
                </Form.Text>
              }
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Enter last name"
                            name="lastName"
                            isInvalid={!!errors.lastName}
                            ref={
                              register({
                                required: 'Last Name is required.'
                              })
                            }
                            defaultValue={profile.lastName}/>
              {
                errors.lastName &&
                <Form.Text className="text-danger">
                  {errors.lastName.message}
                </Form.Text>
              }
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username"
                        name="username"
                        isInvalid={!!errors.username}
                        ref={
                          register({
                            required: 'Username is required.'
                          })
                        }
                        defaultValue={profile.user && profile.user.username}/>
          {
            errors.username &&
            <Form.Text className="text-danger">
              {errors.username.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"
                        name="email"
                        defaultValue={profile.user && profile.user.email}
                        readOnly/>
        </Form.Group>
        <div className="text-right">
          <Button type="submit" className="mr-2" variant="secondary" disabled={isLoading}>
            {isLoading ? <Loader type="beat" color="light"/> : 'Save' }
          </Button>
          <Button type="button" variant="light" disabled={isLoading}
                  to={{pathname: `/profile/view`, state: {from: location.pathname}}} as={Link}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProfileForm;