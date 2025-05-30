
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, BookOpen, Trophy, RotateCcw, Zap, TrendingUp, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import MoodLogButton from '../mood-tracking/MoodLogButton';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExamGoalCardProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ExamGoalCard: React.FC<ExamGoalCardProps> = ({ currentMood, onMoodChange }) => {
  const isMobile = useIsMobile();
  
  const examData = {
    name: "NEET 2026",
    date: "May 5, 2026",
    daysLeft: 145,
    overallProgress: 68,
    readinessScore: 78,
    timeProgress: 45, // Based on time elapsed vs total prep time
    studyProgress: 82, // Based on study hours completed
    subjects: [
      { name: "Physics", progress: 72, color: "blue", target: 80 },
      { name: "Chemistry", progress: 65, color: "green", target: 75 },
      { name: "Biology", progress: 71, color: "purple", target: 85 }
    ]
  };

  const progressMeters = [
    {
      label: "Exam Readiness",
      value: examData.readinessScore,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      icon: <Award className="h-4 w-4" />,
      description: "Overall preparation level"
    },
    {
      label: "Time Progress",
      value: examData.timeProgress,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      icon: <Clock className="h-4 w-4" />,
      description: "Time elapsed in prep cycle"
    },
    {
      label: "Study Progress",
      value: examData.studyProgress,
      color: "bg-gradient-to-r from-purple-500 to-violet-500",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Study hours completed"
    }
  ];

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-purple-100/60 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/30 shadow-lg">
      <CardHeader className={`${isMobile ? 'pb-2 px-3 pt-3' : 'pb-3'}`}>
        <div className="flex items-center justify-between">
          <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} flex items-center gap-2`}>
            <Target className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-blue-600`} />
            <span className={isMobile ? 'text-sm' : ''}>Exam Goal: {examData.name}</span>
          </CardTitle>
          <MoodLogButton 
            currentMood={currentMood}
            onMoodChange={onMoodChange}
            size="sm"
            showLabel={false}
          />
        </div>
      </CardHeader>
      
      <CardContent className={`space-y-4 ${isMobile ? 'px-3 pb-3' : ''}`}>
        {/* Exam Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>{examData.date}</span>
          </div>
          <Badge variant="outline" className={`${isMobile ? 'text-xs px-2 py-1' : ''} bg-red-50 text-red-700 border-red-200`}>
            {examData.daysLeft} days left
          </Badge>
        </div>

        {/* Progress Meters Grid - Mobile Responsive */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'}`}>
          {progressMeters.map((meter, index) => (
            <motion.div
              key={index}
              className="bg-white/70 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1 rounded ${meter.color.replace('bg-gradient-to-r', 'bg-gradient-to-br')} text-white`}>
                  {meter.icon}
                </div>
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{meter.label}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900 dark:text-gray-100`}>
                    {meter.value}%
                  </span>
                </div>
                <Progress value={meter.value} className="h-2" />
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground`}>{meter.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subject Progress */}
        <div className="space-y-2">
          <h4 className={`${isMobile ? 'text-sm' : 'text-sm'} font-medium`}>Subject Progress</h4>
          <div className={`${isMobile ? 'space-y-2' : 'space-y-2'}`}>
            {examData.subjects.map((subject, index) => (
              <div key={index} className={`flex items-center justify-between ${isMobile ? 'text-xs' : 'text-xs'}`}>
                <span className="font-medium">{subject.name}</span>
                <div className="flex items-center gap-2">
                  <div className={`${isMobile ? 'w-12' : 'w-16'} bg-gray-200 rounded-full h-1.5`}>
                    <div 
                      className={`bg-${subject.color}-500 h-1.5 rounded-full transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                  <span className="font-medium w-8">{subject.progress}%</span>
                  <span className="text-muted-foreground">/{subject.target}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons - Mobile Responsive */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-2'} pt-2`}>
          <Link to="/dashboard/student/flashcards/1/interactive">
            <Button size="sm" variant="outline" className={`w-full ${isMobile ? 'text-xs py-1.5' : 'text-xs'}`}>
              <RotateCcw className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-3 w-3 mr-1'}`} />
              Recall Practice
            </Button>
          </Link>
          <Link to="/dashboard/student/practice-exam/2/start">
            <Button size="sm" className={`w-full ${isMobile ? 'text-xs py-1.5' : 'text-xs'} bg-blue-600 hover:bg-blue-700`}>
              <Trophy className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-3 w-3 mr-1'}`} />
              Take Exam
            </Button>
          </Link>
        </div>

        {/* Switch Plan Button */}
        <div className="pt-2 border-t">
          <Link to="/dashboard/student/academic">
            <Button size="sm" variant="ghost" className={`w-full ${isMobile ? 'text-xs py-1.5' : 'text-xs'}`}>
              <Zap className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-3 w-3 mr-1'}`} />
              Switch Exam & New Plan
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamGoalCard;
