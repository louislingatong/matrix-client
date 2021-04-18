import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import _ from "lodash";
import Loader from '../../../components/loader/Loader';
import ImageUpload from '../../../components/image-upload/ImageUpload';

function PaymentForm({handleSubmitForm, error, isLoading}) {
  const {register, errors, handleSubmit, setError, setValue, clearErrors} = useForm();
  const [receipt, setReceipt] = useState();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError(error.name, error.value);
    }
  }, [error]);

  const onReceiptUpload = image => {
    setReceipt(image);
    clearErrors('receipt');
    setValue('receipt', image.name);
  };

  const onSubmitForm = data => {
    handleSubmitForm({
      ...data,
      receipt
    })
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <Row>
        <Col>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control placeholder="Enter amount"
                          type="number"
                          name="amount"
                          isInvalid={!!errors.amount}
                          ref={
                            register({
                              required: 'Amount is required.'
                            })
                          }
                          min="0"/>
            {
              errors.amount &&
              <Form.Text className="text-danger">
                {errors.amount.message}
              </Form.Text>
            }
          </Form.Group>
          <Form.Group controlId="formCtrlRefNumber">
            <Form.Label>Control/Reference Number</Form.Label>
            <Form.Control placeholder="Enter control/reference number"
                          name="ctrlRefNumber"
                          isInvalid={!!errors.ctrlRefNumber}
                          ref={
                            register({
                              required: 'Control/Reference number is required.'
                            })
                          }/>
            {
              errors.ctrlRefNumber &&
              <Form.Text className="text-danger">
                {errors.ctrlRefNumber.message}
              </Form.Text>
            }
          </Form.Group>
          <Form.Group>
            <Form.Label>Official Receipt</Form.Label>
            <ImageUpload handleImageUpdate={onReceiptUpload} />
            <Form.Control name="receipt"
                          isInvalid={!!errors.receipt}
                          ref={
                            register({
                              required: 'Official receipt is required.'
                            })
                          } style={{display: 'none'}}/>
            {
              errors.receipt &&
              <Form.Text className="text-danger">
                {errors.receipt.message}
              </Form.Text>
            }
          </Form.Group>
          <Button type="submit" variant="dark" className="btn-block" disabled={isLoading}>
            {isLoading ? <Loader type="beat" color="light"/> : 'Pay' }
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default PaymentForm;