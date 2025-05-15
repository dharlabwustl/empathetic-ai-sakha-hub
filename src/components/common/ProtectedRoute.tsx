
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { user, loading, isAuthenticated } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    // Capture current path to return after login
    const currentPath = window.location.pathname;
    const returnTo = encodeURIComponent(currentPath);
    return <Navigate to={`${redirectTo}?returnTo=${returnTo}`} replace />;
  }

  // If authenticated, render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
