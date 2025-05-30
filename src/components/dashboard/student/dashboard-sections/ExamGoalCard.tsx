
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, Zap, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import MoodLogButton from '../mood-tracking/MoodLogButton';

interface ExamGoalCardProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ExamGoalCard: React.FC<ExamGoalCardProps> = ({ currentMood, onMoodChange }) => {
  const examGoal = {
    name: "NEET 2026",
    daysLeft: 338,
    pace: "Moderate",
    style: "Visual",
    overallProgress: 72,
    weeklyProgress: 85,
    monthlyProgress: 68
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800 overflow-hidden h-[140px]">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Target className="h-5 w-5 text-green-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#059669", "#10b981", "#059669"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                Exam Goal Tracker
              </motion.span>
            </div>
            {onMoodChange && (
              <MoodLogButton 
                currentMood={currentMood} 
                onMoodChange={onMoodChange} 
                size="sm" 
                showLabel={false}
              />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2 pb-2">
          <div className="space-y-2">
            {/* Goal Info */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-green-900 dark:text-green-100">
                  Goal - {examGoal.name}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-green-600" />
                    <span className="text-base font-bold text-green-700">{examGoal.daysLeft}</span>
                    <span className="text-xs text-gray-600">Days Left</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                    {examGoal.pace}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-xs">
                    {examGoal.style}
                  </Badge>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-green-700">{examGoal.overallProgress}%</div>
                <div className="text-xs text-gray-600">Progress</div>
                <Progress value={examGoal.overallProgress} className="h-2 mt-1 w-12" />
              </div>
            </div>

            {/* Action Buttons - Same Row */}
            <div className="grid grid-cols-2 gap-2">
              <Link to="/dashboard/student/academic-advisor">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full hover:bg-blue-50 border-blue-300 text-xs"
                  >
                    <Target className="h-3 w-3 mr-1" />
                    Switch Plan
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/dashboard/student/academic-advisor">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full hover:bg-purple-50 border-purple-300 text-xs"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    New Plan
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

export default ExamGoalCard;
