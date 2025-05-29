
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, Trophy, Users, ArrowRight } from 'lucide-react';
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
    name: "NEET 2025",
    daysLeft: 156,
    progress: 68,
    rank: "Top 1%",
    totalQuestions: 180,
    targetScore: 650,
    currentPrep: 68
  };

  return (
    <Card className="relative overflow-hidden shadow-lg border-2 border-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Target className="h-5 w-5 text-purple-600" />
            </motion.div>
            <span className="text-lg font-bold">Exam Goal</span>
          </div>
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            {examGoal.name}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800"
            animate={{ 
              boxShadow: ["0 0 10px rgba(239, 68, 68, 0.3)", "0 0 20px rgba(239, 68, 68, 0.5)", "0 0 10px rgba(239, 68, 68, 0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Days Left</span>
            </div>
            <p className="text-2xl font-bold text-red-900 dark:text-red-100">{examGoal.daysLeft}</p>
          </motion.div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Target Rank</span>
            </div>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">{examGoal.rank}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">Preparation Progress</span>
            <span className="text-gray-700 dark:text-gray-300">{examGoal.progress}%</span>
          </div>
          <Progress value={examGoal.progress} className="h-3" />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">How are you feeling?</span>
            <MoodLogButton 
              currentMood={currentMood}
              onMoodChange={onMoodChange}
              size="sm"
              showLabel={false}
            />
          </div>
          <div className="text-xs text-gray-500">
            Target: {examGoal.targetScore}/{examGoal.totalQuestions}
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Link to="/dashboard/student/academic" className="flex-1">
            <Button size="sm" variant="outline" className="w-full">
              Switch Exam
            </Button>
          </Link>
          <Link to="/dashboard/student/academic" className="flex-1">
            <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              New Plan <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamGoalCard;
