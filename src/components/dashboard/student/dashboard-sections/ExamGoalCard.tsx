
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, BookOpen, Trophy, RotateCcw, Zap, Clock, TrendingUp } from 'lucide-react';
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
      { name: "Physics", progress: 72, color: "blue", target: 85 },
      { name: "Chemistry", progress: 65, color: "green", target: 80 },
      { name: "Biology", progress: 71, color: "purple", target: 90 }
    ]
  };

  // Calculate overall exam readiness
  const averageProgress = examData.subjects.reduce((sum, subject) => sum + subject.progress, 0) / examData.subjects.length;
  const examReadiness = Math.round(averageProgress);

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

        {/* Overall Progress with Enhanced Progress Meter */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Exam Readiness</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="font-bold text-lg">{examReadiness}%</span>
            </div>
          </div>
          <div className="relative">
            <Progress value={examReadiness} className="h-3" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-white drop-shadow-sm">
                {examReadiness >= 70 ? 'On Track!' : examReadiness >= 50 ? 'Good Progress' : 'Keep Going!'}
              </span>
            </div>
          </div>
          
          {/* Progress Milestones */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span className="text-yellow-600">50% (Target)</span>
            <span className="text-green-600">85% (Excellence)</span>
            <span>100%</span>
          </div>
        </div>

        {/* Time Remaining Progress */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-gray-500" />
              <span className="text-xs font-medium">Time Progress</span>
            </div>
            <span className="text-xs">{Math.round((365 - examData.daysLeft) / 365 * 100)}% elapsed</span>
          </div>
          <Progress 
            value={(365 - examData.daysLeft) / 365 * 100} 
            className="h-2" 
            indicatorClassName="bg-orange-500"
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Subject Progress</h4>
          {examData.subjects.map((subject, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>{subject.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Target: {subject.target}%</span>
                  <span className="font-medium">{subject.progress}%</span>
                </div>
              </div>
              <div className="relative">
                <Progress value={subject.progress} className="h-2" />
                {/* Target marker */}
                <div 
                  className="absolute top-0 w-0.5 h-2 bg-gray-400 opacity-50"
                  style={{ left: `${subject.target}%` }}
                />
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
