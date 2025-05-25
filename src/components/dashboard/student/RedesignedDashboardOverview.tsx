
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import StudyProgress from './StudyProgress';
import TipsToImproveSection from './dashboard-sections/TipsToImproveSection';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  // Calculate performance metrics for suggestions
  const performance = {
    accuracy: 85,
    quizScores: 88,
    conceptProgress: 75,
    streak: 6
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {userProfile.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to continue your learning journey? Here's your progress overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.filter(kpi => 
          !['Weekly Study Time', 'Practice Questions', 'Target Exams Covered', 'Users Log Weekly Moods'].includes(kpi.title)
        ).map(kpi => (
          <Card key={kpi.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {kpi.value}
                <span className="text-sm text-gray-500 ml-1">{kpi.unit}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{kpi.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subject-Wise Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StudyProgress />
        </div>
        
        {/* Tips to Improve Section with Smart Suggestions */}
        <div className="space-y-4">
          <TipsToImproveSection performance={performance} />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
