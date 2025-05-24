
import React from 'react';
import { UserProfileType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Book, Brain, Calendar, Clock, TrendingUp, Target } from 'lucide-react';
import MotivationCard from './MotivationCard';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  // Mock data for overview
  const studyStats = [
    { title: 'Study Streak', value: '12 days', icon: <TrendingUp className="h-5 w-5 text-orange-500" /> },
    { title: 'Concepts Mastered', value: '48', icon: <Brain className="h-5 w-5 text-blue-500" /> },
    { title: 'Hours This Week', value: '18.5h', icon: <Clock className="h-5 w-5 text-green-500" /> },
    { title: 'Practice Tests', value: '8/15', icon: <Target className="h-5 w-5 text-purple-500" /> }
  ];

  const todaysGoals = [
    { task: 'Complete Physics: Newton\'s Laws', progress: 75, color: 'bg-blue-500' },
    { task: 'Review Chemistry Flashcards', progress: 40, color: 'bg-green-500' },
    { task: 'Practice Math Problems', progress: 0, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {userProfile.name || 'Student'}!
        </h1>
        <p className="text-blue-100">
          Ready to continue your learning journey? Let's make today productive!
        </p>
      </div>

      {/* Study Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {studyStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Today's Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{goal.task}</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Motivation Card */}
        <MotivationCard currentMood={userProfile.mood} />
      </div>

      {/* KPIs Section */}
      {kpis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="text-center">
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="text-sm text-muted-foreground">{kpi.title}</div>
                  {kpi.unit && (
                    <div className="text-xs text-muted-foreground">{kpi.unit}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RedesignedDashboardOverview;
