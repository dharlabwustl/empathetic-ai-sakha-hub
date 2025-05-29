
import React, { useState, useEffect } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import EnhancedDashboardHeader from './EnhancedDashboardHeader';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import RevisionLoopSection from './dashboard-sections/RevisionLoopSection';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);

  // Load mood from localStorage on component mount
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

  const handleViewStudyPlan = () => {
    console.log('View study plan clicked');
  };

  return (
    <div className="space-y-6 p-6">
      <EnhancedDashboardHeader
        userProfile={userProfile}
        onViewStudyPlan={handleViewStudyPlan}
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
      />
      
      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <TodaysPlanSection />
          <StudyStatsSection />
          <SubjectBreakdownSection />
          <ProgressTrackerSection />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <ExamGoalCard 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
          <MoodBasedSuggestions 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
          <RevisionLoopSection />
          <SmartSuggestionsCenter />
          <UpcomingMilestonesSection />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
