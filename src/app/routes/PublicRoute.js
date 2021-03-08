import React, {Suspense} from 'react';
import {Route, Redirect, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Layout from '../layout';
import Loader from '../components/loader/Loader';
import {loggedInStatus} from '../store/authSlice';

function PublicRoutes({component: Component, strict, ...rest}) {
  const location = useLocation();
  const isAuthenticated = useSelector(loggedInStatus);

  if (isAuthenticated && strict) {
    return (
      <Route {...rest} render={() =>
        <Redirect to={{
          pathname: '/',
          state: {
            from: location.pathname
          }
        }}/>
      }/>
    )
  }

  return (
    <Route {...rest} render={props => {
      return (
        <Suspense fallback={<Loader/>}>
          <Layout>
            <Component {...props} />
          </Layout>
        </Suspense>
      )
    }}/>
  );
}

export default PublicRoutes;
