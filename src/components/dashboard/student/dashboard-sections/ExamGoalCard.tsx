
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, BookOpen, Trophy, RotateCcw, Zap, TrendingUp, Clock, Brain, Award } from 'lucide-react';
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
    ]
  };

  // Calculate overall progress based on subjects
  const overallProgress = Math.round(
    examData.subjects.reduce((sum, subject) => sum + subject.progress, 0) / examData.subjects.length
  );

  // Calculate different progress metrics
  const progressMetrics = {
    examReadiness: overallProgress,
    timeProgress: Math.round(((365 - examData.daysLeft) / 365) * 100),
    studyConsistency: 78,
    subjectBalance: Math.round((100 - Math.abs(Math.max(...examData.subjects.map(s => s.progress)) - Math.min(...examData.subjects.map(s => s.progress)))))
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-purple-100/60 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/30 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Exam Goal: {examData.name}
          </CardTitle>
          <MoodLogButton 
            currentMood={currentMood}
            onMoodChange={onMoodChange}
            size="sm"
            showLabel={false}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{examData.date}</span>
          </div>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {examData.daysLeft} days left
          </Badge>
        </div>

        {/* Overall Progress Meters */}
        <div className="space-y-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-100/50 dark:border-blue-800/30">
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Overall Progress Metrics
          </h4>
          
          {/* Exam Readiness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Exam Readiness</span>
              </div>
              <span className="text-lg font-bold text-blue-900 dark:text-blue-200">{progressMetrics.examReadiness}%</span>
            </div>
            
            <div className="relative">
              <Progress value={progressMetrics.examReadiness} className="h-3 bg-gray-200 dark:bg-gray-700" />
              <motion.div 
                className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressMetrics.examReadiness}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Time Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800 dark:text-orange-300">Time Progress</span>
              </div>
              <span className="text-sm font-bold text-orange-900 dark:text-orange-200">{progressMetrics.timeProgress}%</span>
            </div>
            
            <div className="relative">
              <Progress value={progressMetrics.timeProgress} className="h-2 bg-gray-200 dark:bg-gray-700" />
              <motion.div 
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressMetrics.timeProgress}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          {/* Study Consistency */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">Study Consistency</span>
              </div>
              <span className="text-sm font-bold text-green-900 dark:text-green-200">{progressMetrics.studyConsistency}%</span>
            </div>
            
            <div className="relative">
              <Progress value={progressMetrics.studyConsistency} className="h-2 bg-gray-200 dark:bg-gray-700" />
              <motion.div 
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressMetrics.studyConsistency}%` }}
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.6 }}
              />
            </div>
          </div>

          {/* Subject Balance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Subject Balance</span>
              </div>
              <span className="text-sm font-bold text-purple-900 dark:text-purple-200">{progressMetrics.subjectBalance}%</span>
            </div>
            
            <div className="relative">
              <Progress value={progressMetrics.subjectBalance} className="h-2 bg-gray-200 dark:bg-gray-700" />
              <motion.div 
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressMetrics.subjectBalance}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mt-3 pt-2 border-t border-blue-100/50">
            <span>Overall Status:</span>
            <span className="font-medium">
              {progressMetrics.examReadiness >= 85 ? "Excellent Progress!" : 
               progressMetrics.examReadiness >= 70 ? "On Track" : 
               progressMetrics.examReadiness >= 50 ? "Making Progress" : "Needs Focus"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Subject Progress</h4>
          {examData.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span>{subject.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
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
            <Button size="sm" variant="outline" className="w-full text-xs">
              <RotateCcw className="h-3 w-3 mr-1" />
              Recall Practice
            </Button>
          </Link>
          <Link to="/dashboard/student/practice-exam/2/start">
            <Button size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700">
              <Trophy className="h-3 w-3 mr-1" />
              Take Exam
            </Button>
          </Link>
        </div>

        <div className="pt-2 border-t">
          <Link to="/dashboard/student/academic">
            <Button size="sm" variant="ghost" className="w-full text-xs">
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
