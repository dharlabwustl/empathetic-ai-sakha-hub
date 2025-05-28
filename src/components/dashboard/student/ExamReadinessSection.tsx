
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Brain, BookOpen, Award, Zap } from 'lucide-react';

interface ExamReadinessSectionProps {
  score: number;
  previousScore?: number;
  weeklyTrends?: Array<{ week: string; score: number }>;
  weakAreas?: string[];
  strongAreas?: string[];
  predictedScore?: number;
  recallMastery?: number;
  averageExamScore?: number;
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({
  score,
  previousScore = 50,
  weeklyTrends = [],
  weakAreas = [],
  strongAreas = [],
  predictedScore = 78,
  recallMastery = 82,
  averageExamScore = 75
}) => {
  const scoreIncrease = score - previousScore;
  const isImproving = scoreIncrease > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Priority highlight animation */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-lg blur opacity-75 animate-pulse"></div>
      
      <Card className="relative bg-white dark:bg-gray-900 border-2 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-green-600" />
              Exam Readiness Score - NEET 2026
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="h-5 w-5 text-yellow-500" />
              </motion.div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {score}%
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className={`h-4 w-4 ${isImproving ? 'text-green-500' : 'text-red-500'}`} />
                <span className={isImproving ? 'text-green-600' : 'text-red-600'}>
                  {isImproving ? '+' : ''}{scoreIncrease}%
                </span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side - Progress and scores */}
            <div className="space-y-4">
              <div className="relative">
                <Progress value={score} className="h-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">Overall Readiness</span>
                </div>
              </div>
              
              {/* Enhanced metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Brain className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-lg font-bold text-blue-600">{predictedScore}%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Predicted Score</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <BookOpen className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                  <div className="text-lg font-bold text-purple-600">{recallMastery}%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Recall Mastery</div>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Award className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                  <div className="text-lg font-bold text-orange-600">{averageExamScore}%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Avg Exam Score</div>
                </div>
              </div>
              
              {/* Areas for improvement */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Weak Areas</h4>
                <div className="flex flex-wrap gap-1">
                  {weakAreas.slice(0, 3).map((area, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs rounded"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Strong Areas</h4>
                <div className="flex flex-wrap gap-1">
                  {strongAreas.slice(0, 3).map((area, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs rounded"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right side - Trend chart */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Weekly Progress Trend</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      domain={[0, 100]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessSection;
