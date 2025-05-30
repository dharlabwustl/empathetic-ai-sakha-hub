
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, BookOpen, Trophy, RotateCcw, Zap, Clock, Brain, CheckCircle } from 'lucide-react';
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
    examReadiness: 78,
    timeProgress: 45,
    studyProgress: 82,
    subjects: [
      { name: "Physics", progress: 72, color: "blue" },
      { name: "Chemistry", progress: 65, color: "green" },
      { name: "Biology", progress: 71, color: "purple" }
    ]
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50/90 via-white to-purple-100/70 dark:from-blue-950/40 dark:via-gray-900 dark:to-purple-900/30 border-2 border-blue-200/60 dark:border-blue-800/40 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent pointer-events-none" />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
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
      
      <CardContent className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 font-medium">{examData.date}</span>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border-red-200 shadow-sm font-semibold">
            {examData.daysLeft} days left
          </Badge>
        </div>

        {/* Overall Progress Meters */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-gradient-to-r from-gray-50/80 to-blue-50/80 dark:from-gray-800/50 dark:to-blue-900/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
          {/* Exam Readiness */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-purple-600" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Exam Readiness</span>
            </div>
            <div className="space-y-1">
              <Progress value={examData.examReadiness} className="h-2 bg-gray-200" />
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Ready</span>
                <span className="font-semibold text-purple-600">{examData.examReadiness}%</span>
              </div>
            </div>
          </div>

          {/* Time Progress */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-orange-600" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Time Progress</span>
            </div>
            <div className="space-y-1">
              <Progress value={examData.timeProgress} className="h-2 bg-gray-200" />
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Elapsed</span>
                <span className="font-semibold text-orange-600">{examData.timeProgress}%</span>
              </div>
            </div>
          </div>

          {/* Study Progress */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Study Progress</span>
            </div>
            <div className="space-y-1">
              <Progress value={examData.studyProgress} className="h-2 bg-gray-200" />
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Complete</span>
                <span className="font-semibold text-green-600">{examData.studyProgress}%</span>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Overall</span>
            </div>
            <div className="space-y-1">
              <Progress value={examData.progress} className="h-2 bg-gray-200" />
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Progress</span>
                <span className="font-semibold text-blue-600">{examData.progress}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Subject Progress</h4>
          {examData.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between text-xs bg-white/60 dark:bg-gray-800/60 p-2 rounded border border-gray-200/50 dark:border-gray-700/50">
              <span className="font-medium">{subject.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`bg-${subject.color}-500 h-1.5 rounded-full transition-all duration-300`}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
                <span className="font-semibold w-8 text-right">{subject.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link to="/dashboard/student/flashcards/1/interactive">
            <Button size="sm" variant="outline" className="w-full text-xs bg-white/80 hover:bg-white border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-200">
              <RotateCcw className="h-3 w-3 mr-1" />
              Recall Practice
            </Button>
          </Link>
          <Link to="/dashboard/student/practice-exam/2/start">
            <Button size="sm" className="w-full text-xs bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200">
              <Trophy className="h-3 w-3 mr-1" />
              Take Exam
            </Button>
          </Link>
        </div>

        <div className="pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
          <Link to="/dashboard/student/academic">
            <Button size="sm" variant="ghost" className="w-full text-xs bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200/50 dark:border-purple-700/50 shadow-sm hover:shadow-md transition-all duration-200">
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
