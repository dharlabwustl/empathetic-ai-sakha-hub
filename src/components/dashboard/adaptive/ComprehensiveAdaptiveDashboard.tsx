
import React from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  // This component is now handled by the main dashboard layout
  // The right sidebar cards are integrated directly into RedesignedDashboardOverview
  return null;
};

export default ComprehensiveAdaptiveDashboard;
