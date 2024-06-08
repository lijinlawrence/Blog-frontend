import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { tokenAuthorizationContext } from './tokenAuth';

const ProtectedRoute = ({ element }) => {
  const { isAuthorized } = useContext(tokenAuthorizationContext);

  return isAuthorized ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;