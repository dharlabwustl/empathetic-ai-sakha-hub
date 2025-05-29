
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedExamReadinessScoreProps {
  overallScore?: number;
  targetExam?: string;
  daysUntilExam?: number;
}

const CircularProgress = ({ score, size = 120 }: { score: number; size?: number }) => {
  const radius = (size - 20) / 2;
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
          className={`${
            score >= 80 ? 'text-green-500' : 
            score >= 60 ? 'text-yellow-500' : 
            'text-red-500'
          }`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            className="text-3xl font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            {score}
          </motion.div>
          <div className="text-sm text-gray-500">Score</div>
        </div>
      </div>
    </div>
  );
};

const EnhancedExamReadinessScore: React.FC<EnhancedExamReadinessScoreProps> = ({
  overallScore = 72,
  targetExam = "NEET 2026",
  daysUntilExam = 185
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const confidence = 78;
  const predictiveScore = 485;
  const maxScore = 720;
  
  const getStatus = (score: number) => {
    if (score >= 85) return { text: "Excellent", color: "text-green-600", bg: "bg-green-100" };
    if (score >= 70) return { text: "Good", color: "text-blue-600", bg: "bg-blue-100" };
    if (score >= 55) return { text: "Average", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { text: "Need Improvement", color: "text-red-600", bg: "bg-red-100" };
  };

  const status = getStatus(overallScore);

  const subjectProgress = [
    { name: "Physics", progress: 75, mastery: "Good" },
    { name: "Chemistry", progress: 68, mastery: "Average" },
    { name: "Biology", progress: 82, mastery: "Excellent" }
  ];

  const strengths = [
    "Strong grasp of Biology concepts",
    "Consistent problem-solving in Physics",
    "Good time management skills"
  ];

  const improvements = [
    "Focus more on Organic Chemistry",
    "Practice more numerical problems",
    "Improve speed in calculations"
  ];

  const followUpActions = [
    "Take 2 mock tests this week",
    "Review weak topics in Chemistry",
    "Practice time-bound questions daily"
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Exam Readiness Score</span>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {targetExam}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Score Circle */}
          <div className="flex flex-col items-center">
            <CircularProgress score={overallScore} />
            <Badge className={`mt-2 ${status.bg} ${status.color} border-0`}>
              {status.text}
            </Badge>
          </div>
          
          {/* Metrics */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{confidence}%</div>
                <div className="text-sm text-gray-600">Confidence</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{predictiveScore}/{maxScore}</div>
                <div className="text-sm text-gray-600">Predicted Score</div>
              </div>
            </div>
            
            {daysUntilExam && (
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-xl font-semibold text-blue-600">{daysUntilExam} days</div>
                <div className="text-sm text-blue-500">until {targetExam}</div>
              </div>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)} 
          className="w-full flex items-center justify-center gap-2"
        >
          {expanded ? 'Hide Details' : 'View Detailed Analysis'}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-6"
          >
            {/* Subject-wise Progress */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Subject-wise Progress & Mastery
              </h4>
              <div className="grid gap-3">
                {subjectProgress.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{subject.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{subject.progress}%</span>
                          <Badge variant="outline" className="text-xs">
                            {subject.mastery}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="font-medium text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Strengths
                </h5>
                <ul className="space-y-1 text-sm">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-orange-600 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Areas of Improvement
                </h5>
                <ul className="space-y-1 text-sm">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Follow-up Actions */}
            <div>
              <h5 className="font-medium text-blue-600 flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4" />
                Recommended Follow-up Actions
              </h5>
              <div className="grid gap-2">
                {followUpActions.map((action, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedExamReadinessScore;
