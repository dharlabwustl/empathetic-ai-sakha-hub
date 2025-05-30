
import React from 'react';
import { Navigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  // Redirect to signup for now
  return <Navigate to="/signup" replace />;
};

export default SignupPage;
