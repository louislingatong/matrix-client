import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Form, Button} from 'react-bootstrap';
import _ from 'lodash';
import Loader from '../../../components/loader/Loader';

function RegisterForm({handleSubmitForm, error, isLoading}) {
  const {register, errors, handleSubmit, setError, watch, reset} = useForm();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error]);

  const onSubmitForm = data => {
    reset({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    });
    handleSubmitForm(data);
  };

  return (
    <div>
      <h3>Register</h3>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"
                        placeholder="Enter email"
                        name="email"
                        isInvalid={!!errors.email}
                        ref={
                          register({
                            required: 'Email is required.',
                            pattern: {
                              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Incorrect email format.'
                            }
                          })
                        }/>
          {
            errors.email &&
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username"
                        name="username"
                        isInvalid={!!errors.username}
                        ref={
                          register({
                            required: 'Username is required.'
                          })
                        }/>
          {
            errors.username &&
            <Form.Text className="text-danger">
              {errors.username.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
                        placeholder="Enter password"
                        name="password"
                        isInvalid={!!errors.password}
                        ref={
                          register({
                            required: 'Password is required.'
                          })
                        }/>
          {
            errors.password &&
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password"
                        placeholder="Enter confirm password"
                        name="confirmPassword"
                        isInvalid={!!errors.confirmPassword}
                        ref={
                          register({
                            required: 'Confirm Password is required',
                            validate: (value) => value === watch('password') || 'Passwords don\'t match.'
                          })
                        }/>
          {
            errors.confirmPassword &&
            <Form.Text className="text-danger">
              {errors.confirmPassword.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="Enter first name"
                        name="firstName"
                        isInvalid={!!errors.firstName}
                        ref={
                          register({
                            required: 'First Name is required.'
                          })
                        }/>
          {
            errors.firstName &&
            <Form.Text className="text-danger">
              {errors.firstName.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Enter last name"
                        name="lastName"
                        isInvalid={!!errors.lastName}
                        ref={
                          register({
                            required: 'Last Name is required.'
                          })
                        }/>
          {
            errors.lastName &&
            <Form.Text className="text-danger">
              {errors.lastName.message}
            </Form.Text>
          }
        </Form.Group>
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading ? <Loader type="beat" color="light"/> : 'Register' }
        </Button>
      </Form>
    </div>
  );
}

export default RegisterForm;