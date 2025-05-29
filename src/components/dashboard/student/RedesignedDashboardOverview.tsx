
import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import ProgressOverview from './dashboard-sections/ProgressOverview';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import TopPriorityCard from './dashboard-sections/TopPriorityCard';
import ConceptCards from './dashboard-sections/ConceptCards';
import FlashcardReview from './dashboard-sections/FlashcardReview';
import PracticeExams from './dashboard-sections/PracticeExams';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import NEETStrategyCard from './NEETStrategyCard';
import FormulaOfTheDay from './dashboard-sections/FormulaOfTheDay';
import OnboardingHighlightTour from './OnboardingHighlightTour';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const RedesignedDashboardOverview = ({ 
  userProfile, 
  kpis, 
  currentMood, 
  onMoodChange 
}: RedesignedDashboardOverviewProps) => {
  const [showOnboardingTour, setShowOnboardingTour] = useState(() => {
    const hasSeenTour = localStorage.getItem('hasSeenDashboardHighlightTour');
    const isFirstTime = localStorage.getItem('new_user_signup') === 'true';
    return isFirstTime && !hasSeenTour;
  });

  const handleCompleteTour = () => {
    setShowOnboardingTour(false);
    localStorage.setItem('hasSeenDashboardHighlightTour', 'true');
  };

  return (
    <div className="space-y-6 relative">
      {/* Onboarding Highlight Tour */}
      {showOnboardingTour && (
        <OnboardingHighlightTour onComplete={handleCompleteTour} />
      )}

      {/* Row 1: Exam Goal and Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div data-tour-step="exam-goal">
          <ExamGoalCard 
            userProfile={userProfile}
            currentMood={currentMood}
            onMoodChange={onMoodChange}
          />
        </div>
        <ProgressOverview userProfile={userProfile} kpis={kpis} />
      </div>

      {/* Row 2: Today's Plan and Top Priority */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2" data-tour-step="todays-plan">
          <TodaysPlanSection userProfile={userProfile} />
        </div>
        <div data-tour-step="top-priority">
          <TopPriorityCard userProfile={userProfile} />
        </div>
      </div>

      {/* Row 3: NEET Strategy and Academic Advisor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div data-tour-step="strategy-card">
          <NEETStrategyCard />
        </div>
        <div data-tour-step="mood-suggestions">
          <MoodBasedSuggestions 
            currentMood={currentMood}
            onMoodChange={onMoodChange}
          />
        </div>
      </div>

      {/* Row 4: Learning Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div data-tour-step="concept-cards">
          <ConceptCards userProfile={userProfile} />
        </div>
        <div data-tour-step="flashcards">
          <FlashcardReview userProfile={userProfile} />
        </div>
        <div data-tour-step="formula-practice">
          <FormulaOfTheDay userProfile={userProfile} />
        </div>
      </div>

      {/* Row 5: Practice Exams */}
      <div className="grid grid-cols-1 gap-4">
        <div data-tour-step="practice-exam">
          <PracticeExams userProfile={userProfile} />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
