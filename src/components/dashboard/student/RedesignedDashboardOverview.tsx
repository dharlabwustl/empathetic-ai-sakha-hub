
import React from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ComprehensiveAdaptiveDashboard from '../adaptive/ComprehensiveAdaptiveDashboard';
import MergedDashboardHeader from './MergedDashboardHeader';
import EnhancedSmartSuggestions from './EnhancedSmartSuggestions';
import OnboardingHighlights from './OnboardingHighlights';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import SurroundingInfluencesSection from './SurroundingInfluencesSection';

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

  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = React.useState(true);

  return (
    <div className="space-y-6">
      {/* Merged Dashboard Header */}
      <MergedDashboardHeader 
        userProfile={userProfile}
        currentMood={currentMood}
        onMoodChange={onMoodChange}
        onViewStudyPlan={() => {}}
        streak={userProfile.studyStreak || 12}
      />
      
      {/* Enhanced Smart Suggestions */}
      <EnhancedSmartSuggestions userName={userProfile.name || userProfile.firstName} />
      
      {/* Today's Top Priority Section */}
      <TodaysTopPrioritySection />
      
      {/* Today's Plan Section */}
      <TodaysPlanSection currentMood={currentMood} />
      
      {/* Main Dashboard */}
      <ComprehensiveAdaptiveDashboard 
        userProfile={userProfile}
        kpis={kpis}
        currentMood={currentMood}
        onMoodChange={onMoodChange}
      />
      
      {/* Surrounding Influences Meter - Moved to bottom */}
      <SurroundingInfluencesSection 
        influenceMeterCollapsed={influenceMeterCollapsed}
        setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
      />
      
      {/* Onboarding Highlights */}
      <OnboardingHighlights isFirstTimeUser={isFirstTimeUser} />
    </div>
  );
};

export default RedesignedDashboardOverview;
