
import React, { useState, useEffect } from 'react';
import { UserProfileType, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import UpcomingTasks from './UpcomingTasks';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage, getMoodThemeClass } from './mood-tracking/moodUtils';
import MoodBasedPlanAdjuster from './mood-tracking/MoodBasedPlanAdjuster';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());
  const [showMoodPlanner, setShowMoodPlanner] = useState(false);

  // Mock tasks data
  const upcomingTasks = [
    {
      id: '1',
      title: 'Physics Practice Test',
      subject: 'Physics',
      type: 'exam' as const,
      timeEstimate: 45,
      dueDate: 'Tomorrow',
      priority: 'high' as const
    },
    {
      id: '2', 
      title: 'Chemistry Flashcards',
      subject: 'Chemistry',
      type: 'flashcard' as const,
      timeEstimate: 20,
      dueDate: 'Today',
      priority: 'medium' as const
    },
    {
      id: '3',
      title: 'Biology Chapter Review',
      subject: 'Biology', 
      type: 'concept' as const,
      timeEstimate: 35,
      dueDate: 'In 2 days',
      priority: 'low' as const
    }
  ];

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
    setShowMoodPlanner(true);
    
    // Hide mood planner after a few seconds
    setTimeout(() => setShowMoodPlanner(false), 8000);
  };

  const handlePlanUpdated = () => {
    // Could trigger a refresh of study components here
    console.log('Study plan updated based on mood');
  };

  // Apply mood theme to dashboard
  useEffect(() => {
    const themeClass = getMoodThemeClass(currentMood);
    const dashboardElement = document.querySelector('.dashboard-overview');
    if (dashboardElement) {
      // Remove existing mood classes
      dashboardElement.classList.forEach(className => {
        if (className.startsWith('mood-')) {
          dashboardElement.classList.remove(className);
        }
      });
      // Add new mood class
      if (themeClass) {
        dashboardElement.classList.add(themeClass);
      }
    }
  }, [currentMood]);

  return (
    <div className={`dashboard-overview space-y-6 transition-all duration-500 ${getMoodThemeClass(currentMood)}`}>
      {/* Mood-based plan adjuster - show when mood changes */}
      {showMoodPlanner && currentMood && (
        <div className="animate-fade-in">
          <MoodBasedPlanAdjuster 
            currentMood={currentMood}
            onPlanUpdated={handlePlanUpdated}
          />
        </div>
      )}

      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main content */}
        <div className="lg:col-span-2 space-y-6">
          <ExamGoalCard 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
          <TodaysPlanSection />
          <StudyStatsSection kpis={kpis} />
        </div>

        {/* Right column - Sidebar content */}
        <div className="space-y-6">
          <UpcomingTasks tasks={upcomingTasks} />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
