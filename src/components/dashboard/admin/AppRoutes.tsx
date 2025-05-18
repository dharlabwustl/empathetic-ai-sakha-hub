
import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import SubscriptionManager from '@/components/admin/dashboard/SubscriptionManager';

// Define the type for dashboard stats
interface DashboardStatsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalRevenue: number;
    newUsersToday: number;
    dailyActiveUsers: number;
    weeklyTrends?: { date: string; count: number; }[];
  }
}

const AdminAppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardStats stats={{
        totalUsers: 250,
        activeUsers: 180,
        totalRevenue: 15780,
        newUsersToday: 12,
        dailyActiveUsers: 120,
        weeklyTrends: [
          { date: '2023-07-01', count: 210 },
          { date: '2023-07-08', count: 220 },
          { date: '2023-07-15', count: 235 },
          { date: '2023-07-22', count: 250 }
        ]
      }} />} />
      <Route path="/subscriptions" element={<SubscriptionManager />} />
    </Routes>
  );
};

export default AdminAppRoutes;
