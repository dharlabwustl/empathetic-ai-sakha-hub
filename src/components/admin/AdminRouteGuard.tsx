
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useToast } from '@/hooks/use-toast';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAdminAuthenticated, isAdminLoading } = useAdminAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminLoading && !isAdminAuthenticated) {
      toast({
        title: "Access Restricted",
        description: "Please login with an administrator account to access this area.",
        variant: "destructive"
      });
    }
  }, [isAdminAuthenticated, isAdminLoading, toast]);

  if (isAdminLoading) {
    return <LoadingScreen />;
  }

  if (!isAdminAuthenticated) {
    // Redirect to admin login page, preserving the intended destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // User is authenticated as admin, render the protected route
  return <>{children}</>;
};

export default AdminRouteGuard;
