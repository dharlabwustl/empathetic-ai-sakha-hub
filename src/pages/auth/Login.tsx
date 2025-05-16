import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/dashboard/student';

  useEffect(() => {
    // Check if user coming from signup flow
    const newUserSignup = localStorage.getItem('new_user_signup') === 'true';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (newUserSignup && isLoggedIn) {
      // Clear the signup flag
      localStorage.removeItem('new_user_signup');
      
      // Navigate directly to dashboard, bypassing login
      navigate('/dashboard/student', { replace: true });
    }
  }, [navigate]);

  // If already authenticated, redirect to returnTo
  if (isAuthenticated || localStorage.getItem('isLoggedIn') === 'true') {
    return <Navigate to={returnTo} replace />;
  }

  // Otherwise redirect to welcome-back page with returnTo parameter
  return <Navigate to={`/welcome-back?returnTo=${returnTo}`} replace />;
};

export default Login;
