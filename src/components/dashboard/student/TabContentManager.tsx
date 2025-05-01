
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import OverviewTab from "@/components/dashboard/student/tabs/OverviewTab";
import NudgesList from "@/components/dashboard/student/NudgesList";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";

interface TabContentManagerProps {
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
}: TabContentManagerProps) => {
  
  const tabContents: Record<string, React.ReactNode> = {
    "overview": (
      <>
        <OverviewTab 
          userProfile={userProfile}
          kpis={kpis}
          nudges={nudges}
          markNudgeAsRead={markNudgeAsRead}
          features={features}
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction}
          showWelcomeTour={showWelcomeTour}
        />
        
        <WelcomeTour
          onSkipTour={handleSkipTour}
          onCompleteTour={handleCompleteTour}
          isFirstTimeUser={userProfile.loginCount === 1}
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction}
          loginCount={userProfile.loginCount}
          open={showWelcomeTour}
          onOpenChange={() => {}}
        />
      </>
    ),
    "notifications": (
      <div className="p-4">
        <NudgesList nudges={nudges} markNudgeAsRead={markNudgeAsRead} />
      </div>
    ),
  };

  return tabContents;
};
