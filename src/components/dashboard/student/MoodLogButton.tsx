
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel, getStudyRecommendationForMood, analyzeMoodTrends, updateStudyTimeAllocationsByMood } from './mood-tracking/moodUtils';
import MoodSelectionDialog from './mood-tracking/MoodSelectionDialog';
import { useToast } from '@/hooks/use-toast';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
  showLabel?: boolean;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({
  currentMood,
  onMoodChange,
  className = '',
  size = "sm",
  showLabel = true,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lastMoodChange, setLastMoodChange] = useState<Date | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Listen for mood change events from other components
    const handleMoodChangeEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (onMoodChange && customEvent.detail && customEvent.detail.mood) {
        onMoodChange(customEvent.detail.mood);
        setLastMoodChange(new Date());
      }
    };

    document.addEventListener('mood-changed', handleMoodChangeEvent);
    
    return () => {
      document.removeEventListener('mood-changed', handleMoodChangeEvent);
    };
  }, [onMoodChange]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
      setLastMoodChange(new Date());
      
      // Update study time allocations based on mood
      updateStudyTimeAllocationsByMood(mood);
      
      // Show toast confirmation with recommendation
      const recommendation = getStudyRecommendationForMood(mood);
      
      toast({
        title: `Mood Updated: ${getMoodLabel(mood)}`,
        description: recommendation,
        duration: 5000,
      });
      
      // Analyze mood trends for additional notifications
      const trends = analyzeMoodTrends();
      
      if (trends.stressSignals) {
        setTimeout(() => {
          toast({
            title: "Stress Pattern Detected",
            description: "You've been feeling stressed lately. Consider taking a break or trying our Feel Good Corner.",
            variant: "destructive",
            duration: 7000,
          });
        }, 1000);
      } else if (trends.improved) {
        setTimeout(() => {
          toast({
            title: "Your mood is improving!",
            description: "Great progress! Keep up the good work.",
            variant: "default",
            duration: 5000,
          });
        }, 1000);
      }
      
      // Trigger custom event for other components to react to
      const moodChangeEvent = new CustomEvent('mood-changed', { 
        detail: { 
          mood, 
          timestamp: new Date().toISOString(),
          recommendation
        } 
      });
      document.dispatchEvent(moodChangeEvent);
    }
    handleCloseDialog();
  };
  
  // Get emoji with fallback
  const moodEmoji = getMoodEmoji(currentMood);
  
  // Get mood label text
  const moodLabelText = currentMood 
    ? `Feeling ${getMoodLabel(currentMood)}` 
    : "Log Mood";
  
  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 ${className} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
      >
        <span className="text-lg">{moodEmoji}</span>
        {showLabel && (
          <span className="hidden sm:inline">
            {moodLabelText}
          </span>
        )}
      </Button>

      <MoodSelectionDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        selectedMood={currentMood}
        onSelectMood={handleMoodChange}
      />
    </>
  );
};

export default MoodLogButton;
