
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  Calendar,
  Award,
  Star,
  Zap,
  CheckCircle,
  BarChart
} from 'lucide-react';
import SmartDailySuggestions from './SmartDailySuggestions';

interface UserProfile {
  name?: string;
  firstName?: string;
  avatar?: string;
  photoURL?: string;
  loginCount?: number;
  currentStreak?: number;
  totalStudyTime?: number;
}

interface KPI {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfile;
  kpis?: KPI[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis = []
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userName = userProfile.name || userProfile.firstName || 'Student';

  // Mock data for today's progress
  const todaysProgress = {
    completedTasks: 8,
    totalTasks: 15,
    studyTime: 145, // minutes
    targetTime: 180,
    streak: userProfile.currentStreak || 7,
    level: 12,
    xp: 2450,
    nextLevelXp: 3000
  };

  const progressPercentage = (todaysProgress.completedTasks / todaysProgress.totalTasks) * 100;
  const timePercentage = (todaysProgress.studyTime / todaysProgress.targetTime) * 100;
  const xpPercentage = ((todaysProgress.xp % 1000) / 1000) * 100;

  // Quick actions
  const quickActions = [
    {
      title: 'Continue Physics',
      description: 'Newton\'s Laws',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'bg-blue-500',
      progress: 65
    },
    {
      title: 'Review Flashcards',
      description: '25 cards pending',
      icon: <Brain className="h-5 w-5" />,
      color: 'bg-purple-500',
      progress: 80
    },
    {
      title: 'Practice Test',
      description: 'Chemistry Mock',
      icon: <Target className="h-5 w-5" />,
      color: 'bg-green-500',
      progress: 0
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Enhanced Header with User Greeting */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {getGreeting()}, {userName}! 🌟
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Ready to achieve your study goals today?
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center gap-1 text-orange-600">
                <Star className="h-4 w-4" />
                <span className="font-bold">Level {todaysProgress.level}</span>
              </div>
              <div className="text-xs text-gray-500">
                {todaysProgress.xp} / {todaysProgress.nextLevelXp} XP
              </div>
            </div>
            <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
              <Calendar className="h-3 w-3 mr-1" />
              {todaysProgress.streak} Day Streak
            </Badge>
          </div>
        </div>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{todaysProgress.completedTasks}/{todaysProgress.totalTasks}</div>
            <div className="text-sm text-gray-600">Tasks Done</div>
            <Progress value={progressPercentage} className="mt-2 h-2" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{todaysProgress.studyTime}m</div>
            <div className="text-sm text-gray-600">Study Time</div>
            <Progress value={timePercentage} className="mt-2 h-2" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(progressPercentage)}%</div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{todaysProgress.targetTime - todaysProgress.studyTime}m</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </div>
        </div>
      </motion.div>

      {/* Smart Daily Suggestions - Moved here below header */}
      <SmartDailySuggestions />

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-full ${action.color} text-white`}>
                        {action.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                    {action.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{action.progress}%</span>
                        </div>
                        <Progress value={action.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Metrics */}
      {kpis.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-green-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {kpis.slice(0, 4).map((kpi) => (
                  <div key={kpi.id} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-center mb-2">
                      {kpi.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {kpi.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {kpi.title}
                    </div>
                    <div className={`text-xs ${
                      kpi.changeType === 'positive' ? 'text-green-600' :
                      kpi.changeType === 'negative' ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      {kpi.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default RedesignedDashboardOverview;
