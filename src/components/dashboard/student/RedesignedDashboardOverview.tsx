
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";
import ExamReadinessCard from "./cards/ExamReadinessCard";
import PerformanceAnalytics from "./cards/PerformanceAnalytics";
import TodaysPlanSection from "./dashboard-sections/TodaysPlanSection";
import QuickActionsGrid from "./cards/QuickActionsGrid";
import DailySmartSuggestions from "./DailySmartSuggestions";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  return (
    <div className="space-y-6">
      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExamReadinessCard />
        <PerformanceAnalytics kpis={kpis} />
      </div>

      {/* Daily Smart Suggestions - Below Exam Readiness */}
      <DailySmartSuggestions examReadinessScore={75} />

      {/* Middle Row - Today's Plan */}
      <TodaysPlanSection 
        studyPlan={userProfile.studyPlan} 
        currentMood={userProfile.mood}
      />

      {/* Bottom Row - Quick Actions */}
      <QuickActionsGrid />
    </div>
  );
};

export default RedesignedDashboardOverview;
