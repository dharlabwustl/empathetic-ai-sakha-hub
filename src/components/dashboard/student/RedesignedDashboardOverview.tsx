
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfileType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";
import { Progress } from "@/components/ui/progress";
import TodaysPlanSection from "./dashboard-sections/TodaysPlanSection";
import ExamReadinessSection from "./dashboard-sections/ExamReadinessSection";
import DailySmartSuggestionsSection from "./dashboard-sections/DailySmartSuggestionsSection";
import { getCurrentMoodFromLocalStorage } from './mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const currentMood = getCurrentMoodFromLocalStorage();

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {userProfile.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to continue your exam preparation journey? Let's make today productive!
        </p>
        {currentMood && (
          <Badge variant="outline" className="mt-2 capitalize">
            Current mood: {currentMood.toLowerCase()}
          </Badge>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <Card key={kpi.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{kpi.icon}</span>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  kpi.changeType === 'positive' ? 'bg-green-100 text-green-800' :
                  kpi.changeType === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {kpi.changeType === 'positive' ? '+' : ''}{kpi.change}
                </div>
              </div>
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-400">{kpi.title}</h3>
              <p className="text-2xl font-bold">{kpi.value}{kpi.unit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Plan Section */}
        <TodaysPlanSection 
          studyPlan={null}
          currentMood={currentMood}
        />

        {/* Exam Readiness Section */}
        <ExamReadinessSection />
      </div>

      {/* Daily Smart Suggestions - Below Exam Readiness */}
      <DailySmartSuggestionsSection userProfile={userProfile} kpis={kpis} />
    </div>
  );
};

export default RedesignedDashboardOverview;
