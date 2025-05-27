
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";
import EnhancedDashboardHeader from './EnhancedDashboardHeader';
import SmartDailySuggestions from './SmartDailySuggestions';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import QuickActionsSection from './dashboard-sections/QuickActionsSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import StudyStreakSection from './dashboard-sections/StudyStreakSection';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  return (
    <div className="space-y-6">
      {/* Smart Daily Suggestions - Below header as requested */}
      <SmartDailySuggestions userName={userProfile.name} />
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.filter(kpi => 
          !['Weekly Study Time', 'Practice Questions', 'Target Exams Covered', 'Users Log Weekly Moods'].includes(kpi.title)
        ).map(kpi => (
          <div key={kpi.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-medium">{kpi.title}</h3>
            <p className="text-2xl">{kpi.value} {kpi.unit}</p>
          </div>
        ))}
      </div>

      {/* Main Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TodaysPlanSection currentMood={userProfile.mood} />
          <QuickActionsSection />
        </div>
        
        <div className="space-y-6">
          <StudyStreakSection />
          <UpcomingMilestonesSection />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
