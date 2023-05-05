import React, { FC, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from 'src/providers/use_auth_store';
import LoadingView from 'src/views/loading_view/loading_view';

const AuthGuard: FC = () => {
  const { accessToken, setAccessToken, setRole } = useAuthStore();
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const idTokenClaims = await getIdTokenClaims();
        const token = await getAccessTokenSilently();
        setAccessToken(token);
        if (idTokenClaims) {
          const roles = idTokenClaims['.roles'] as string[];
          setRole(roles);
        }
      })();
    }
  }, [isAuthenticated]);

  if (isAuthenticated && accessToken) return <Outlet />;
  if (!isAuthenticated && !isLoading) {
    (async () => loginWithRedirect())();
  }
  return <LoadingView />;
};

export default AuthGuard;
