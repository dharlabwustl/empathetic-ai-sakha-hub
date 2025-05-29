
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Brain,
  Zap,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedExamReadinessScoreProps {
  overallScore?: number;
  targetExam?: string;
  daysUntilExam?: number;
}

const EnhancedExamReadinessScore: React.FC<EnhancedExamReadinessScoreProps> = ({ 
  overallScore = 72, 
  targetExam = "NEET",
  daysUntilExam = 85
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Calculate confidence and predictive scores
  const confidenceScore = Math.min(overallScore + 8, 95);
  const predictiveScore = Math.max(overallScore - 5, 45);
  
  // Determine status based on score
  const getStatus = (score: number) => {
    if (score >= 85) return { text: "Excellent", color: "text-green-600", bgColor: "bg-green-100", borderColor: "border-green-300" };
    if (score >= 70) return { text: "Good", color: "text-blue-600", bgColor: "bg-blue-100", borderColor: "border-blue-300" };
    if (score >= 55) return { text: "Average", color: "text-yellow-600", bgColor: "bg-yellow-100", borderColor: "border-yellow-300" };
    return { text: "Need Improvement", color: "text-red-600", bgColor: "bg-red-100", borderColor: "border-red-300" };
  };
  
  const status = getStatus(overallScore);
  
  // Subject-wise data
  const subjectData = [
    { name: "Physics", score: 78, mastery: "Strong", improvement: "Mechanics, Optics" },
    { name: "Chemistry", score: 65, mastery: "Moderate", improvement: "Organic Chemistry" },
    { name: "Biology", score: 74, mastery: "Strong", improvement: "Genetics, Ecology" }
  ];
  
  // Strengths and improvements
  const strengths = ["Problem-solving skills", "Time management", "Conceptual understanding"];
  const improvements = ["Speed in calculations", "Organic chemistry reactions", "Advanced physics topics"];
  
  // Follow-up actions
  const actions = [
    "Focus 2 extra hours weekly on Chemistry",
    "Practice more Physics numerical problems", 
    "Complete Biology revision by next week"
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl font-bold">Exam Readiness Score</span>
          <Badge className={`${status.bgColor} ${status.color} ${status.borderColor} border font-semibold px-3 py-1`}>
            {targetExam}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Score Circle */}
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <motion.div
              className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-gray-700"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className={`absolute w-32 h-32 rounded-full border-8 ${
                overallScore >= 85 ? 'border-green-500' :
                overallScore >= 70 ? 'border-blue-500' :
                overallScore >= 55 ? 'border-yellow-500' : 'border-red-500'
              }`}
              style={{
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                transform: `rotate(${(overallScore / 100) * 360}deg)`
              }}
              initial={{ rotate: 0 }}
              animate={{ rotate: (overallScore / 100) * 360 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-3xl font-bold text-gray-900 dark:text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                {overallScore}
              </motion.span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/ 100</span>
            </div>
          </div>
          
          {/* Status Badge */}
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Badge className={`${status.bgColor} ${status.color} ${status.borderColor} border text-base px-4 py-2 font-semibold`}>
              {status.text}
            </Badge>
          </motion.div>
        </div>
        
        {/* Key Metrics Row */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Target className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Confidence</p>
            <p className="text-lg font-bold text-blue-600">{confidenceScore}%</p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Predictive Score</p>
            <p className="text-lg font-bold text-purple-600">{predictiveScore}%</p>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <Award className="h-5 w-5 text-orange-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Days Left</p>
            <p className="text-lg font-bold text-orange-600">{daysUntilExam}</p>
          </div>
        </div>
        
        {/* Expand Button */}
        <Button
          variant="ghost" 
          onClick={() => setExpanded(!expanded)} 
          className="w-full flex items-center justify-center gap-2 mt-4"
        >
          {expanded ? 'Hide Details' : 'View Detailed Analysis'}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        
        {/* Detailed Analysis */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 pt-4 border-t"
          >
            {/* Subject-wise Progress */}
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Subject-wise Progress & Mastery
              </h4>
              <div className="space-y-3">
                {subjectData.map((subject, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{subject.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {subject.mastery}
                        </Badge>
                        <span className="font-bold">{subject.score}%</span>
                      </div>
                    </div>
                    <Progress value={subject.score} className="h-2 mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Focus areas:</strong> {subject.improvement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Strengths and Areas of Improvement */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  Strengths
                </h5>
                <ul className="space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold mb-3 flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <AlertTriangle className="h-4 w-4" />
                  Areas of Improvement
                </h5>
                <ul className="space-y-2">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Follow-up Actions */}
            <div>
              <h5 className="font-semibold mb-3 flex items-center gap-2 text-purple-700 dark:text-purple-400">
                <Zap className="h-4 w-4" />
                Recommended Actions
              </h5>
              <div className="space-y-2">
                {actions.map((action, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Brain className="h-4 w-4 text-purple-600" />
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
