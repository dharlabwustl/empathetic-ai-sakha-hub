
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
      
      // Navigate directly to welcome page, bypassing login
      window.location.href = '/welcome';
      return;
    }
    
    // Handle any leftover admin login attempts
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    if (isAdminLoggedIn) {
      window.location.href = '/admin/dashboard';
      return;
    }
    
    // If already authenticated, redirect to returnTo
    if (isAuthenticated || isLoggedIn) {
      window.location.href = returnTo;
    }
  }, [navigate, isAuthenticated, returnTo]);

  // Use window.location for direct navigation to welcome-back
  window.location.href = `/welcome-back?returnTo=${encodeURIComponent(returnTo)}`;
  return null;
};

export default Login;
