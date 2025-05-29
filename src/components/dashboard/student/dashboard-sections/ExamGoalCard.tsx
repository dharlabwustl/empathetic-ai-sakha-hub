
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookMarked } from 'lucide-react';
import { UserProfileType, MoodType } from '@/types/user/base';
import MoodLogButton from '../mood-tracking/MoodLogButton';
import { Link } from 'react-router-dom';

interface ExamGoalCardProps {
  userProfile: UserProfileType;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ExamGoalCard: React.FC<ExamGoalCardProps> = ({
  userProfile,
  currentMood,
  onMoodChange
}) => {
  return (
    <Card className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Current Exam Goal</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {userProfile.examPreparation || "NEET"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onMoodChange && (
              <MoodLogButton
                currentMood={currentMood}
                onMoodChange={onMoodChange}
                size="sm"
                showLabel={false}
              />
            )}
          </div>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Link to="/dashboard/student/academic-advisor" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Switch Exam
            </Button>
          </Link>
          <Link to="/dashboard/student/academic-advisor" className="flex-1">
            <Button size="sm" className="w-full">
              New Plan
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamGoalCard;
