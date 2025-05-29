
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedExamReadinessScoreProps {
  overallScore?: number;
  confidenceLevel?: number;
  predictiveFinalScore?: number;
  targetExam?: string;
  daysUntilExam?: number;
}

const EnhancedExamReadinessScore: React.FC<EnhancedExamReadinessScoreProps> = ({ 
  overallScore = 72, 
  confidenceLevel = 68,
  predictiveFinalScore = 78,
  targetExam = "NEET",
  daysUntilExam = 85
}) => {
  const [expanded, setExpanded] = useState(false);

  const getStatus = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "bg-green-500", textColor: "text-green-700" };
    if (score >= 70) return { label: "Good", color: "bg-blue-500", textColor: "text-blue-700" };
    if (score >= 55) return { label: "Average", color: "bg-yellow-500", textColor: "text-yellow-700" };
    return { label: "Need Improvement", color: "bg-red-500", textColor: "text-red-700" };
  };

  const status = getStatus(overallScore);

  const subjectProgress = [
    { name: "Physics", progress: 78, mastery: "Strong", color: "bg-green-500" },
    { name: "Chemistry", progress: 65, mastery: "Moderate", color: "bg-yellow-500" },
    { name: "Biology", progress: 74, mastery: "Good", color: "bg-blue-500" }
  ];

  const strengths = [
    "Strong conceptual understanding in Physics",
    "Excellent problem-solving skills",
    "Good retention in memorization topics"
  ];

  const improvements = [
    "Focus more on Organic Chemistry reactions",
    "Practice more numerical problems",
    "Improve speed in Biology diagrams"
  ];

  const followUpActions = [
    "Complete 2 mock tests this week",
    "Review weak Chemistry concepts daily",
    "Practice time management techniques"
  ];

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl font-bold">Exam Readiness Score</span>
          <Badge className={`${status.color} text-white px-3 py-1 font-bold`}>
            {status.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Main Score Circle */}
        <div className="text-center mb-6">
          <div className="relative inline-flex items-center justify-center">
            <motion.div 
              className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-gray-700"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.div 
              className={`absolute w-32 h-32 rounded-full border-8 ${status.color} border-t-transparent`}
              style={{ 
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                transform: `rotate(${(overallScore / 100) * 360}deg)`
              }}
              initial={{ rotate: 0 }}
              animate={{ rotate: (overallScore / 100) * 360 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{overallScore}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">/ 100</div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{confidenceLevel}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Confidence</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{predictiveFinalScore}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Predicted Score</div>
            </div>
          </div>

          {daysUntilExam && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{daysUntilExam} days until {targetExam} exam</span>
            </div>
          )}
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
            className="mt-6 space-y-6"
          >
            {/* Subject-wise Progress */}
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Subject-wise Progress & Mastery
              </h4>
              <div className="space-y-3">
                {subjectProgress.map((subject, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{subject.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={subject.color.replace('bg-', 'border-') + ' text-gray-700'}>
                          {subject.mastery}
                        </Badge>
                        <span className="font-bold">{subject.progress}%</span>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Strengths
              </h4>
              <div className="space-y-2">
                {strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Star className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-800 dark:text-green-200">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas of Improvement */}
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-orange-700">
                <AlertTriangle className="h-5 w-5" />
                Areas of Improvement
              </h4>
              <div className="space-y-2">
                {improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <Target className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-orange-800 dark:text-orange-200">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow-up Actions */}
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-blue-700">
                <Brain className="h-5 w-5" />
                Recommended Actions
              </h4>
              <div className="space-y-2">
                {followUpActions.map((action, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-800 dark:text-blue-200">{action}</span>
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
