import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Col, Container, Row, Table} from 'react-bootstrap';
import {FaEye, FaPen, FaPlus, FaTrash} from 'react-icons/fa';
import {productList} from '../../../store/productSlice';
import {fetchAllProducts} from '../../../services/productService';
import ConfirmationModal from '../../../components/confirmation-modal/ConfimationModal';
import {deleteProductById} from '../../../services/productService';

const confirmationModalInitState = {
  open: false,
  message: '',
  subMessage: '',
};

function Product() {
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector(productList);
  const [loadOrders, setLoadOrders] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedProductIndex, setSelectedProductIndex] = useState();
  const [confirmationModalProps, setConfirmationModalProps] = useState(confirmationModalInitState);

  useEffect(() => {
    if (loadOrders) {
      dispatch(fetchAllProducts())
        .then(() => setLoadOrders(false));
    }
  }, [loadOrders]);

  const onOpenConfirmationModal = (data, index) => {
    if (data) {
      setSelectedProduct(data);
      setSelectedProductIndex(index);
      setConfirmationModalProps({
        ...confirmationModalProps,
        open: true,
        message: 'Are you sure?',
        subMessage: 'Do you really want to delete this product? This process cannot be undone.'
      });
    }
  };

  const onCloseConfirmationModal = () => {
    setConfirmationModalProps(confirmationModalInitState);
  };

  const onConfirmConfirmationModal = () => {
    dispatch(deleteProductById(selectedProduct._id, selectedProductIndex));
    onCloseConfirmationModal();
  };

  const renderRows = (data, index) => (
    <tr key={data._id}>
      <td className="text-center">{data.name}</td>
      <td className="text-center">₱{data.price}</td>
      <td className="text-center">₱{data.memberPrice}</td>
      <td className="text-center">
        <Button variant="light" className="mr-2"
                to={{pathname: `/manage/product/view/${data._id}`, state: {from: location.pathname}}} as={Link}>
          <FaEye/>
        </Button>
        <Button variant="warning" className="mr-2"
                to={{pathname: `/manage/product/edit/${data._id}`, state: {from: location.pathname}}} as={Link}>
          <FaPen/>
        </Button>
        <Button variant="danger" onClick={() => onOpenConfirmationModal(data, index)}><FaTrash/></Button>
      </td>
    </tr>
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-right">
          <Button variant="dark"
                  to={{pathname: `/manage/product/add`, state: {from: location.pathname}}} as={Link}>
            <FaPlus/>
          </Button>
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
                  <th className="text-center">Price</th>
                  <th className="text-center">Member Price</th>
                  <th className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                  products.map(renderRows)
                }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ConfirmationModal {...confirmationModalProps} handleConfirm={onConfirmConfirmationModal} handleClose={onCloseConfirmationModal}/>
    </Container>
  )
}

export default Product;