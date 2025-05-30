
import React, { useState, useEffect } from "react";
import { UserProfileType, MoodType } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import WelcomeSection from "./dashboard-sections/WelcomeSection";
import ExamGoalCard from "./dashboard-sections/ExamGoalCard";
import StudyStatsSection from "./dashboard-sections/StudyStatsSection";
import TodayScheduleCard from "./dashboard-sections/TodayScheduleCard";
import PerformanceInsightsCard from "./dashboard-sections/PerformanceInsightsCard";
import NextActionsCard from "./dashboard-sections/NextActionsCard";
import MoodBasedPlanAdjuster from "./mood-tracking/MoodBasedPlanAdjuster";
import { getCurrentMoodFromLocalStorage, getMoodTheme } from "./mood-tracking/moodUtils";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());

  useEffect(() => {
    // Listen for mood changes
    const handleMoodChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.mood) {
        setCurrentMood(customEvent.detail.mood);
      }
    };

    document.addEventListener('mood-changed', handleMoodChange);
    return () => document.removeEventListener('mood-changed', handleMoodChange);
  }, []);

  // Apply mood theme to dashboard
  const moodThemeClass = getMoodTheme(currentMood);

  return (
    <div className={`space-y-6 transition-all duration-300 ${moodThemeClass}`}>
      {/* Welcome Section */}
      <WelcomeSection 
        userProfile={userProfile} 
        currentMood={currentMood}
        onMoodChange={setCurrentMood}
      />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Goal and Study Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExamGoalCard 
              currentMood={currentMood}
              onMoodChange={setCurrentMood}
            />
            <StudyStatsSection />
          </div>

          {/* Mood-Based Plan Adjuster - Only show when mood is set */}
          {currentMood && (
            <MoodBasedPlanAdjuster 
              currentMood={currentMood}
              className="mood-themed-card"
            />
          )}

          {/* Performance Insights */}
          <PerformanceInsightsCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <TodayScheduleCard />
          <NextActionsCard />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
