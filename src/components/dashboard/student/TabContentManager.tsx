import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import RedesignedDashboardOverview from "./RedesignedDashboardOverview";
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';

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
}: {
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
}) => {
  return {
    "overview": (
      <RedesignedDashboardOverview 
        userProfile={userProfile}
        kpis={kpis}
      />
    ),
    "today": (
      <TodaysPlanView />
    ),
    "academic": (
      <div>Academic Advisor Content</div>
    ),
    "concepts": (
      <div>Concept Cards Content</div>
    ),
    "flashcards": (
      <div>Flashcards Content</div>
    ),
    "practice-exam": (
      <div>Practice Exams Content</div>
    ),
    "notifications": (
      <div>Notifications Content</div>
    )
  };
};
