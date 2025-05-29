
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Calendar, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import MoodLogButton from '../mood-tracking/MoodLogButton';

interface ExamGoalCardProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ExamGoalCard: React.FC<ExamGoalCardProps> = ({ currentMood, onMoodChange }) => {
  const navigate = useNavigate();
  const [localMood, setLocalMood] = useState<MoodType | undefined>(currentMood);

  const handleMoodChange = (mood: MoodType) => {
    setLocalMood(mood);
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  const examGoal = {
    name: "NEET 2025",
    daysLeft: 156,
    targetScore: 650,
    currentPreparation: 68,
    lastMockScore: 542
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                Exam Goal
              </span>
            </div>
            <MoodLogButton 
              currentMood={localMood} 
              onMoodChange={handleMoodChange}
              size="sm"
              showLabel={false}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">{examGoal.name}</h3>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{examGoal.daysLeft}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Days Left</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{examGoal.targetScore}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Target Score</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Preparation Progress</span>
              <span className="font-medium">{examGoal.currentPreparation}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${examGoal.currentPreparation}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Last Mock Score:</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              {examGoal.lastMockScore} <TrendingUp className="h-3 w-3 ml-1" />
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              onClick={() => navigate('/dashboard/student/academic')}
            >
              <Zap className="h-3 w-3 mr-1" />
              Switch Plan
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              onClick={() => navigate('/dashboard/student/academic')}
            >
              <Calendar className="h-3 w-3 mr-1" />
              New Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamGoalCard;
