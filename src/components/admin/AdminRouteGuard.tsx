
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import LoadingScreen from '@/components/common/LoadingScreen';

interface AdminRouteGuardProps {
  children?: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return (
    <>
      {children || <Outlet />}
    </>
  );
};

export default AdminRouteGuard;
