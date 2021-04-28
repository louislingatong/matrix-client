import React from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import _ from 'lodash';
import {authLogout, loggedInUser} from '../../../store/authSlice';
import {resetBag} from '../../../store/bagSlice';
import {resetCheckout} from '../../../store/checkoutSlice';
import {resetOrder} from '../../../store/orderSlice';
import {resetProduct} from '../../../store/productSlice';
import {resetUser} from '../../../store/memberSlice';
import BagBadge from './components/BagBadge';
import logo from '../../../../assets/images/rt_logo.png';

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
    <Navbar bg="light" variant="light" expand="lg"
            className="fixed-top">
      <Navbar.Brand to={'/'} as={Link}>
        <img
          src={logo}
          width={160}
          height={100}
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse className="text-center" id="navbar-nav">
        <Nav className="mr-auto">
          {
            _.isString(profile.user.role) && profile.user.role === 'ADMIN' &&
            <React.Fragment>
              <Nav.Link active={location.pathname === '/manage/users'}
                        to={{pathname: '/manage/users', state: {from: location.pathname}}}
                        as={Link}>Users</Nav.Link>
              <Nav.Link active={location.pathname === '/manage/products'}
                        to={{pathname: '/manage/products', state: {from: location.pathname}}}
                        as={Link}>Products</Nav.Link>
              <Nav.Link active={location.pathname === '/manage/payment-methods'}
                        to={{pathname: '/manage/payment-methods', state: {from: location.pathname}}}
                        as={Link}>Payment Methods</Nav.Link>
              <Nav.Link active={location.pathname === '/manage/orders'}
                        to={{pathname: '/manage/orders', state: {from: location.pathname}}}
                        as={Link}>Orders</Nav.Link>
            </React.Fragment>
          }
          {
            _.isString(profile.user.role) && profile.user.role !== 'ADMIN' &&
            <Nav.Link active={location.pathname === '/members'}
                      to={{pathname: '/members', state: {from: location.pathname}}}
                      as={Link}>Members</Nav.Link>
          }
        </Nav>
        {
          _.isString(profile.user.role) && profile.user.role !== 'ADMIN' && <BagBadge/>
        }
        <Nav>
          <NavDropdown title={profile.user.name} id="basic-nav-dropdown">
            {
              _.isString(profile.user.role) && profile.user.role !== 'ADMIN' &&
              <React.Fragment>
                <NavDropdown.Item to={{pathname: '/wallet', state: {from: location.pathname}}}
                                  as={Link}>
                  Wallet
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </React.Fragment>
            }
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