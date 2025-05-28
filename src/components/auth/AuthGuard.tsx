
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('userData');
    
    // If user is logged in and trying to access signup/login pages, redirect to dashboard
    if (isLoggedIn && userData) {
      const currentPath = location.pathname;
      const restrictedPaths = ['/signup', '/login', '/auth/signup', '/auth/login'];
      
      if (restrictedPaths.includes(currentPath)) {
        navigate('/dashboard/student', { replace: true });
        return;
      }
    }
  }, [navigate, location.pathname]);

  return <>{children}</>;
};

export default AuthGuard;
