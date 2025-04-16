
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
import { MoodType } from "@/types/user";
import SentimentStep from "@/components/signup/steps/SentimentStep";

interface LogMoodButtonProps {
  className?: string;
  onMoodSelect?: (mood: MoodType) => void;
  currentMood?: MoodType;
}

const LogMoodButton: React.FC<LogMoodButtonProps> = ({ 
  className,
  onMoodSelect,
  currentMood 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleMoodSelect = (mood: string) => {
    // Save mood to localStorage or your state management system
    localStorage.setItem('lastMoodLog', JSON.stringify({
      mood,
      timestamp: new Date().toISOString()
    }));
    
    if (onMoodSelect) {
      onMoodSelect(mood as MoodType);
    }
    
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
        {currentMood && <span className="ml-1">({currentMood})</span>}
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
            <SentimentStep onMoodSelect={handleMoodSelect} isUpdate={true} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogMoodButton;
