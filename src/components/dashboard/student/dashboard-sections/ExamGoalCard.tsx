
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
    name: "NEET 2026",
    targetScore: 650,
    currentEstimate: 580,
    daysLeft: 338,
    progress: 78,
    pace: "Moderate",
    style: "Visual"
  };

  const progressPercentage = (examGoal.currentEstimate / examGoal.targetScore) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="premium-card shadow-xl border-2 border-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800 overflow-hidden">
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
              <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Exam Goal Tracker
              </span>
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
            {/* Goal Info */}
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
              <h3 className="font-bold text-xl text-green-900 dark:text-green-100 mb-2">Goal - {examGoal.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Days Left:</p>
                  <p className="font-bold text-lg text-green-700">{examGoal.daysLeft}</p>
                </div>
                <div>
                  <p className="text-gray-600">Pace:</p>
                  <p className="font-bold text-lg text-green-700">{examGoal.pace}</p>
                </div>
                <div>
                  <p className="text-gray-600">Style:</p>
                  <p className="font-bold text-lg text-green-700">{examGoal.style}</p>
                </div>
                <div>
                  <p className="text-gray-600">Progress:</p>
                  <p className="font-bold text-lg text-green-700">{examGoal.progress}%</p>
                </div>
              </div>
            </motion.div>

            {/* Switch Exam & New Plan Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Link to="/dashboard/student/academic">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full hover:bg-blue-50 border-blue-300"
                  >
                    <Target className="h-3 w-3 mr-1" />
                    Switch Exam
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/dashboard/student/academic">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full hover:bg-purple-50 border-purple-300"
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
