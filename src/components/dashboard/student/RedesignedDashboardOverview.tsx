
import React from 'react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import WelcomeSection from './dashboard-sections/WelcomeSection';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import TodayScheduleCard from './dashboard-sections/TodayScheduleCard';
import PerformanceInsightsCard from './dashboard-sections/PerformanceInsightsCard';
import NextActionsCard from './dashboard-sections/NextActionsCard';
import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import { MoodType } from '@/types/user/base';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const [currentMood, setCurrentMood] = React.useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  // Mock data for StudyStatsSection
  const mockSubjects = [
    { id: '1', name: 'Physics', progress: 72, color: '#3B82F6' },
    { id: '2', name: 'Chemistry', progress: 85, color: '#10B981' },
    { id: '3', name: 'Biology', progress: 68, color: '#8B5CF6' }
  ];

  const mockConceptCards = [
    { id: '1', title: 'Thermodynamics', subject: 'Physics', difficulty: 'medium' as const, completed: false },
    { id: '2', title: 'Organic Chemistry', subject: 'Chemistry', difficulty: 'hard' as const, completed: true },
    { id: '3', title: 'Cell Biology', subject: 'Biology', difficulty: 'easy' as const, completed: false }
  ];

  return (
    <div className={`space-y-6 p-6 min-h-screen dashboard-bg ${currentMood ? `mood-${currentMood}` : ''}`}>
      {/* Welcome Section */}
      <WelcomeSection userProfile={userProfile} />
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Goal and Mood Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExamGoalCard 
              currentMood={currentMood}
              onMoodChange={handleMoodChange}
            />
            <MoodBasedSuggestions 
              currentMood={currentMood}
              onMoodSelect={handleMoodChange}
            />
          </div>
          
          {/* Performance and Actions Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerformanceInsightsCard />
            <NextActionsCard />
          </div>
          
          {/* Study Stats Section */}
          <StudyStatsSection 
            subjects={mockSubjects}
            conceptCards={mockConceptCards}
          />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <TodayScheduleCard />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
