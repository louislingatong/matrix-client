import React from 'react';
import {Router as ReactRouter, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import routes from './routes';

const history = createBrowserHistory();

function Routes() {
  return (
    <ReactRouter history={history}>
        <Switch>
          {
            routes.map((route, i) => {
              if (route.notFound) {
                return <Redirect key={i} to={{pathname: '/login'}}/>
              }
              if (route.auth) {
                return <PrivateRoute key={i} {...route} />
              }
              return <PublicRoute key={i} {...route} />
            })
          }
        </Switch>
    </ReactRouter>
  );
}

export default Routes;
