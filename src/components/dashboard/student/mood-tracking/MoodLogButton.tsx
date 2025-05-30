
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel, getStudyRecommendationForMood, analyzeMoodTrends, updateStudyTimeAllocationsByMood } from './moodUtils';
import MoodSelectionDialog from './MoodSelectionDialog';
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

  // Apply mood theme to body when mood changes
  useEffect(() => {
    if (currentMood) {
      document.body.className = document.body.className.replace(/mood-\w+/g, '');
      document.body.classList.add(`mood-${currentMood}`);
    }
  }, [currentMood]);

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
      const adjustedAllocations = updateStudyTimeAllocationsByMood(mood);
      
      // Show toast confirmation with recommendation
      const recommendation = getStudyRecommendationForMood(mood);
      
      toast({
        title: `Mood Updated: ${getMoodLabel(mood)}`,
        description: recommendation,
        duration: 5000,
      });
      
      // Show allocation adjustment notification
      toast({
        title: "Study Plan Adjusted",
        description: "Your daily study schedule has been optimized based on your current mood.",
        duration: 4000,
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
          recommendation,
          adjustedAllocations
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
    if (!currentMood) return "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-800 dark:to-gray-700";
    
    switch (currentMood) {
      case MoodType.HAPPY:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 dark:from-yellow-900/30 dark:to-yellow-800/30";
      case MoodType.MOTIVATED:
        return "bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 dark:from-green-900/30 dark:to-green-800/30";
      case MoodType.FOCUSED:
        return "bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 dark:from-blue-900/30 dark:to-blue-800/30";
      case MoodType.NEUTRAL:
        return "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-800/50 dark:to-gray-700/50";
      case MoodType.TIRED:
        return "bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 dark:from-orange-900/30 dark:to-orange-800/30";
      case MoodType.ANXIOUS:
        return "bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 dark:from-purple-900/30 dark:to-purple-800/30";
      case MoodType.STRESSED:
        return "bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 dark:from-red-900/30 dark:to-red-800/30";
      case MoodType.SAD:
        return "bg-gradient-to-r from-indigo-100 to-indigo-200 hover:from-indigo-200 hover:to-indigo-300 dark:from-indigo-900/30 dark:to-indigo-800/30";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-800/50 dark:to-gray-700/50";
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
