
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';
import { useNavigate } from 'react-router-dom';
import { createMoodConfig } from './MoodConfig';

interface MoodSuggestionPanelProps {
  currentMood: MoodType;
}

const MoodSuggestionPanel: React.FC<MoodSuggestionPanelProps> = ({ currentMood }) => {
  const navigate = useNavigate();
  const moodConfig = createMoodConfig();
  const config = moodConfig[currentMood];
  
  if (!config) return null;
  
  const viewStudyPlan = () => {
    navigate('/dashboard/student/today');
  };
  
  return (
    <div className={`p-4 rounded-lg ${config.color} mt-4`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          {config.icon}
          <p className="text-sm">{config.suggestion}</p>
        </div>
        
        <div className="mt-1">
          <p className="text-xs mb-2">
            <strong>Study plan adjusted:</strong> {config.planAdjustment}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={viewStudyPlan}
          >
            View Your Study Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodSuggestionPanel;
