
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, TrendingUp, RotateCcw, Plus, BookOpen, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface ExamGoalCardProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ExamGoalCard: React.FC<ExamGoalCardProps> = ({ currentMood, onMoodChange }) => {
  const currentGoal = {
    exam: "NEET 2026",
    targetScore: 650,
    currentScore: 580,
    daysRemaining: 338,
    status: "On Track",
    weeklyHours: 42,
    completedHours: 28,
    studyStreak: 12
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800 border-green-300';
      case 'Behind': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const progressPercentage = (currentGoal.currentScore / currentGoal.targetScore) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-green-200 to-teal-200 dark:from-green-800 dark:to-teal-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
                <Target className="h-5 w-5 text-green-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#059669", "#0d9488", "#059669"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                Current Exam Goal
              </motion.span>
            </div>
            <Badge className={getStatusColor(currentGoal.status)}>
              {currentGoal.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <div className="space-y-4">
            {/* Goal Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Target Exam</p>
                <p className="font-bold text-sm text-green-700">{currentGoal.exam}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Days Remaining</p>
                <p className="font-bold text-sm text-green-700">{currentGoal.daysRemaining}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Target Score</p>
                <p className="font-bold text-sm text-green-700">{currentGoal.targetScore}/720</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Current Score</p>
                <p className="font-bold text-sm text-green-700">{currentGoal.currentScore}/720</p>
              </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-3 gap-2 bg-green-50 p-3 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-3 w-3 text-green-600" />
                  <p className="text-xs text-gray-600">Weekly Hours</p>
                </div>
                <p className="font-bold text-sm text-green-700">{currentGoal.weeklyHours}h</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BookOpen className="h-3 w-3 text-green-600" />
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
                <p className="font-bold text-sm text-green-700">{currentGoal.completedHours}h</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <p className="text-xs text-gray-600">Streak</p>
                </div>
                <p className="font-bold text-sm text-green-700">{currentGoal.studyStreak} days</p>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 gap-2">
              <a 
                href="https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/academic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full hover:bg-green-50 text-xs"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Switch Exam
                </Button>
              </a>
              <a 
                href="https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/academic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full hover:bg-green-50 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  New Plan
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamGoalCard;
