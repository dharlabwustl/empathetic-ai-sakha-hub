
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const AdminDashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin dashboard. Use the navigation to manage your application.</p>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
