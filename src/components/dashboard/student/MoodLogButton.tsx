
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji } from './mood-tracking/moodUtils';
import { MoodSelectionDialog } from './mood-tracking/MoodSelectionDialog';
import { useToast } from '@/hooks/use-toast';
import { SmilePlus } from 'lucide-react';

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
  
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
      
      // Show toast confirmation
      toast({
        title: "Mood Updated",
        description: `Your mood has been set to ${mood.toLowerCase()}.`,
      });
      
      // Store mood in localStorage for persistence
      localStorage.setItem('current_mood', mood);
      
      // Record mood in history for tracking
      const now = new Date().toISOString();
      const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
      moodHistory.push({ mood, timestamp: now });
      localStorage.setItem('mood_history', JSON.stringify(moodHistory.slice(-50))); // Keep last 50 entries
      
      // Adjust study plan based on mood
      adjustStudyPlanForMood(mood);
      
      // Trigger custom event for other components to react to
      const moodChangeEvent = new CustomEvent('mood-changed', { 
        detail: { mood, timestamp: now } 
      });
      document.dispatchEvent(moodChangeEvent);
      
      // Update user data
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          parsedData.mood = mood;
          localStorage.setItem('userData', JSON.stringify(parsedData));
        }
      } catch (e) {
        console.error('Error updating mood in user data:', e);
      }
    }
    handleCloseDialog();
  };
  
  // Function to adjust study plan based on mood
  const adjustStudyPlanForMood = (mood: MoodType) => {
    // Get current study plan if exists
    const studyPlanData = localStorage.getItem('study_plan');
    if (!studyPlanData) return;
    
    try {
      const studyPlan = JSON.parse(studyPlanData);
      
      // Adjust study plan based on mood
      switch(mood) {
        case MoodType.MOTIVATED:
          // Increase focus time for challenging topics
          studyPlan.focusTime = { ...studyPlan.focusTime, challenging: 45 };
          studyPlan.breakInterval = 45; // Longer focus periods
          break;
        case MoodType.HAPPY:
          // Balanced approach
          studyPlan.focusTime = { ...studyPlan.focusTime, challenging: 35, easy: 25 };
          studyPlan.breakInterval = 30;
          break;
        case MoodType.FOCUSED:
          // Maximum focus time
          studyPlan.focusTime = { ...studyPlan.focusTime, challenging: 50, moderate: 40, easy: 30 };
          studyPlan.breakInterval = 50; // Longer sessions
          break;
        case MoodType.TIRED:
          // Shorter sessions with more breaks
          studyPlan.focusTime = { ...studyPlan.focusTime, challenging: 20, moderate: 20, easy: 25 };
          studyPlan.breakInterval = 20; // More frequent breaks
          break;
        case MoodType.STRESSED:
        case MoodType.OVERWHELMED:
        case MoodType.ANXIOUS:
          // Easiest topics first, short sessions
          studyPlan.focusTime = { ...studyPlan.focusTime, challenging: 15, moderate: 20, easy: 25 };
          studyPlan.breakInterval = 15; // Very frequent breaks
          studyPlan.recommendedTopics = studyPlan.recommendedTopics?.filter(t => t.difficulty !== 'hard');
          break;
        default:
          // Default balanced plan
          studyPlan.focusTime = { ...studyPlan.focusTime, challenging: 30, moderate: 25, easy: 20 };
          studyPlan.breakInterval = 30;
      }
      
      // Save updated study plan
      localStorage.setItem('study_plan', JSON.stringify(studyPlan));
      
      // If the mood indicates stress, also trigger voice assistant
      if ([MoodType.STRESSED, MoodType.OVERWHELMED, MoodType.ANXIOUS].includes(mood)) {
        // Dispatch an event for voice assistant to pick up
        const voiceEvent = new CustomEvent('trigger-voice-assistant', {
          detail: { trigger: 'stress', mood }
        });
        document.dispatchEvent(voiceEvent);
      }
      
    } catch (e) {
      console.error('Error adjusting study plan for mood:', e);
    }
  };
  
  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 ${className}`}
      >
        <SmilePlus className="h-4 w-4" />
        <span className="text-lg">{getMoodEmoji(currentMood || MoodType.NEUTRAL)}</span>
        {showLabel && (
          <span className="hidden sm:inline">
            {currentMood ? `Feeling ${currentMood.toLowerCase()}` : "Log Mood"}
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
