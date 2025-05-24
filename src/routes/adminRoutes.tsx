
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from '@/pages/admin/AdminLogin';
import ComprehensiveAdminDashboard from '@/pages/admin/ComprehensiveAdminDashboard';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route 
        path="/dashboard" 
        element={
          <AdminRouteGuard>
            <ComprehensiveAdminDashboard />
          </AdminRouteGuard>
        } 
      />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
