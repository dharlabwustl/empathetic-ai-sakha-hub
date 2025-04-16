
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SmilePlus } from "lucide-react";
import MoodTracking from "./MoodTracking";

interface MoodLogButtonProps {
  className?: string;
  currentMood?: 'sad' | 'neutral' | 'happy' | 'motivated' | undefined;
  onMoodChange?: (mood: 'sad' | 'neutral' | 'happy' | 'motivated' | undefined) => void;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ 
  className, 
  currentMood,
  onMoodChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleMoodSelect = (mood: any) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    // Save mood to localStorage or your state management system
    localStorage.setItem('lastMoodLog', JSON.stringify({
      mood,
      timestamp: new Date().toISOString()
    }));
    
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline" 
        className={`flex items-center gap-2 ${className}`}
      >
        <SmilePlus size={18} />
        <span>Log Today's Mood</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How are you feeling today?</DialogTitle>
            <DialogDescription>
              Track your daily mood to help us personalize your experience.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <MoodTracking 
              currentMood={currentMood} 
              onMoodChange={handleMoodSelect} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoodLogButton;
