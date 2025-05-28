
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = false, 
  redirectTo = '/dashboard/student' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    const isAuthenticated = isLoggedIn || isAdminLoggedIn;
    
    // If user is authenticated and tries to access signup/login pages
    if (isAuthenticated && !requireAuth) {
      const protectedRoutes = ['/signup', '/login', '/welcome-flow'];
      const currentPath = location.pathname;
      
      if (protectedRoutes.includes(currentPath)) {
        navigate(redirectTo, { replace: true });
        return;
      }
    }
    
    // If user is not authenticated and tries to access protected pages
    if (!isAuthenticated && requireAuth) {
      navigate('/signup', { replace: true });
      return;
    }
  }, [navigate, location.pathname, requireAuth, redirectTo]);

  return <>{children}</>;
};

export default AuthGuard;
