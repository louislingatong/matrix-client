import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Form, Button} from 'react-bootstrap';
import _ from 'lodash';

function PaymentMethodAddForm({handleSubmitForm, handleClose, error}) {
  const {register, errors, handleSubmit, setError} = useForm();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error]);

  return (
    <div>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Enter name"
                        name="name"
                        isInvalid={!!errors.name}
                        ref={
                          register({
                            required: 'Name is required.'
                          })
                        }/>
          {
            errors.name &&
            <Form.Text className="text-danger">
              {errors.name.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formReceiverName">
          <Form.Label>Receiver Name</Form.Label>
          <Form.Control placeholder="Enter receiver name"
                        name="receiverName"
                        isInvalid={!!errors.receiverName}
                        ref={
                          register({
                            required: 'Receiver name is required.'
                          })
                        }/>
          {
            errors.receiverName &&
            <Form.Text className="text-danger">
              {errors.receiverName.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formReceiverPhoneNumber">
          <Form.Label>Receiver Phone Number</Form.Label>
          <Form.Control placeholder="Enter receiver phone number"
                        name="receiverPhoneNumber"
                        isInvalid={!!errors.receiverPhoneNumber}
                        ref={
                          register({
                            required: 'Receiver phone number is required.'
                          })
                        }/>
          {
            errors.receiverPhoneNumber &&
            <Form.Text className="text-danger">
              {errors.receiverPhoneNumber.message}
            </Form.Text>
          }
        </Form.Group>
        <Form.Group controlId="formReceiverAddress">
          <Form.Label>Receiver Address</Form.Label>
          <Form.Control placeholder="Enter receiver address"
                        name="receiverAddress"
                        isInvalid={!!errors.receiverAddress}
                        ref={
                          register({
                            required: 'Receiver address is required.'
                          })
                        }/>
          {
            errors.receiverAddress &&
            <Form.Text className="text-danger">
              {errors.receiverAddress.message}
            </Form.Text>
          }
        </Form.Group>
        <div className="text-right">
          <Button type="submit" className="mr-2" variant="secondary">
            Save
          </Button>
          <Button type="button" variant="light" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PaymentMethodAddForm;