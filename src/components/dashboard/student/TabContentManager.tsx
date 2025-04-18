
import React from "react";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { UserProfileType } from "@/types/user";

// Import tab components
import OverviewTab from "./tabs/OverviewTab";
import TodayPlanTab from "./tabs/TodayPlanTab";
import AcademicAdvisorTab from "./tabs/AcademicAdvisorTab";
import ConceptCardsTab from "./tabs/ConceptCardsTab";
import FlashcardsTab from "./tabs/FlashcardsTab";
import PracticeExamsTab from "./tabs/PracticeExamsTab";
import NotificationsTab from "./tabs/NotificationsTab";

interface TabContentProps {
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

export function generateTabContents({
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
}: TabContentProps): Record<string, React.ReactNode> {
  return {
    overview: (
      <OverviewTab 
        userProfile={userProfile}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        features={features}
        showWelcomeTour={showWelcomeTour}
        handleSkipTour={handleSkipTour}
        handleCompleteTour={handleCompleteTour}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
      />
    ),
    today: <TodayPlanTab userProfile={userProfile} />,
    academic: <AcademicAdvisorTab userProfile={userProfile} />,
    concepts: <ConceptCardsTab userProfile={userProfile} />,
    flashcards: <FlashcardsTab userProfile={userProfile} />,
    "practice-exam": <PracticeExamsTab userProfile={userProfile} />,
    notifications: <NotificationsTab userProfile={userProfile} nudges={nudges} markNudgeAsRead={markNudgeAsRead} />
  };
}
