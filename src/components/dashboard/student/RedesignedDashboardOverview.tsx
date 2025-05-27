
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  Clock, 
  Target, 
  Trophy,
  TrendingUp,
  Calendar,
  Star,
  Zap
} from 'lucide-react';
import ChallengesWidget from './ChallengesWidget';
import SmartDailySuggestions from './SmartDailySuggestions';

interface UserProfile {
  name?: string;
  firstName?: string;
  avatar?: string;
  photoURL?: string;
  loginCount?: number;
  goals?: Array<{ title: string }>;
}

interface KPI {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ReactNode;
}

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfile;
  kpis?: KPI[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis = [] 
}) => {
  const userName = userProfile?.name || userProfile?.firstName || 'Student';

  // Mock data for demonstration
  const mockStats = {
    studyStreak: 12,
    todayProgress: 68,
    weeklyTarget: 85,
    conceptsCompleted: 145,
    hoursStudied: 24.5,
    upcomingExams: 3
  };

  const recentAchievements = [
    { id: 1, title: 'Physics Master', description: 'Completed 50 physics concepts', icon: <Trophy className="h-5 w-5 text-yellow-500" /> },
    { id: 2, title: 'Study Streak', description: '12 days of consistent study', icon: <Star className="h-5 w-5 text-purple-500" /> },
    { id: 3, title: 'Quick Learner', description: 'Completed daily target in 6 hours', icon: <Zap className="h-5 w-5 text-blue-500" /> }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Chemistry Lab Report', subject: 'Chemistry', due: 'Today', priority: 'high' },
    { id: 2, title: 'Physics Practice Test', subject: 'Physics', due: 'Tomorrow', priority: 'medium' },
    { id: 3, title: 'Biology Chapter Review', subject: 'Biology', due: 'This Week', priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 🎯</h1>
            <p className="text-blue-100 text-lg">Ready to continue your learning journey?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-xl font-bold">{mockStats.studyStreak} Day Streak</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {mockStats.hoursStudied}h this week
            </Badge>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Today's Progress</span>
            <span>{mockStats.todayProgress}% Complete</span>
          </div>
          <Progress value={mockStats.todayProgress} className="h-3 bg-white/20" />
        </div>
      </div>

      {/* Smart Daily Suggestions - Positioned below header as requested */}
      <SmartDailySuggestions />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-full shadow-sm">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Concepts</p>
                <p className="text-xl font-bold text-blue-800">{mockStats.conceptsCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-full shadow-sm">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Hours Studied</p>
                <p className="text-xl font-bold text-purple-800">{mockStats.hoursStudied}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-full shadow-sm">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Weekly Target</p>
                <p className="text-xl font-bold text-green-800">{mockStats.weeklyTarget}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-full shadow-sm">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Upcoming Exams</p>
                <p className="text-xl font-bold text-orange-800">{mockStats.upcomingExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Achievements */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="mt-0.5">
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.subject} • {task.due}</p>
                  </div>
                  <Badge 
                    variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenges Widget */}
        <div className="lg:col-span-1">
          <ChallengesWidget />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
