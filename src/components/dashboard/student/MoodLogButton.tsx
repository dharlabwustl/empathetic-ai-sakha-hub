
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import MoodSelector from './MoodSelector';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';
import { getMoodEmoji } from './mood-tracking/moodUtils';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ currentMood, onMoodChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(currentMood);
  const { toast } = useToast();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (selectedMood && onMoodChange) {
      onMoodChange(selectedMood);
      
      // Save mood to local storage
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          parsedData.mood = selectedMood;
          localStorage.setItem('userData', JSON.stringify(parsedData));
        } catch (err) {
          console.error('Error updating mood in localStorage:', err);
        }
      } else {
        localStorage.setItem('userData', JSON.stringify({ mood: selectedMood }));
      }
      
      setIsDialogOpen(false);
      
      toast({
        title: "Mood updated",
        description: `Your mood has been logged successfully.`
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
          <span className="text-lg">
            {currentMood ? getMoodEmoji(currentMood) : "😊"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">How are you feeling today?</DialogTitle>
          <DialogDescription className="text-center">
            Tracking your mood helps us personalize your study experience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <MoodSelector 
            onMoodSelect={handleMoodSelect} 
            selectedMood={selectedMood} 
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveMood}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoodLogButton;
