
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LayoutDashboard, FileCheck, BookOpen, Clock, Target, Zap, Calendar } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  time: string;
  type: 'exam' | 'task' | 'revision' | 'concept';
  completed?: boolean;
  route?: string;
}

interface TodayStudyPlanProps {
  tasks: Task[];
  currentMood?: string;
}

const TodayStudyPlan: React.FC<TodayStudyPlanProps> = ({ tasks, currentMood = 'neutral' }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  // Mood-based color schemes
  const moodThemes = {
    motivated: {
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      cardBg: 'bg-gradient-to-br from-orange-50 to-pink-50',
      accent: 'text-orange-600',
      border: 'border-orange-200'
    },
    focused: {
      gradient: 'from-blue-400 via-purple-500 to-indigo-600',
      cardBg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      accent: 'text-blue-600',
      border: 'border-blue-200'
    },
    happy: {
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      cardBg: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      accent: 'text-yellow-600',
      border: 'border-yellow-200'
    },
    tired: {
      gradient: 'from-gray-400 via-gray-500 to-gray-600',
      cardBg: 'bg-gradient-to-br from-gray-50 to-gray-100',
      accent: 'text-gray-600',
      border: 'border-gray-200'
    },
    stressed: {
      gradient: 'from-red-400 via-red-500 to-red-600',
      cardBg: 'bg-gradient-to-br from-red-50 to-red-100',
      accent: 'text-red-600',
      border: 'border-red-200'
    },
    anxious: {
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      cardBg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      accent: 'text-purple-600',
      border: 'border-purple-200'
    },
    curious: {
      gradient: 'from-green-400 via-teal-500 to-blue-500',
      cardBg: 'bg-gradient-to-br from-green-50 to-teal-50',
      accent: 'text-green-600',
      border: 'border-green-200'
    },
    neutral: {
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      cardBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      accent: 'text-blue-600',
      border: 'border-blue-200'
    }
  };

  const currentTheme = moodThemes[currentMood as keyof typeof moodThemes] || moodThemes.neutral;
  
  // Calculate completion percentage
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  
  // Get appropriate icon for each task type
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <FileCheck className={`h-${isMobile ? "3" : "4"} w-${isMobile ? "3" : "4"}`} />;
      case 'concept':
        return <BookOpen className={`h-${isMobile ? "3" : "4"} w-${isMobile ? "3" : "4"}`} />;
      default:
        return <Clock className={`h-${isMobile ? "3" : "4"} w-${isMobile ? "3" : "4"}`} />;
    }
  };
  
  // Handle task click navigation
  const handleTaskClick = (task: Task) => {
    if (task.type === 'concept') {
      console.log("TodayStudyPlan - Navigating to concept detail page:", task.id);
      navigate(`/dashboard/student/concepts/${task.id}`);
      return;
    }
    
    if (task.route) {
      navigate(task.route);
    } else {
      switch (task.type) {
        case 'exam':
          navigate('/dashboard/student/practice-exam');
          break;
        case 'revision':
          navigate('/dashboard/student/flashcards');
          break;
        default:
          navigate('/dashboard/student/today');
          break;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`h-full ${currentTheme.cardBg} ${currentTheme.border} border-2 shadow-lg`}>
        <CardHeader className="pb-2">
          {/* Beautiful Gradient Header */}
          <div className={`bg-gradient-to-r ${currentTheme.gradient} p-4 -mx-6 -mt-6 mb-4 rounded-t-lg`}>
            <div className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className={`${isMobile ? "text-sm" : "text-base"} font-bold text-white flex items-center gap-2`}>
                  <Calendar className="h-5 w-5" />
                  Today's Plan
                </CardTitle>
                <p className="text-white/80 text-xs mt-1 capitalize">
                  {currentMood} mood • {tasks.length} tasks planned
                </p>
              </div>
              <Button 
                variant="ghost" 
                size={isMobile ? "sm" : "default"}
                className="text-white hover:bg-white/20 border border-white/30"
                onClick={() => navigate('/dashboard/student/today')}
              >
                <LayoutDashboard className={`h-${isMobile ? "3" : "4"} w-${isMobile ? "3" : "4"}`} />
              </Button>
            </div>

            {/* Progress Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{Math.round(completionPercentage)}%</div>
                <div className="text-xs text-white/80">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{tasks.length - completedTasks}</div>
                <div className="text-xs text-white/80">Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">4.2h</div>
                <div className="text-xs text-white/80">Time Left</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <Progress value={completionPercentage} className="h-2 bg-white/20" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center py-4">
              <div className={`w-12 h-12 ${currentTheme.accent.replace('text-', 'bg-').replace('-600', '-100')} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <Target className={`h-6 w-6 ${currentTheme.accent}`} />
              </div>
              <p className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>No tasks scheduled for today</p>
              <p className="text-xs text-gray-400 mt-1">Ready to create your plan?</p>
            </div>
          ) : (
            tasks.map((task, i) => (
              <motion.div
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  task.completed 
                    ? 'bg-green-50 border border-green-200' 
                    : `bg-white hover:${currentTheme.cardBg} border ${currentTheme.border} hover:shadow-md transform hover:-translate-y-0.5`
                }`}
                onClick={() => handleTaskClick(task)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    task.completed 
                      ? 'bg-green-100 text-green-600' 
                      : `${currentTheme.accent.replace('text-', 'bg-').replace('-600', '-100')} ${currentTheme.accent}`
                  } transition-colors`}>
                    {getTaskIcon(task.type)}
                  </div>
                  <div>
                    <h4 className={`font-medium ${isMobile ? "text-xs" : "text-sm"} line-clamp-1 ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>
                        {task.time}
                      </p>
                      {!task.completed && (
                        <Zap className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
                
                <Badge 
                  variant={task.completed ? 'outline' : 'default'} 
                  className={`${isMobile ? "text-xs px-1 py-0" : ""} ${
                    task.completed 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : `${currentTheme.cardBg} ${currentTheme.accent} ${currentTheme.border}`
                  }`}
                >
                  {task.completed ? 'Done' : task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                </Badge>
              </motion.div>
            ))
          )}

          <div className="pt-3 text-center border-t border-gray-200">
            <Button 
              variant="link" 
              size={isMobile ? "sm" : "default"}
              onClick={() => navigate('/dashboard/student/today')}
              className={`px-0 ${isMobile ? "text-xs" : "text-sm"} ${currentTheme.accent} hover:${currentTheme.accent.replace('600', '700')}`}
            >
              View Full Plan →
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodayStudyPlan;
