
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

  // Enhanced mock data for the dashboard stats with all requested KPIs
  const mockDashboardStats = {
    totalUsers: 25000,
    activeUsers: 18500,
    totalRevenue: 1578000,
    newUsersToday: 145,
    dailyActiveUsers: [
      {date: "2025-05-01", count: 3200}, 
      {date: "2025-05-02", count: 3400},
      {date: "2025-05-03", count: 3100},
      {date: "2025-05-04", count: 3600},
      {date: "2025-05-05", count: 3800}
    ],
    subscriptionsByPlan: {
      free: 15000,
      basic: 7000,
      premium: 3000
    },
    verifiedMoodImprovement: 72,
    averageMoodScore: 7.8,
    averageTimeSavedPerWeek: 5.2,
    studyPlanEfficiencyImprovement: 45,
    studentsWithVerifiedConsistentHabits: 8700,
    studentsWithConsistentHabits: 12000,
    totalStudents: 25000,
    verifiedRetentionRate: 82,
    verifiedExamConfidenceImprovement: 78,
    averageConfidenceScore: 8.2,
    activeStudents: 18500,
    verifiedMoodFeatureUsage: 68,
    moodBasedSessionsCount: 32000,
    totalSessions: 54000,
    completedSurveys: 21000,
    
    // Additional KPIs
    averageConcepts: 8500,
    successRate: 89,
    totalQuestions: 500000,
    totalFlashcards: 2000000,
    totalStudyPlans: 12000,
    averageStudyTimePerUser: 6.5,
    targetExams: 20,
    studentsWithMoodTracking: 85
  };

  return (
    <Routes>
      <Route path="/" element={<DashboardStats stats={mockDashboardStats} />} />
      <Route path="/subscriptions" element={<SubscriptionManager />} />
    </Routes>
  );
};

export default AdminAppRoutes;
