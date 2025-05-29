import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ComprehensiveAdaptiveDashboard from '../adaptive/ComprehensiveAdaptiveDashboard';
import EnhancedNameHeaderCard from './EnhancedNameHeaderCard';
import OnboardingHighlights from './OnboardingHighlights';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import EnhancedExamReadinessScore from './dashboard-sections/EnhancedExamReadinessScore';

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
      {/* Enhanced Name Header Card - NEW at top */}
      <EnhancedNameHeaderCard userProfile={userProfile} />

      {/* Exam Goals Section - keeping same as before but without enhanced header */}
      <ComprehensiveAdaptiveDashboard 
        userProfile={userProfile}
        kpis={kpis}
        currentMood={currentMood}
        onMoodChange={onMoodChange}
        hideHeader={true}
      />

      {/* Enhanced Exam Readiness Score - at same position but enhanced */}
      <EnhancedExamReadinessScore />

      {/* Three Priority Cards Section - moved above from bottom */}
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
