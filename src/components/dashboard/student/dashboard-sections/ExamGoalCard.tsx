
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
    totalDays: 365,
    readinessScore: 78,
    studyStreak: 12,
    subjects: [
      { name: "Physics", progress: 72, color: "bg-blue-500", textColor: "text-blue-600" },
      { name: "Chemistry", progress: 65, color: "bg-green-500", textColor: "text-green-600" },
      { name: "Biology", progress: 71, color: "bg-purple-500", textColor: "text-purple-600" }
    ]
  };

  // Calculate time progress
  const timeProgress = ((examData.totalDays - examData.daysLeft) / examData.totalDays) * 100;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-purple-100/60 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/30 shadow-lg">
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

        {/* Enhanced Progress Meters */}
        <div className="space-y-4">
          {/* Exam Readiness Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">Exam Readiness</span>
              </div>
              <span className="font-bold text-yellow-600">{examData.readinessScore}%</span>
            </div>
            <Progress 
              value={examData.readinessScore} 
              className="h-3 bg-gray-200" 
              indicatorClassName="bg-gradient-to-r from-yellow-400 to-yellow-600"
            />
            <div className="text-xs text-gray-500">
              {examData.readinessScore >= 80 ? "Excellent preparation!" : 
               examData.readinessScore >= 60 ? "Good progress, keep going!" : 
               "Focus more on weak areas"}
            </div>
          </div>

          {/* Time Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Time Progress</span>
              </div>
              <span className="font-bold text-blue-600">{Math.round(timeProgress)}%</span>
            </div>
            <Progress 
              value={timeProgress} 
              className="h-3 bg-gray-200" 
              indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600"
            />
            <div className="text-xs text-gray-500">
              {examData.daysLeft} days remaining of {examData.totalDays} total
            </div>
          </div>

          {/* Overall Study Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium">Study Progress</span>
              </div>
              <span className="font-bold text-green-600">{examData.progress}%</span>
            </div>
            <Progress 
              value={examData.progress} 
              className="h-3 bg-gray-200"
              indicatorClassName="bg-gradient-to-r from-green-400 to-green-600"
            />
            <div className="text-xs text-gray-500">
              {examData.studyStreak} day study streak! 🔥
            </div>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Subject Progress
          </h4>
          {examData.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className={subject.textColor}>{subject.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
                <span className="font-medium w-8 text-right">{subject.progress}%</span>
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
