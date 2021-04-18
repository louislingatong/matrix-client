import React from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {authLogout, loggedInUser} from '../../store/authSlice';
import {resetBag} from '../../store/bagSlice';
import {resetCheckout} from '../../store/checkoutSlice';
import {resetOrder} from '../../store/orderSlice';
import {resetProduct} from '../../store/productSlice';
import {resetUser} from '../../store/userSlice';
import BagBadge from '../bag-badge/BagBadge';
import logo from '../../../assets/images/logo_w.png';

function PrivateHeader() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const profile = useSelector(loggedInUser);

  const handleLogout = () => {
    dispatch(authLogout());
    dispatch(resetBag());
    dispatch(resetCheckout());
    dispatch(resetOrder());
    dispatch(resetProduct());
    dispatch(resetUser());
    history.push('/', {from: {path: location.pathname}});
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
          <Nav.Link active={location.pathname === '/users'}
                    to={{pathname: '/users', state: {from: location.pathname}}}
                    as={Link}>Users</Nav.Link>
        </Nav>
        <BagBadge/>
        <Nav>
          <NavDropdown title={profile.user && profile.user.name} id="basic-nav-dropdown">
            <NavDropdown.Item to={{pathname: '/profile/view', state: {from: location.pathname}}}
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