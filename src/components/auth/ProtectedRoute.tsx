
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  // For development purposes, we'll allow access without authentication
  // In a real app, you would check for authentication here
  const isAuthenticated = true;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If authenticated, render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
