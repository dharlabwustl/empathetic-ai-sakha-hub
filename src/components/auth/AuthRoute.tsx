import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AuthRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthRoute: React.FC<AuthRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  // For now, we'll use a mock auth state since we don't have a real auth system
  // In a real app, this would come from an auth context or hook
  const auth = useAuth();
  
  // This is a mocked user for development purposes
  const isAuthenticated = true;
  const userRole = "student"; // default role for development
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If roles are specified and user's role is not in the allowed roles, redirect to home
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  // Otherwise, render the protected component
  return <>{children}</>;
};

export default AuthRoute;
