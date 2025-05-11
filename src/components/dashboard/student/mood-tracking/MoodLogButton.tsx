
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from "@/types/user/base";
import { 
  getMoodEmoji, 
  getMoodLabel, 
  getStudyRecommendationForMood, 
  analyzeMoodTrends 
} from "./moodUtils";
import { MoodSelectionDialog } from "./MoodSelectionDialog";

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  buttonSize?: "sm" | "md" | "lg";
  showRecommendation?: boolean;
  className?: string;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({
  currentMood,
  onMoodChange,
  buttonSize = "md",
  showRecommendation = false,
  className = "",
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
      
      // Show recommendation based on mood if enabled
      if (showRecommendation) {
        const recommendation = getStudyRecommendationForMood(mood);
        
        toast({
          title: `Mood set to ${getMoodLabel(mood)}`,
          description: recommendation,
          duration: 5000,
        });
        
        // Check for mood trends and notify if needed
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
      }
    }
    handleCloseDialog();
  };

  const sizeClasses = {
    sm: "text-sm py-1 px-2",
    md: "py-1.5 px-3",
    lg: "text-lg py-2 px-4"
  };

  return (
    <>
      <Button
        variant="outline"
        size={buttonSize === "lg" ? "default" : buttonSize === "sm" ? "sm" : "sm"}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 ${sizeClasses[buttonSize]} ${className}`}
      >
        <span className="text-lg">{getMoodEmoji(currentMood)}</span>
        <span className="hidden sm:inline">
          {currentMood ? `Feeling ${currentMood.toLowerCase()}` : "Log Mood"}
        </span>
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
