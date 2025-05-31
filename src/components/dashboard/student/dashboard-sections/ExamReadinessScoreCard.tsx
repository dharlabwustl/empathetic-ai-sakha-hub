
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const ExamReadinessScoreCard: React.FC = () => {
  const readinessScore = 78;
  const previousScore = 72;
  const improvement = readinessScore - previousScore;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { text: 'Good', color: 'bg-orange-100 text-orange-800' };
    return { text: 'Needs Work', color: 'bg-red-100 text-red-800' };
  };

  const scoreBadge = getScoreBadge(readinessScore);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Animated Highlight */}
      <AnimatedHighlight 
        message="Keep checking how you are doing!" 
        position="top-right"
        arrowDirection="down"
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-800 dark:to-cyan-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Target className="h-5 w-5 text-blue-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#2563eb", "#0891b2", "#2563eb"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                NEET Exam Readiness Score
              </motion.span>
            </div>
            <Badge className={scoreBadge.color}>
              {scoreBadge.text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Score Display */}
          <div className="text-center">
            <motion.div 
              className={`text-6xl font-bold ${getScoreColor(readinessScore)}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {readinessScore}
              <span className="text-2xl text-gray-500">/100</span>
            </motion.div>
            
            <div className="flex items-center justify-center gap-2 mt-2">
              <motion.div
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {improvement > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                )}
              </motion.div>
              <span className={`text-sm ${improvement > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                {improvement > 0 ? '+' : ''}{improvement} from last week
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{readinessScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full flex items-center justify-end pr-1"
                initial={{ width: 0 }}
                animate={{ width: `${readinessScore}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <CheckCircle className="h-3 w-3 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link to="/dashboard/student/practice-exam/2/start">
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Target className="h-3 w-3 mr-1" />
                Take Mock Test
              </Button>
            </Link>
            <Link to="/dashboard/student/academic">
              <Button size="sm" variant="outline" className="w-full hover:bg-blue-50">
                View Analysis
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessScoreCard;
