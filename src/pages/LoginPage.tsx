
import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  // Redirect to login for now
  return <Navigate to="/login" replace />;
};

export default LoginPage;
