
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ExamReadinessSectionProps {
  overallReadiness?: number;
  subjects?: {
    name: string;
    readiness: number;
    color: string;
  }[];
}

const ExamReadinessSection = ({ 
  overallReadiness = 67, 
  subjects 
}: ExamReadinessSectionProps) => {
  const defaultSubjects = [
    { name: 'Physics', readiness: 78, color: 'bg-blue-500' },
    { name: 'Chemistry', readiness: 64, color: 'bg-green-500' },
    { name: 'Mathematics', readiness: 56, color: 'bg-purple-500' },
    { name: 'Biology', readiness: 71, color: 'bg-amber-500' },
  ];

  const displaySubjects = subjects || defaultSubjects;
  
  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getReadinessLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-red-500" />
          Exam Readiness Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 relative">
          {/* Overall readiness circular progress */}
          <motion.div 
            className="flex flex-col items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-40 w-40">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  fill="none"
                />
                
                {/* Progress circle with animation */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke={overallReadiness >= 70 ? "#10b981" : overallReadiness >= 50 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 45 * (1 - overallReadiness / 100) 
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  transform="rotate(-90, 50, 50)"
                />
                
                {/* Text in the center */}
                <text
                  x="50%"
                  y="45%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="bold"
                  fill="currentColor"
                >
                  {overallReadiness}%
                </text>
                <text
                  x="50%"
                  y="60%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="10"
                  fill="currentColor"
                >
                  {getReadinessLabel(overallReadiness)}
                </text>
              </svg>
            </div>
            <div className="mt-3 text-sm text-muted-foreground flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Based on your performance in all subjects
            </div>
          </motion.div>
          
          {/* Subject breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium mb-2">Subject-wise Readiness</h3>
            
            {displaySubjects.map((subject, index) => (
              <motion.div 
                key={subject.name} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                className="space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{subject.name}</span>
                  <span className={`text-sm ${getReadinessColor(subject.readiness)}`}>{subject.readiness}%</span>
                </div>
                <Progress 
                  value={subject.readiness} 
                  className={`h-2 ${subject.color}`} 
                />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" size="sm">
              View Detailed Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
