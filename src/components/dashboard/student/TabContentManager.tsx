
import React, { ReactNode } from 'react';
import TutorCard from '@/components/dashboard/student/TutorCard';
import StudyPlannerCard from '@/components/dashboard/student/StudyPlannerCard';
import AcademicAdvisorCard from '@/components/dashboard/student/AcademicAdvisorCard';
import MotivationCard from '@/components/dashboard/student/MotivationCard';
import ProgressCard from '@/components/dashboard/student/ProgressCard';
import ProjectsCard from '@/components/dashboard/student/ProjectsCard';
import { LiveTutorSection } from '@/components/dashboard/student/LiveTutorSection';
import { CollaborativeForumSection } from '@/components/dashboard/student/CollaborativeForumSection';
import { VideoLibrarySection } from '@/components/dashboard/student/VideoLibrarySection';
import { SmartNotificationSection } from '@/components/dashboard/student/SmartNotificationSection';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import DashboardOverview from '@/components/dashboard/student/DashboardOverview';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import AIChatTutor from '@/pages/dashboard/student/AIChatTutor';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import FlashcardsFeature from '@/components/dashboard/student/FlashcardsFeature';
import PracticeExamFeature from '@/components/dashboard/student/practice-exam/PracticeExamFeature';
import FeelGoodCorner from '@/components/dashboard/student/FeelGoodCorner';
import ConceptsSection from '@/components/dashboard/student/ConceptsSection';
import { TodayPlanView, FlashcardsView, PracticeExamsView } from '@/pages/dashboard/student/TabContentViews';

// Import Card components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TabContentManagerProps {
  userProfile: UserProfileType;
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
}: TabContentManagerProps): Record<string, ReactNode> => {
  const isFirstTimeUser = (userProfile?.loginCount ?? 0) < 3 || !(userProfile?.completedOnboarding ?? false);
  const loginCount = userProfile?.loginCount ?? 0;

  console.log('generateTabContents - Active User Profile:', {
    loginCount,
    isFirstTimeUser,
    completedOnboarding: userProfile?.completedOnboarding
  });

  return {
    overview: (
      <>
        {showWelcomeTour && (
          <WelcomeTour 
            onSkipTour={handleSkipTour} 
            onCompleteTour={handleCompleteTour}
            isFirstTimeUser={isFirstTimeUser}
            lastActivity={lastActivity}
            suggestedNextAction={suggestedNextAction}
            loginCount={loginCount}
          />
        )}
        <DashboardOverview
          userProfile={userProfile}
          kpis={kpis}
          nudges={nudges}
          markNudgeAsRead={markNudgeAsRead}
          features={features}
        />
      </>
    ),
    today: <TodayPlanView />,
    academic: <AcademicAdvisor userProfile={userProfile} />,
    concepts: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Concept Cards</h2>
        <p className="text-gray-600">
          Browse through your learning concepts and master the fundamentals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ConceptsSection />
        </div>
      </div>
    ),
    flashcards: <FlashcardsView />,
    'practice-exam': <PracticeExamsView />,
    'feel-good': <FeelGoodCorner />,
    notifications: <SmartNotificationSection />,
    tutor: <AIChatTutor userProfile={userProfile} />
  };
};
