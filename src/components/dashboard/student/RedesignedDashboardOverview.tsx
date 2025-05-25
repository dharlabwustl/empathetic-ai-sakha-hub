
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";
import ExamReadinessCard from './cards/ExamReadinessCard';
import PerformanceAnalytics from './cards/PerformanceAnalytics';
import QuickActionsGrid from './cards/QuickActionsGrid';
import DailySmartSuggestions from './DailySmartSuggestions';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const handleAnalyzeReadiness = () => {
    // Dispatch event to open exam analyzer
    window.dispatchEvent(new Event('open-exam-analyzer'));
  };

  const handleSuggestionClick = (suggestion: any) => {
    console.log('Suggestion clicked:', suggestion);
    // Handle suggestion action based on category
  };

  return (
    <div className="space-y-6">
      {/* Top section with exam readiness and performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExamReadinessCard
          examGoal={userProfile.goals?.[0]?.title || "NEET"}
          readinessScore={75}
          daysLeft={45}
          onAnalyze={handleAnalyzeReadiness}
        />
        <PerformanceAnalytics />
      </div>

      {/* Daily Smart Suggestions Section - Below Exam Readiness */}
      <DailySmartSuggestions onSuggestionClick={handleSuggestionClick} />

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <QuickActionsGrid />
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
