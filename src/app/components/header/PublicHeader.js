import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import _ from 'lodash';
import logo from '../../../assets/images/logo_w.png';

function PublicHeader() {
  const location = useLocation();

  const hideLoginNav = [
    '/login',
    '/verify-email'
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="lg"
            className="fixed-top">
      <Navbar.Brand to={'/'} as={Link}>
        <img
          src={logo}
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link active={location.pathname === '/'}
                    to={{pathname: '/', state: {from: location.pathname}}}
                    as={Link}>Home</Nav.Link>
        </Nav>
        <Nav>
          {
            _.isEmpty(_.filter(hideLoginNav, path => _.includes(location.pathname, path))) &&
            <Nav.Link to={{pathname: '/login', state: {from: location.pathname}}} as={Link}>Login</Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default PublicHeader;