
import React, { useEffect } from 'react';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';
import { updateStudyTimeAllocationsByMood, getStudyRecommendationForMood } from './moodUtils';

interface MoodBasedPlanAdjusterProps {
  currentMood?: MoodType;
  onPlanAdjusted?: (adjustments: Record<string, number>) => void;
}

const MoodBasedPlanAdjuster: React.FC<MoodBasedPlanAdjusterProps> = ({
  currentMood,
  onPlanAdjusted
}) => {
  const { toast } = useToast();

  useEffect(() => {
    if (currentMood) {
      // Adjust study plan based on mood
      const adjustedAllocations = updateStudyTimeAllocationsByMood(currentMood);
      
      // Get mood-specific recommendation
      const recommendation = getStudyRecommendationForMood(currentMood);
      
      // Notify parent component
      if (onPlanAdjusted) {
        onPlanAdjusted(adjustedAllocations);
      }
      
      // Show toast with study plan adjustment
      toast({
        title: `Study plan adjusted for your ${currentMood} mood`,
        description: recommendation,
        duration: 4000,
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('last_mood_adjustment', JSON.stringify({
        mood: currentMood,
        timestamp: new Date().toISOString(),
        allocations: adjustedAllocations
      }));
    }
  }, [currentMood, onPlanAdjusted, toast]);

  // This component doesn't render anything visible
  return null;
};

export default MoodBasedPlanAdjuster;
