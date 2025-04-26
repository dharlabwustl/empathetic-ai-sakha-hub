
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import MoodLogButton from "@/components/dashboard/student/MoodLogButton";
import { MoodType } from "@/types/user/base";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardHeader = ({ 
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange
}: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{userProfile.name},</h1>
          <p className="text-gray-500">
            {formattedTime}, {formattedDate}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <MoodLogButton 
            currentMood={currentMood}
            onMoodChange={onMoodChange}
            className="mr-1"
          />
          <Button variant="default" onClick={onViewStudyPlan} className="whitespace-nowrap">
            View Study Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

// Import the UserProfileType
import { UserProfileType } from "@/types/user/base";
