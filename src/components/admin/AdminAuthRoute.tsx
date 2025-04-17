import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AdminAuthRouteProps {
  children: React.ReactNode;
}

const AdminAuthRoute: React.FC<AdminAuthRouteProps> = ({ children }) => {
  // For now, we'll use a mock auth state since we don't have a real auth system
  // In a real app, this would come from an auth context or hook
  const auth = useAuth();
  
  // This is a mocked user for development purposes
  const isAuthenticated = true;
  const userRole = "admin"; // default role for admin development
  
  // If not authenticated, redirect to admin login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // If user is not an admin, redirect to home
  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }
  
  // Otherwise, render the protected admin component
  return <>{children}</>;
};

export default AdminAuthRoute;
