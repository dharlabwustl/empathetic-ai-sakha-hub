
import React, { useState } from 'react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import TodayScheduleCard from './dashboard-sections/TodayScheduleCard';
import PerformanceInsightsCard from './dashboard-sections/PerformanceInsightsCard';
import NextActionsCard from './dashboard-sections/NextActionsCard';
import WelcomeSection from './dashboard-sections/WelcomeSection';
import { MoodType, getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';
import { useIsMobile } from '@/hooks/use-mobile';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());
  const isMobile = useIsMobile();

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 max-w-full overflow-hidden">
      {/* Welcome Section - Full Width */}
      <WelcomeSection 
        userProfile={userProfile} 
        className="w-full"
      />

      {/* Main Grid Layout - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Exam Goal Card - Mobile Optimized */}
          <div className="w-full">
            <ExamGoalCard 
              currentMood={currentMood}
              onMoodChange={handleMoodChange}
            />
          </div>

          {/* Performance Insights - Mobile Friendly */}
          <div className="w-full">
            <PerformanceInsightsCard className="h-full" />
          </div>

          {/* Mobile: Stack vertically, Desktop: Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TodayScheduleCard className="w-full" />
            <NextActionsCard className="w-full" />
          </div>
        </div>

        {/* Right Sidebar - Mobile: Below main content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border text-center">
              <p className="text-2xl font-bold text-green-600">78%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border text-center">
              <p className="text-2xl font-bold text-blue-600">145</p>
              <p className="text-sm text-muted-foreground">Days to Exam</p>
            </div>
          </div>

          {/* Study Streak */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Study Streak</h3>
            <p className="text-3xl font-bold">7 days</p>
            <p className="text-sm opacity-90">Keep it up! 🔥</p>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
            <h3 className="font-semibold mb-3">Recent Activity</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">• Completed Physics Chapter 1</p>
              <p className="text-muted-foreground">• Scored 85% in Chemistry Quiz</p>
              <p className="text-muted-foreground">• Reviewed 20 Biology flashcards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Actions */}
      {isMobile && (
        <div className="fixed bottom-20 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-lg z-30">
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-blue-600 text-white p-3 rounded-lg text-sm font-medium">
              Start Study Session
            </button>
            <button className="bg-green-600 text-white p-3 rounded-lg text-sm font-medium">
              Take Practice Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedesignedDashboardOverview;
