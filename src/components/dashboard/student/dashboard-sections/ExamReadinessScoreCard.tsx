
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, BarChart3, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedHighlight from './AnimatedHighlight';

const ExamReadinessScoreCard: React.FC = () => {
  const [showHighlight, setShowHighlight] = useState(true);
  
  const examReadinessData = {
    overallScore: 78,
    subjects: [
      { name: "Physics", score: 75, color: "bg-blue-500" },
      { name: "Chemistry", score: 82, color: "bg-green-500" },
      { name: "Biology", score: 77, color: "bg-purple-500" }
    ],
    trend: "+5",
    lastWeekScore: 73,
    targetScore: 85
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Animated Highlight */}
      {showHighlight && (
        <AnimatedHighlight
          message="Keep checking how you are doing!"
          position="top-center"
          color="blue"
          onClose={() => setShowHighlight(false)}
        />
      )}

      <Card className="premium-card shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-700">
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
              <BarChart3 className="h-5 w-5" />
            </motion.div>
            Exam Readiness Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Overall Score */}
          <div className="text-center">
            <motion.div
              className={`text-4xl font-bold ${getScoreColor(examReadinessData.overallScore)}`}
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {examReadinessData.overallScore}%
            </motion.div>
            <p className="text-sm text-gray-600 mb-2">Overall Readiness</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">
                {examReadinessData.trend} from last week
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Target ({examReadinessData.targetScore}%)</span>
              <span>{Math.round((examReadinessData.overallScore / examReadinessData.targetScore) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradient(examReadinessData.overallScore)}`}
                initial={{ width: 0 }}
                animate={{ width: `${(examReadinessData.overallScore / examReadinessData.targetScore) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Subject Breakdown</h4>
            {examReadinessData.subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                  <span className="text-sm font-medium">{subject.name}</span>
                </div>
                <span className={`text-sm font-bold ${getScoreColor(subject.score)}`}>
                  {subject.score}%
                </span>
              </motion.div>
            ))}
          </div>

          {/* Achievement Badge */}
          <motion.div
            className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            animate={{ 
              backgroundColor: ["rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0.2)", "rgba(59, 130, 246, 0.1)"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Above Average Performance!
            </span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessScoreCard;
