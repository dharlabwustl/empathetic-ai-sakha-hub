
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/dashboard/student' 
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('userData');
    
    if (isLoggedIn && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        
        // If user is logged in and has valid data, redirect to dashboard
        if (parsedUserData.id) {
          navigate(redirectTo, { replace: true });
          return;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
      }
    }
  }, [navigate, redirectTo]);

  return <>{children}</>;
};

export default AuthGuard;
