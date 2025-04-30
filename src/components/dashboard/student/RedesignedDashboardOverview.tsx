
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import { MoodType } from "@/types/user/base";
import { Card } from "@/components/ui/card";
import StudyStatsSection from "./dashboard-sections/StudyStatsSection";
import SubjectBreakdownSection from "./dashboard-sections/SubjectBreakdownSection";
import SmartSuggestionsCenter from "./dashboard-sections/SmartSuggestionsCenter";
import ExamReadinessSection from "./dashboard-sections/ExamReadinessSection";
import TodaysPlanSection from "./dashboard-sections/TodaysPlanSection";

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
  // Mock study plan data for the TodaysPlanSection
  const studyPlan = {
    completedTasks: 3,
    totalTasks: 8,
    todaysFocus: {
      concepts: ["Newton's Laws", "Atomic Structure", "Integration"],
      flashcards: 15,
      practiceTests: 1,
      estimatedTime: 120,
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      
      {/* Today's Plan Section */}
      <div className="mb-8">
        <TodaysPlanSection studyPlan={studyPlan} currentMood={currentMood} />
      </div>
      
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
