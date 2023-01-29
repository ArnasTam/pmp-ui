import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';
import Loading from 'src/views/loading/loading';

const AuthGuard: FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isAuthenticated) return <Outlet />;
  if (!isAuthenticated && !isLoading) {
    (async () => loginWithRedirect())();
  }
  return <Loading />;
};

export default AuthGuard;
