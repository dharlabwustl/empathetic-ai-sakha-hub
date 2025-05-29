
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen, BarChart3, Target, Users } from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MoodLogButton from '../mood-tracking/MoodLogButton';

interface ExamGoalCardProps {
  userProfile: UserProfileBase;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ExamGoalCard: React.FC<ExamGoalCardProps> = ({
  userProfile,
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  
  // Calculate days left until NEET 2026 (May 5, 2026)
  const examDate = new Date('2026-05-05');
  const today = new Date();
  const timeDiff = examDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const handleSwitchExam = () => {
    navigate('/dashboard/student/academic');
  };

  const handleNewPlan = () => {
    navigate('/dashboard/student/academic');
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800/30">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Exam Info */}
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {userProfile.examPreparation || 'NEET 2026'}
              </h3>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>Days Left: </span>
                  <motion.span 
                    className="font-bold text-red-600 dark:text-red-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {daysLeft}
                  </motion.span>
                </div>
              </div>
            </div>
          </div>

          {/* Study Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Pace</p>
              <p className="font-medium">{userProfile.studyPreferences?.pace || "Moderate"}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Style</p>
              <p className="font-medium">{userProfile.personalityType || "Visual"}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Hours/Day</p>
              <p className="font-medium">{userProfile.studyPreferences?.hoursPerDay || "4"}h</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Mood</p>
              <div className="flex justify-center">
                <MoodLogButton
                  currentMood={currentMood}
                  onMoodChange={onMoodChange}
                  size="sm"
                  showLabel={false}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSwitchExam}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              Switch Exam
            </Button>
            <Button 
              size="sm"
              onClick={handleNewPlan}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              New Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamGoalCard;
