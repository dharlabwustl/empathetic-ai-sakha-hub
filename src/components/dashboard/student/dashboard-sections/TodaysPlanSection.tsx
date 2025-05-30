
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, BookOpen, Target, TrendingUp, Zap, ArrowRight, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface TodaysPlanSectionProps {
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ currentMood }) => {
  const todaysTasks = [
    {
      id: 1,
      subject: "Physics",
      topic: "Newton's Laws of Motion",
      timeAllocated: "45 mins",
      progress: 75,
      priority: "high",
      type: "concept",
      completed: false,
      confidence: MoodType.FOCUSED
    },
    {
      id: 2,
      subject: "Chemistry", 
      topic: "Organic Chemistry Basics",
      timeAllocated: "30 mins",
      progress: 60,
      priority: "medium",
      type: "practice",
      completed: false,
      confidence: MoodType.NEUTRAL
    },
    {
      id: 3,
      subject: "Biology",
      topic: "Cell Structure Review",
      timeAllocated: "20 mins", 
      progress: 90,
      priority: "low",
      type: "revision",
      completed: true,
      confidence: MoodType.HAPPY
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'revision': return <TrendingUp className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const completedTasks = todaysTasks.filter(task => task.completed).length;
  const totalTasks = todaysTasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Card className="bg-gradient-to-br from-indigo-50/80 via-white to-blue-100/60 dark:from-indigo-950/30 dark:via-gray-900 dark:to-blue-900/20 border border-indigo-200/50 dark:border-indigo-800/30 shadow-lg">
      <CardHeader className="border-b border-indigo-100/50 dark:border-indigo-800/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <motion.span
              animate={{ 
                color: ["#3730a3", "#1e40af", "#3730a3"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-bold"
            >
              Today's Study Plan
            </motion.span>
            <motion.div
              animate={{ 
                x: [0, 5, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold animate-pulse">
                ACTIVE
              </Badge>
            </motion.div>
          </CardTitle>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="font-medium">{completedTasks}/{totalTasks} tasks completed</span>
            </div>
            <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-300">
              {completionRate}% Progress
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span>Daily Progress</span>
            <span className="font-medium">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        <div className="space-y-3">
          {todaysTasks.map((task, index) => (
            <motion.div
              key={task.id}
              className={`p-3 rounded-lg border-2 ${
                task.completed 
                  ? 'bg-green-50/80 border-green-200/60 dark:bg-green-900/20 dark:border-green-800/40' 
                  : 'bg-white/95 border-indigo-100/60 dark:bg-gray-800/95 dark:border-indigo-800/40'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                  )}
                  <div>
                    <h4 className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.subject}: {task.topic}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        {getTypeIcon(task.type)}
                        <span>{task.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Clock className="h-3 w-3" />
                    <span>{task.timeAllocated}</span>
                  </div>
                  <div className="text-xs font-medium">{task.progress}%</div>
                </div>
              </div>
              
              {!task.completed && (
                <div className="flex gap-2 mt-2">
                  <Link to={`/dashboard/student/concepts/${task.subject.toLowerCase()}`} className="flex-1">
                    <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                      {task.type === 'concept' ? 'Study' : task.type === 'practice' ? 'Practice' : 'Review'}
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-4 text-center"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Link to="/dashboard/student/today">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold shadow-lg">
              <Star className="h-4 w-4 mr-2" />
              <motion.span
                animate={{ 
                  color: ["#ffffff", "#fef3c7", "#ffffff"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                View Full Study Plan
              </motion.span>
              <motion.div
                animate={{ 
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="ml-2"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
