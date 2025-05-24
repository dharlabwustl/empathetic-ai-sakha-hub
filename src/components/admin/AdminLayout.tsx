
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main content area - header is now handled by AdminDashboard */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
