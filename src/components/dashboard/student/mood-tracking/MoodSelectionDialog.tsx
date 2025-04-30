
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { getMoodSuggestion } from './moodUtils';
import { useToast } from '@/hooks/use-toast';

interface MoodSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
  setGlobalMood?: (mood: MoodType) => void;
}

export const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedMood,
  onSelectMood,
  setGlobalMood,
}) => {
  const { toast } = useToast();
  const [localMood, setLocalMood] = React.useState<MoodType | undefined>(selectedMood);

  // Sync with parent component's selected mood
  useEffect(() => {
    setLocalMood(selectedMood);
  }, [selectedMood]);

  const handleMoodSelect = (mood: MoodType) => {
    setLocalMood(mood);
  };

  const handleSaveMood = () => {
    if (localMood) {
      onSelectMood(localMood);
      if (setGlobalMood) {
        setGlobalMood(localMood);
      }
      
      // Save to localStorage for persistence
      try {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          parsedData.mood = localMood;
          localStorage.setItem("userData", JSON.stringify(parsedData));
        }
      } catch (error) {
        console.error("Error saving mood to localStorage:", error);
      }
      
      toast({
        title: "Mood Updated",
        description: "Your study plan has been adjusted based on your mood",
      });
      
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
          <DialogDescription>
            Select your current mood to help personalize your study experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <MoodSelector currentMood={localMood} onMoodSelect={handleMoodSelect} />
          
          {localMood && (
            <div className="mt-6 p-4 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
              <h4 className="font-medium mb-2">Study Suggestion</h4>
              <p>{getMoodSuggestion(localMood)}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            disabled={!localMood} 
            onClick={handleSaveMood}
          >
            Save Mood
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
