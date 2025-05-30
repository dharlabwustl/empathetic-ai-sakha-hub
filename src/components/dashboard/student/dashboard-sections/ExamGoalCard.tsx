
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
    readinessScore: 78,
    timeProgress: 45, // Based on days passed vs total preparation time
    studyProgress: 72, // Based on study hours completed
    subjects: [
      { name: "Physics", progress: 72, color: "blue" },
      { name: "Chemistry", progress: 65, color: "green" },
      { name: "Biology", progress: 71, color: "purple" }
    ]
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return "bg-green-100 dark:bg-green-900/20";
    if (progress >= 60) return "bg-yellow-100 dark:bg-yellow-900/20";
    return "bg-red-100 dark:bg-red-900/20";
  };

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

        {/* Overall Progress Meters */}
        <div className="space-y-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Overall Progress Tracking
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Exam Readiness Score */}
            <div className={`p-3 rounded-lg ${getProgressBgColor(examData.readinessScore)}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium">Exam Readiness</span>
                <span className={`text-sm font-bold ${getProgressColor(examData.readinessScore)}`}>
                  {examData.readinessScore}%
                </span>
              </div>
              <Progress value={examData.readinessScore} className="h-2" />
              <div className="text-xs text-gray-600 mt-1">Based on mock tests & practice</div>
            </div>

            {/* Time Progress */}
            <div className={`p-3 rounded-lg ${getProgressBgColor(examData.timeProgress)}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Time Progress
                </span>
                <span className={`text-sm font-bold ${getProgressColor(examData.timeProgress)}`}>
                  {examData.timeProgress}%
                </span>
              </div>
              <Progress value={examData.timeProgress} className="h-2" />
              <div className="text-xs text-gray-600 mt-1">{examData.daysLeft} days remaining</div>
            </div>

            {/* Study Progress */}
            <div className={`p-3 rounded-lg ${getProgressBgColor(examData.studyProgress)}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  Study Hours
                </span>
                <span className={`text-sm font-bold ${getProgressColor(examData.studyProgress)}`}>
                  {examData.studyProgress}%
                </span>
              </div>
              <Progress value={examData.studyProgress} className="h-2" />
              <div className="text-xs text-gray-600 mt-1">of planned study completed</div>
            </div>

            {/* Overall Subject Progress */}
            <div className={`p-3 rounded-lg ${getProgressBgColor(examData.progress)}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium">Subject Mastery</span>
                <span className={`text-sm font-bold ${getProgressColor(examData.progress)}`}>
                  {examData.progress}%
                </span>
              </div>
              <Progress value={examData.progress} className="h-2" />
              <div className="text-xs text-gray-600 mt-1">Average across all subjects</div>
            </div>
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
