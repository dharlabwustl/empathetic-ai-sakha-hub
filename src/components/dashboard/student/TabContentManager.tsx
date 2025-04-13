
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
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { MicroConceptView, FlashcardsView, PracticeExamsView } from '@/pages/dashboard/student/TabContentViews';
import FlashcardsFeature from '@/components/dashboard/student/FlashcardsFeature';
import PracticeExamFeature from '@/components/dashboard/student/PracticeExamFeature';
import FeelGoodCorner from '@/components/dashboard/student/FeelGoodCorner';

interface TabContentManagerProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: {
    icon: ReactNode;
    title: string;
    description: string;
    path: string;
    isPremium: boolean;
  }[];
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
  // Check if user is a first time user based on profile data
  // Assume users with less than 3 logins are "new" users
  const isFirstTimeUser = userProfile?.loginCount < 3 || !userProfile?.completedOnboarding;

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
    today: (
      <div className="space-y-8">
        <TodayStudyPlan />
        <MicroConceptView />
        <FlashcardsFeature />
        <PracticeExamFeature />
        <FeelGoodCorner />
      </div>
    ),
    flashcards: <FlashcardsFeature />,
    'practice-exam': <PracticeExamFeature />,
    'influence-meter': <div className="mt-4"><h2 className="text-lg font-medium text-gray-800 mb-4">Surrounding Influences Dashboard</h2></div>,
    'feel-good': <FeelGoodCorner />,
    tutor: <TutorCard />,
    planner: <StudyPlannerCard />,
    academic: <AcademicAdvisorCard />,
    motivation: <MotivationCard />,
    progress: <ProgressCard />,
    projects: <ProjectsCard />,
    "live-tutors": <LiveTutorSection />,
    forum: <CollaborativeForumSection />,
    videos: <VideoLibrarySection />,
    notifications: <SmartNotificationSection />
  };
};
