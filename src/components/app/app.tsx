import React, { FC } from 'react';
import AuthGuard from 'src/components/auth/auth_guard';
import AuthProvider from 'src/components/auth/auth_provider';
import HomePage from 'src/pages/home_page/home_page';

const App: FC = () => (
  <AuthProvider>
    <AuthGuard>
      <HomePage />
    </AuthGuard>
  </AuthProvider>
);
export default App;
