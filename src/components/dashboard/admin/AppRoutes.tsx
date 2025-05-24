
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import SubscriptionManager from '@/components/admin/dashboard/SubscriptionManager';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import LoadingState from "@/components/admin/dashboard/LoadingState";

const AdminAppRoutes: React.FC = () => {
  const { isAdminAuthenticated, isLoading } = useAdminAuth();

  console.log("🚀 AdminAppRoutes: Rendering with auth state:", { isAdminAuthenticated, isLoading });

  if (isLoading) {
    console.log("🔄 AdminAppRoutes: Showing loading state");
    return <LoadingState />;
  }

  if (!isAdminAuthenticated) {
    console.log("❌ AdminAppRoutes: Not authenticated, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  console.log("✅ AdminAppRoutes: Authenticated, showing dashboard");

  // Simple mock data for the dashboard stats
  const mockDashboardStats = {
    totalUsers: 250,
    activeUsers: 180,
    totalRevenue: 15780,
    newUsersToday: 12,
    dailyActiveUsers: [{date: "2025-05-01", count: 100}, {date: "2025-05-02", count: 120}],
    subscriptionsByPlan: {
      free: 150,
      basic: 70,
      premium: 30
    },
    verifiedMoodImprovement: 65,
    averageMoodScore: 7.8,
    averageTimeSavedPerWeek: 5.2,
    studyPlanEfficiencyImprovement: 45,
    studentsWithVerifiedConsistentHabits: 87,
    studentsWithConsistentHabits: 120,
    totalStudents: 250,
    verifiedRetentionRate: 72,
    verifiedExamConfidenceImprovement: 70,
    averageConfidenceScore: 8.2,
    activeStudents: 175,
    verifiedMoodFeatureUsage: 60,
    moodBasedSessionsCount: 3200,
    totalSessions: 5400,
    completedSurveys: 210
  };

  return (
    <Routes>
      <Route path="/" element={<DashboardStats stats={mockDashboardStats} />} />
      <Route path="/subscriptions" element={<SubscriptionManager />} />
    </Routes>
  );
};

export default AdminAppRoutes;
