
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  Zap,
  Star,
  Calendar,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Coffee,
  Gift,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { UserProfile } from '@/types/user';
import { KPI } from '@/types/dashboard';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfile;
  kpis: KPI[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userName = userProfile?.name || userProfile?.firstName || 'Student';

  // Mock daily smart suggestions data
  const dailySmartSuggestions = [
    {
      id: 'focus-physics',
      icon: <Target className="h-5 w-5 text-blue-600" />,
      title: 'Focus on Physics Mechanics',
      description: 'Complete 2 pending concept cards and practice 15 flashcards',
      priority: 'high',
      estimatedTime: '45 min',
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      action: 'concepts'
    },
    {
      id: 'review-biology',
      icon: <Brain className="h-5 w-5 text-green-600" />,
      title: 'Quick Biology Review',
      description: 'Review classification flashcards - showing low retention',
      priority: 'medium',
      estimatedTime: '20 min',
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      action: 'flashcards'
    },
    {
      id: 'chemistry-mock',
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      title: 'Chemistry Mock Test',
      description: 'Take organic chemistry practice exam before weekend',
      priority: 'medium',
      estimatedTime: '60 min',
      bgColor: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-800',
      action: 'practice-exam'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Recommended</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Optional</Badge>;
      default:
        return null;
    }
  };

  const handleSuggestionClick = (action: string) => {
    switch (action) {
      case 'concepts':
        window.location.href = '/dashboard/student/concepts';
        break;
      case 'flashcards':
        window.location.href = '/dashboard/student/flashcards';
        break;
      case 'practice-exam':
        window.location.href = '/dashboard/student/practice-exams';
        break;
      default:
        console.log('Action clicked:', action);
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Greeting */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={userProfile?.avatar || "/api/placeholder/60/60"} 
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {getGreeting()}, {userName}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Ready to conquer your study goals today?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
              <Calendar className="h-3 w-3 mr-1" />
              {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Daily Smart Suggestions - Moved here from tips section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <Lightbulb className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              Daily Smart Suggestions
              <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">
                3 Recommendations
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dailySmartSuggestions.map((suggestion) => (
                <Card 
                  key={suggestion.id} 
                  className={`${suggestion.bgColor} border hover:shadow-md transition-all duration-200 cursor-pointer`}
                  onClick={() => handleSuggestionClick(suggestion.action)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white/80 rounded-full shadow-sm">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium ${suggestion.textColor} text-sm`}>
                            {suggestion.title}
                          </h4>
                          {getPriorityBadge(suggestion.priority)}
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                          {suggestion.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {suggestion.estimatedTime}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="bg-white/80 hover:bg-white border-white/50 text-xs h-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSuggestionClick(suggestion.action);
                            }}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Start
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Study Streak</p>
                <p className="text-3xl font-bold text-blue-900">12</p>
                <p className="text-xs text-blue-700">days</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Concepts Mastered</p>
                <p className="text-3xl font-bold text-green-900">84</p>
                <p className="text-xs text-green-700">this month</p>
              </div>
              <div className="p-3 bg-green-500 rounded-full">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Practice Score</p>
                <p className="text-3xl font-bold text-purple-900">87%</p>
                <p className="text-xs text-purple-700">average</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-full">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Study Time</p>
                <p className="text-3xl font-bold text-orange-900">6.2h</p>
                <p className="text-xs text-orange-700">today</p>
              </div>
              <div className="p-3 bg-orange-500 rounded-full">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Subject Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Physics</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">78%</Badge>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-gray-600">Focus: Mechanics & Waves</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Chemistry</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">85%</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-600">Strong: Organic Chemistry</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Biology</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">92%</Badge>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-gray-600">Excellent progress!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => window.location.href = '/dashboard/student/todays-plan'}>
                <Calendar className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Today's Plan</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => window.location.href = '/dashboard/student/concepts'}>
                <BookOpen className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium">Study Concepts</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => window.location.href = '/dashboard/student/flashcards'}>
                <Brain className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium">Flashcards</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => window.location.href = '/dashboard/student/practice-exams'}>
                <FileText className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-medium">Practice Tests</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RedesignedDashboardOverview;
