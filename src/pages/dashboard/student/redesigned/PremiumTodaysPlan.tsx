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
  Star,
  Plus,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedTaskBreakdown from '@/components/dashboard/student/today-plan/EnhancedTaskBreakdown';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';

const PremiumTodaysPlan = () => {
  const { data: planData, isLoading, error } = useTodaysPlan();
  const [activeTab, setActiveTab] = useState('tasks');

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load today's plan" />;

  const completedTasks = planData?.tasks?.filter((task: any) => task.completed)?.length || 0;
  const totalTasks = planData?.tasks?.length || 0;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const pendingTasks = totalTasks - completedTasks;

  const smartSuggestions = [
    {
      id: 1,
      title: 'Complete pending tasks',
      description: 'You have 3 tasks from yesterday that need attention',
      priority: 'high',
      icon: AlertCircle,
      action: 'View Tasks',
      type: 'backlog'
    },
    {
      id: 2,
      title: 'Take a strategic break',
      description: 'You\'ve been studying for 2.5 hours, take a 15-min break',
      priority: 'medium',
      icon: Clock,
      action: 'Break Time',
      type: 'wellbeing'
    },
    {
      id: 3,
      title: 'Focus on weak areas',
      description: 'Thermodynamics needs extra attention based on recent performance',
      priority: 'high',
      icon: Brain,
      action: 'Start Review',
      type: 'study'
    },
    {
      id: 4,
      title: 'Practice mock test',
      description: 'Schedule a full-length practice test for better preparation',
      priority: 'medium',
      icon: Target,
      action: 'Schedule Test',
      type: 'assessment'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'backlog': return AlertCircle;
      case 'wellbeing': return Clock;
      case 'study': return Brain;
      case 'assessment': return Target;
      default: return Star;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
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

      {/* Progress Meter at Top */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Daily Progress</h3>
                <p className="text-blue-100">Keep up the great work!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
                <p className="text-blue-100 text-sm">Completed</p>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-blue-400" />
            <div className="flex justify-between text-sm mt-2 text-blue-100">
              <span>{completedTasks} completed</span>
              <span>{pendingTasks} remaining</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Smart Suggestions Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smartSuggestions.map((suggestion, index) => {
                const IconComponent = getTypeIcon(suggestion.type);
                return (
                  <motion.div
                    key={suggestion.id}
                    className={`p-4 rounded-lg border-2 ${getPriorityColor(suggestion.priority)} transition-all hover:shadow-md cursor-pointer`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-full shadow-sm">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <p className="text-xs mt-1 opacity-80">{suggestion.description}</p>
                        <Button size="sm" variant="outline" className="mt-3 h-7 text-xs">
                          {suggestion.action}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Task Management Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Task Management
              </CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                <p className="text-sm text-green-700">Completed</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{pendingTasks}</div>
                <p className="text-sm text-orange-700">In Progress</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">7</div>
                <p className="text-sm text-purple-700">Study Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Task Breakdown - Keep existing design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
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
