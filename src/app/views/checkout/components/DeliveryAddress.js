import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Col, Row} from 'react-bootstrap';
import {FaMapPin, FaPen} from 'react-icons/fa';
import _ from 'lodash';
import {deliveryAddressData, setDeliveryAddressData} from '../../../store/checkoutSlice';
import DeliveryAddressForm from '../forms/DeliveryAddressForm';
import Checkout from "../Checkout";

function DeliveryAddress(props) {
  const dispatch = useDispatch();
  const deliveryAddress = useSelector(deliveryAddressData)
  const [deliveryAddressFlag, setDeliveryAddressFlag] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(props.error)) {
      setDeliveryAddressFlag(true);
    }
  }, [props.error]);

  const onDeliveryAddressSubmit = data => {
    setDeliveryAddressFlag(false);
    dispatch(setDeliveryAddressData(data));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Row className="align-items-center">
            <Col className="flex-grow-0 pr-0">
              <FaMapPin/>
            </Col>
            <Col>
              Delivery Address
            </Col>
            {
              (!_.isEmpty(deliveryAddress) && !deliveryAddressFlag) &&
              <Col className="text-right">
                <Button variant="default" onClick={() => setDeliveryAddressFlag(true)}>
                  <FaPen className="text-secondary"/>
                </Button>
              </Col>
            }
          </Row>
        </Card.Title>
        {
          (_.isEmpty(deliveryAddress) || deliveryAddressFlag) &&
          <DeliveryAddressForm {...props} deliveryAddress={deliveryAddress} handleSubmitForm={onDeliveryAddressSubmit}/>
        }
        {
          (!_.isEmpty(deliveryAddress) && !deliveryAddressFlag) &&
          <React.Fragment>
            <Card.Text>
              {deliveryAddress.firstName} &nbsp;
              {deliveryAddress.lastName}
            </Card.Text>
            <Card.Text>
              {deliveryAddress.phoneNumber}
            </Card.Text>
            <Card.Text>
              {deliveryAddress.email}
            </Card.Text>
            <Card.Text>
              {deliveryAddress.address}, &nbsp;
              {deliveryAddress.barangay}, &nbsp;
              {deliveryAddress.city}, &nbsp;
              {deliveryAddress.province}, &nbsp;
              {deliveryAddress.postalCode}, &nbsp;
              {deliveryAddress.country}
            </Card.Text>
          </React.Fragment>
        }
      </Card.Body>
    </Card>
  )
}

export default DeliveryAddress;