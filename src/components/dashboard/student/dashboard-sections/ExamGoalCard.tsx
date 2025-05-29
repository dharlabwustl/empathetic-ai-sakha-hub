
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, Calendar, TrendingUp, Zap } from 'lucide-react';
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

  const examGoal = {
    exam: "NEET 2024",
    targetScore: 650,
    currentScore: 487,
    daysLeft: 89,
    progress: 75,
    subjects: [
      { name: "Physics", score: 145, total: 180 },
      { name: "Chemistry", score: 168, total: 180 },
      { name: "Biology", score: 174, total: 180 }
    ]
  };

  const progressPercentage = (examGoal.currentScore / examGoal.targetScore) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 shadow-lg">
        <CardHeader className="pb-3 relative z-10">
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
              <span className="gradient-text font-bold">Exam Goal Progress</span>
            </div>
            <MoodLogButton 
              currentMood={currentMood} 
              onMoodChange={onMoodChange}
              size="sm"
              showLabel={false}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">{examGoal.exam}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Target: {examGoal.targetScore} | Current: {examGoal.currentScore}
                </p>
              </div>
              <motion.div
                animate={{ 
                  borderColor: ["rgb(59, 130, 246)", "rgb(147, 51, 234)", "rgb(59, 130, 246)"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity
                }}
                className="text-center border-2 rounded-lg p-2"
              >
                <p className="text-xs text-gray-600 dark:text-gray-400">Days Left</p>
                <p className="font-bold text-blue-900 dark:text-blue-100">{examGoal.daysLeft}</p>
              </motion.div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">Overall Progress</span>
                <span className="text-gray-700 dark:text-gray-300">{progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white">Subject Breakdown</h4>
            {examGoal.subjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{subject.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {subject.score}/{subject.total}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {((subject.score / subject.total) * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              onClick={() => navigate('/dashboard/student/academic')}
            >
              <Zap className="h-3 w-3 mr-1" />
              Switch Exam
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 hover:bg-blue-50"
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
