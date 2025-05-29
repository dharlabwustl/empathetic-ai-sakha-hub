
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Book } from "lucide-react";
import { motion } from "framer-motion";

interface ExamReadinessSectionProps {
  examReadinessData: {
    overallScore: number;
    subjects: Array<{
      name: string;
      score: number;
      color: string;
    }>;
    weeklyProgress: Array<{
      week: string;
      score: number;
    }>;
  };
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({ examReadinessData }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="h-6 w-6 text-indigo-600" />
              NEET Exam Readiness
            </CardTitle>
            <Badge className={`font-bold ${getScoreBadge(examReadinessData.overallScore)}`}>
              {examReadinessData.overallScore}% Ready
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Readiness</span>
              <span className={`font-bold ${getScoreColor(examReadinessData.overallScore)}`}>
                {examReadinessData.overallScore}%
              </span>
            </div>
            <Progress value={examReadinessData.overallScore} className="h-3" />
          </div>

          {/* Subject Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examReadinessData.subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                    <span className="font-medium">{subject.name}</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(subject.score)}`}>
                    {subject.score}%
                  </span>
                </div>
                <Progress value={subject.score} className="h-2" />
              </motion.div>
            ))}
          </div>

          {/* Weekly Progress Trend */}
          <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium">Weekly Progress Trend</span>
            </div>
            <div className="flex items-end justify-between h-20 space-x-2">
              {examReadinessData.weeklyProgress.map((week, index) => (
                <div key={week.week} className="flex flex-col items-center flex-1">
                  <motion.div
                    className="bg-indigo-500 rounded-t-sm w-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${week.score}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {week.week.replace('Week ', 'W')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessSection;
