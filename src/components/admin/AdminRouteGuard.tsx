
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import LoadingScreen from '@/components/common/LoadingScreen';

interface AdminRouteGuardProps {
  children?: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAdminAuthenticated, isAdminLoading } = useAdminAuth();
  
  if (isAdminLoading) {
    return <LoadingScreen />;
  }
  
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default AdminRouteGuard;
