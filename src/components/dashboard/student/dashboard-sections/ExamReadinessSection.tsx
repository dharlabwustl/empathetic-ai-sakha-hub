
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Star, BookOpen, FileText, Book } from "lucide-react";

interface ExamReadiness {
  overall: number;
  conceptMastery: number;
  practiceCompletion: number;
  mockTestResults: number;
  cutoffTarget: number;
  examName: string;
}

interface ExamReadinessSectionProps {
  examReadiness?: ExamReadiness;
  isLoading?: boolean;
}

export default function ExamReadinessSection({
  examReadiness,
  isLoading = false,
}: ExamReadinessSectionProps) {
  const [animate, setAnimate] = useState(false);
  const defaultData: ExamReadiness = {
    overall: 68,
    conceptMastery: 75,
    practiceCompletion: 60,
    mockTestResults: 72,
    cutoffTarget: 85,
    examName: "IIT-JEE"
  };

  const data = examReadiness || defaultData;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const determineStatus = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-green-600" };
    if (score >= 65) return { label: "Good", color: "text-blue-600" };
    if (score >= 50) return { label: "Average", color: "text-amber-600" };
    return { label: "Needs Improvement", color: "text-red-600" };
  };

  const gaugeVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: i / 100,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    })
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          Exam Readiness Score: {data.examName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main readiness gauge */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-56 w-56">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="8"
                />
                
                {/* Cutoff target line */}
                <motion.path
                  d={`M ${50 - 40 * Math.cos((data.cutoffTarget / 100) * Math.PI)} ${
                    50 - 40 * Math.sin((data.cutoffTarget / 100) * Math.PI)
                  } L ${50} ${50}`}
                  stroke="#ff6b6b"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                
                {/* Progress arc */}
                <AnimatePresence>
                  {animate && (
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#readinessGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      custom={data.overall}
                      variants={gaugeVariants}
                      initial="hidden"
                      animate="visible"
                      strokeDasharray={`${2 * Math.PI * 40 * (data.overall / 100)} ${2 * Math.PI * 40 * (1 - data.overall / 100)}`}
                      strokeDashoffset="0"
                    />
                  )}
                </AnimatePresence>
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                
                {/* Centre text */}
                <text
                  x="50"
                  y="45"
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="bold"
                  fill="currentColor"
                >
                  {data.overall}%
                </text>
                <text
                  x="50"
                  y="65"
                  textAnchor="middle"
                  fontSize="10"
                  fill="currentColor"
                  opacity="0.7"
                >
                  Readiness
                </text>
              </svg>
              
              {/* Cutoff target indicator */}
              <div className="absolute top-2 right-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                Cutoff: {data.cutoffTarget}%
              </div>
            </div>
            
            <div className="mt-2 text-center">
              <p className="font-medium text-lg">
                <span className={determineStatus(data.overall).color}>
                  {determineStatus(data.overall).label}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                {data.overall < data.cutoffTarget
                  ? `${data.cutoffTarget - data.overall}% more to reach target cutoff`
                  : "You're above the cutoff target!"}
              </p>
            </div>
          </div>

          {/* Component metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Concept Mastery</span>
                </div>
                <span className="font-bold">{data.conceptMastery}%</span>
              </div>
              <AnimatePresence>
                {animate && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.conceptMastery}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <Progress value={data.conceptMastery} className="h-2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">Practice Completion</span>
                </div>
                <span className="font-bold">{data.practiceCompletion}%</span>
              </div>
              <AnimatePresence>
                {animate && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.practiceCompletion}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  >
                    <Progress value={data.practiceCompletion} className="h-2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Mock Test Results</span>
                </div>
                <span className="font-bold">{data.mockTestResults}%</span>
              </div>
              <AnimatePresence>
                {animate && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.mockTestResults}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  >
                    <Progress value={data.mockTestResults} className="h-2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground pt-2">
            <p>Continue completing tasks in your study plan to improve your readiness score</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
