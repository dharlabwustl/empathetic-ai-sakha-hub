
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, BookOpen, Trophy, RotateCcw, Zap, Clock, TrendingUp, Award } from 'lucide-react';
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
    overallReadiness: 78,
    timeProgress: 45,
    studyStreak: 12,
    subjects: [
      { name: "Physics", progress: 72, color: "blue" },
      { name: "Chemistry", progress: 65, color: "green" },
      { name: "Biology", progress: 71, color: "purple" }
    ]
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-blue-600";
    if (progress >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBg = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-purple-100/60 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/30 shadow-lg mood-themed">
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

        {/* Overall Progress Meters Section */}
        <div className="space-y-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progress Meters
          </h4>
          
          {/* Overall Readiness */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Award className="h-3 w-3 text-purple-600" />
                <span>Overall Readiness</span>
              </div>
              <span className={`font-bold ${getProgressColor(examData.overallReadiness)}`}>
                {examData.overallReadiness}%
              </span>
            </div>
            <Progress value={examData.overallReadiness} className="h-2" />
          </div>

          {/* Time Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-orange-600" />
                <span>Time Progress</span>
              </div>
              <span className={`font-bold ${getProgressColor(examData.timeProgress)}`}>
                {examData.timeProgress}%
              </span>
            </div>
            <Progress value={examData.timeProgress} className="h-2" />
          </div>

          {/* Study Consistency */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3 text-green-600" />
                <span>Study Streak</span>
              </div>
              <span className="font-bold text-green-600">
                {examData.studyStreak} days
              </span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 14 }, (_, i) => (
                <div 
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i < examData.studyStreak ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Overall Syllabus Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Syllabus Coverage</span>
              <span className={`font-medium ${getProgressColor(examData.progress)}`}>
                {examData.progress}%
              </span>
            </div>
            <Progress value={examData.progress} className="h-2" />
          </div>
        </div>

        {/* Subject Progress */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Subject Progress</h4>
          {examData.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="font-medium">{subject.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`${getProgressBg(subject.progress)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
                <span className={`font-bold w-10 text-right ${getProgressColor(subject.progress)}`}>
                  {subject.progress}%
                </span>
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
