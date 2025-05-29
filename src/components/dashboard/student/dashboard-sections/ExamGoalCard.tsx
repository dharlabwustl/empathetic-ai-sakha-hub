
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, BookOpen, TrendingUp, Zap, Clock, AlertTriangle } from 'lucide-react';
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
  const [localMood, setLocalMood] = useState(currentMood);

  const handleMoodChange = (mood: MoodType) => {
    setLocalMood(mood);
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  const examData = {
    examName: "NEET 2025",
    daysLeft: 156,
    overallProgress: 72,
    targetScore: 650,
    currentProjectedScore: 580,
    lastScore: 545
  };

  const getProgressColor = () => {
    if (examData.overallProgress >= 80) return "bg-green-500";
    if (examData.overallProgress >= 60) return "bg-blue-500";
    if (examData.overallProgress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getUrgencyLevel = () => {
    if (examData.daysLeft <= 60) return { level: "HIGH", color: "text-red-600", bgColor: "bg-red-100" };
    if (examData.daysLeft <= 120) return { level: "MODERATE", color: "text-orange-600", bgColor: "bg-orange-100" };
    return { level: "LOW", color: "text-green-600", bgColor: "bg-green-100" };
  };

  const urgency = getUrgencyLevel();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="premium-card hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
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
                <Target className="h-5 w-5 text-blue-600" />
              </motion.div>
              <span className="gradient-text font-bold">{examData.examName} Goal</span>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Days Remaining</span>
            </div>
            <div className="text-right">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity
                }}
                className="text-2xl font-bold text-blue-600"
              >
                {examData.daysLeft}
              </motion.div>
              <Badge className={`${urgency.bgColor} ${urgency.color} text-xs`}>
                {urgency.level} URGENCY
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">Overall Progress</span>
              <span className="font-medium">{examData.overallProgress}%</span>
            </div>
            <div className="relative">
              <Progress value={examData.overallProgress} className="h-3" />
              <motion.div
                className={`absolute top-0 left-0 h-3 rounded-full ${getProgressColor()}`}
                initial={{ width: 0 }}
                animate={{ width: `${examData.overallProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg border border-blue-100">
              <p className="text-xs text-gray-600 dark:text-gray-400">Target Score</p>
              <p className="text-lg font-bold text-green-600">{examData.targetScore}</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg border border-purple-100">
              <p className="text-xs text-gray-600 dark:text-gray-400">Projected Score</p>
              <p className="text-lg font-bold text-blue-600">{examData.currentProjectedScore}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">
                Last Practice: <span className="font-medium">{examData.lastScore}</span>
              </span>
              <Badge className="bg-green-100 text-green-800 text-xs">
                +{examData.currentProjectedScore - examData.lastScore} improvement
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              onClick={() => navigate('/dashboard/student/practice-exam/2/start')}
            >
              <Zap className="h-3 w-3 mr-1" />
              Take Exam
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="hover:bg-purple-50 border-purple-200"
              onClick={() => navigate('/dashboard/student/academic')}
            >
              <BookOpen className="h-3 w-3 mr-1" />
              Switch Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamGoalCard;
