
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, FileText, ChevronRight, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ExamReadinessProps {
  examReadiness: {
    overall: number;
    conceptMastery: number;
    practiceCompletion: number;
    mockTestResults: number;
    cutoffTarget: number;
    examName: string;
  };
}

const ExamReadinessSection = ({ examReadiness }: ExamReadinessProps) => {
  const getProgressColor = (value: number, target: number) => {
    const ratio = value / target;
    if (ratio >= 0.9) return "bg-green-500";
    if (ratio >= 0.7) return "bg-blue-500";
    if (ratio >= 0.5) return "bg-amber-500";
    return "bg-red-500";
  };

  const getProgressStatus = (value: number, target: number) => {
    const ratio = value / target;
    if (ratio >= 0.9) return "Excellent";
    if (ratio >= 0.7) return "Good";
    if (ratio >= 0.5) return "Average";
    return "Needs Improvement";
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {examReadiness.examName} Readiness Score
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-2">
            <div className="flex flex-col items-center justify-center h-full">
              <motion.div 
                className="relative w-40 h-40"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{examReadiness.overall}%</span>
                    <span className="text-sm text-muted-foreground">Overall Readiness</span>
                  </div>
                </div>
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={examReadiness.overall >= examReadiness.cutoffTarget ? "#22c55e" : "#3b82f6"}
                    strokeWidth="8"
                    strokeDasharray={`${examReadiness.overall * 2.83} 283`}
                    initial={{ strokeDasharray: "0 283" }}
                    animate={{ strokeDasharray: `${examReadiness.overall * 2.83} 283` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </svg>
              </motion.div>
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span className="text-sm">Cutoff Target: {examReadiness.cutoffTarget}%</span>
                </div>
                
                <Button variant="link" className="mt-2 p-0 h-auto">
                  View Detailed Analysis <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Concept Mastery</span>
                </div>
                <span className="text-sm font-medium">
                  {examReadiness.conceptMastery}%
                </span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              >
                <Progress
                  value={examReadiness.conceptMastery}
                  className="h-2"
                  indicatorClassName={getProgressColor(examReadiness.conceptMastery, examReadiness.cutoffTarget)}
                />
              </motion.div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-muted-foreground">
                  {getProgressStatus(examReadiness.conceptMastery, examReadiness.cutoffTarget)}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Practice Completion</span>
                </div>
                <span className="text-sm font-medium">
                  {examReadiness.practiceCompletion}%
                </span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Progress
                  value={examReadiness.practiceCompletion}
                  className="h-2"
                  indicatorClassName={getProgressColor(examReadiness.practiceCompletion, examReadiness.cutoffTarget)}
                />
              </motion.div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-muted-foreground">
                  {getProgressStatus(examReadiness.practiceCompletion, examReadiness.cutoffTarget)}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Mock Test Results</span>
                </div>
                <span className="text-sm font-medium">
                  {examReadiness.mockTestResults}%
                </span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Progress
                  value={examReadiness.mockTestResults}
                  className="h-2"
                  indicatorClassName={getProgressColor(examReadiness.mockTestResults, examReadiness.cutoffTarget)}
                />
              </motion.div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-muted-foreground">
                  {getProgressStatus(examReadiness.mockTestResults, examReadiness.cutoffTarget)}
                </span>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Next mock test:</span>
                  <span className="font-medium ml-1">Tomorrow, 10:00 AM</span>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Improve Score
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
