
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, TrendingUp, BookOpen, Clock } from 'lucide-react';
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
    status: "On Track"
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
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Current Exam Goal
              </span>
            </div>
            <Badge className={getStatusColor(currentGoal.status)}>
              {currentGoal.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Goal KPIs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Target Exam</p>
                <p className="font-semibold text-blue-700 dark:text-blue-300">{currentGoal.exam}</p>
              </div>
              
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Days Left</p>
                <p className="font-semibold text-orange-700 dark:text-orange-300">{currentGoal.daysRemaining}</p>
              </div>
              
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Target className="h-5 w-5 text-green-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Target Score</p>
                <p className="font-semibold text-green-700 dark:text-green-300">{currentGoal.targetScore}/720</p>
              </div>
              
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Score</p>
                <p className="font-semibold text-purple-700 dark:text-purple-300">{currentGoal.currentScore}/720</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">Progress to Target</span>
                <span className="text-gray-700 dark:text-gray-300">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Simple Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Link to="/dashboard/student/academic" className="flex-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full text-xs"
                >
                  Switch Plan
                </Button>
              </Link>
              <Link to="/dashboard/student/academic" className="flex-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full text-xs"
                >
                  New Plan
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamGoalCard;
