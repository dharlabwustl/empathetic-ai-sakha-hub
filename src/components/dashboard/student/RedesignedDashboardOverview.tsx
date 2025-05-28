
import React from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ComprehensiveAdaptiveDashboard from '../adaptive/ComprehensiveAdaptiveDashboard';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  return (
    <ComprehensiveAdaptiveDashboard 
      userProfile={userProfile}
      kpis={kpis}
      currentMood={currentMood}
      onMoodChange={onMoodChange}
    />
  );
};

export default RedesignedDashboardOverview;
