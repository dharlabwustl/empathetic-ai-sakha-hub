
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel, getStudyRecommendationForMood, analyzeMoodTrends, updateStudyTimeAllocationsByMood } from './moodUtils';
import { MoodSelectionDialog } from './MoodSelectionDialog';
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
  
  // Get emoji and mood color with fallback
  const moodEmoji = getMoodEmoji(currentMood);
  
  // Get mood label text
  const moodLabelText = currentMood 
    ? `Feeling ${getMoodLabel(currentMood)}` 
    : "Log Mood";
  
  // Generate background color based on mood for enhanced visual appeal
  const getBgColorClass = () => {
    if (!currentMood) return "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300";
    
    switch (currentMood) {
      case MoodType.HAPPY:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300";
      case MoodType.MOTIVATED:
        return "bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300";
      case MoodType.FOCUSED:
        return "bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300";
      case MoodType.TIRED:
        return "bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300";
      case MoodType.STRESSED:
        return "bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300";
      case MoodType.ANXIOUS:
        return "bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300";
      case MoodType.CALM:
        return "bg-gradient-to-r from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300";
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 shadow-sm border ${getBgColorClass()} transition-all duration-300 ${className}`}
      >
        <span className="text-lg">{moodEmoji}</span>
        {showLabel && (
          <span className="inline">
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
