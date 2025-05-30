
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
    totalDays: 365,
    progress: 68,
    readinessScore: 78,
    subjects: [
      { name: "Physics", progress: 72, color: "blue", target: 85 },
      { name: "Chemistry", progress: 65, color: "green", target: 80 },
      { name: "Biology", progress: 71, color: "purple", target: 90 }
    ]
  };

  // Calculate time progress
  const timeProgress = ((examData.totalDays - examData.daysLeft) / examData.totalDays) * 100;

  // Calculate overall readiness based on multiple factors
  const overallReadiness = Math.round((examData.progress + examData.readinessScore + timeProgress) / 3);

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
        {/* Exam Date and Time Left */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{examData.date}</span>
          </div>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {examData.daysLeft} days left
          </Badge>
        </div>

        {/* Progress Meters Section */}
        <div className="space-y-4 p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg border border-gray-200/50">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Progress Meters
          </h4>

          {/* Overall Readiness */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Award className="h-3 w-3 text-green-600" />
                Overall Readiness
              </span>
              <span className="font-medium text-green-600">{overallReadiness}%</span>
            </div>
            <Progress 
              value={overallReadiness} 
              className="h-2" 
              indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500"
            />
          </div>

          {/* Time Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-orange-600" />
                Time Progress
              </span>
              <span className="font-medium text-orange-600">{Math.round(timeProgress)}%</span>
            </div>
            <Progress 
              value={timeProgress} 
              className="h-2" 
              indicatorClassName="bg-gradient-to-r from-orange-500 to-red-500"
            />
          </div>

          {/* Study Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-blue-600" />
                Study Progress
              </span>
              <span className="font-medium text-blue-600">{examData.progress}%</span>
            </div>
            <Progress 
              value={examData.progress} 
              className="h-2" 
              indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>

        {/* Subject Progress */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Subject Progress</h4>
          {examData.subjects.map((subject, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{subject.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Target: {subject.target}%</span>
                  <span className="font-medium">{subject.progress}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={subject.progress} 
                  className="h-1.5 flex-1"
                  indicatorClassName={`bg-${subject.color}-500`}
                />
                <div className="w-px h-4 bg-gray-300"></div>
                <Progress 
                  value={(subject.progress / subject.target) * 100} 
                  className="h-1.5 w-8"
                  indicatorClassName="bg-green-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
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
