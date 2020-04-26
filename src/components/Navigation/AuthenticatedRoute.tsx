import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AUTH_USER_TOKEN_KEY } from '../../utils/constants';
import { validateToken } from '../../utils/helpers';

const AuthenticatedRoute = ({
  component: Component,
  ...rest
}: any & { component: any }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return validateToken(localStorage.getItem(AUTH_USER_TOKEN_KEY)) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        );
      }}
    />
  );
};

export default AuthenticatedRoute;
