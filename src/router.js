import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import GateKeeper from './containers/Auth/gateKeeper'
import asyncComponent from './helpers/AsyncFunc';




const RestrictedRoute = ({ component: Component, ...rest, isLoggedIn }) =>
  <Route
    {...rest}
    render={props =>
      isLoggedIn
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />}
  />;
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <RestrictedRoute
          path="/dashboard"
          component={GateKeeper}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  isLoggedIn: state.user.token !== null,
}))(PublicRoutes);
