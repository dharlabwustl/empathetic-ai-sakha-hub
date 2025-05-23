
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Clock, Brain, Trophy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConceptAnalyticsProps {
  conceptTitle: string;
  masteryLevel: number;
  timeSpent: number;
  questionsAnswered: number;
  accuracy: number;
  onMarkComplete: () => void;
  isCompleted: boolean;
}

const ConceptAnalytics: React.FC<ConceptAnalyticsProps> = ({
  conceptTitle,
  masteryLevel,
  timeSpent,
  questionsAnswered,
  accuracy,
  onMarkComplete,
  isCompleted
}) => {
  const canAutoComplete = masteryLevel >= 80;
  
  return (
    <div className="mb-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-blue-900 dark:text-blue-100">
                Concept Analytics & Progress
              </CardTitle>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                Track your mastery and performance for {conceptTitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isCompleted && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                  <Trophy className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
              {canAutoComplete && !isCompleted && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Button 
                    onClick={onMarkComplete}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Mastery Level */}
            <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Mastery Level</span>
                <Brain className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                {masteryLevel}%
              </div>
              <Progress 
                value={masteryLevel} 
                className="h-2" 
                indicatorClassName={
                  masteryLevel >= 80 ? 'bg-green-500' : 
                  masteryLevel >= 60 ? 'bg-blue-500' : 
                  masteryLevel >= 40 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }
              />
            </div>

            {/* Time Spent */}
            <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Spent</span>
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                {Math.floor(timeSpent / 60)}h {timeSpent % 60}m
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                +{Math.floor(Math.random() * 30 + 10)}min today
              </div>
            </div>

            {/* Questions Answered */}
            <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Questions</span>
                <Target className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {questionsAnswered}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                practice questions
              </div>
            </div>

            {/* Accuracy */}
            <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Accuracy</span>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                {accuracy}%
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400">
                +{Math.floor(Math.random() * 10 + 5)}% this week
              </div>
            </div>
          </div>

          {/* Completion Status */}
          {masteryLevel >= 80 && !isCompleted && (
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-lg p-4">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    Ready to Complete! 🎉
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    You've achieved 80% mastery. Mark this concept as complete to unlock rewards!
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptAnalytics;
