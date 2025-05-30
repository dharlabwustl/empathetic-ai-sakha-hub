
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Calendar, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const ExamReadinessScoreCard: React.FC = () => {
  const readinessData = {
    overallReadiness: 72,
    confidenceLevel: 78,
    predictedScore: 685,
    maxScore: 720,
    daysRemaining: 338,
    targetExam: "NEET 2026"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <TrendingUp className="h-5 w-5 text-blue-600" />
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
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-6">
            {/* Overall Readiness - Big, Bold, Highlighted */}
            <motion.div 
              className="text-center p-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border-2 border-blue-300 dark:border-blue-700"
              animate={{ 
                backgroundColor: ["rgb(219 234 254)", "rgb(237 233 254)", "rgb(219 234 254)"],
                boxShadow: ["0 0 15px rgba(59, 130, 246, 0.3)", "0 0 25px rgba(124, 58, 237, 0.4)", "0 0 15px rgba(59, 130, 246, 0.3)"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h3 className="text-5xl font-black text-blue-900 dark:text-blue-100 mb-2">
                  {readinessData.overallReadiness}%
                </h3>
                <Badge className="bg-green-100 text-green-800 border-green-300 text-lg font-bold px-4 py-2">
                  Ready
                </Badge>
                <p className="text-lg font-bold text-blue-800 dark:text-blue-200 mt-2">
                  Overall Readiness
                </p>
              </motion.div>
            </motion.div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {/* Confidence Level */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence Level</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {readinessData.confidenceLevel}%
                </p>
                <Progress value={readinessData.confidenceLevel} className="h-2 mt-2" />
              </div>

              {/* Predicted Score */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Predicted Score</span>
                </div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  {readinessData.predictedScore}/{readinessData.maxScore}
                </p>
                <Progress value={(readinessData.predictedScore / readinessData.maxScore) * 100} className="h-2 mt-2" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
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
                  <span className="font-bold text-lg text-amber-900">{readinessData.daysRemaining}</span>
                </div>
                <span className="text-sm text-amber-700">Days Remaining</span>
              </motion.div>
              
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="font-bold text-blue-900 dark:text-blue-100">{readinessData.targetExam}</p>
                <span className="text-sm text-blue-700 dark:text-blue-300">Target Exam</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessScoreCard;
