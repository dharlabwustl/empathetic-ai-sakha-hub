
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Debug logs
  useEffect(() => {
    console.log("ProtectedRoute - Auth Status:", { isAuthenticated, isLoading, user });
    console.log("ProtectedRoute - Current location:", location.pathname, location.search);
  }, [isAuthenticated, isLoading, user, location]);

  // Check if the user is coming from the signup flow
  const isFromSignup = location.search.includes('completedOnboarding=') || location.search.includes('new=true');
  
  // If this is redirected from signup, we'll let them through even if not fully authenticated
  if (isFromSignup) {
    console.log("ProtectedRoute - User coming from signup, bypassing auth check temporarily");
    return <>{children}</>;
  }

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
    console.log("ProtectedRoute - Not authenticated, redirecting to login");
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // If role check is required
  if (requiredRole && user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    
    // If user doesn't have the required role
    if (!roles.includes(user.role)) {
      console.log("ProtectedRoute - User doesn't have required role:", { userRole: user.role, requiredRoles: roles });
      
      // Redirect based on user's actual role
      switch (user.role.toLowerCase()) {
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
