import React, { FC } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => (
  <Auth0Provider
    // TODO: Move to env
    domain="dev-wf0qtreu.eu.auth0.com"
    clientId="WjLdGGlTr8X3mfPhRzwnHpaD5zqEC1UY"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
  >
    {children}
  </Auth0Provider>
);

export default AuthProvider;
