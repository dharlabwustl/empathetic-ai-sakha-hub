
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface AdminRouteGuardProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children, requiredPermission }) => {
  const { adminUser, isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // If there's a required permission check
  if (requiredPermission && adminUser) {
    const hasAllPermissions = adminUser.permissions?.includes('all');
    const hasSpecificPermission = adminUser.permissions?.includes(requiredPermission);
    
    if (!hasAllPermissions && !hasSpecificPermission) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
