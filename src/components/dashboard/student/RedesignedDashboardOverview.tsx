import React, { useState, useEffect } from 'react';
import { UserProfileType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { MoodType } from '@/types/user/base';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';

// Dashboard Sections
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import NEETStrategyCard from './NEETStrategyCard';
import StudyStreakCard from './StudyStreakCard';
import PerformanceInsightsCard from './PerformanceInsightsCard';
import QuickActionsCard from './QuickActionsCard';
import UpcomingEventsCard from './UpcomingEventsCard';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);

  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Top Priority Section - Full Width */}
      <div className="w-full">
        <TodaysTopPrioritySection />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Plan */}
          <TodaysPlanSection currentMood={currentMood} />
          
          {/* Performance Insights */}
          <PerformanceInsightsCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Exam Goal Card with Mood Logging */}
          <ExamGoalCard 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
          
          {/* Mood-Based Suggestions */}
          <MoodBasedSuggestions 
            currentMood={currentMood}
            onMoodSelect={handleMoodChange}
          />
          
          {/* NEET Strategy Card */}
          <NEETStrategyCard />
          
          {/* Study Streak */}
          <StudyStreakCard />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActionsCard />
        <UpcomingEventsCard />
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
