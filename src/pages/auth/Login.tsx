
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        // Make sure we mark as completed onboarding to avoid redirect loops
        localStorage.setItem('userData', JSON.stringify({
          ...parsedData,
          completedOnboarding: true
        }));
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  }, []);

  // Redirect to post-login screen
  return <Navigate to="/post-login" replace />;
};

export default Login;
