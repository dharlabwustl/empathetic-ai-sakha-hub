
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from "@/types/user/base";
import { 
  getMoodEmoji, 
  getMoodLabel, 
  getStudyRecommendationForMood, 
  analyzeMoodTrends,
  storeMoodInLocalStorage
} from "./moodUtils";
import { MoodSelectionDialog } from "./MoodSelectionDialog";
import { Smile } from "lucide-react";

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  buttonSize?: "sm" | "md" | "lg";
  showRecommendation?: boolean;
  className?: string;
  variant?: "outline" | "default" | "secondary" | "ghost" | "link" | "destructive";
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({
  currentMood,
  onMoodChange,
  buttonSize = "md",
  showRecommendation = false,
  className = "",
  variant = "outline"
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
      // Call the onMoodChange prop
      onMoodChange(mood);
      
      // Also store the mood in localStorage for persistence
      storeMoodInLocalStorage(mood);
      
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
              duration: 5000,
            });
          }, 1000);
        }
      }
      
      // Dispatch custom event for other components to hear
      const moodChangeEvent = new CustomEvent('mood-changed', { 
        detail: { mood, timestamp: new Date().toISOString() } 
      });
      document.dispatchEvent(moodChangeEvent);
      
      // Update study plan based on mood
      updateStudyPlanBasedOnMood(mood);
    }
    handleCloseDialog();
  };

  // Function to update study plan based on mood
  const updateStudyPlanBasedOnMood = (mood: MoodType) => {
    // Get appropriate time allocations based on mood
    const timeAllocations = getTimeAllocationsForMood(mood);
    
    // Store in localStorage for study plan components to use
    localStorage.setItem('study_time_allocations', JSON.stringify(timeAllocations));
    
    // Only show toast if recommendation is enabled
    if (showRecommendation) {
      toast({
        title: "Study Plan Updated",
        description: `Your study plan has been adjusted based on your ${mood.toLowerCase()} mood.`,
        duration: 4000
      });
    }
  };

  // Helper function to get study time allocations based on mood
  const getTimeAllocationsForMood = (mood: MoodType) => {
    switch (mood) {
      case MoodType.FOCUSED:
        return {
          difficultTopics: 0.5,  // 50% time on difficult topics
          reviewTopics: 0.2,     // 20% time on review
          newTopics: 0.3,        // 30% time on new topics
          breakFrequency: 45,    // Break every 45 minutes
          sessionDuration: 90    // 90 minute sessions
        };
      case MoodType.MOTIVATED:
        return {
          difficultTopics: 0.4,
          reviewTopics: 0.2,
          newTopics: 0.4,
          breakFrequency: 50,
          sessionDuration: 90
        };
      case MoodType.TIRED:
      case MoodType.OVERWHELMED:
        return {
          difficultTopics: 0.1,
          reviewTopics: 0.7,
          newTopics: 0.2,
          breakFrequency: 25,
          sessionDuration: 45
        };
      case MoodType.STRESSED:
      case MoodType.ANXIOUS:
        return {
          difficultTopics: 0.2,
          reviewTopics: 0.6,
          newTopics: 0.2,
          breakFrequency: 30,
          sessionDuration: 50
        };
      case MoodType.HAPPY:
      case MoodType.CALM:
        return {
          difficultTopics: 0.3,
          reviewTopics: 0.3,
          newTopics: 0.4,
          breakFrequency: 40,
          sessionDuration: 70
        };
      default:
        return {
          difficultTopics: 0.33,
          reviewTopics: 0.33,
          newTopics: 0.34,
          breakFrequency: 35,
          sessionDuration: 60
        };
    }
  };

  const sizeClasses = {
    sm: "text-sm py-1 px-2",
    md: "py-1.5 px-3",
    lg: "text-lg py-2 px-4"
  };

  // Get appropriate emoji for current mood or default to smile
  const moodEmoji = currentMood ? getMoodEmoji(currentMood) : <Smile className="h-4 w-4" />;
  
  return (
    <>
      <Button
        variant={variant}
        size={buttonSize === "lg" ? "default" : buttonSize === "sm" ? "sm" : "sm"}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 ${sizeClasses[buttonSize]} ${className}`}
      >
        <span className="text-lg">{moodEmoji}</span>
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
