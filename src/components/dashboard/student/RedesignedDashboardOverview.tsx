
import React from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ComprehensiveAdaptiveDashboard from '../adaptive/ComprehensiveAdaptiveDashboard';
import TimeDisplayWidget from './TimeDisplayWidget';
import EnhancedSmartSuggestions from './EnhancedSmartSuggestions';
import OnboardingHighlights from './OnboardingHighlights';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  // Check if this is a first-time user
  const isFirstTimeUser = !localStorage.getItem('hasSeenOnboarding') && 
                         (!userProfile.loginCount || userProfile.loginCount <= 1);

  return (
    <div className="space-y-6">
      {/* Time Display Widget */}
      <TimeDisplayWidget streak={userProfile.studyStreak || 12} />
      
      {/* Enhanced Smart Suggestions */}
      <EnhancedSmartSuggestions userName={userProfile.name || userProfile.firstName} />
      
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
