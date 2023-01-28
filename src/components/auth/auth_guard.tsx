import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthProps {
  children: React.ReactNode;
}

const AuthGuard: FC<AuthProps> = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isAuthenticated && children) return <>{children}</>;
  if (!isLoading) {
    (async () => loginWithRedirect())();
  }
  return <>Loading</>;
};

export default AuthGuard;
