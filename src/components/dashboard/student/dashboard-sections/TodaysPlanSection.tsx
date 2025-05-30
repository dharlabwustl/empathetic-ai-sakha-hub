
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen, Calculator, Brain, Zap, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import HighlightArrow from './HighlightArrow';

interface TodaysPlanSectionProps {
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ currentMood }) => {
  const todaysActivities = [
    {
      id: 1,
      time: "10:00 AM",
      title: "Physics Concepts",
      description: "Wave motion and interference",
      duration: "45 min",
      type: "concept",
      status: "active",
      route: "/dashboard/student/concepts/physics"
    },
    {
      id: 2,
      time: "11:00 AM",
      title: "Chemistry Practice",
      description: "Organic reactions practice",
      duration: "30 min",
      type: "practice",
      status: "upcoming",
      route: "/dashboard/student/practice-exam/1/start"
    },
    {
      id: 3,
      time: "2:00 PM",
      title: "Biology Recall",
      description: "Cell division concepts",
      duration: "25 min",
      type: "recall",
      status: "upcoming",
      route: "/dashboard/student/concepts/biology"
    },
    {
      id: 4,
      time: "4:00 PM",
      title: "Mock Test",
      description: "Full NEET practice test",
      duration: "3 hours",
      type: "exam",
      status: "scheduled",
      route: "/dashboard/student/practice-exam/2/start"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'practice': return <Calculator className="h-4 w-4 text-green-500" />;
      case 'recall': return <Brain className="h-4 w-4 text-purple-500" />;
      case 'exam': return <Zap className="h-4 w-4 text-red-500" />;
      default: return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'scheduled': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getActionRoute = (type: string, defaultRoute: string) => {
    switch (type) {
      case 'concept': return '/dashboard/student/concepts';
      case 'practice': return '/dashboard/student/practice-exam/1/start';
      case 'recall': return '/dashboard/student/concepts';
      case 'exam': return '/dashboard/student/practice-exam/2/start';
      default: return defaultRoute;
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
    >
      {/* Highlight Arrow */}
      <HighlightArrow 
        message="Live Daily Plan - Follow This!"
        position="top"
        variant="info"
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-3">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Calendar className="h-5 w-5 text-blue-600" />
            </motion.div>
            <motion.span
              animate={{ 
                color: ["#2563eb", "#4f46e5", "#2563eb"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-bold"
            >
              Today's Live Plan
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todaysActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="border rounded-lg p-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getActivityIcon(activity.type)}
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      {activity.title}
                    </h4>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{activity.time}</span>
                    <span>•</span>
                    <span>{activity.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Link to={getActionRoute(activity.type, activity.route)}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Play className="h-3 w-3 mr-1" />
                    {activity.status === 'active' ? 'Continue' : 'Start'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          
          <div className="text-center pt-2">
            <Link to="/dashboard/student/academic">
              <Button 
                size="sm" 
                variant="outline"
                className="hover:bg-blue-50"
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Full Schedule
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysPlanSection;
