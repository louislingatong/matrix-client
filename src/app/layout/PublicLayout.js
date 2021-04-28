import React from 'react';
import {useLocation} from 'react-router-dom';
import _ from 'lodash';
import PublicHeader from '../components/common/header/PublicHeader';
import Footer from '../components/common/footer/Footer';

function PublicLayout({children}) {
  const location = useLocation();

  const hideHeader = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email'
  ];

  return (
    <React.Fragment>
      {
        _.isEmpty(_.filter(hideHeader, path => _.includes(location.pathname, path))) &&
        <PublicHeader/>
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

export default PublicLayout;
