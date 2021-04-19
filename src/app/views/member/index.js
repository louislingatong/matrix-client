import React from 'react';
import {useSelector} from 'react-redux';
import {Card, Col, Container, Row, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import {FaUserCircle} from 'react-icons/fa';
import {loggedInUser} from '../../store/authSlice';
import MembersHierarchy from '../../components/members-hierarchy/MembersHierarchy';

function User() {
  const profile = useSelector(loggedInUser);

  const popover = (
    <Popover id={`popover-${profile.user.code}`} className="text-center">
      <Popover.Title as="h3" className="text-nowrap">[{profile.user.code}]&nbsp;{profile.user && profile.user.name}</Popover.Title>
      <Popover.Content>
        <p><strong>Email</strong><br/>{profile.user.email}</p>
      </Popover.Content>
    </Popover>
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <h3>Matrix</h3>
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
              <MembersHierarchy/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default User;