
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, Calendar, TrendingUp, BookOpen, Brain } from 'lucide-react';
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
  
  const examData = {
    name: "NEET 2024",
    daysLeft: 147,
    progress: 68,
    targetScore: 650,
    currentScore: 520,
    lastPracticeScore: 545
  };

  return (
    <Card className="relative overflow-hidden border-2 border-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            {examData.name} Goal
          </CardTitle>
          <MoodLogButton 
            currentMood={currentMood}
            onMoodChange={onMoodChange}
            size="sm"
            showLabel={false}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div 
          className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg"
          animate={{ 
            boxShadow: ["0 0 10px rgba(147, 51, 234, 0.3)", "0 0 20px rgba(147, 51, 234, 0.5)", "0 0 10px rgba(147, 51, 234, 0.3)"]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Exam Readiness</span>
            <span className="text-sm font-bold">{examData.progress}%</span>
          </div>
          <Progress value={examData.progress} className="h-2 mb-2" />
          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{examData.daysLeft} days left</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>Target: {examData.targetScore}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            onClick={() => navigate('/dashboard/student/academic')}
          >
            <BookOpen className="h-3 w-3 mr-1" />
            Switch Exam
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => navigate('/dashboard/student/academic')}
          >
            <Brain className="h-3 w-3 mr-1" />
            New Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamGoalCard;
