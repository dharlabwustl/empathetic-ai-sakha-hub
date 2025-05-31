
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, TrendingUp, Plus, RefreshCw, BookMarked } from 'lucide-react';
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
    <Card className="p-6 bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 border-purple-100 dark:border-purple-800/30 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Exam goal info section */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <BookMarked className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Current Exam Goal
              <Badge className={getStatusColor(currentGoal.status)}>
                {currentGoal.status}
              </Badge>
            </h2>
            
            <div className="flex items-center gap-4 mt-2">
              <span className="text-lg font-semibold text-green-700 dark:text-green-300">
                {currentGoal.exam}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentGoal.daysRemaining} days remaining
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Score: {currentGoal.currentScore}/{currentGoal.targetScore}
              </span>
            </div>
          </div>
        </div>

        {/* Progress and buttons section */}
        <div className="flex-1 min-w-[300px] ml-20">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700 dark:text-gray-300">Progress to Target</span>
              <span className="text-gray-700 dark:text-gray-300">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link to="/dashboard/student/academic" className="flex-1">
              <Button 
                size="sm" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Switch Exam
              </Button>
            </Link>
            <Link to="/dashboard/student/academic" className="flex-1">
              <Button 
                size="sm" 
                variant="outline"
                className="w-full hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExamGoalCard;
