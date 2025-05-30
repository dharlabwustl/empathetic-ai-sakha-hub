
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Zap,
  Target,
  CheckCircle2,
  AlertCircle,
  Activity,
  Presentation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TodayStudyPlan from './TodayStudyPlan';
import UpcomingTasks from './UpcomingTasks';
import QuickAccessButtons from './QuickAccessButtons';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import { UserProfile } from '@/types/user/base';
import { MoodType } from '@/types/user/base';
import { getCurrentMoodFromLocalStorage, getMoodThemeClass } from './mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfile;
  kpis: any;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());

  useEffect(() => {
    // Apply mood theme to dashboard
    const dashboardElement = document.querySelector('.dashboard-container');
    if (dashboardElement && currentMood) {
      const themeClass = getMoodThemeClass(currentMood);
      dashboardElement.className = `dashboard-container ${themeClass} no-flash`;
    }
  }, [currentMood]);

  // Mock data
  const todayTasks = [
    {
      id: '1',
      title: 'Physics - Newton\'s Laws',
      time: '9:00 AM',
      type: 'concept' as const,
      completed: false
    },
    {
      id: '2', 
      title: 'Chemistry Practice Test',
      time: '2:00 PM',
      type: 'exam' as const,
      completed: false
    },
    {
      id: '3',
      title: 'Biology Revision',
      time: '4:00 PM', 
      type: 'revision' as const,
      completed: true
    }
  ];

  const upcomingTasks = [
    {
      id: '1',
      title: 'Organic Chemistry Fundamentals',
      subject: 'Chemistry',
      type: 'concept' as const,
      timeEstimate: 45,
      dueDate: 'Today',
      priority: 'high' as const
    },
    {
      id: '2',
      title: 'Physics Problem Solving',
      subject: 'Physics', 
      type: 'flashcard' as const,
      timeEstimate: 30,
      dueDate: 'Tomorrow',
      priority: 'medium' as const
    }
  ];

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  return (
    <div className="dashboard-container space-y-6 p-6 no-flash">
      {/* Header Section */}
      <div className="premium-card rounded-xl p-6 transition-all duration-300">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {userProfile.name || userProfile.firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-2">Ready to continue your NEET preparation journey?</p>
          </div>
          <QuickAccessButtons />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="premium-card transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Streak</p>
                <p className="text-3xl font-bold text-orange-600">5 days</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Studied</p>
                <p className="text-3xl font-bold text-blue-600">24.5h</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Concepts Mastered</p>
                <p className="text-3xl font-bold text-green-600">127</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Practice Tests</p>
                <p className="text-3xl font-bold text-purple-600">8</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Goal Card */}
          <ExamGoalCard currentMood={currentMood} onMoodChange={handleMoodChange} />

          {/* Subject Progress */}
          <Card className="premium-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Physics', progress: 72, color: 'blue', trend: '+5%' },
                { name: 'Chemistry', progress: 68, color: 'green', trend: '+3%' },
                { name: 'Biology', progress: 75, color: 'purple', trend: '+7%' }
              ].map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{subject.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 text-xs">{subject.trend}</span>
                      <span>{subject.progress}%</span>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="premium-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/dashboard/student/flashcards/1/interactive">
                  <Button className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <Brain className="h-6 w-6" />
                    <span className="text-sm">Recall Practice</span>
                  </Button>
                </Link>
                <Link to="/dashboard/student/practice-exam/2/start">
                  <Button className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    <Trophy className="h-6 w-6" />
                    <span className="text-sm">Take Exam</span>
                  </Button>
                </Link>
                <Link to="/dashboard/student/concepts">
                  <Button className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm">Study Concepts</span>
                  </Button>
                </Link>
                <Link to="/dashboard/student/academic">
                  <Button className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Study Plan</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Today's Plan */}
          <TodayStudyPlan tasks={todayTasks} />

          {/* Upcoming Tasks */}
          <UpcomingTasks tasks={upcomingTasks} />

          {/* Recent Activity */}
          <Card className="premium-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-gray-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { action: 'Completed Physics Quiz', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-600' },
                { action: 'Studied Organic Chemistry', time: '4 hours ago', icon: BookOpen, color: 'text-blue-600' },
                { action: 'Practice Test Score: 85%', time: 'Yesterday', icon: Trophy, color: 'text-yellow-600' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
