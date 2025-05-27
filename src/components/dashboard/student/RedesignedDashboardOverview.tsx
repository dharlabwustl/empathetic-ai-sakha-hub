import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Trophy, 
  Target, 
  Clock,
  Star,
  Calendar,
  Zap,
  Award,
  Lightbulb,
  Fire,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { UserProfile } from '@/types/user/base';
import { DashboardKPIs } from '@/types/dashboard/base';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfile;
  kpis: DashboardKPIs;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Mock data for smart suggestions
  const smartSuggestions = [
    {
      id: 'sg1',
      title: 'Focus on Physics Today',
      description: 'Your Physics performance needs attention. Start with Laws of Motion.',
      type: 'priority',
      icon: <Target className="h-4 w-4" />,
      urgency: 'high'
    },
    {
      id: 'sg2', 
      title: 'Quick Chemistry Review',
      description: 'Review organic reactions before starting new concepts.',
      type: 'review',
      icon: <Brain className="h-4 w-4" />,
      urgency: 'medium'
    },
    {
      id: 'sg3',
      title: 'Take Practice Test',
      description: 'Your Biology scores show improvement. Take a practice test!',
      type: 'practice',
      icon: <Award className="h-4 w-4" />,
      urgency: 'medium'
    },
    {
      id: 'sg4',
      title: 'Study Break Reminder',
      description: 'You\'ve been studying for 2 hours. Take a 15-minute break.',
      type: 'wellness',
      icon: <Clock className="h-4 w-4" />,
      urgency: 'low'
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Enhanced Welcome Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {getGreeting()}, {userProfile.firstName || userProfile.name}! 🌟
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to excel in your PREPZR journey today?
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Fire className="h-5 w-5 text-orange-300" />
                  <span className="text-2xl font-bold">7</span>
                </div>
                <p className="text-xs text-blue-200">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                  <span className="text-2xl font-bold">1,247</span>
                </div>
                <p className="text-xs text-blue-200">Total Points</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Smart Daily Suggestions - Moved below header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-yellow-800">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold text-xl">
                PREPZR AI Smart Daily Recommendations
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smartSuggestions.map((suggestion) => (
                <motion.div 
                  key={suggestion.id} 
                  className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      suggestion.urgency === 'high' ? 'bg-red-100 text-red-600' :
                      suggestion.urgency === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {suggestion.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{suggestion.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            suggestion.urgency === 'high' ? 'border-red-300 text-red-700' :
                            suggestion.urgency === 'medium' ? 'border-yellow-300 text-yellow-700' :
                            'border-blue-300 text-blue-700'
                          }`}
                        >
                          {suggestion.urgency}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{suggestion.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Quick Stats */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-full shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Study Time</p>
                <p className="text-2xl font-bold text-blue-800">{kpis.totalStudyTime || 0}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-full shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Accuracy</p>
                <p className="text-2xl font-bold text-green-800">{kpis.accuracy || 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-full shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Concepts</p>
                <p className="text-2xl font-bold text-purple-800">{kpis.conceptsLearned || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-full shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Progress</p>
                <p className="text-2xl font-bold text-orange-800">{kpis.overallProgress || 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rest of the dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Physics</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Chemistry</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Biology</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs">Start Learning</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Brain className="h-5 w-5" />
                  <span className="text-xs">Practice Tests</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Study Plan</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Trophy className="h-5 w-5" />
                  <span className="text-xs">Achievements</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
