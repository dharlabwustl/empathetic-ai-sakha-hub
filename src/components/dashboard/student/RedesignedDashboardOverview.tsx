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
      {/* Enhanced Name Header Card */}
      <EnhancedNameHeaderCard userProfile={userProfile} />

      {/* Exam Goal Section - Keep existing details */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                Exam: NEET 2026
              </h3>
              <div className="flex items-center space-x-4 text-sm text-purple-600 dark:text-purple-400">
                <span>Days Left: 185</span>
                <span>•</span>
                <span>Pace: Moderate</span>
                <span>•</span>
                <span>Style: Visual</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleViewStudyPlan}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            New Plan
          </button>
        </div>
      </div>

      {/* Enhanced Exam Readiness Score Card */}
      <EnhancedExamReadinessScore 
        overallScore={72}
        targetExam="NEET 2026"
        daysUntilExam={185}
      />

      {/* Moved Priority Cards Section */}
      <div className="grid gap-6">
        {/* Today's Top Priority Section */}
        {showTopPriority && (
          <TodaysTopPrioritySection onClose={() => setShowTopPriority(false)} />
        )}
        
        {/* Today's Study Plan Section */}
        {showStudyPlan && (
          <TodaysPlanSection 
            currentMood={currentMood}
            onClose={() => setShowStudyPlan(false)}
          />
        )}
        
        {/* Enhanced Smart Suggestions */}
        <SmartSuggestionsCenter 
          performance={performanceData}
          userName={userProfile.name || userProfile.firstName || "Student"}
        />
      </div>

      {/* Comprehensive Adaptive Dashboard with exam readiness and other cards */}
      <ComprehensiveAdaptiveDashboard 
        userProfile={userProfile}
        kpis={kpis}
        currentMood={currentMood}
        onMoodChange={onMoodChange}
      />

      {/* Onboarding highlights for first-time users */}
      <OnboardingHighlights
        isFirstTimeUser={isFirstTimeUser && !onboardingComplete}
        onComplete={() => setOnboardingComplete(true)}
      />
    </div>
  );
};

export default RedesignedDashboardOverview;
