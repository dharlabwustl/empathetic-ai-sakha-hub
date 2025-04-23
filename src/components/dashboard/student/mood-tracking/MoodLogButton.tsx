
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import MoodSelector from './MoodSelector';

interface MoodLogButtonProps {
  onMoodSelect: (mood: MoodType | undefined) => void;
  initialMood?: MoodType;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ onMoodSelect, initialMood }) => {
  const [open, setOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(initialMood);
  const { toast } = useToast();
  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
    
    // Update localStorage
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } else {
        localStorage.setItem("userData", JSON.stringify({ mood }));
      }
    } catch (error) {
      console.error("Error saving mood to localStorage:", error);
    }
    
    toast({
      title: "Mood logged!",
      description: "Your mood has been updated successfully.",
    });
    
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <Smile className="h-4 w-4 mr-2" />
          {selectedMood ? `Mood: ${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}` : "Log Mood"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">How are you feeling today?</h4>
          <MoodSelector 
            currentMood={selectedMood} 
            onMoodSelect={handleMoodSelect} 
          />
          <p className="text-xs text-muted-foreground text-center mt-2">
            Logging your mood helps us personalize your learning experience.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoodLogButton;
