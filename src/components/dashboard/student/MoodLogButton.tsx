
import React, { useState, useEffect } from 'react';
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
  const [localMood, setLocalMood] = useState<MoodType | undefined>(currentMood);
  const { toast } = useToast();
  
  // Update local mood when prop changes
  useEffect(() => {
    if (currentMood) {
      setLocalMood(currentMood);
    }
  }, [currentMood]);
  
  // Try to load mood from localStorage on component mount
  useEffect(() => {
    if (!localMood) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          if (parsedData.mood) {
            setLocalMood(parsedData.mood);
          }
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    }
  }, [localMood]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleMoodChange = (mood: MoodType) => {
    setLocalMood(mood);
    
    // Save to localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } catch (e) {
        localStorage.setItem("userData", JSON.stringify({ mood }));
      }
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
    
    // Update study recommendations based on mood
    updateStudyRecommendations(mood);
    
    if (onMoodChange) {
      onMoodChange(mood);
      
      // Show toast confirmation
      toast({
        title: "Mood Updated",
        description: `Your mood has been set to ${mood.toLowerCase()}.`,
      });
      
      // Trigger custom event for other components to react to
      const moodChangeEvent = new CustomEvent('mood-changed', { 
        detail: { mood, timestamp: new Date().toISOString() } 
      });
      document.dispatchEvent(moodChangeEvent);
    }
    handleCloseDialog();
  };
  
  // Update study recommendations based on mood
  const updateStudyRecommendations = (mood: MoodType) => {
    // Get current study time allocations
    let studyTimeAllocations = {
      lectures: 25,
      practice: 25, 
      revision: 25,
      tests: 25
    };
    
    try {
      const saved = localStorage.getItem('study_time_allocations');
      if (saved) {
        studyTimeAllocations = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading study allocations:', e);
    }
    
    // Adjust based on mood
    switch(mood) {
      case MoodType.HAPPY:
      case MoodType.MOTIVATED:
        // More challenging activities
        studyTimeAllocations = {
          lectures: 20,
          practice: 30,
          revision: 20,
          tests: 30
        };
        break;
      case MoodType.FOCUSED:
        // Balanced but with focus on deep work
        studyTimeAllocations = {
          lectures: 30,
          practice: 30,
          revision: 20,
          tests: 20
        };
        break;
      case MoodType.TIRED:
      case MoodType.STRESSED:
        // Lighter activities
        studyTimeAllocations = {
          lectures: 15,
          practice: 20,
          revision: 50,
          tests: 15
        };
        break;
      case MoodType.ANXIOUS:
        // Focus on revision for confidence
        studyTimeAllocations = {
          lectures: 10,
          practice: 35,
          revision: 45,
          tests: 10
        };
        break;
      default:
        // Default balanced allocation
        studyTimeAllocations = {
          lectures: 25,
          practice: 25,
          revision: 25,
          tests: 25
        };
    }
    
    // Save updated allocations
    localStorage.setItem('study_time_allocations', JSON.stringify(studyTimeAllocations));
  };
  
  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 hover:bg-primary/10 ${className}`}
      >
        {localMood ? (
          <>
            <span className="text-lg">{getMoodEmoji(localMood)}</span>
            {showLabel && (
              <span className="hidden sm:inline">
                {`Feeling ${localMood.toLowerCase()}`}
              </span>
            )}
          </>
        ) : (
          <>
            <SmilePlus className="h-4 w-4" />
            {showLabel && (
              <span className="hidden sm:inline">Log Mood</span>
            )}
          </>
        )}
      </Button>

      <MoodSelectionDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        selectedMood={localMood}
        onSelectMood={handleMoodChange}
      />
    </>
  );
};

export default MoodLogButton;
