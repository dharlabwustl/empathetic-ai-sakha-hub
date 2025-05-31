
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, AlertCircle, CheckCircle, Target, BarChart3, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const ExamReadinessScoreCard: React.FC = () => {
  const examReadiness = {
    currentScore: 78,
    targetScore: 85,
    trend: 'up',
    change: 5,
    breakdown: [
      { subject: 'Physics', score: 82, trend: 'up' },
      { subject: 'Chemistry', score: 75, trend: 'down' },
      { subject: 'Biology', score: 77, trend: 'up' }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-green-100 text-green-800 border-green-300' };
    if (score >= 70) return { label: 'Good', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    return { label: 'Needs Work', color: 'bg-red-100 text-red-800 border-red-300' };
  };

  const status = getScoreStatus(examReadiness.currentScore);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-3 w-3 text-green-500" />;
      case 'down': return <ArrowDown className="h-3 w-3 text-red-500" />;
      default: return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <AnimatedHighlight
        text="Keep checking how you are doing!"
        storageKey="exam_readiness_check"
        variant="info"
      />
      
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 360, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#2563eb", "#7c3aed", "#2563eb"]
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
            <Badge className={status.color}>
              {status.label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <div className="space-y-4">
            {/* Main Score Display */}
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold mb-2"
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className={getScoreColor(examReadiness.currentScore)}>
                  {examReadiness.currentScore}%
                </span>
              </motion.div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Target: {examReadiness.targetScore}%</span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(examReadiness.trend)}
                  <span className={examReadiness.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {examReadiness.change}%
                  </span>
                </div>
              </div>
            </div>

            {/* Progress to Target */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">Progress to Target</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {Math.round((examReadiness.currentScore / examReadiness.targetScore) * 100)}%
                </span>
              </div>
              <Progress 
                value={(examReadiness.currentScore / examReadiness.targetScore) * 100} 
                className="h-2" 
              />
            </div>

            {/* Subject Breakdown */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Subject Breakdown</h4>
              {examReadiness.breakdown.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    {getTrendIcon(subject.trend)}
                  </div>
                  <span className={`font-semibold ${getScoreColor(subject.score)}`}>
                    {subject.score}%
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Link to="/dashboard/student/analytics" className="flex-1">
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  View Analytics
                </Button>
              </Link>
              <Link to="/dashboard/student/practice-exam" className="flex-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full hover:bg-blue-50"
                >
                  <Target className="h-3 w-3 mr-1" />
                  Take Test
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
