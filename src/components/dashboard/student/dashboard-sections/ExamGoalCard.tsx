
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, Trophy, Users, BookOpen, RotateCcw, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import MoodLogButton from '../mood-tracking/MoodLogButton';

interface ExamGoalCardProps {
  currentMood?: MoodType;
  onMoodSelect?: (mood: MoodType) => void;
}

const ExamGoalCard: React.FC<ExamGoalCardProps> = ({ currentMood, onMoodSelect }) => {
  const navigate = useNavigate();

  const examData = {
    name: "NEET 2025",
    daysLeft: 156,
    progress: 68,
    rank: 15420,
    totalCandidates: 2000000,
    lastScore: 486,
    targetScore: 650,
    improvements: [
      { subject: "Physics", change: "+12" },
      { subject: "Chemistry", change: "-3" },
      { subject: "Biology", change: "+8" }
    ]
  };

  const getProgressColor = () => {
    if (examData.progress >= 75) return "bg-green-500";
    if (examData.progress >= 50) return "bg-blue-500";
    return "bg-orange-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Trophy className="h-5 w-5 text-blue-600" />
              </motion.div>
              <span className="font-bold text-blue-900 dark:text-blue-100">
                {examData.name} Goal
              </span>
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300">
              Active
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Days countdown */}
          <motion.div 
            className="text-center p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border border-red-200 dark:border-red-800"
            animate={{ 
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800 dark:text-red-300">Days Remaining</span>
            </div>
            <p className="text-2xl font-bold text-red-900 dark:text-red-100">{examData.daysLeft}</p>
          </motion.div>

          {/* Progress section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-bold text-blue-900 dark:text-blue-100">{examData.progress}%</span>
            </div>
            <Progress value={examData.progress} className="h-2" />
          </div>

          {/* Score info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">Last Score</p>
              <p className="text-lg font-bold">{examData.lastScore}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-xs text-green-600 dark:text-green-400">Target Score</p>
              <p className="text-lg font-bold text-green-700 dark:text-green-300">{examData.targetScore}</p>
            </div>
          </div>

          {/* Mood logging section */}
          <div className="bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg border border-violet-200 dark:border-violet-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Study Mood</span>
              <Clock className="h-3 w-3 text-violet-600" />
            </div>
            <div className="flex justify-center">
              <MoodLogButton 
                currentMood={currentMood} 
                onMoodChange={onMoodSelect} 
                size="sm"
                showLabel={true}
              />
            </div>
          </div>

          {/* Action buttons - FIXED ROUTING */}
          <div className="grid grid-cols-2 gap-2">
            <Link to="/dashboard/student/practice-exam/2/start">
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Target className="h-3 w-3 mr-1" />
                Take Exam
              </Button>
            </Link>
            <Link to="/dashboard/student/flashcards/1/interactive">
              <Button size="sm" variant="outline" className="w-full">
                <RotateCcw className="h-3 w-3 mr-1" />
                Recall Practice
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to="/dashboard/student/academic">
              <Button size="sm" variant="outline" className="w-full">
                <BookOpen className="h-3 w-3 mr-1" />
                Switch Exam
              </Button>
            </Link>
            <Link to="/dashboard/student/academic">
              <Button size="sm" variant="outline" className="w-full">
                <Zap className="h-3 w-3 mr-1" />
                New Plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamGoalCard;
