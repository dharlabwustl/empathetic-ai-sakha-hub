
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
}

const DashboardHeader = ({ 
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan
}: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{userProfile.name},</h1>
          <p className="text-gray-500">
            {formattedTime}, {formattedDate}
          </p>
        </div>
        <Button variant="default" onClick={onViewStudyPlan}>
          View Study Plan
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;

// Import the UserProfileType
import { UserProfileType } from "@/types/user";
