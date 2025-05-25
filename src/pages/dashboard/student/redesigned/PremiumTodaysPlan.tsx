
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  TrendingUp,
  Calendar,
  Trophy,
  Zap,
  BookOpen,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedTaskBreakdown from '@/components/dashboard/student/today-plan/EnhancedTaskBreakdown';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import ContextAwareVoiceAssistant from '@/components/voice/ContextAwareVoiceAssistant';

const PremiumTodaysPlan = () => {
  const { data: planData, isLoading, error } = useTodaysPlan();
  const [activeTab, setActiveTab] = useState('tasks');

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load today's plan" />;

  const completedTasks = planData?.tasks?.filter((task: any) => task.completed)?.length || 0;
  const totalTasks = planData?.tasks?.length || 0;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const pendingTasks = totalTasks - completedTasks;

  const todaysGoals = [
    { id: 1, title: 'Complete 3 Physics chapters', progress: 67, color: 'blue' },
    { id: 2, title: 'Practice 20 Math problems', progress: 80, color: 'green' },
    { id: 3, title: 'Review Chemistry notes', progress: 40, color: 'purple' }
  ];

  const smartSuggestions = [
    {
      id: 1,
      title: 'Focus on weak areas',
      description: 'Spend extra time on Thermodynamics concepts',
      priority: 'high',
      icon: Brain,
      action: 'Start Review'
    },
    {
      id: 2,
      title: 'Take a strategic break',
      description: 'You\'ve been studying for 2 hours, time for a 15-min break',
      priority: 'medium',
      icon: Clock,
      action: 'Break Time'
    },
    {
      id: 3,
      title: 'Tackle backlog items',
      description: '3 pending tasks from yesterday need attention',
      priority: 'medium',
      icon: AlertCircle,
      action: 'View Backlog'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <ContextAwareVoiceAssistant userName="Student" pageType="today" />
      
      {/* Header Section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Today's Plan
            </h1>
            <p className="text-gray-600 mt-2">Your personalized study roadmap for maximum productivity</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Progress Today</p>
                  <p className="text-3xl font-bold">{Math.round(progressPercentage)}%</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Target className="h-6 w-6" />
                </div>
              </div>
              <Progress value={progressPercentage} className="mt-4 bg-blue-400" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Completed</p>
                  <p className="text-3xl font-bold">{completedTasks}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <p className="text-green-100 text-sm mt-2">Tasks finished</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Pending</p>
                  <p className="text-3xl font-bold">{pendingTasks}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
              <p className="text-orange-100 text-sm mt-2">Tasks remaining</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Study Streak</p>
                  <p className="text-3xl font-bold">7</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Trophy className="h-6 w-6" />
                </div>
              </div>
              <p className="text-purple-100 text-sm mt-2">Days</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Smart Suggestions */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Smart Suggestions
              <Badge variant="secondary" className="ml-auto">AI Powered</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {smartSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  className={`p-4 rounded-lg border-2 ${getPriorityColor(suggestion.priority)} transition-all hover:shadow-md`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-full">
                      <suggestion.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <p className="text-xs mt-1 opacity-80">{suggestion.description}</p>
                      <Button size="sm" variant="outline" className="mt-3 h-7 text-xs">
                        {suggestion.action}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Goals */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Today's Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className={`w-2 h-2 rounded-full bg-${goal.color}-500`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{goal.title}</p>
                    <div className="mt-2">
                      <Progress value={goal.progress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{goal.progress}% complete</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {goal.progress}%
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Task Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Task Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EnhancedTaskBreakdown />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PremiumTodaysPlan;
