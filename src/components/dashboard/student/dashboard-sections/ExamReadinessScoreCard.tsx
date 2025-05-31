
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, AlertTriangle, CheckCircle, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const ExamReadinessScoreCard: React.FC = () => {
  const currentScore = 65;
  const previousScore = 58;
  const targetScore = 80;
  const improvement = currentScore - previousScore;
  const progressToTarget = (currentScore / targetScore) * 100;

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 75) return { text: 'Excellent', class: 'bg-green-100 text-green-800 border-green-300' };
    if (score >= 60) return { text: 'Good', class: 'bg-orange-100 text-orange-800 border-orange-300' };
    return { text: 'Needs Work', class: 'bg-red-100 text-red-800 border-red-300' };
  };

  const badge = getScoreBadge(currentScore);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Animated Highlight */}
      <AnimatedHighlight 
        text="Keep checking how you are doing!"
        storageKey="readiness-highlight-closed"
      />
      
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 pb-3">
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
                <BarChart3 className="h-5 w-5 text-green-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#059669", "#2563eb", "#059669"]
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
            <Badge className={badge.class}>
              {badge.text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {/* Score Display */}
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`text-6xl font-bold ${getScoreColor(currentScore)}`}
              >
                {currentScore}%
              </motion.div>
              <div className="flex items-center justify-center gap-2 mt-2">
                {improvement > 0 ? (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      color: ["#059669", "#16a34a", "#059669"]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity
                    }}
                    className="flex items-center gap-1 text-green-600"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+{improvement} from last week</span>
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">No improvement this week</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress to Target */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">Progress to Target ({targetScore}%)</span>
                <span className="text-gray-700 dark:text-gray-300">{Math.round(progressToTarget)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToTarget}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">78%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Concept Clarity</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Problem Solving</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">72%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Speed</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link to="/dashboard/student/practice-exam/2/start" className="flex-1">
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Target className="h-3 w-3 mr-1" />
                  Take Test
                </Button>
              </Link>
              <Link to="/dashboard/student/analytics" className="flex-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full hover:bg-green-50"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
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
