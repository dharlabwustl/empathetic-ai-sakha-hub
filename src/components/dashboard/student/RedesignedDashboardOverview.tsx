
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  TrendingUp, 
  Clock, 
  Target,
  Calendar,
  Award,
  Zap
} from 'lucide-react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import QuickActionsSection from './dashboard-sections/QuickActionsSection';
import StudyStreakSection from './dashboard-sections/StudyStreakSection';
import SmartDailySuggestions from './dashboard-sections/SmartDailySuggestions';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  progress: number;
  type: 'exam' | 'assignment' | 'goal';
}

interface UpcomingMilestonesSectionProps {
  milestones: Milestone[];
}

const UpcomingMilestonesSection: React.FC<UpcomingMilestonesSectionProps> = ({ milestones }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{milestone.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {milestone.dueDate.toLocaleDateString()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
              <Progress value={milestone.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  // Mock data for overview
  const overviewStats = [
    { title: 'Study Streak', value: '7 days', icon: <Zap className="h-5 w-5" />, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Concepts Learned', value: '24', icon: <BookOpen className="h-5 w-5" />, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Practice Score', value: '78%', icon: <Target className="h-5 w-5" />, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Time Studied', value: '15h', icon: <Clock className="h-5 w-5" />, color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  const recentActivities = [
    { title: 'Completed: Laws of Motion', subject: 'Physics', time: '2 hours ago', type: 'concept' },
    { title: 'Practice Test: Chemistry Basics', subject: 'Chemistry', time: '1 day ago', type: 'exam' },
    { title: 'Flashcard Review: Biology Terms', subject: 'Biology', time: '2 days ago', type: 'flashcard' }
  ];

  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Physics Mock Test',
      description: 'Complete comprehensive physics practice exam',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      progress: 65,
      type: 'exam'
    },
    {
      id: '2',
      title: 'Chemistry Assignment',
      description: 'Submit organic chemistry problem set',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      progress: 30,
      type: 'assignment'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {userProfile.name || userProfile.firstName}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to continue your learning journey? Let's make today count!
        </p>
      </div>

      {/* Smart Daily Suggestions - Moved below header as requested */}
      <SmartDailySuggestions />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${stat.bg}`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Study Streak Section */}
      <StudyStreakSection />

      {/* Quick Actions */}
      <QuickActionsSection />

      {/* Recent Activities & Upcoming Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {activity.type === 'concept' && <BookOpen className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'exam' && <FileText className="h-4 w-4 text-green-600" />}
                    {activity.type === 'flashcard' && <Brain className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.subject} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Milestones */}
        <UpcomingMilestonesSection milestones={milestones} />
      </div>

      {/* Performance Summary */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            This Week's Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">85%</div>
              <div className="text-sm text-gray-600">Average Score</div>
              <div className="text-xs text-green-600 mt-1">↑ 5% from last week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
              <div className="text-sm text-gray-600">Concepts Completed</div>
              <div className="text-xs text-green-600 mt-1">↑ 3 from last week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">8h</div>
              <div className="text-sm text-gray-600">Study Time</div>
              <div className="text-xs text-green-600 mt-1">↑ 2h from last week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedesignedDashboardOverview;
