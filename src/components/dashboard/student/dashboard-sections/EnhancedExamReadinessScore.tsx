
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, Target, TrendingUp, Brain, Book, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface EnhancedExamReadinessScoreProps {
  overallScore?: number;
  confidence?: number;
  predictiveScore?: string;
  targetExam?: string;
  daysUntilExam?: number;
}

const EnhancedExamReadinessScore: React.FC<EnhancedExamReadinessScoreProps> = ({
  overallScore = 72,
  confidence = 78,
  predictiveScore = "685/720",
  targetExam = "NEET 2026",
  daysUntilExam = 185
}) => {
  const [expanded, setExpanded] = useState(false);

  const getStatus = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "bg-green-500", textColor: "text-green-700" };
    if (score >= 70) return { label: "Good", color: "bg-blue-500", textColor: "text-blue-700" };
    if (score >= 55) return { label: "Average", color: "bg-yellow-500", textColor: "text-yellow-700" };
    return { label: "Need Improvement", color: "bg-red-500", textColor: "text-red-700" };
  };

  const status = getStatus(overallScore);

  const CircularProgress = ({ score, size = 120 }: { score: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={status.color.replace('bg-', 'text-')}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{score}%</div>
            <div className="text-xs text-gray-500">Ready</div>
          </div>
        </div>
      </div>
    );
  };

  const strengths = ["Organic Chemistry", "Kinematics", "Cell Biology"];
  const improvements = ["Thermodynamics", "Ecology", "Modern Physics"];
  
  const subjectProgress = [
    { subject: "Physics", progress: 68, mastery: "Intermediate" },
    { subject: "Chemistry", progress: 78, mastery: "Advanced" },
    { subject: "Biology", progress: 70, mastery: "Intermediate" }
  ];

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="pb-4 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-lg">Exam Readiness Score</CardTitle>
          </div>
          <Badge className={`${status.color} text-white`}>
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Main score circle */}
          <div className="flex flex-col items-center">
            <CircularProgress score={overallScore} />
            <p className="text-sm text-gray-500 mt-2">Overall Readiness</p>
          </div>
          
          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="text-sm text-blue-600 dark:text-blue-400">Confidence Level</div>
              <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{confidence}%</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="text-sm text-green-600 dark:text-green-400">Predicted Score</div>
              <div className="text-xl font-bold text-green-700 dark:text-green-300">{predictiveScore}</div>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <div className="text-sm text-purple-600 dark:text-purple-400">Days Remaining</div>
              <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{daysUntilExam}</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <div className="text-sm text-amber-600 dark:text-amber-400">Target Exam</div>
              <div className="text-sm font-bold text-amber-700 dark:text-amber-300">{targetExam}</div>
            </div>
          </div>
        </div>
        
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              {expanded ? 'Hide Detailed Analysis' : 'View Detailed Analysis'}
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-medium text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Strengths
                </h4>
                <div className="space-y-2">
                  {strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Areas for improvement */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h4 className="font-medium text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Areas for Improvement
                </h4>
                <div className="space-y-2">
                  {improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Subject-wise progress */}
            <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Subject-wise Mastery
              </h4>
              <div className="space-y-3">
                {subjectProgress.map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{subject.mastery}</span>
                        <span className="text-sm font-medium">{subject.progress}%</span>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Follow-up actions */}
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Recommended Actions
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span className="text-sm">Schedule 2 hours daily for weak areas</span>
                </div>
                <div className="flex items-start gap-2">
                  <Book className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span className="text-sm">Take weekly mock tests</span>
                </div>
                <div className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span className="text-sm">Focus on concept clarity in Physics</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default EnhancedExamReadinessScore;
