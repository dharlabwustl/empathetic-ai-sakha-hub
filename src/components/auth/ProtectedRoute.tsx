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
  
  // If still loading auth state, show loading indicator
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  // If authenticated, render the children
  if (isAuthenticated) {
    return <>{children}</>;
  }
  
  // Otherwise, redirect to login page with return path
  const currentPath = window.location.pathname;
  const returnTo = encodeURIComponent(currentPath);
  return <Navigate to={`${redirectTo}?returnTo=${returnTo}`} replace />;
};

export default ProtectedRoute;
