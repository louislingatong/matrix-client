import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Form, Button, Col} from 'react-bootstrap';
import {FaUserEdit} from 'react-icons/fa'
import _ from 'lodash';
import Loader from '../../../components/loader/Loader';

function ProfileForm(props) {
  const {handleSubmitForm, error, isLoading, profile, successProfileUpdate} = props;
  const {register, errors, handleSubmit, setError, reset} = useForm();
  const [mode, setMode] = useState('view');

  useEffect(() => {
    if (successProfileUpdate && mode === 'update') {
      setMode('view');
    }
  }, [successProfileUpdate])

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error])

  const onSubmitForm = data => {
    handleSubmitForm(data)
  };

  return (
    <div>
      {
        mode === 'view' &&
        <Button variant="default" onClick={() => setMode('update')}
                style={{position: 'absolute', right: 0, top: 0, zIndex: 1}}>
          <FaUserEdit size={30} className="text-secondary" />
        </Button>
      }
      <Form onSubmit={handleSubmit(onSubmitForm)}>
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
                            defaultValue={profile.firstName}
                            readOnly={
                              mode === 'view'
                            }/>
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
                            defaultValue={profile.lastName}
                            readOnly={
                              mode === 'view'
                            }/>
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
                        defaultValue={profile.user.username}
                        readOnly={
                          mode === 'view'
                        }/>
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
                        defaultValue={profile.user.email}
                        readOnly/>
        </Form.Group>
        {
          mode === 'update' &&
          <div className="text-right">
            <Button type="submit" className="mr-2"variant="secondary" disabled={isLoading}>
              {isLoading ? <Loader type="beat" color="light"/> : 'Save' }
            </Button>
            <Button type="button" variant="light" onClick={() => setMode('view')} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        }
      </Form>
    </div>
  );
}

export default ProfileForm;