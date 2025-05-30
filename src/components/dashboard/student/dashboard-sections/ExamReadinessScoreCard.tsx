
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, BarChart3, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import HighlightArrow from './HighlightArrow';

const ExamReadinessScoreCard: React.FC = () => {
  const readinessData = {
    overallScore: 78,
    status: "Good",
    subjects: [
      { name: "Physics", score: 72, trend: "up" },
      { name: "Chemistry", score: 81, trend: "up" },
      { name: "Biology", score: 82, trend: "stable" }
    ],
    lastUpdated: "2 hours ago",
    nextMilestone: 85,
    improvement: "+12 from last week"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800 border-green-300';
      case 'Good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Average': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Need Improvement': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default: return <BarChart3 className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Highlight Arrow */}
      <HighlightArrow 
        message="Keep checking how you are doing!"
        position="top"
        variant="info"
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 overflow-hidden h-full">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="font-bold text-blue-700">Exam Readiness Score</span>
            </div>
            <Badge className={getStatusColor(readinessData.status)}>
              {readinessData.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <div className="space-y-4">
            {/* Main Score Display */}
            <div className="text-center">
              <motion.div
                className={`text-4xl font-bold ${getScoreColor(readinessData.overallScore)}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {readinessData.overallScore}%
              </motion.div>
              <p className="text-sm text-gray-600 mt-1">{readinessData.improvement}</p>
            </div>

            {/* Progress to Next Milestone */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Next Milestone</span>
                <span className="text-gray-700">{readinessData.nextMilestone}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(readinessData.overallScore / readinessData.nextMilestone) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-800">Subject Breakdown</h4>
              {readinessData.subjects.map((subject, index) => (
                <div key={subject.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{subject.name}</span>
                    {getTrendIcon(subject.trend)}
                  </div>
                  <span className={`font-medium ${getScoreColor(subject.score)}`}>
                    {subject.score}%
                  </span>
                </div>
              ))}
            </div>

            {/* Last Updated */}
            <div className="text-xs text-gray-500 text-center">
              Last updated: {readinessData.lastUpdated}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessScoreCard;
