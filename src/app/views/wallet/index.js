import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Col, Container, Image, Row, Table} from 'react-bootstrap';
import {FaUserCircle} from 'react-icons/fa';
import moment from 'moment';
import {loggedInUser} from '../../store/authSlice';
import {fetchWallet} from '../../services/walletService';
import {walletData} from '../../store/walletSlice';

function Wallet() {
  const dispatch = useDispatch();
  const profile = useSelector(loggedInUser);
  const wallet = useSelector(walletData);
  const [loadWallet, setLoadWallet] = useState(true);

  useEffect(() => {
    if (loadWallet) {
      dispatch(fetchWallet())
        .then(() => setLoadWallet(false));
    }
  }, [loadWallet]);

  const renderAvatar = () => {
    if (profile.avatar && profile.avatar.path) {
      return <Image height={180} width={180}
                    src={process.env.REACT_APP_API_URL + profile.avatar.path} roundedCircle />
    }

    return <FaUserCircle size={180}/>
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'CASH_IN':
        return 'cash in';
      case 'CASH_OUT':
        return 'cash out';
    }
  };

  const renderRows = (data, i) => (
    <tr key={i}>
      <td className="text-center">{renderStatus(data.type)}</td>
      <td className="text-center">{data.amount}</td>
      <td className="text-center">{data.message}</td>
      <td className="text-center">{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
    </tr>
  )

  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={4}>
          <Card>
            <Card.Body className="text-center">
              {
                renderAvatar()
              }
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>
                Wallet Balance
              </Card.Title>
              <Card.Text className="h2">
                ₱{wallet.balance}
              </Card.Text>
              <Button variant="dark" className="btn-block">Cash Out</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Wallet Transactions</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                <tr>
                  <th className="text-center">Status</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Message</th>
                  <th className="text-center">Date</th>
                </tr>
                </thead>
                <tbody>
                  {
                    wallet.transactions && wallet.transactions.map(renderRows)
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Wallet;