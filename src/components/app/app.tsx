import { ChakraProvider } from '@chakra-ui/react';
import React, { FC } from 'react';
import AuthProvider from 'src/components/auth/auth_provider';
import Router from 'src/components/router/router';

const App: FC = () => (
  <AuthProvider>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </AuthProvider>
);

export default App;
