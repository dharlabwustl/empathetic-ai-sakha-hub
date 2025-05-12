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
      // If there's an error parsing, consider the user not authenticated
      localStorage.removeItem('userData');
      localStorage.removeItem('isLoggedIn');
    }
  }
  
  // Check if the user is authenticated from context or storage
  const userIsAuthenticated = isAuthenticated || isAuthenticatedFromStorage || isLoggedInFromStorage;
  
  // If still loading auth state, show loading indicator
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  // If authenticated, render the children
  if (userIsAuthenticated) {
    return <>{children}</>;
  }
  
  // Otherwise, redirect to login page with return path
  const currentPath = window.location.pathname;
  const returnTo = encodeURIComponent(currentPath);
  return <Navigate to={`${redirectTo}?returnTo=${returnTo}`} replace />;
};

export default ProtectedRoute;
