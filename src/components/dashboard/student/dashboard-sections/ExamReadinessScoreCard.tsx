
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, TrendingUp, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExamReadinessScoreCardProps {
  overallReadiness?: number;
  confidenceLevel?: number;
  predictedScore?: number;
  maxScore?: number;
  daysRemaining?: number;
  targetExam?: string;
}

const ExamReadinessScoreCard: React.FC<ExamReadinessScoreCardProps> = ({
  overallReadiness = 72,
  confidenceLevel = 78,
  predictedScore = 685,
  maxScore = 720,
  daysRemaining = 338,
  targetExam = "NEET 2026"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="premium-card shadow-xl border-2 border-gradient-to-r from-emerald-200 to-teal-200 dark:from-emerald-800 dark:to-teal-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
          <CardTitle className="flex items-center gap-2">
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
              <Trophy className="h-5 w-5 text-emerald-600" />
            </motion.div>
            <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Exam Readiness Score
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Overall Readiness - Main highlight */}
            <motion.div 
              className="text-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700"
              animate={{ 
                boxShadow: ["0 0 20px rgba(16, 185, 129, 0.3)", "0 0 30px rgba(16, 185, 129, 0.5)", "0 0 20px rgba(16, 185, 129, 0.3)"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <h3 className="text-4xl font-black text-emerald-700 dark:text-emerald-300 mb-2">
                  {overallReadiness}%
                </h3>
                <p className="text-xl font-bold text-emerald-900 dark:text-emerald-100">Overall Readiness</p>
              </motion.div>
              <Badge className="mt-2 bg-emerald-100 text-emerald-800 border-emerald-300 text-lg px-4 py-1">
                Ready
              </Badge>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Confidence Level */}
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{confidenceLevel}%</p>
                <p className="text-sm text-blue-600">Confidence Level</p>
              </div>

              {/* Predicted Score */}
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700">{predictedScore}/{maxScore}</p>
                <p className="text-sm text-purple-600">Predicted Score</p>
              </div>

              {/* Days Remaining */}
              <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                <Calendar className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-amber-700">{daysRemaining}</p>
                <p className="text-sm text-amber-600">Days Remaining</p>
              </div>

              {/* Target Exam */}
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <Trophy className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-green-700">{targetExam}</p>
                <p className="text-sm text-green-600">Target Exam</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Readiness Progress</span>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                  {overallReadiness}%
                </Badge>
              </div>
              <Progress value={overallReadiness} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessScoreCard;
