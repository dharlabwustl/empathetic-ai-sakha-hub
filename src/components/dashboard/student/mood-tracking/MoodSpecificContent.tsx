
import React from 'react';
import { getMoodSpecificContent, getMoodColor } from './moodUtils';
import { MoodType } from '@/types/user/base';

interface MoodSpecificContentProps {
  currentMood: MoodType;
  className?: string;
}

const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({
  currentMood,
  className = ""
}) => {
  const content = getMoodSpecificContent(currentMood);
  const colorClass = getMoodColor(currentMood);
  
  return (
    <div className={`p-3 rounded-md ${colorClass} bg-opacity-50 ${className}`}>
      <h4 className="text-sm font-medium">{content.title}</h4>
      <p className="text-xs mt-1">{content.message}</p>
    </div>
  );
};

export default MoodSpecificContent;
