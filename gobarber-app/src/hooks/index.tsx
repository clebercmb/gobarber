import React from 'react';

import { AuthProvider } from './auth';

/*
 * children are the internal elements
 *
 * If the providers don't depend on each other,
 * the order doesn't matter
 */
const AppProvider: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
