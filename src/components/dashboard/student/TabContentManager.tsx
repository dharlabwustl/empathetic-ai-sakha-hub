
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardOverview from "@/components/dashboard/student/DashboardOverview";
import TodayPlanView from "@/components/dashboard/student/todays-plan/TodaysPlanView";
import ConceptsView from "@/components/dashboard/student/concepts/ConceptCardsView";
import FlashcardsView from "@/components/dashboard/student/flashcards/FlashcardsView";
import PracticeExamsView from "@/components/dashboard/student/practice-exam/PracticeExamsView";
import NotificationsView from "@/components/dashboard/student/notifications/NotificationsView";
import WelcomeTourReminderBanner from "@/components/dashboard/student/WelcomeTourReminderBanner";
import AcademicAdvisor from "@/components/dashboard/student/AcademicAdvisor";

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
}: TabContentManagerProps): Record<string, React.ReactNode> => {
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

  return {
    "overview": (
      <>
        {showWelcomeTour && (
          <WelcomeTourReminderBanner
            onSkipTour={handleSkipTour}
            onStartTour={handleCompleteTour}
          />
        )}
        <DashboardOverview
          userProfile={userProfile}
          kpis={kpis}
          features={features}
          onViewConcepts={handleViewConcepts}
          onViewFlashcards={handleViewFlashcards}
          onViewPracticeExams={handleViewPracticeExams}
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction || ""}
        />
      </>
    ),
    "today": <TodayPlanView userProfile={userProfile} />,
    "academic": <AcademicAdvisor userProfile={{ examPreparation: userProfile.examPreparation }} />,
    "concepts": <ConceptsView />,
    "flashcards": <FlashcardsView />,
    "practice-exam": <PracticeExamsView />,
    "notifications": <NotificationsView nudges={nudges} markNudgeAsRead={markNudgeAsRead} />
  };
};
