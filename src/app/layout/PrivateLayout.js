import React from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import {FaExclamationTriangle} from 'react-icons/fa';
import PrivateHeader from '../components/common/header/PrivateHeader';
import Footer from '../components/common/footer/Footer';
import {loggedInUser} from '../store/authSlice';

function PrivateLayout({children}) {
  const location = useLocation();
  const profile = useSelector(loggedInUser);
  return (
    <React.Fragment>
      <PrivateHeader/>
      {
        profile.user.status === 'PENDING' &&
        <Alert variant="warning" className="d-flex align-items-center main-notification">
          <FaExclamationTriangle size={20} className="mr-2"/>
          <span>
            An email verification link has been sent to{' '}<strong>{profile.user.email}</strong>.
            Please click the link to verify your email address.
            {' '}
            <Link className="text-decoration-none"
                  to={{pathname: '/verify-email', state: {from: location.pathname}}}>
              Resend email verification link
            </Link>
          </span>
        </Alert>
      }
      <div className="main-wrapper">
        <main>
          {children}
        </main>
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default PrivateLayout;
