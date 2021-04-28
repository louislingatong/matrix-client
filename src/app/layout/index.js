import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import _ from 'lodash';
import ScrollTop from '../components/common/scroll-top/ScrollTop';
import PrivateLayout from './PrivateLayout';
import PublicLayout from './PublicLayout';
import {loggedInStatus} from '../store/authSlice';
import {me} from '../services/profileService';

function Layout({children}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loggedInStatus);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(me());
    }
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      <ScrollTop/>
      {
        isAuthenticated && !_.includes(location.pathname, '/verify-email')
          ? <PrivateLayout>{children}</PrivateLayout>
          : <PublicLayout>{children}</PublicLayout>
      }
    </React.Fragment>
  );
}

export default Layout;
