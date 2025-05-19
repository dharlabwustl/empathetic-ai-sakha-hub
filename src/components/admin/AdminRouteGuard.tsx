
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import LoadingState from "@/components/admin/dashboard/LoadingState";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAdminAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  // Debug output
  useEffect(() => {
    console.log("AdminRouteGuard - Auth state:", { 
      isAuthenticated: isAdminAuthenticated, 
      isLoading 
    });
  }, [isAdminAuthenticated, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingState />;
  }

  // If not authenticated, redirect to login with return URL
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default AdminRouteGuard;
