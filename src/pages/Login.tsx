
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from '@/pages/login/LoginPage';

const Login = () => {
  // Check if user is already logged in
  const userToken = localStorage.getItem('userData');
  
  if (userToken) {
    return <Navigate to="/welcome-back?returnTo=dashboard/student" replace />;
  }
  
  return <LoginPage />;
};

export default Login;
