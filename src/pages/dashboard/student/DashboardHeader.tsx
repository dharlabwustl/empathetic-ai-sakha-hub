
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

  const navigateToTutor = () => navigate('/dashboard/student/tutor');
  const navigateToAdvisor = () => navigate('/dashboard/student/academic');
  const navigateToWellness = () => navigate('/dashboard/student/wellness');

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
      
      <div className="flex flex-wrap gap-3 mt-4">
        <Button 
          variant="outline"
          onClick={navigateToTutor}
          className="flex items-center gap-2"
        >
          24/7 AI Tutor
        </Button>
        
        <Button 
          variant="outline"
          onClick={navigateToAdvisor}
          className="flex items-center gap-2"
        >
          Academic Advisor
        </Button>
        
        <Button 
          variant="outline"
          onClick={navigateToWellness}
          className="flex items-center gap-2"
        >
          Feel Good Corner
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;

// Import the UserProfileType
import { UserProfileType } from "@/types/user";
