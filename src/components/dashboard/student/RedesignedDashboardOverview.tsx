import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import { MoodType } from "@/types/user/base";
import { Card } from "@/components/ui/card";
import StudyStatsSection from "./dashboard-sections/StudyStatsSection";
import SubjectBreakdownSection from "./dashboard-sections/SubjectBreakdownSection";
import SmartSuggestionsCenter from "./dashboard-sections/SmartSuggestionsCenter";
import ExamReadinessSection from "./dashboard-sections/ExamReadinessSection";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const RedesignedDashboardOverview = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange,
}: RedesignedDashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      
      {/* Top row: Study Stats + Subject Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudyStatsSection />
        <SubjectBreakdownSection />
      </div>
      
      {/* Second row: Exam Readiness + Smart Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExamReadinessSection />
        <SmartSuggestionsCenter />
      </div>
      
      {/* You can add more sections here as needed */}
    </div>
  );
};

export default RedesignedDashboardOverview;
