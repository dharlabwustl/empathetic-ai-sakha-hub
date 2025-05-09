
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

interface AdminRouteGuardProps {
  children: ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAdminAuthenticated } = useAdminAuth();

  // For development purposes, just return the children
  // In production, you would check isAdminAuthenticated
  return <>{children}</>;
};

export default AdminRouteGuard;
