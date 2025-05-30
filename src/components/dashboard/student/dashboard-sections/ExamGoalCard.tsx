
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
    subjects: [
      { name: "Physics", progress: 72, color: "blue" },
      { name: "Chemistry", progress: 65, color: "green" },
      { name: "Biology", progress: 71, color: "purple" }
    ]
  };

  // Overall progress meters
  const progressMeters = [
    { 
      label: "Exam Readiness", 
      value: 78, 
      icon: Award, 
      color: "from-emerald-500 to-teal-600",
      description: "Overall preparation level"
    },
    { 
      label: "Time Management", 
      value: 85, 
      icon: Clock, 
      color: "from-blue-500 to-indigo-600",
      description: "Study schedule adherence"
    },
    { 
      label: "Study Consistency", 
      value: 92, 
      icon: TrendingUp, 
      color: "from-purple-500 to-violet-600",
      description: "Daily study streak"
    },
    { 
      label: "Subject Balance", 
      value: 76, 
      icon: Target, 
      color: "from-orange-500 to-red-600",
      description: "Balanced subject coverage"
    }
  ];

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

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">{examData.progress}%</span>
          </div>
          <Progress value={examData.progress} className="h-2" />
        </div>

        {/* Overall Progress Meters */}
        <div className="space-y-3 pt-2 border-t">
          <h4 className="text-sm font-medium">Progress Meters</h4>
          <div className="grid grid-cols-2 gap-3">
            {progressMeters.map((meter, index) => (
              <motion.div
                key={meter.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-full bg-gradient-to-r ${meter.color}`}>
                    <meter.icon className="h-3 w-3 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium truncate">{meter.label}</span>
                      <span className="text-xs font-bold">{meter.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div 
                        className={`h-1.5 rounded-full bg-gradient-to-r ${meter.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${meter.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
