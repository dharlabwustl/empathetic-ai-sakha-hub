
import React from 'react';
import { Outlet } from 'react-router-dom';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout min-h-screen bg-gray-50">
      <div className="dashboard-content">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default DashboardLayout;
