
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from "@/types/user/base";
import MoodSelectionDialog from "./mood-tracking/MoodSelectionDialog";
import MoodSpecificContent from "./mood-tracking/MoodSpecificContent";
import { applyMoodTheme, getMoodToastContent, saveMoodToLocalStorage } from "./mood-tracking/moodUtils";

interface MoodTrackingProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ currentMood, onMoodChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType>(currentMood);
  const { toast } = useToast();

  // Apply theme changes based on mood
  useEffect(() => {
    if (!currentMood) return;
    
    // Apply mood theme to document
    applyMoodTheme(currentMood);
    
    // Store mood in localStorage for persistence
    saveMoodToLocalStorage(currentMood);
  }, [currentMood]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    // Show appropriate message based on mood
    const { message, description } = getMoodToastContent(mood);
    
    toast({
      title: message,
      description: description,
    });
    
    setIsOpen(false);
  };
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline" 
        className="flex items-center gap-2"
      >
        <Smile size={18} />
        <span>Log Today's Mood</span>
      </Button>
      
      <MoodSelectionDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        selectedMood={selectedMood}
        onSelectMood={handleMoodSelect}
      />
      
      {currentMood && <MoodSpecificContent currentMood={currentMood} />}
    </>
  );
};

export default MoodTracking;
