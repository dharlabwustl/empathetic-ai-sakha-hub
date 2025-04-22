
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfileType, MoodType } from "@/types/user/base";
import { CalendarRange, BookOpen, Clock, Target } from "lucide-react";
import { Flame as Fire } from "lucide-react";
import MoodLogButton from "@/components/dashboard/student/mood-tracking/MoodLogButton";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(userProfile.currentMood);
  const { updateUserProfile } = useUserProfile(UserRole.Student);
  
  const handleMoodSelect = (mood: MoodType | undefined) => {
    setCurrentMood(mood);
    
    // Update the user profile with the new mood
    updateUserProfile({
      ...userProfile,
      currentMood: mood
    });
  };

  // Compute days until exam if available
  const daysUntilExam = userProfile.examPreparation?.examDate
    ? Math.ceil((new Date(userProfile.examPreparation.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Get the exam target name
  const examTarget = userProfile.examPreparation?.target || userProfile.goals?.[0]?.title || "Your Exam";

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{formattedTime}, {userProfile.name}</h1>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <CalendarRange className="h-3.5 w-3.5 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <MoodLogButton 
            onMoodSelect={handleMoodSelect}
            selectedMood={currentMood}
            className="mr-2"
          />
          
          <Button
            variant="outline"
            className="border-primary/30 bg-primary/5"
            onClick={onViewStudyPlan}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            View Study Plan
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-sm">
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {/* Exam Preparation Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700 dark:text-blue-300">{examTarget}</h3>
              {daysUntilExam !== null && (
                <div className="flex items-center mt-1">
                  <Clock className="h-3.5 w-3.5 mr-1 text-blue-500" />
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {daysUntilExam} days until exam
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Study Streak */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-amber-100 to-red-100 dark:from-amber-900/50 dark:to-red-900/50 rounded-full flex items-center justify-center">
              <Flame className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-amber-700 dark:text-amber-300">
                  {userProfile.studyStreak?.current || 0} Day Streak
                </h3>
                {userProfile.studyStreak && userProfile.studyStreak.current >= 3 && (
                  <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                    On Fire!
                  </Badge>
                )}
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                Best: {userProfile.studyStreak?.best || 0} days
              </p>
            </div>
          </div>
          
          {/* Today's Goal */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-green-100 to-cyan-100 dark:from-green-900/50 dark:to-cyan-900/50 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-green-700 dark:text-green-300">Today's Goal</h3>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Complete 3 core concepts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHeader;
