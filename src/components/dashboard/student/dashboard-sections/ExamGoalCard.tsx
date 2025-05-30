
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, Clock, TrendingUp, Zap, ArrowRight, Trophy } from 'lucide-react';
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
    name: "NEET 2024",
    targetScore: 650,
    currentEstimate: 580,
    daysLeft: 85,
    progress: 78,
    lastAssessment: "2 days ago"
  };

  const progressPercentage = (examGoal.currentEstimate / examGoal.targetScore) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <Card className="shadow-lg border-2 border-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
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
                  color: ["#059669", "#10b981", "#059669"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                Exam Goal Tracker
              </motion.span>
            </div>
            {onMoodChange && (
              <MoodLogButton 
                currentMood={currentMood} 
                onMoodChange={onMoodChange} 
                size="sm" 
                showLabel={false}
              />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {/* Exam Goal Info */}
            <motion.div 
              className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700"
              animate={{ 
                boxShadow: ["0 0 10px rgba(16, 185, 129, 0.3)", "0 0 20px rgba(16, 185, 129, 0.5)", "0 0 10px rgba(16, 185, 129, 0.3)"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <h3 className="font-bold text-lg text-green-900 dark:text-green-100">{examGoal.name}</h3>
              <div className="flex justify-center items-center gap-4 mt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-700">{examGoal.currentEstimate}</p>
                  <p className="text-xs text-gray-600">Current Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-900">{examGoal.targetScore}</p>
                  <p className="text-xs text-gray-600">Target Score</p>
                </div>
              </div>
            </motion.div>

            {/* Progress Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Goal Progress</span>
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {Math.round(progressPercentage)}%
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between text-xs text-gray-600">
                <span>Score gap: {examGoal.targetScore - examGoal.currentEstimate} points</span>
                <span>Assessment: {examGoal.lastAssessment}</span>
              </div>
            </div>

            {/* Days Left Counter */}
            <motion.div 
              className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700"
              animate={{ 
                backgroundColor: ["rgb(255 251 235)", "rgb(254 243 199)", "rgb(255 251 235)"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-amber-600" />
                <span className="font-bold text-lg text-amber-900">{examGoal.daysLeft}</span>
                <span className="text-sm text-amber-700">days left</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Link to="/dashboard/student/practice-exam/2/start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    <Trophy className="h-3 w-3 mr-1" />
                    Take Mock Test
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/dashboard/student/academic-advisor">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full hover:bg-green-50 border-green-300"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Optimize Plan
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Switch Exam / New Plan */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/dashboard/student/academic-advisor">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full text-xs hover:bg-blue-50 border-blue-300"
                  >
                    <Target className="h-3 w-3 mr-1" />
                    Switch Exam
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/dashboard/student/academic-advisor">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full text-xs hover:bg-purple-50 border-purple-300"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    New Plan
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamGoalCard;
