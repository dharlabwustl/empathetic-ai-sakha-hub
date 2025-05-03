
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/dashboard/student';

  // In a real application, you would handle login logic here
  // For now, just redirect to the welcome-back page with the returnTo parameter
  return <Navigate to={`/welcome-back?returnTo=${returnTo}`} replace />;
};

export default Login;
