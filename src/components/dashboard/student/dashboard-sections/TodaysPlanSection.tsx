
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen, Target, CheckCircle, PlayCircle, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface TodaysPlanSectionProps {
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ currentMood }) => {
  const todaysPlan = [
    {
      time: "9:00 AM",
      subject: "Physics",
      topic: "Newton's Laws",
      duration: "45 min",
      type: "concept",
      completed: true,
      priority: "high"
    },
    {
      time: "10:00 AM", 
      subject: "Chemistry",
      topic: "Chemical Bonding",
      duration: "60 min",
      type: "practice",
      completed: false,
      priority: "high"
    },
    {
      time: "11:30 AM",
      subject: "Biology", 
      topic: "Ecology Review",
      duration: "30 min",
      type: "revision",
      completed: false,
      priority: "medium"
    },
    {
      time: "2:00 PM",
      subject: "Mock Test",
      topic: "Full Length Test",
      duration: "180 min", 
      type: "exam",
      completed: false,
      priority: "high"
    }
  ];

  const completedTasks = todaysPlan.filter(task => task.completed).length;
  const totalTasks = todaysPlan.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'revision': return <Clock className="h-4 w-4" />;
      case 'exam': return <Zap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'concept': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'practice': return 'bg-green-100 text-green-800 border-green-300';
      case 'revision': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'exam': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Card className="premium-card relative shadow-lg border-2 border-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 overflow-hidden">
        {/* Animated background for active status */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 relative z-10">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "linear"
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
                Live Daily NEET Plan
              </motion.span>
              {/* Active indicator */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
            </div>
            
            <div className="text-right">
              <div className="text-sm font-bold text-blue-700">{completedTasks}/{totalTasks}</div>
              <div className="text-xs text-gray-600">Tasks Done</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 relative z-10">
          <div className="space-y-4">
            {/* Progress Overview */}
            <motion.div 
              className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg"
              animate={{ 
                backgroundColor: ["rgb(239 246 255)", "rgb(238 242 255)", "rgb(239 246 255)"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Today's Progress</span>
                <span className="text-sm font-bold text-blue-700">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </motion.div>

            {/* Today's Tasks */}
            <div className="space-y-3">
              {todaysPlan.map((task, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg border-2 ${task.completed ? 'bg-green-50 border-green-200 opacity-75' : 'bg-white border-gray-200'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${task.completed ? 'bg-green-100' : 'bg-blue-100'}`}>
                        {task.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          getTypeIcon(task.type)
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{task.subject}</span>
                          <Badge className={getTypeColor(task.type)} variant="outline">
                            {task.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{task.topic}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-500">{task.time} • {task.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    {!task.completed && (
                      <Link to="/dashboard/student/concepts">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <PlayCircle className="h-3 w-3 mr-1" />
                            Start
                          </Button>
                        </motion.div>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/dashboard/student/today">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="sm" variant="outline" className="w-full hover:bg-blue-50">
                    <Calendar className="h-3 w-3 mr-1" />
                    View Full Plan
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/dashboard/student/academic-advisor">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="sm" variant="outline" className="w-full hover:bg-purple-50">
                    <Target className="h-3 w-3 mr-1" />
                    Customize Plan
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysPlanSection;
