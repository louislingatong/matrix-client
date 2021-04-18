import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {Button, Col, Form, Row} from 'react-bootstrap';
import _ from 'lodash';
import Loader from '../../../components/loader/Loader';
import {loggedInUser} from '../../../store/authSlice';

function DeliveryAddressForm({deliveryAddress, handleSubmitForm, error, isLoading}) {
  const profile = useSelector(loggedInUser);
  const {register, errors, handleSubmit, setError, setValue} = useForm();

  useEffect(() => {
    if (profile) {
      setValue('firstName', profile.firstName);
      setValue('lastName', profile.lastName);
    }
  }, [profile]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error]);

  return (
    <Form onSubmit={handleSubmit(handleSubmitForm)}>
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
                          defaultValue={deliveryAddress.firstName}/>
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
                          defaultValue={deliveryAddress.lastName}/>
            {
              errors.lastName &&
              <Form.Text className="text-danger">
                {errors.lastName.message}
              </Form.Text>
            }
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="Enter address"
                      name="address"
                      isInvalid={!!errors.address}
                      ref={
                        register({
                          required: 'Address is required.'
                        })
                      }
                      defaultValue={deliveryAddress.address}/>
        {
          errors.address &&
          <Form.Text className="text-danger">
            {errors.address.message}
          </Form.Text>
        }
      </Form.Group>
      <Form.Row>
        <Col>
          <Form.Group controlId="formProvince">
            <Form.Label>Province</Form.Label>
            <Form.Control placeholder="Enter province"
                          name="province"
                          isInvalid={!!errors.province}
                          ref={
                            register({
                              required: 'Province is required.'
                            })
                          }
                          defaultValue={deliveryAddress.province}/>
            {
              errors.province &&
              <Form.Text className="text-danger">
                {errors.province.message}
              </Form.Text>
            }
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control placeholder="Enter city"
                          name="city"
                          isInvalid={!!errors.city}
                          ref={
                            register({
                              required: 'City is required.'
                            })
                          }
                          defaultValue={deliveryAddress.city}/>
            {
              errors.city &&
              <Form.Text className="text-danger">
                {errors.city.message}
              </Form.Text>
            }
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group controlId="formPostalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control placeholder="Enter postal code"
                          name="postalCode"
                          isInvalid={!!errors.postalCode}
                          ref={
                            register({
                              required: 'Postal Code is required.'
                            })
                          }
                          defaultValue={deliveryAddress.postalCode}/>
            {
              errors.postalCode &&
              <Form.Text className="text-danger">
                {errors.postalCode.message}
              </Form.Text>
            }
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBarangay">
            <Form.Label>Barangay</Form.Label>
            <Form.Control placeholder="Enter barangay"
                          name="barangay"
                          isInvalid={!!errors.barangay}
                          ref={
                            register({
                              required: 'Barangay is required.'
                            })
                          }
                          defaultValue={deliveryAddress.barangay}/>
            {
              errors.barangay &&
              <Form.Text className="text-danger">
                {errors.barangay.message}
              </Form.Text>
            }
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control placeholder="Enter country"
                      name="country"
                      isInvalid={!!errors.country}
                      ref={
                        register({
                          required: 'Country is required.'
                        })
                      }
                      defaultValue={deliveryAddress.country}/>
        {
          errors.country &&
          <Form.Text className="text-danger">
            {errors.country.message}
          </Form.Text>
        }
      </Form.Group>
      <Form.Row>
        <Col>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Enter email"
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
                          }
                          defaultValue={deliveryAddress.email}/>
            {
              errors.email &&
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            }
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="Enter phone number"
                          name="phoneNumber"
                          isInvalid={!!errors.phoneNumber}
                          ref={
                            register({
                              required: 'Phone Number is required.'
                            })
                          }
                          defaultValue={deliveryAddress.phoneNumber}/>
            {
              errors.phoneNumber &&
              <Form.Text className="text-danger">
                {errors.phoneNumber.message}
              </Form.Text>
            }
          </Form.Group>
        </Col>
      </Form.Row>
      <Row>
        <Col className="text-right">
          <Button type="submit" variant="dark" disabled={isLoading}>
            {isLoading ? <Loader type="beat" color="light"/> : 'Save' }
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default DeliveryAddressForm;