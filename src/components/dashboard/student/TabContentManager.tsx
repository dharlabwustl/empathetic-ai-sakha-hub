import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { useNavigate } from 'react-router-dom';

import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';
import WelcomeTourReminderBanner from './WelcomeTourReminderBanner';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import EnhancedConceptDetail from './concepts/EnhancedConceptDetail';

interface RedesignedTodaysPlanProps {
  userProfile: UserProfileBase;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ userProfile }) => {
  // Simplified component that renders the redesigned Today's Plan
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Today's Plan for {userProfile.name}</h2>
      <p>Your personalized study schedule is ready!</p>
    </div>
  );
};

interface TabContentGeneratorProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

export const generateTabContents = ({
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour,
  lastActivity,
  suggestedNextAction
}: TabContentGeneratorProps) => {
  const navigate = useNavigate();

  // Handler for navigating to concept cards section
  const handleViewConcepts = () => {
    navigate('/dashboard/student/concepts');
  };

  // Handler for navigating to flashcards section
  const handleViewFlashcards = () => {
    navigate('/dashboard/student/flashcards');
  };

  // Handler for navigating to practice exam section
  const handleViewPracticeExams = () => {
    navigate('/dashboard/student/practice-exam');
  };

  // Pre-generated tab contents that will be used in different parts of the app
  return {
    // Home/Overview tab
    "overview": (
      <>
        {showWelcomeTour && (
          <WelcomeTourReminderBanner 
            onSkipTour={handleSkipTour} 
            onStartTour={handleCompleteTour} 
          />
        )}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p>Welcome back, {userProfile.name}!</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpis.filter(kpi => 
              !['Weekly Study Time', 'Practice Questions', 'Target Exams Covered', 'Users Log Weekly Moods'].includes(kpi.title)
            ).map(kpi => (
              <div key={kpi.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="font-medium">{kpi.title}</h3>
                <p className="text-2xl">{kpi.value} {kpi.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
    
    // Today's Plan tab
    "today": <RedesignedTodaysPlan userProfile={userProfile} />,
    
    // Academic Advisor tab
    "academic": <AcademicAdvisorView />,
    
    // Concept Cards tab
    "concepts": <ConceptsLandingPage />,
    
    // Concept Details (dynamically loaded via routes)
    "concept-detail": <EnhancedConceptDetail />,
    
    // Flashcards tab
    "flashcards": <FlashcardsLandingPage />,
    
    // Practice Exams tab
    "practice-exam": <PracticeExamLandingPage />,
    
    // Notifications tab
    "notifications": <NotificationsPage />
  };
};
