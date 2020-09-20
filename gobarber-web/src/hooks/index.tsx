import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

/*
 * children are the internal elements
 *
 * If the providers don't depend on each other,
 * the order doesn't matter
 */
const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
