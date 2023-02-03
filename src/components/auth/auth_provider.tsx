import React, { FC } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => (
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
  >
    {children}
  </Auth0Provider>
);

export default AuthProvider;
