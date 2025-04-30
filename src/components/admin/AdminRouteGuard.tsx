
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

const AdminRouteGuard: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // If authenticated, render the child routes
  if (!isAuthenticated) {
    return null; // or a loading indicator
  }

  return <Outlet />;
};

export default AdminRouteGuard;
