
import React from 'react';
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';

interface OverviewTabProps {
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

const OverviewTab: React.FC<OverviewTabProps> = ({
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
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Welcome back, {userProfile.name}! Here's an overview of your progress.
      </p>
      
      {/* Implement overview content here */}
    </div>
  );
};

export default OverviewTab;
