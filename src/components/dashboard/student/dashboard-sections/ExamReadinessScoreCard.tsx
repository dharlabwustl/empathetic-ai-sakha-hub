
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const ExamReadinessScoreCard: React.FC = () => {
  const currentScore = 78;
  const targetScore = 85;
  const lastMonthScore = 72;
  const improvement = currentScore - lastMonthScore;
  
  const getScoreStatus = (score: number) => {
    if (score >= 80) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 70) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 60) return { status: 'Average', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { status: 'Needs Work', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const scoreStatus = getScoreStatus(currentScore);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <AnimatedHighlight 
        message="Keep checking how you are doing!"
        storageKey="exam-readiness-highlight-closed"
        className="bg-gradient-to-r from-blue-500 to-green-500"
      />
      
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-blue-200 to-green-200 dark:from-blue-800 dark:to-green-800">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Award className="h-5 w-5 text-blue-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#2563eb", "#059669", "#2563eb"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                Exam Readiness Score
              </motion.span>
            </div>
            <Badge className={`${scoreStatus.bgColor} ${scoreStatus.color}`}>
              {scoreStatus.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <div className="space-y-4">
            {/* Current Score Display */}
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentScore}%
              </motion.div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current Readiness</p>
            </div>

            {/* Progress to Target */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">Progress to Target ({targetScore}%)</span>
                <span className="text-gray-700 dark:text-gray-300">{Math.round((currentScore/targetScore) * 100)}%</span>
              </div>
              <Progress value={(currentScore/targetScore) * 100} className="h-3" />
            </div>

            {/* Improvement Indicator */}
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  {improvement > 0 ? '+' : ''}{improvement}% from last month
                </span>
              </div>
              {improvement > 0 ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-orange-600" />
              )}
            </div>

            {/* Subject Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <div className="text-lg font-bold text-blue-600">82%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Physics</div>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <div className="text-lg font-bold text-green-600">76%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Chemistry</div>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                <div className="text-lg font-bold text-purple-600">75%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Biology</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link to="/dashboard/student/practice-exam/2/start" className="flex-1">
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                >
                  <Target className="h-3 w-3 mr-1" />
                  Take Mock Test
                </Button>
              </Link>
              <Link to="/dashboard/student/analytics" className="flex-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full hover:bg-blue-50"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessScoreCard;
