
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExamReadinessSectionProps {
  examGoal: string;
  readinessScore: number;
  cutoffPercentage: number;
  lastAssessmentDate: string;
  progressBySubject: {
    subject: string;
    score: number;
    improvement: number;
  }[];
}

const ExamReadinessSection = ({ 
  examGoal, 
  readinessScore, 
  cutoffPercentage,
  lastAssessmentDate,
  progressBySubject 
}: ExamReadinessSectionProps) => {
  const [score, setScore] = useState(0);

  // Animate the score on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setScore(readinessScore);
    }, 300);
    return () => clearTimeout(timer);
  }, [readinessScore]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreMessage = (score: number, cutoff: number) => {
    const gap = cutoff - score;
    
    if (score >= cutoff) {
      return 'You are well-prepared for this exam! Keep up the great work.';
    } else if (gap <= 10) {
      return `You're close! Just need ${gap}% more to reach the cutoff.`;
    } else if (gap <= 20) {
      return `You're making good progress. Focus on weak areas to improve by ${gap}%.`;
    } else {
      return `You need to improve by ${gap}% to reach the cutoff. Let's create a focused study plan.`;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-amber-500" />
          {examGoal} Readiness Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <motion.div 
              className={`text-4xl font-bold ${getScoreColor(readinessScore)}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {score}%
            </motion.div>
            <div className="text-sm text-muted-foreground mt-1">
              Cutoff: {cutoffPercentage}%
            </div>
            <div className="w-full mt-2">
              <Progress 
                value={score} 
                max={100} 
                className={`h-2.5 ${readinessScore >= cutoffPercentage ? 'bg-emerald-100' : 'bg-amber-100'}`}
              />
              <motion.div
                className={`h-2.5 w-0.5 absolute ${readinessScore >= cutoffPercentage ? 'bg-emerald-600' : 'bg-red-500'}`}
                style={{ 
                  left: `${cutoffPercentage}%`, 
                  marginTop: '-10px',
                  height: '10px' 
                }}
                initial={{ height: 0 }}
                animate={{ height: '10px' }}
                transition={{ delay: 0.5, duration: 0.3 }}
              />
            </div>
          </div>
          
          <div className={`py-3 px-4 rounded-md text-sm ${
            readinessScore >= cutoffPercentage 
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
              : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
          }`}>
            <p>{getScoreMessage(readinessScore, cutoffPercentage)}</p>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Performance by subject:</p>
            <div className="space-y-2">
              {progressBySubject.map((subject, index) => (
                <motion.div 
                  key={subject.subject}
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.3 }}
                >
                  <span className="font-medium">{subject.subject}</span>
                  <div className="flex items-center">
                    <span className={getScoreColor(subject.score)}>{subject.score}%</span>
                    {subject.improvement > 0 ? (
                      <span className="text-emerald-500 ml-2 flex items-center text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {subject.improvement}%
                      </span>
                    ) : subject.improvement < 0 ? (
                      <span className="text-red-500 ml-2 flex items-center text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {Math.abs(subject.improvement)}%
                      </span>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center mt-2">
            Last assessment: {lastAssessmentDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
