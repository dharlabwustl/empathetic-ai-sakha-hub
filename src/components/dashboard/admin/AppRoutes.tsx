
import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import SubscriptionManager from '@/components/admin/dashboard/SubscriptionManager';

const AdminAppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardStats stats={{
        totalUsers: 250,
        activeUsers: 180,
        totalRevenue: 15780,
        newUsersToday: 12,
        dailyActiveUsers: 120
      }} />} />
      <Route path="/subscriptions" element={<SubscriptionManager />} />
    </Routes>
  );
};

export default AdminAppRoutes;
