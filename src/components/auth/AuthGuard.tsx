
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/dashboard/student' 
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    const userData = localStorage.getItem('userData');
    
    if (isAuthenticated || isLoggedIn || adminLoggedIn || userData) {
      // User is already logged in, redirect to dashboard
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  // If user is authenticated, don't render the page
  if (isAuthenticated || 
      localStorage.getItem('isLoggedIn') === 'true' || 
      localStorage.getItem('admin_logged_in') === 'true' || 
      localStorage.getItem('userData')) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
