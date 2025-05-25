
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileType } from '@/types/user/base';
import { Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import StudyStreakSection from './dashboard-sections/StudyStreakSection';
import ExamReadinessSection from './dashboard-sections/ExamReadinessSection';
import SmartSuggestionsSection from './dashboard-sections/SmartSuggestionsSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';

interface KpiData {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  since?: string;
}

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
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {kpi.label.includes('Study') && <Clock className="h-4 w-4" />}
                {kpi.label.includes('Practice') && <Award className="h-4 w-4" />}
                {kpi.label.includes('Concept') && <TrendingUp className="h-4 w-4" />}
                {kpi.label.includes('Streak') && <Calendar className="h-4 w-4" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              {kpi.change && (
                <p className={`text-xs ${
                  kpi.trend === 'up' ? 'text-green-600' : 
                  kpi.trend === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {kpi.change} {kpi.since && `from ${kpi.since}`}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Readiness Section */}
          <ExamReadinessSection userProfile={userProfile} />
          
          {/* Daily Smart Suggestions - Moved here below exam readiness */}
          <SmartSuggestionsSection userProfile={userProfile} />
          
          {/* Today's Plan Section */}
          <TodaysPlanSection />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Study Streak */}
          <StudyStreakSection />
          
          {/* Upcoming Milestones */}
          <UpcomingMilestonesSection milestones={[]} />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
