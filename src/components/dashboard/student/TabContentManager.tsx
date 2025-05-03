
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import RedesignedDashboardOverview from './RedesignedDashboardOverview';
import FeelGoodCorner from './FeelGoodCorner';
import AiTutor from './AiTutor';
import { RedesignedTodaysPlan } from './todays-plan';

interface TabContentOptions {
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
}: TabContentOptions) => {
  const tabContents: Record<string, React.ReactNode> = {
    overview: (
      <RedesignedDashboardOverview 
        userProfile={userProfile}
        kpis={kpis}
      />
    ),
    today: (
      <RedesignedTodaysPlan />
    ),
    wellness: (
      <FeelGoodCorner />
    ),
    tutor: (
      <AiTutor />
    ),
  };
  
  return tabContents;
};
