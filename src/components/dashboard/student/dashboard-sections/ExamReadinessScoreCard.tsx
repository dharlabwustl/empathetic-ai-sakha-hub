
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, Trophy, Target, ChevronDown, ChevronUp, Brain, BookOpen, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExamReadinessScoreCard: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  const readinessData = {
    overallReadiness: 72,
    confidenceLevel: 78,
    predictedScore: 685,
    maxScore: 720,
    daysRemaining: 338,
    targetExam: "NEET 2026",
    subjectBreakdown: {
      physics: 75,
      chemistry: 65,
      biology: 78
    },
    weakAreas: ["Chemical Bonding", "Thermodynamics", "Ecology"],
    strongAreas: ["Mechanics", "Organic Chemistry", "Human Physiology"],
    recentImprovement: 8,
    studyStreak: 12
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#2563eb", "#7c3aed", "#2563eb"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                Exam Readiness Analysis
              </motion.span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800"
            >
              {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {showDetails ? 'Hide' : 'Details'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {/* Dynamic Circle with Overall Readiness */}
            <motion.div 
              className="text-center relative"
              animate={{ 
                backgroundColor: ["rgb(219 234 254)", "rgb(237 233 254)", "rgb(219 234 254)"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative w-32 h-32 mx-auto">
                {/* Animated Circle Background */}
                <motion.div
                  className="absolute inset-0 rounded-full border-8 border-gray-200"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                />
                
                {/* Dynamic Progress Circle */}
                <motion.div
                  className="absolute inset-0 rounded-full border-8 border-blue-500"
                  style={{
                    background: `conic-gradient(from 0deg, #3b82f6 0deg, #3b82f6 ${readinessData.overallReadiness * 3.6}deg, transparent ${readinessData.overallReadiness * 3.6}deg)`
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-full m-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-3xl font-black text-blue-900 dark:text-blue-100">
                      {readinessData.overallReadiness}%
                    </div>
                  </motion.div>
                  <div className="text-xs font-bold text-blue-600">READY</div>
                </div>
              </div>
              
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-2"
              >
                <Badge className="bg-green-100 text-green-800 border-green-300 text-sm font-bold px-3 py-1">
                  READY TO EXCEL
                </Badge>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <Trophy className="h-3 w-3 text-green-600 mx-auto mb-1" />
                <p className="text-sm font-bold text-green-700 dark:text-green-400">
                  {readinessData.confidenceLevel}%
                </p>
                <p className="text-xs text-green-600">Confidence</p>
              </div>

              <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <Target className="h-3 w-3 text-purple-600 mx-auto mb-1" />
                <p className="text-sm font-bold text-purple-700 dark:text-purple-400">
                  {readinessData.predictedScore}
                </p>
                <p className="text-xs text-purple-600">Score</p>
              </div>
              
              <div className="text-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                <Calendar className="h-3 w-3 text-amber-600 mx-auto mb-1" />
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  {readinessData.daysRemaining}
                </p>
                <p className="text-xs text-amber-600">Days</p>
              </div>
            </div>

            {/* Detailed Analysis (Collapsible) */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 border-t pt-3"
                >
                  {/* Subject Breakdown */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      Subject Performance
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(readinessData.subjectBreakdown).map(([subject, score]) => (
                        <div key={subject} className="flex items-center justify-between">
                          <span className="text-xs capitalize">{subject}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={score} className="h-1 w-12" />
                            <span className="text-xs font-medium w-8">{score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Areas */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-semibold text-xs mb-1 text-red-700">Focus Areas</h4>
                      <div className="space-y-1">
                        {readinessData.weakAreas.slice(0, 2).map((area, index) => (
                          <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-300 text-xs mr-1 mb-1">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs mb-1 text-green-700">Strong Areas</h4>
                      <div className="space-y-1">
                        {readinessData.strongAreas.slice(0, 2).map((area, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs mr-1 mb-1">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessScoreCard;
