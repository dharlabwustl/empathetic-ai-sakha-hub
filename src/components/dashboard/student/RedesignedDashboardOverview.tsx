import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  ChevronRight,
  Calendar,
  Brain,
  Zap,
  Star
} from "lucide-react";
import { motion } from 'framer-motion';
import { UserProfileType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  category: 'study' | 'practice' | 'review' | 'break';
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const mockData = [
    {
      id: "task-1",
      title: "Review Newton's Laws of Motion",
      subject: "Physics",
      type: "concept" as const,
      timeEstimate: 30,
      dueDate: "Today",
      priority: "high" as const
    },
    {
      id: "task-2",
      title: "Complete Organic Chemistry Flashcards",
      subject: "Chemistry",
      type: "flashcard" as const,
      timeEstimate: 20,
      dueDate: "Today",
      priority: "medium" as const
    },
    {
      id: "task-3",
      title: "Take Practice Test on Algebra",
      subject: "Mathematics",
      type: "exam" as const,
      timeEstimate: 60,
      dueDate: "Tomorrow",
      priority: "low" as const
    }
  ];

  const kpiStats = [
    {
      title: "Concepts Completed",
      value: 45,
      unit: "/60",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      change: 5,
      changeType: "positive" as const,
      gradient: "from-blue-50 to-blue-200"
    },
    {
      title: "Quiz Average Score",
      value: 82,
      unit: "%",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      change: 3,
      changeType: "positive" as const,
      gradient: "from-green-50 to-green-200"
    },
    {
      title: "Flashcard Recall",
      value: 78,
      unit: "%",
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      change: 7,
      changeType: "positive" as const,
      gradient: "from-purple-50 to-purple-200"
    },
    {
      title: "Practice Tests",
      value: 12,
      icon: <Check className="h-6 w-6 text-amber-500" />,
      change: 2,
      changeType: "positive" as const,
      gradient: "from-amber-50 to-amber-200"
    },
    {
      title: "Daily Study Goal",
      value: 4.5,
      unit: "hrs",
      icon: <Clock className="h-6 w-6 text-indigo-500" />,
      change: 0.5,
      changeType: "positive" as const,
      gradient: "from-indigo-50 to-indigo-200"
    }
  ];

  const quickActions = [
    {
      title: "Study Concepts",
      path: "/dashboard/student/concepts",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Review and learn new concepts",
      progress: 85,
      count: 12,
      buttonText: "Start Now",
      color: "bg-blue-500"
    },
    {
      title: "Take Practice Exam",
      path: "/dashboard/student/practice-exam",
      icon: <Target className="h-5 w-5" />,
      description: "Practice with mock tests",
      progress: 90,
      count: 10,
      buttonText: "Start Now",
      color: "bg-green-500"
    },
    {
      title: "Review Flashcards",
      path: "/dashboard/student/flashcards",
      icon: <Brain className="h-5 w-5" />,
      description: "Review and reinforce your knowledge",
      progress: 75,
      count: 15,
      buttonText: "Start Now",
      color: "bg-purple-500"
    },
    {
      title: "Take Break",
      path: "/dashboard/student/feel-good-corner",
      icon: <Zap className="h-5 w-5" />,
      description: "Take a break and relax",
      progress: 60,
      count: 5,
      buttonText: "Start Now",
      color: "bg-yellow-500"
    }
  ];

  const recentActivities = [
    {
      title: "Completed Study Session",
      icon: <Award className="h-5 w-5" />,
      time: "10:30 AM"
    },
    {
      title: "Started Flashcard Review",
      icon: <BookOpen className="h-5 w-5" />,
      time: "11:00 AM"
    },
    {
      title: "Completed Practice Exam",
      icon: <Target className="h-5 w-5" />,
      time: "12:00 PM"
    }
  ];

  const upcomingEvents = [
    {
      title: "Exam Preparation",
      icon: <Award className="h-5 w-5" />,
      date: "15th June",
      priority: "high",
      type: "exam"
    },
    {
      title: "Revision Session",
      icon: <BookOpen className="h-5 w-5" />,
      date: "17th June",
      priority: "medium",
      type: "revision"
    },
    {
      title: "Flashcard Review",
      icon: <Target className="h-5 w-5" />,
      date: "19th June",
      priority: "low",
      type: "revision"
    }
  ];

  const dailySmartSuggestions: SmartSuggestion[] = [
    {
      id: 'morning-revision',
      title: 'Morning Quick Revision',
      description: 'Review yesterday\'s concepts for 15 minutes',
      action: '/dashboard/student/concepts',
      priority: 'high',
      icon: <Brain className="h-4 w-4" />,
      category: 'review'
    },
    {
      id: 'practice-test',
      title: 'Take Practice Test',
      description: 'Physics mock test - 30 minutes',
      action: '/dashboard/student/practice-exam',
      priority: 'high',
      icon: <Target className="h-4 w-4" />,
      category: 'practice'
    },
    {
      id: 'weak-topics',
      title: 'Focus on Weak Topics',
      description: 'Thermodynamics needs attention',
      action: '/dashboard/student/concepts',
      priority: 'medium',
      icon: <TrendingUp className="h-4 w-4" />,
      category: 'study'
    },
    {
      id: 'break-time',
      title: 'Take a Break',
      description: 'You\'ve been studying for 2 hours',
      action: '/dashboard/student/feel-good-corner',
      priority: 'medium',
      icon: <Zap className="h-4 w-4" />,
      category: 'break'
    }
  ];

  const handleSuggestionClick = (action: string) => {
    navigate(action);
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section with User Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Welcome back, {userProfile.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to continue your exam preparation journey?
        </p>
      </motion.div>

      {/* Daily Smart Suggestions Section - Below name section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              Smart Suggestions for Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'} gap-4`}>
              {dailySmartSuggestions.map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion.action)}
                >
                  <Card className="h-full border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`
                          p-2 rounded-lg
                          ${suggestion.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 
                            suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                            'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}
                        `}>
                          {suggestion.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1">
                            {suggestion.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {suggestion.description}
                          </p>
                          <Badge 
                            variant="outline" 
                            className={`mt-2 text-xs ${
                              suggestion.priority === 'high' ? 'border-red-300 text-red-600' :
                              suggestion.priority === 'medium' ? 'border-yellow-300 text-yellow-600' :
                              'border-green-300 text-green-600'
                            }`}
                          >
                            {suggestion.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* KPI Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'} gap-4`}
      >
        {/* ... keep existing code (kpiStats mapping) */}
        {kpiStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            onHoverStart={() => setHoveredCard(stat.title)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card className={`
              relative overflow-hidden transition-all duration-300 cursor-pointer
              ${hoveredCard === stat.title ? 'shadow-lg transform scale-105' : 'shadow-sm'}
              border-0 bg-gradient-to-br ${stat.gradient}
            `}>
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-white/70 text-xs mt-1">{stat.change}</p>
                  </div>
                  <div className="text-white/80">
                    {stat.icon}
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  animate={hoveredCard === stat.title ? { x: '100%' } : { x: '-100%' }}
                  transition={{ duration: 0.6 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-6`}
      >
        {/* ... keep existing code (quickActions mapping) */}
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="cursor-pointer"
            onClick={() => handleCardClick(action.path)}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      p-3 rounded-lg transition-all duration-300 group-hover:scale-110
                      ${action.color} text-white
                    `}>
                      {action.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {action.progress}%
                      </p>
                      <p className="text-xs text-gray-500">Progress</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {action.count}
                      </p>
                      <p className="text-xs text-gray-500">Items</p>
                    </div>
                  </div>
                  <Progress value={action.progress} className="w-20" />
                </div>
                <Button 
                  className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(action.path);
                  }}
                >
                  {action.buttonText}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity and Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-6`}
      >
        {/* ... keep existing code (Recent Activity and Upcoming Events) */}
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className={`
                    p-2 rounded-full
                    ${activity.type === 'completed' ? 'bg-green-100 text-green-600' : 
                      activity.type === 'started' ? 'bg-blue-100 text-blue-600' : 
                      'bg-yellow-100 text-yellow-600'}
                  `}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className={`
                    p-2 rounded-full text-white
                    ${event.type === 'exam' ? 'bg-red-500' : 
                      event.type === 'revision' ? 'bg-blue-500' : 
                      'bg-green-500'}
                  `}>
                    {event.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RedesignedDashboardOverview;
