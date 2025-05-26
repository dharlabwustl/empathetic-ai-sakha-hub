
import React from 'react';
import DashboardStatsCards from './DashboardStatsCards';
import Enhanced3DDashboardPreview from './Enhanced3DDashboardPreview';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import SurroundingInfluencesSection from './SurroundingInfluencesSection';
import { User } from '@/types/user/base';

interface RedesignedDashboardOverviewProps {
  userProfile: User;
  kpis: {
    totalStudyTime: number;
    conceptsMastered: number;
    practiceTestsCompleted: number;
    currentStreak: number;
  };
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  return (
    <div className="space-y-8 p-6">
      {/* Stats Cards */}
      <DashboardStatsCards 
        totalStudyTime={kpis.totalStudyTime}
        conceptsMastered={kpis.conceptsMastered}
        practiceTestsCompleted={kpis.practiceTestsCompleted}
        currentStreak={kpis.currentStreak}
      />

      {/* Enhanced 3D Dashboard Preview */}
      <Enhanced3DDashboardPreview />

      {/* Upcoming Milestones Section */}
      <UpcomingMilestonesSection />

      {/* Surrounding Influences Section */}
      <SurroundingInfluencesSection />
    </div>
  );
};

export default RedesignedDashboardOverview;
