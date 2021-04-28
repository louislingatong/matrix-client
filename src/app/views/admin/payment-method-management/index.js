import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Col, Container, Row, Table} from 'react-bootstrap';
import {FaEye, FaPen, FaPlus, FaTrash} from 'react-icons/fa';
import {paymentMethodList} from '../../../store/paymentMethodSlice';
import {fetchAllPaymentMethods, createPaymentMethod, updatePaymentMethodById, deletePaymentMethodById} from '../../../services/paymentMethodService';
import FormModal from '../../../components/form-modal/FormModal';
import PaymentMethodEditForm from './forms/PaymentMethodEditForm';
import ConfirmationModal from '../../../components/confirmation-modal/ConfimationModal';
import PaymentMethodAddForm from './forms/PaymentMethodAddForm';

const formModalInitState = {
  open: false,
  title: '',
  body: {},
};

const confirmationModalInitState = {
  open: false,
  message: '',
  subMessage: '',
};

function PaymentMethod() {
  const paymentMethods = useSelector(paymentMethodList);
  const dispatch = useDispatch();
  const [loadOrders, setLoadOrders] = useState(true);
  const [action, setAction] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
  const [selectedPaymentMethodIndex, setSelectedPaymentMethodIndex] = useState();
  const [formModalProps, setFormModalProps] = useState(formModalInitState);
  const [confirmationModalProps, setConfirmationModalProps] = useState(confirmationModalInitState);
  const [error, setError] = useState({});

  useEffect(() => {
    if (loadOrders) {
      dispatch(fetchAllPaymentMethods())
        .then(() => setLoadOrders(false));
    }
  }, [loadOrders]);

  useEffect(() => {
    switch (action) {
      case 'add':
        setFormModalProps({
          ...formModalProps,
          open: true,
          title: 'Add Payment Method',
          body: <PaymentMethodAddForm handleSubmitForm={onSubmitAddForm} handleClose={onCloseFormModal} error={error}/>
        });
        break;
      case 'edit':
        setFormModalProps({
          ...formModalProps,
          open: true,
          title: 'Edit Payment Method',
          body: <PaymentMethodEditForm paymentMethod={selectedPaymentMethod} handleSubmitForm={onSubmitEditForm} handleClose={onCloseFormModal} error={error}/>
        });
        break;
      case 'delete':
        setConfirmationModalProps({
          ...confirmationModalProps,
          open: true,
          message: 'Are you sure?',
          subMessage: 'Do you really want to delete this payment method? This process cannot be undone.'
        });
        break;
    }
  }, [action]);

  const onOpenFormModal = (action, data, index) => {
    if (data) {
      setSelectedPaymentMethod(data);
      setSelectedPaymentMethodIndex(index);
    }
    setAction(action);
  };

  const onCloseFormModal = () => {
    setFormModalProps(formModalInitState);
    setAction('');
  };

  const onSubmitAddForm = data => {
    dispatch(createPaymentMethod(data))
      .catch(err => {
        if (err.status === 422) {
          setError(err.error);
        }
      });
    onCloseFormModal();
  };

  const onSubmitEditForm = data => {
    dispatch(updatePaymentMethodById(selectedPaymentMethod._id, data, selectedPaymentMethodIndex))
      .catch(err => {
        if (err.status === 422) {
          setError(err.error);
        }
      });
    onCloseFormModal();
  };

  const onOpenConfirmationModal = (action, data, index) => {
    if (data) {
      setSelectedPaymentMethod(data);
      setSelectedPaymentMethodIndex(index);
    }
    setAction(action);
  };

  const onCloseConfirmationModal = () => {
    setConfirmationModalProps(confirmationModalInitState);
    setAction('');
  };

  const onConfirmConfirmationModal = () => {
    dispatch(deletePaymentMethodById(selectedPaymentMethod._id, selectedPaymentMethodIndex))
      .catch(err => {
        if (err.status === 422) {
          setError(err.error);
        }
      });
    onCloseConfirmationModal();
  };

  const renderRows = (data, index) => (
    <tr key={data._id}>
      <td className="text-center">{data.name}</td>
      <td className="text-center">{data.receiverName}</td>
      <td className="text-center">{data.receiverPhoneNumber}</td>
      <td className="text-center">{data.receiverAddress}</td>
      <td className="text-center">
        <Button variant="warning" className="mr-2" onClick={() => onOpenFormModal('edit', data, index)}><FaPen/></Button>
        {/*<Button variant="danger" onClick={() => onOpenConfirmationModal('delete', data, index)}><FaTrash/></Button>*/}
      </td>
    </tr>
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h3>Payment Methods</h3>
        </Col>
        <Col className="text-right">
          <Button variant="dark" onClick={() => onOpenFormModal('add')}><FaPlus/></Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Receiver Name</th>
                  <th className="text-center">Receiver Phone Number</th>
                  <th className="text-center">Receiver Address</th>
                  <th className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                  paymentMethods.map(renderRows)
                }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FormModal {...formModalProps} handleClose={onCloseFormModal}/>
      <ConfirmationModal {...confirmationModalProps} handleConfirm={onConfirmConfirmationModal} handleClose={onCloseConfirmationModal}/>
    </Container>
  )
}

export default PaymentMethod;