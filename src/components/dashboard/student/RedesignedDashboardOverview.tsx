
import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ComprehensiveAdaptiveDashboard from '../adaptive/ComprehensiveAdaptiveDashboard';
import EnhancedDashboardHeader from './EnhancedDashboardHeader';
import OnboardingHighlights from './OnboardingHighlights';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  isFirstTimeUser?: boolean;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange,
  isFirstTimeUser = false
}) => {
  const [showTopPriority, setShowTopPriority] = useState(true);
  const [showStudyPlan, setShowStudyPlan] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const handleViewStudyPlan = () => {
    // Navigate to study plan or open modal
    console.log('View study plan clicked');
  };

  // Mock performance data for smart suggestions
  const performanceData = {
    accuracy: 75,
    quizScores: 82,
    conceptProgress: 65,
    streak: userProfile.studyStreak || 12
  };

  return (
    <div className="space-y-6">
      {/* Enhanced header with real-time clock, date, and study streak */}
      <EnhancedDashboardHeader
        userProfile={userProfile}
        onViewStudyPlan={handleViewStudyPlan}
        currentMood={currentMood}
        onMoodChange={onMoodChange}
      />

      {/* Comprehensive Adaptive Dashboard with exam readiness */}
      <ComprehensiveAdaptiveDashboard 
        userProfile={userProfile}
        kpis={kpis}
        currentMood={currentMood}
        onMoodChange={onMoodChange}
      />

      {/* Three cards section moved below exam readiness */}
      <div className="grid gap-6">
        {/* Today's Top Priority Section with animations */}
        {showTopPriority && (
          <TodaysTopPrioritySection onClose={() => setShowTopPriority(false)} />
        )}
        
        {/* Today's Study Plan Section with animations */}
        {showStudyPlan && (
          <TodaysPlanSection 
            currentMood={currentMood}
            onClose={() => setShowStudyPlan(false)}
          />
        )}
        
        {/* Enhanced Smart Suggestions with time-based greetings */}
        <SmartSuggestionsCenter 
          performance={performanceData}
          userName={userProfile.name || userProfile.firstName || "Student"}
        />
      </div>

      {/* Onboarding highlights for first-time users */}
      <OnboardingHighlights
        isFirstTimeUser={isFirstTimeUser && !onboardingComplete}
        onComplete={() => setOnboardingComplete(true)}
      />
    </div>
  );
};

export default RedesignedDashboardOverview;
