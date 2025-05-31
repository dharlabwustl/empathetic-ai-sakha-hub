
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, BarChart3, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const ExamReadinessScoreCard: React.FC = () => {
  const [showHighlight, setShowHighlight] = useState(false);

  useEffect(() => {
    const hasSeenHighlight = localStorage.getItem('hasSeenExamReadinessHighlight') === 'true';
    if (!hasSeenHighlight) {
      setShowHighlight(true);
    }
  }, []);

  const handleCloseHighlight = () => {
    setShowHighlight(false);
    localStorage.setItem('hasSeenExamReadinessHighlight', 'true');
  };

  const examReadiness = {
    currentScore: 68,
    previousScore: 60,
    weeklyGrowth: 8,
    targetScore: 85,
    daysToImprove: 45
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <AnimatedHighlight
        message="Keep checking how you are doing"
        position="top"
        isVisible={showHighlight}
        onClose={handleCloseHighlight}
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-800 dark:to-orange-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 pb-3">
          <CardTitle className="flex items-center justify-between">
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
                <Target className="h-5 w-5 text-yellow-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#d97706", "#ea580c", "#d97706"]
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
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <Badge className="bg-green-100 text-green-800 border-green-300">
                +{examReadiness.weeklyGrowth}% this week
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <div className="space-y-4">
            {/* Current Score Display */}
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`text-4xl font-bold ${getScoreColor(examReadiness.currentScore)}`}
              >
                {examReadiness.currentScore}%
              </motion.div>
              <p className="text-sm text-gray-600 mt-1">Current Readiness Level</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Target ({examReadiness.targetScore}%)</span>
                <span>{Math.round((examReadiness.currentScore / examReadiness.targetScore) * 100)}%</span>
              </div>
              <Progress 
                value={(examReadiness.currentScore / examReadiness.targetScore) * 100} 
                className="h-3"
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className={`p-3 rounded-lg ${getScoreBgColor(examReadiness.currentScore)}`}>
                <p className="text-xs text-gray-600">Previous Score</p>
                <p className="font-bold text-lg">{examReadiness.previousScore}%</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <p className="text-xs text-gray-600">Days to Improve</p>
                <p className="font-bold text-lg text-blue-600">{examReadiness.daysToImprove}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link to="/dashboard/student/practice-exam/2/start" className="flex-1">
                <Button 
                  size="sm" 
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Take Mock Test
                </Button>
              </Link>
              <Link to="/dashboard/student/analytics" className="flex-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full hover:bg-yellow-50"
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  View Analytics
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
