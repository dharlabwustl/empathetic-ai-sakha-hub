
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAdminAuthenticated, adminLoading } = useAdminAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Simple check to ensure we've loaded admin auth state
    if (!adminLoading) {
      setIsChecking(false);
    }
  }, [adminLoading]);

  if (isChecking || adminLoading) {
    return <LoadingScreen />;
  }

  if (!isAdminAuthenticated) {
    console.log("Admin not authenticated, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
