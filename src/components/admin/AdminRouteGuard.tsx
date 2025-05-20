
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import LoadingState from '@/components/admin/dashboard/LoadingState';
import { useToast } from '@/hooks/use-toast';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAdminAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Log authentication status for debugging
    console.log("AdminRouteGuard: Auth status -", { 
      isAdminAuthenticated, 
      isLoading, 
      path: location.pathname 
    });
  }, [isAdminAuthenticated, isLoading, location]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAdminAuthenticated) {
    // Show toast only when actively being redirected (not on initial load)
    if (location.pathname !== '/admin/login') {
      toast({
        title: "Authentication required",
        description: "Please login to access the admin area",
        variant: "default"
      });
    }
    
    // Redirect to login page with the current location to redirect back after login
    return (
      <Navigate 
        to="/admin/login" 
        state={{ from: location }}
        replace 
      />
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default AdminRouteGuard;
