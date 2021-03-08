import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, loggedInUser} from '../../store/authSlice';
import {Link, useLocation} from 'react-router-dom';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import logo from '../../../assets/images/logo_w.png';

function PrivateHeader() {
  const dispatch = useDispatch();
  const location = useLocation();
  const profile = useSelector(loggedInUser);

  const handleLogout = () => {
    dispatch(authLogout());
  };

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
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link active={location.pathname === '/'}
                    to={{pathname: '/', state: {from: location.pathname}}}
                    as={Link}>Home</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={profile.user && profile.user.name} id="basic-nav-dropdown">
            <NavDropdown.Item to={{pathname: '/profile', state: {from: location.pathname}}}
                              as={Link}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default PrivateHeader;