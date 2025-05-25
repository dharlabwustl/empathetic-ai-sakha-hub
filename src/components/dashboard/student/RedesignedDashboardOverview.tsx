
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { UserProfileBase } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import RecentActivitySection from './dashboard-sections/RecentActivitySection';
import QuickActionsSection from './dashboard-sections/QuickActionsSection';
import SmartSuggestionsSection from './dashboard-sections/SmartSuggestionsSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import { Calendar, Target, TrendingUp, BookOpen, Brain, Clock } from "lucide-react";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  // Default milestones for the UpcomingMilestonesSection
  const defaultMilestones = [
    {
      id: '1',
      title: 'Complete Physics Module 1',
      description: 'Finish all concept cards and practice tests for Mechanics',
      dueDate: '2024-12-30',
      progress: 75,
      type: 'study' as const,
      priority: 'high' as const
    },
    {
      id: '2',
      title: 'Chemistry Mock Test',
      description: 'Take the comprehensive Organic Chemistry assessment',
      dueDate: '2024-12-28',
      progress: 0,
      type: 'exam' as const,
      priority: 'medium' as const
    }
  ];

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getExamReadinessScore = () => {
    const readinessKpi = kpis.find(kpi => kpi.title.toLowerCase().includes('readiness'));
    return readinessKpi ? parseInt(readinessKpi.value) : 72;
  };

  const getStreakData = () => {
    const streakKpi = kpis.find(kpi => kpi.title.toLowerCase().includes('streak'));
    return streakKpi ? parseInt(streakKpi.value) : 5;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          {getTimeBasedGreeting()}, {userProfile.name}!
        </h1>
        <p className="text-muted-foreground">
          Ready to continue your exam preparation journey?
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Readiness</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{getExamReadinessScore()}%</div>
            <Progress value={getExamReadinessScore()} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Based on your performance and study progress
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getStreakData()} days</div>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: Math.min(getStreakData(), 7) }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-green-500 rounded-full" />
              ))}
              <Badge variant="secondary" className="ml-2">
                Keep going!
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Consecutive days of active learning
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">4/7</div>
            <Progress value={57} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Tasks completed today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <QuickActionsSection />
          <SmartSuggestionsSection />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <RecentActivitySection />
          <UpcomingMilestonesSection milestones={defaultMilestones} />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
