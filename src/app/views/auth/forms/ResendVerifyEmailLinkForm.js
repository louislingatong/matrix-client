import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import _ from 'lodash';
import Loader from '../../../components/common/loader/Loader';
import {loggedInUser} from '../../../store/authSlice';

function ResendVerifyEmailLinkForm({handleSubmitForm, error, isLoading}) {
  const profile = useSelector(loggedInUser);
  const {register, errors, handleSubmit, setError, reset} = useForm();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error]);

  const onSubmitForm = data => {
    reset({
      email: ''
    });
    handleSubmitForm(data);
  };

  return (
    <div>
      <h3>Resend Email Verification Link</h3>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"
                        placeholder="Enter email"
                        name="email"
                        isInvalid={!!errors.email}
                        defaultValue={profile.user ? profile.user.email : ''}
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
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading ? <Loader type="beat" color="light"/> : 'Send' }
        </Button>
      </Form>
    </div>
  );
}

export default ResendVerifyEmailLinkForm;