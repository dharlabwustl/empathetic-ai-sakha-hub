
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, BookOpen, Trophy, RotateCcw, Zap, Clock, TrendingUp, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EnhancedExamGoalCard: React.FC = () => {
  const examData = {
    name: "NEET 2026",
    date: "May 5, 2026",
    daysLeft: 145,
    progress: 75,
    readinessScore: 78,
    timeProgress: 65,
    studyProgress: 82,
    subjects: [
      { name: "Physics", progress: 72, color: "bg-blue-500", target: 85 },
      { name: "Chemistry", progress: 78, color: "bg-green-500", target: 85 },
      { name: "Biology", progress: 75, color: "bg-purple-500", target: 85 }
    ]
  };

  const progressMeters = [
    { 
      label: "Exam Readiness", 
      value: examData.readinessScore, 
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
      icon: Trophy,
      description: "Overall preparation level"
    },
    { 
      label: "Time Progress", 
      value: examData.timeProgress, 
      color: "bg-gradient-to-r from-blue-400 to-cyan-500",
      icon: Clock,
      description: "Days utilized effectively"
    },
    { 
      label: "Study Completion", 
      value: examData.studyProgress, 
      color: "bg-gradient-to-r from-purple-400 to-violet-500",
      icon: BookOpen,
      description: "Syllabus coverage"
    }
  ];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-purple-100/60 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/30 shadow-xl backdrop-blur-sm">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-xl" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-bold">Exam Goal: {examData.name}</div>
                <div className="text-sm text-gray-600 font-normal">Your journey to success</div>
              </div>
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 relative z-10">
          {/* Exam Info */}
          <div className="flex items-center justify-between p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">{examData.date}</div>
                <div className="text-sm text-gray-600">Target Date</div>
              </div>
            </div>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 px-3 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {examData.daysLeft} days left
            </Badge>
          </div>

          {/* Progress Meters */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress Overview
            </h4>
            
            {progressMeters.map((meter, index) => (
              <motion.div
                key={meter.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <meter.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">{meter.label}</span>
                  </div>
                  <span className="text-sm font-bold">{meter.value}%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${meter.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${meter.value}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500">{meter.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Subject Progress */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Subject Mastery
            </h4>
            {examData.subjects.map((subject, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 dark:bg-gray-800/30 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{subject.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{subject.progress}%</span>
                    <span className="text-xs text-gray-500">/ {subject.target}%</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${subject.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.15 }}
                    />
                  </div>
                  {/* Target indicator */}
                  <div 
                    className="absolute top-0 w-0.5 h-2 bg-gray-400"
                    style={{ left: `${subject.target}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Link to="/dashboard/student/flashcards/1/interactive">
              <Button size="sm" variant="outline" className="w-full text-xs hover:bg-blue-50 border-blue-200">
                <RotateCcw className="h-3 w-3 mr-1" />
                Recall Practice
              </Button>
            </Link>
            <Link to="/dashboard/student/practice-exam/2/start">
              <Button size="sm" className="w-full text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Trophy className="h-3 w-3 mr-1" />
                Take Exam
              </Button>
            </Link>
          </div>

          <div className="pt-2 border-t border-gray-200/50">
            <Link to="/dashboard/student/academic">
              <Button size="sm" variant="ghost" className="w-full text-xs hover:bg-purple-50">
                <Zap className="h-3 w-3 mr-1" />
                Switch Exam & New Plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedExamGoalCard;
