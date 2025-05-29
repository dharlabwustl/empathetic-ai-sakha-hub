
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingUp, 
  Brain, 
  Award, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Calculator,
  Atom,
  Dna
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedExamReadinessScoreProps {
  className?: string;
}

const EnhancedExamReadinessScore: React.FC<EnhancedExamReadinessScoreProps> = ({ className }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Mock data for exam readiness
  const examData = {
    overallScore: 78,
    confidence: 82,
    predictiveScore: 675,
    maxScore: 720,
    status: "Good",
    statusColor: "text-green-700",
    statusBg: "bg-green-100",
    subjects: [
      { name: "Physics", score: 72, progress: 68, mastery: "Strong", color: "bg-blue-500", icon: <Atom className="h-4 w-4" /> },
      { name: "Chemistry", score: 78, progress: 75, mastery: "Good", color: "bg-green-500", icon: <Calculator className="h-4 w-4" /> },
      { name: "Biology", score: 85, progress: 82, mastery: "Excellent", color: "bg-purple-500", icon: <Dna className="h-4 w-4" /> },
      { name: "Mathematics", score: 75, progress: 71, mastery: "Good", color: "bg-orange-500", icon: <BookOpen className="h-4 w-4" /> }
    ],
    strengths: [
      "Strong conceptual understanding in Biology",
      "Excellent problem-solving speed in Chemistry",
      "Good retention rate across all subjects"
    ],
    improvements: [
      "Need more practice in Physics numerical problems",
      "Work on Mathematics integration concepts",
      "Improve time management in mock tests"
    ],
    actions: [
      "Complete 2 Physics practice sets daily",
      "Review weak Chemistry topics this week",
      "Take 1 full-length mock test every 3 days"
    ]
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "Excellent":
        return { color: "text-green-800", bg: "bg-green-100", description: "You're performing exceptionally well!" };
      case "Good":
        return { color: "text-blue-800", bg: "bg-blue-100", description: "You're on the right track, keep it up!" };
      case "Average":
        return { color: "text-yellow-800", bg: "bg-yellow-100", description: "Room for improvement, stay focused!" };
      case "Need Improvement":
        return { color: "text-red-800", bg: "bg-red-100", description: "Time to intensify your preparation!" };
      default:
        return { color: "text-gray-800", bg: "bg-gray-100", description: "Keep working hard!" };
    }
  };

  const statusDetails = getStatusDetails(examData.status);

  return (
    <Card className={`shadow-lg border-2 border-gradient-to-r from-violet-200 to-purple-200 dark:from-violet-800 dark:to-purple-800 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
          <Target className="h-5 w-5 text-violet-600" />
          NEET Exam Readiness Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Score Circle and Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Score Circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray={`${examData.overallScore}, 100`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {examData.overallScore}%
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Overall</span>
              </div>
            </div>
          </div>

          {/* Confidence and Predictive Score */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Confidence Level</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-700 dark:text-blue-300">{examData.confidence}%</span>
                <Progress value={examData.confidence} className="flex-1 h-2" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Predicted Score</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-purple-700 dark:text-purple-300">
                  {examData.predictiveScore}/{examData.maxScore}
                </span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <div className={`${statusDetails.bg} p-4 rounded-lg border border-gray-200 dark:border-gray-700`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Current Status</span>
              </div>
              <Badge className={`${statusDetails.color} ${statusDetails.bg} border-0 text-base font-semibold`}>
                {examData.status}
              </Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {statusDetails.description}
              </p>
            </div>
          </div>
        </div>

        {/* Subject-wise Progress */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">Subject-wise Progress & Mastery</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examData.subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded ${subject.color} text-white`}>
                      {subject.icon}
                    </div>
                    <span className="font-medium text-sm">{subject.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {subject.mastery}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-1.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Toggle Details Button */}
        <Button
          variant="outline"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center gap-2"
        >
          {showDetails ? 'Hide Details' : 'View Detailed Analysis'}
          {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {/* Detailed Analysis (Expandable) */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4"
          >
            {/* Strengths */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Strengths
              </h5>
              <ul className="space-y-1">
                {examData.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas of Improvement */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Areas of Improvement
              </h5>
              <ul className="space-y-1">
                {examData.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-orange-700 dark:text-orange-300 flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow-up Actions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Recommended Actions
              </h5>
              <ul className="space-y-1">
                {examData.actions.map((action, index) => (
                  <li key={index} className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedExamReadinessScore;
