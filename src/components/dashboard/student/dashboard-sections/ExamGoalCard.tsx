
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, Clock, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { MoodType } from '@/types/user/base';
import MoodLogButton from '../mood-tracking/MoodLogButton';
import { Link } from 'react-router-dom';

interface ExamGoalCardProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ExamGoalCard: React.FC<ExamGoalCardProps> = ({ currentMood, onMoodChange }) => {
  const examData = {
    name: "NEET 2024",
    daysLeft: 45,
    progress: 78,
    target: "650+ Score",
    nextMilestone: "Complete Organic Chemistry",
    confidence: "High"
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Exam Goal</span>
          </div>
          <MoodLogButton 
            currentMood={currentMood} 
            onMoodChange={onMoodChange}
            size="sm"
            showLabel={false}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">{examData.name}</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">{examData.daysLeft} days left</span>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              {examData.confidence} Confidence
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-bold">{examData.progress}%</span>
          </div>
          <Progress value={examData.progress} className="h-2" />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Target Score</h4>
          <p className="text-lg font-bold text-blue-600">{examData.target}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Next Milestone</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{examData.nextMilestone}</p>
        </div>

        <div className="flex gap-2 pt-2">
          <Link to="/dashboard/student/academic" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Switch Exam
            </Button>
          </Link>
          <Link to="/dashboard/student/academic" className="flex-1">
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
              <Zap className="h-3 w-3 mr-1" />
              New Plan
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamGoalCard;
