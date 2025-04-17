
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SmilePlus } from "lucide-react";
import { MoodType } from "@/types/user/base";
import MoodSelectionDialog from './mood-tracking/MoodSelectionDialog';
import { useToast } from "@/hooks/use-toast";

interface MoodLogButtonProps {
  className?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ 
  className, 
  currentMood,
  onMoodChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(currentMood);
  const { toast } = useToast();

  // Update selected mood when currentMood prop changes
  useEffect(() => {
    if (currentMood) {
      setSelectedMood(currentMood);
    }
  }, [currentMood]);
  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    // Save mood to localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
    
    // Also save last mood log timestamp
    localStorage.setItem('lastMoodLog', JSON.stringify({
      mood,
      timestamp: new Date().toISOString()
    }));
    
    // Show toast notification
    toast({
      title: "Mood updated",
      description: `Your mood has been set to ${mood}. We'll personalize your experience accordingly.`,
    });
    
    setIsOpen(false);
  };

  // Get button text based on current mood
  const getButtonText = () => {
    if (!selectedMood) return "Log Today's Mood";
    
    const moodDisplay = selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1);
    return `I'm Feeling ${moodDisplay}`;
  };

  // Get button variant based on mood
  const getButtonVariant = () => {
    if (!selectedMood) return "outline";
    
    const moodVariantMap: Record<MoodType, string> = {
      motivated: "orange",
      curious: "blue",
      neutral: "ghost",
      tired: "amber",
      stressed: "destructive",
      focused: "emerald",
      happy: "green",
      okay: "sky",
      overwhelmed: "purple",
      sad: "indigo"
    };
    
    return moodVariantMap[selectedMood] || "outline";
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline" 
        className={`flex items-center gap-2 ${className} ${selectedMood ? `mood-${selectedMood}-btn` : ''}`}
      >
        <SmilePlus size={18} />
        <span>{getButtonText()}</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>How are you feeling today?</DialogTitle>
            <DialogDescription>
              Track your daily mood to help us personalize your experience.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <MoodSelectionDialog
              isOpen={true}
              onOpenChange={() => {}}
              selectedMood={selectedMood}
              onSelectMood={handleMoodSelect}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoodLogButton;
