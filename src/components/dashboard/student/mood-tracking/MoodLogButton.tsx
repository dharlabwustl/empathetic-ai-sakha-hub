
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { 
  getMoodEmoji, 
  getMoodLabel, 
  getStudyRecommendationForMood, 
  analyzeMoodTrends, 
  updateStudyTimeAllocationsByMood,
  storeMoodInLocalStorage,
  updateDashboardThemeByMood
} from './moodUtils';
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
  const { toast } = useToast();
  
  useEffect(() => {
    // Apply theme based on current mood
    if (currentMood) {
      updateDashboardThemeByMood(currentMood);
    }
  }, [currentMood]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleMoodChange = (mood: MoodType) => {
    console.log('Mood changed to:', mood);
    
    // Store mood and update theme
    storeMoodInLocalStorage(mood);
    updateDashboardThemeByMood(mood);
    
    // Update study time allocations
    updateStudyTimeAllocationsByMood(mood);
    
    // Call parent callback
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    // Show toast with recommendation
    const recommendation = getStudyRecommendationForMood(mood);
    toast({
      title: `Mood Updated: ${getMoodLabel(mood)}`,
      description: recommendation,
      duration: 5000,
    });
    
    // Analyze trends and show additional notifications
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
    
    // Trigger custom events for other components
    const moodChangeEvent = new CustomEvent('mood-changed', { 
      detail: { 
        mood, 
        timestamp: new Date().toISOString(),
        recommendation
      } 
    });
    document.dispatchEvent(moodChangeEvent);
    
    handleCloseDialog();
  };
  
  const moodEmoji = getMoodEmoji(currentMood);
  const moodLabelText = currentMood 
    ? `Feeling ${getMoodLabel(currentMood)}` 
    : "Log Mood";
  
  // Enhanced styling based on mood
  const getBgColorClass = () => {
    if (!currentMood) return "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-800 dark:to-gray-700";
    
    switch (currentMood) {
      case MoodType.HAPPY:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-300";
      case MoodType.MOTIVATED:
        return "bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 dark:from-green-900/30 dark:to-green-800/30 border-green-300";
      case MoodType.FOCUSED:
        return "bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-300";
      case MoodType.CALM:
        return "bg-gradient-to-r from-emerald-100 to-emerald-200 hover:from-emerald-200 hover:to-emerald-300 dark:from-emerald-900/30 dark:to-emerald-800/30 border-emerald-300";
      case MoodType.TIRED:
        return "bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-300";
      case MoodType.STRESSED:
        return "bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 dark:from-red-900/30 dark:to-red-800/30 border-red-300";
      case MoodType.ANXIOUS:
        return "bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-800/50 dark:to-gray-700/50 border-gray-300";
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 shadow-lg border-2 ${getBgColorClass()} transition-all duration-300 transform hover:scale-105 ${className}`}
      >
        <span className="text-lg">{moodEmoji}</span>
        {showLabel && (
          <span className="font-medium">
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
