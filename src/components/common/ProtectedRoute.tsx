
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // If auth is still loading, show a loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role check is required
  if (requiredRole && user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    
    // If user doesn't have the required role
    if (!roles.includes(user.role)) {
      // Redirect based on user's actual role
      switch (user.role) {
        case 'student':
          return <Navigate to="/dashboard/student" replace />;
        case 'employee':
          return <Navigate to="/dashboard/employee" replace />;
        case 'doctor':
          return <Navigate to="/dashboard/doctor" replace />;
        case 'founder':
          return <Navigate to="/dashboard/founder" replace />;
        case 'admin':
          return <Navigate to="/admin/dashboard" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
