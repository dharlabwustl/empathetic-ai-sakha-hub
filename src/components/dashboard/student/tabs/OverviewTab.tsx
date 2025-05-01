
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";

interface OverviewTabProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  showWelcomeTour?: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  lastActivity,
  suggestedNextAction,
  showWelcomeTour
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {userProfile.name}!</h2>
      <p className="text-muted-foreground">
        Here's an overview of your learning progress.
      </p>
      
      {/* For now, this is a placeholder - the real content is handled by RedesignedDashboardOverview */}
      <div className="bg-card rounded-lg shadow p-4">
        <p>Your learning statistics and activities will appear here.</p>
      </div>
    </div>
  );
};

export default OverviewTab;
