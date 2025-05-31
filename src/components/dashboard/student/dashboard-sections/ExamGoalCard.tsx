
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, TrendingUp, Plus, RefreshCw } from 'lucide-react';
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
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-green-200 to-teal-200 dark:from-green-800 dark:to-teal-800 overflow-hidden h-full">
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
            {/* Goal Overview - Compact Grid */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Target Exam</p>
                <p className="font-bold text-sm text-green-700">{currentGoal.exam}</p>
              </div>
              <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Days Left</p>
                <p className="font-bold text-sm text-teal-700">{currentGoal.daysRemaining}</p>
              </div>
            </div>

            {/* Score Progress */}
            <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-600">Score Progress</span>
                <span className="text-xs font-medium text-green-600">{currentGoal.currentScore}/{currentGoal.targetScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <div className="text-xs text-gray-600 mt-1 text-center">
                {Math.round(progressPercentage)}% to target
              </div>
            </div>

            {/* Simple Action Buttons - No highlighting */}
            <div className="flex gap-2">
              <Link to="/dashboard/student/academic-advisor" className="flex-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full text-xs border-green-200 hover:bg-green-50 text-green-700"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Switch Plan
                </Button>
              </Link>
              <Link to="/dashboard/student/academic-advisor" className="flex-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full text-xs border-teal-200 hover:bg-teal-50 text-teal-700"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  New Plan
                </Button>
              </Link>
            </div>

            {/* Additional KPIs */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">78%</div>
                <div className="text-xs text-gray-600">Readiness</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">12</div>
                <div className="text-xs text-gray-600">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">24h</div>
                <div className="text-xs text-gray-600">Week Hours</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamGoalCard;
