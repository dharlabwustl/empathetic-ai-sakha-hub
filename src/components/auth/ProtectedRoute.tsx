import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login'
}) => {
  const { isAuthenticated, loading } = useAuth();
  
  // First check local storage directly as a fallback
  const isLoggedInFromStorage = localStorage.getItem('isLoggedIn') === 'true';
  const userData = localStorage.getItem('userData');
  let isAuthenticatedFromStorage = false;
  
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      isAuthenticatedFromStorage = parsedData.isAuthenticated === true;
    } catch (e) {
      console.error('Error parsing user data in ProtectedRoute:', e);
    }
  }
  
  // Check if the user is authenticated from context or storage
  const userIsAuthenticated = isAuthenticated || isAuthenticatedFromStorage || isLoggedInFromStorage;
  
  // If still loading auth state, show nothing
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  // If authenticated, render the children
  if (userIsAuthenticated) {
    return children;
  }
  
  // Otherwise, redirect to login page
  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
