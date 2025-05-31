
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Calendar, Award, ChevronDown, ChevronUp, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const ExamReadinessScoreCard: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  const readinessData = {
    overallReadiness: 72,
    confidenceLevel: 78,
    predictedScore: 685,
    maxScore: 720,
    daysRemaining: 338,
    targetExam: "NEET 2026",
    status: "Good", // Need Improvement, Critical, Average, Good, Excellent
    weeklyGrowth: 8, // New weekly growth percentage
    subjectBreakdown: [
      { subject: "Physics", score: 68, color: "blue" },
      { subject: "Chemistry", score: 74, color: "green" },
      { subject: "Biology", score: 76, color: "purple" }
    ],
    strengths: ["Organic Chemistry", "Human Physiology", "Mechanics"],
    improvements: ["Inorganic Chemistry", "Plant Biology", "Thermodynamics"]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800 border-green-300';
      case 'Good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Average': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'Need Improvement': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const CircularProgress = ({ value, size = 120, strokeWidth = 8 }: { value: number; size?: number; strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-blue-600"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold text-blue-700"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {value}%
            </motion.div>
            <div className="text-xs text-gray-600">Ready</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatedHighlight 
      id="exam-readiness" 
      text="Keep checking how you are doing"
      position="top"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Award className="h-5 w-5 text-blue-600" />
                </motion.div>
                <motion.span
                  animate={{ 
                    color: ["#2563eb", "#4338ca", "#2563eb"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="font-bold"
                >
                  Exam Readiness Score
                </motion.span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="h-6 w-6 p-0"
              >
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 pb-4">
            <div className="space-y-4">
              {/* Main Score Display */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Status</p>
                      <Badge className={getStatusColor(readinessData.status)}>
                        {readinessData.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Weekly Growth</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <p className="font-bold text-lg text-green-700">+{readinessData.weeklyGrowth}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Confidence Level</p>
                      <p className="font-bold text-lg text-blue-700">{readinessData.confidenceLevel}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Predicted Score</p>
                      <p className="font-bold text-lg text-blue-700">{readinessData.predictedScore}/{readinessData.maxScore}</p>
                    </div>
                  </div>
                </div>
                
                {/* Dynamic Circle */}
                <div className="ml-4">
                  <CircularProgress value={readinessData.overallReadiness} />
                </div>
              </div>

              {/* Detailed Analysis - Collapsible */}
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 border-t pt-4"
                >
                  {/* Subject Breakdown */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-600" />
                      Subject Breakdown
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {readinessData.subjectBreakdown.map((subject, index) => (
                        <div key={index} className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-xs font-medium">{subject.subject}</p>
                          <p className="text-sm font-bold text-blue-700">{subject.score}%</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-semibold text-green-700 mb-2">Strengths</h5>
                      <div className="space-y-1">
                        {readinessData.strengths.slice(0, 2).map((strength, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-orange-700 mb-2">Focus Areas</h5>
                      <div className="space-y-1">
                        {readinessData.improvements.slice(0, 2).map((improvement, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-orange-50 text-orange-700">
                            {improvement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatedHighlight>
  );
};

export default ExamReadinessScoreCard;
