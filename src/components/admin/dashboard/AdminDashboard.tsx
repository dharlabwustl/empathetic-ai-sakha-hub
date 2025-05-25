
import React from 'react';
import AdminLayout from '../AdminLayout';
import AdminRoutes from './AdminRoutes';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <AdminRoutes />
    </AdminLayout>
  );
};

export default AdminDashboard;
