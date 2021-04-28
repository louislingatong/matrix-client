import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Form} from 'react-bootstrap';
import _ from 'lodash';
import {deliveryAddressData, paymentMethodList, setPaymentMethodData} from '../../../store/checkoutSlice';
import {fetchAllPaymentMethods} from '../../../services/checkoutService';
import Checkout from "../Checkout";

function PaymentMethod({error}) {
  const dispatch = useDispatch();
  const paymentMethods = useSelector(paymentMethodList);
  const deliveryAddress = useSelector(deliveryAddressData)
  const [loadPaymentMethods, setLoadPaymentMethods] = useState(true);

  useEffect(() => {
    if (loadPaymentMethods) {
      dispatch(fetchAllPaymentMethods());
      setLoadPaymentMethods(false);
    }
  },[loadPaymentMethods]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Payment Method
        </Card.Title>
        <Form.Group onChange={(e) => dispatch(setPaymentMethodData({paymentMethodId: e.target.value}))}>
          {
            paymentMethods && paymentMethods.map((paymentMethod, i) => (
              <Form.Check
                key={paymentMethod._id}
                type="radio"
                value={paymentMethod._id}
                label={paymentMethod.name}
                name="paymentMethod"
                id={'paymentMethod' + i}
                disabled={_.isEmpty(deliveryAddress)}
              />
            ))
          }
          {
            error.name === 'paymentMethodId' &&
            <Form.Text className="text-danger">
              {error.value.message}
            </Form.Text>
          }
        </Form.Group>
      </Card.Body>
    </Card>
  )
}

export default PaymentMethod;