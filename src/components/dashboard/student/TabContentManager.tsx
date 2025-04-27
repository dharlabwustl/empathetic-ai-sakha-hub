
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardOverview from "@/components/dashboard/student/DashboardOverview";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import TodaysPlanView from "@/components/dashboard/student/todays-plan/TodaysPlanView";
import ConceptCardsSection from "@/components/dashboard/student/concepts/ConceptCardsSection";
import FlashcardsSection from "@/components/dashboard/student/flashcards/FlashcardsSection";
import PracticeExamSection from "@/components/dashboard/student/practice-exams/PracticeExamSection";
import NudgePanel from "@/components/dashboard/NudgePanel";
import AcademicAdvisorSection from "@/components/dashboard/student/academic-advisor/AcademicAdvisorSection";

export interface GenerateTabContentsProps {
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
}: GenerateTabContentsProps) => {
  // Create a map of tab IDs to their React component content
  const tabContents: Record<string, React.ReactNode> = {
    "overview": (
      <>
        {showWelcomeTour && (
          <WelcomeTour
            onSkipTour={handleSkipTour}
            onCompleteTour={handleCompleteTour}
            isFirstTimeUser={!userProfile.loginCount || userProfile.loginCount <= 1}
            lastActivity={lastActivity}
            suggestedNextAction={suggestedNextAction}
            loginCount={userProfile.loginCount}
            open={true}
            onOpenChange={() => {}}
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
    "today": (
      <TodaysPlanView userProfile={userProfile} />
    ),
    "academic": (
      <AcademicAdvisorSection />
    ),
    "concepts": (
      <ConceptCardsSection />
    ),
    "flashcards": (
      <FlashcardsSection />
    ),
    "practice-exam": (
      <PracticeExamSection />
    ),
    "notifications": (
      <NudgePanel
        nudges={nudges}
        markAsRead={markNudgeAsRead}
        showAll={true}
      />
    )
  };
  
  // Return the tab contents map
  return tabContents;
};
