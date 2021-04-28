import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Col, Container, Row, Table} from 'react-bootstrap';
import {fetchAllUsers} from '../../../services/userService';
import {userList} from '../../../store/userSlice';

function User() {
  const users = useSelector(userList);
  const dispatch = useDispatch();
  const [loadOrders, setLoadOrders] = useState(true);

  useEffect(() => {
    if (loadOrders) {
      dispatch(fetchAllUsers())
        .then(() => setLoadOrders(false));
    }
  }, [loadOrders]);

  const renderRows = data => (
    <tr key={data._id}>
      <td className="text-center">{data.code}</td>
      <td className="text-center">{data.name}</td>
      <td className="text-center">{data.level}</td>
      <td className="text-center">{data.leader && data.leader.name}</td>
      <td className="text-center">{data.status}</td>
    </tr>
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h3>Users</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                <tr>
                  <th className="text-center">Code</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Level</th>
                  <th className="text-center">Leader</th>
                  <th className="text-center">Status</th>
                </tr>
                </thead>
                <tbody>
                {
                  users.map(renderRows)
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

export default User;