
import React from 'react';
import { UserProfileType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";

interface OverviewTabProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour,
  lastActivity,
  suggestedNextAction
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {userProfile.name}!</h2>
      <p>This is your personalized dashboard overview.</p>
      {suggestedNextAction && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium">Suggested Next Action:</h3>
          <p>{suggestedNextAction}</p>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
