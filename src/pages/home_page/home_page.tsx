import { useAuth0 } from '@auth0/auth0-react';
import React, { FC } from 'react';

const HomePage: FC = () => {
  const { logout } = useAuth0();

  return (
    <>
      <div>placeholder</div>
      <button type="button" onClick={() => logout()}>
        log out
      </button>
    </>
  );
};
export default HomePage;
