import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Col, Container, Row, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import {FaUserCircle} from 'react-icons/fa';
import {allUsers} from '../../store/userSlice';
import {loggedInUser} from '../../store/authSlice';
import {fetchAllUsers} from '../../services/userService';
import OrganizationalChart from './components/OrganizationalChart';

function User() {
  const dispatch = useDispatch();
  const profile = useSelector(loggedInUser);
  const users = useSelector(allUsers);
  const [loadUsers, setLoadUsers] = useState(true);

  useEffect(() => {
    if (loadUsers) {
      dispatch(fetchAllUsers()).then(() => setLoadUsers(false));
    }
  }, [loadUsers]);

  const popover = (
    <Popover id={`popover-${profile.user.code}`} className="text-center">
      <Popover.Title as="h3" className="text-nowrap">[{profile.user.code}]&nbsp;{profile.user.name}</Popover.Title>
      <Popover.Content>
        <p><strong>Email</strong><br/>{profile.user.email}</p>
      </Popover.Content>
    </Popover>
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <h3>User Hierarchy</h3>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center">
          <Card className="bg-primary-light">
            <Card.Body>
              <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
                <Button variant="link">
                  <FaUserCircle size={150} className="text-primary"/>
                </Button>
              </OverlayTrigger>
              <OrganizationalChart data={users}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default User;