
import React from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ComprehensiveAdaptiveDashboard from '../adaptive/ComprehensiveAdaptiveDashboard';
import EnhancedSmartSuggestions from './EnhancedSmartSuggestions';
import OnboardingHighlights from './OnboardingHighlights';
import MergedDashboardHeader from './MergedDashboardHeader';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  onViewStudyPlan?: () => void;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange,
  onViewStudyPlan
}) => {
  // Check if this is a first-time user
  const isFirstTimeUser = !localStorage.getItem('hasSeenOnboarding') && 
                         (!userProfile.loginCount || userProfile.loginCount <= 1);

  return (
    <div className="space-y-6">
      {/* Merged Dashboard Header */}
      <MergedDashboardHeader 
        userProfile={userProfile}
        currentMood={currentMood}
        onMoodChange={onMoodChange}
        onViewStudyPlan={onViewStudyPlan || (() => {})}
      />
      
      {/* Enhanced Smart Suggestions */}
      <EnhancedSmartSuggestions userName={userProfile.name || userProfile.firstName} />
      
      {/* Today's Top Priority Section */}
      <TodaysTopPrioritySection />
      
      {/* Main Dashboard */}
      <ComprehensiveAdaptiveDashboard 
        userProfile={userProfile}
        kpis={kpis}
        currentMood={currentMood}
        onMoodChange={onMoodChange}
      />
      
      {/* Onboarding Highlights */}
      <OnboardingHighlights isFirstTimeUser={isFirstTimeUser} />
    </div>
  );
};

export default RedesignedDashboardOverview;
