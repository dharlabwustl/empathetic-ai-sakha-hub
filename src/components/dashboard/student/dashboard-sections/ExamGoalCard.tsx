
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, BookOpen, Trophy, RotateCcw, Zap, Clock, TrendingUp, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import MoodLogButton from '../mood-tracking/MoodLogButton';

interface ExamGoalCardProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ExamGoalCard: React.FC<ExamGoalCardProps> = ({ currentMood, onMoodChange }) => {
  const examData = {
    name: "NEET 2026",
    date: "May 5, 2026",
    daysLeft: 145,
    progress: 68,
    subjects: [
      { name: "Physics", progress: 72, color: "blue" },
      { name: "Chemistry", progress: 65, color: "green" },
      { name: "Biology", progress: 71, color: "purple" }
    ],
    overallReadiness: 78,
    timeProgress: 65,
    studyProgress: 68,
    subjectBalance: 69
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getProgressLabel = (progress: number) => {
    if (progress >= 80) return "Excellent";
    if (progress >= 60) return "Good";
    if (progress >= 40) return "Fair";
    return "Needs Focus";
  };

  return (
    <Card className="relative overflow-hidden premium-card exam-goal-card bg-gradient-to-br from-blue-50/80 via-white to-purple-100/60 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/30 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Exam Goal: {examData.name}
          </CardTitle>
          {onMoodChange && (
            <MoodLogButton 
              currentMood={currentMood}
              onMoodChange={onMoodChange}
              size="sm"
              showLabel={false}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{examData.date}</span>
          </div>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 premium-badge">
            {examData.daysLeft} days left
          </Badge>
        </div>

        {/* Overall Progress Meters */}
        <div className="space-y-3 p-3 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 premium-card">
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Overall Progress Meters
          </h4>
          
          {/* Exam Readiness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                <Brain className="h-3 w-3 text-purple-600" />
                Exam Readiness
              </span>
              <span className="font-medium text-purple-700">
                {examData.overallReadiness}% - {getProgressLabel(examData.overallReadiness)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 premium-progress">
              <motion.div 
                className={`h-2 rounded-full ${getProgressColor(examData.overallReadiness)}`}
                initial={{ width: 0 }}
                animate={{ width: `${examData.overallReadiness}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          {/* Time Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-blue-600" />
                Time Progress
              </span>
              <span className="font-medium text-blue-700">
                {examData.timeProgress}% - {getProgressLabel(examData.timeProgress)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 premium-progress">
              <motion.div 
                className={`h-2 rounded-full ${getProgressColor(examData.timeProgress)}`}
                initial={{ width: 0 }}
                animate={{ width: `${examData.timeProgress}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>

          {/* Study Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-green-600" />
                Study Progress
              </span>
              <span className="font-medium text-green-700">
                {examData.studyProgress}% - {getProgressLabel(examData.studyProgress)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 premium-progress">
              <motion.div 
                className={`h-2 rounded-full ${getProgressColor(examData.studyProgress)}`}
                initial={{ width: 0 }}
                animate={{ width: `${examData.studyProgress}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
          </div>

          {/* Subject Balance */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                <Target className="h-3 w-3 text-orange-600" />
                Subject Balance
              </span>
              <span className="font-medium text-orange-700">
                {examData.subjectBalance}% - {getProgressLabel(examData.subjectBalance)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 premium-progress">
              <motion.div 
                className={`h-2 rounded-full ${getProgressColor(examData.subjectBalance)}`}
                initial={{ width: 0 }}
                animate={{ width: `${examData.subjectBalance}%` }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Overall Progress Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">{examData.progress}%</span>
          </div>
          <Progress value={examData.progress} className="h-2 premium-progress" />
        </div>

        {/* Subject Progress */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Subject Progress</h4>
          {examData.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span>{subject.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5 premium-progress">
                  <div 
                    className={`bg-${subject.color}-500 h-1.5 rounded-full`}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
                <span className="font-medium w-8">{subject.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link to="/dashboard/student/flashcards/1/interactive">
            <Button size="sm" variant="outline" className="w-full text-xs premium-button">
              <RotateCcw className="h-3 w-3 mr-1" />
              Recall Practice
            </Button>
          </Link>
          <Link to="/dashboard/student/practice-exam/2/start">
            <Button size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700 premium-button">
              <Trophy className="h-3 w-3 mr-1" />
              Take Exam
            </Button>
          </Link>
        </div>

        <div className="pt-2 border-t">
          <Link to="/dashboard/student/academic">
            <Button size="sm" variant="ghost" className="w-full text-xs premium-button">
              <Zap className="h-3 w-3 mr-1" />
              Switch Exam & New Plan
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamGoalCard;
