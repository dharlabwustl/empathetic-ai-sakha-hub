
import React, { useState } from 'react';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import ProgressOverview from './dashboard-sections/ProgressOverview';
import NEETStrategyCard from './NEETStrategyCard';
import TopPriorityCard from './dashboard-sections/TopPriorityCard';
import ConceptCards from './dashboard-sections/ConceptCards';
import FlashcardReview from './dashboard-sections/FlashcardReview';
import PracticeExams from './dashboard-sections/PracticeExams';
import ExamReadinessCard from './dashboard-sections/ExamReadinessCard';
import StudyStreakCard from './dashboard-sections/StudyStreakCard';
import FormulaOfTheDay from './dashboard-sections/FormulaOfTheDay';
import OnboardingHighlightTour from './OnboardingHighlightTour';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType>(MoodType.MOTIVATED);
  const [showTour, setShowTour] = useState(false);
  
  // Check if user is first time
  const isFirstTimeUser = !localStorage.getItem('hasSeenOnboardingTour') && 
                          (userProfile.loginCount === 1 || userProfile.loginCount === undefined);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  const handleTourComplete = () => {
    setShowTour(false);
  };

  return (
    <div className="space-y-6">
      {/* Row 1: Exam Goal and Today's Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="academic-advisor-section">
          <ExamGoalCard 
            currentMood={currentMood} 
            onMoodChange={handleMoodChange} 
          />
        </div>
        <div className="todays-plan-section">
          <TodaysPlanSection />
        </div>
      </div>

      {/* Row 2: Strategy Card and Mood-Based Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="neet-strategy-card">
          <NEETStrategyCard />
        </div>
        <MoodBasedSuggestions 
          currentMood={currentMood}
          onMoodChange={handleMoodChange}
        />
      </div>

      {/* Row 3: Top Priority and Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPriorityCard />
        <ProgressOverview />
      </div>

      {/* Row 4: Concept Cards and Flashcard Review */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConceptCards />
        <FlashcardReview />
      </div>

      {/* Row 5: Practice Exams and Formula Practice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PracticeExams />
        <FormulaOfTheDay />
      </div>

      {/* Row 6: Exam Readiness and Study Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExamReadinessCard />
        <StudyStreakCard />
      </div>

      {/* Onboarding Highlight Tour */}
      <OnboardingHighlightTour
        isFirstTimeUser={isFirstTimeUser}
        onComplete={handleTourComplete}
      />
    </div>
  );
};

export default RedesignedDashboardOverview;
