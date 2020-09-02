import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, data,...rest }) {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...props} data={data} />;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
}
