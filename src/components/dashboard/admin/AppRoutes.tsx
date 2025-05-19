
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
        dailyActiveUsers: [{date: "2025-05-01", count: 100}, {date: "2025-05-02", count: 120}],
        // Add missing properties to satisfy TypeScript
        subscriptionsByPlan: {
          free: 150,
          basic: 70,
          premium: 30
        },
        verifiedMoodImprovement: 65,
        averageMoodScore: 7.8,
        averageTimeSavedPerWeek: 5.2,
        systemHealthScore: 98,
        totalContentItems: 1250,
        averageSessionLength: 28,
        weeklyActiveUsers: 210,
        monthlyActiveUsers: 230,
        retentionRate: 85,
        churnRate: 15,
        conversionRate: 12,
        featureUsageStats: {
          flashcards: 85,
          concepts: 92,
          feelGoodCorner: 78
        },
        contentEngagementRate: 76
      }} />} />
      <Route path="/subscriptions" element={<SubscriptionManager />} />
    </Routes>
  );
};

export default AdminAppRoutes;
