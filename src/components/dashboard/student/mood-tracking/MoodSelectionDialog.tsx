
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Flame, Brain, Smile, Coffee, HeartPulse, Target } from "lucide-react";
import { MoodType } from "@/types/user/base";
import MoodOption from "./MoodOption";

interface MoodSelectionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedMood,
  onMoodSelect
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 py-4">
          <MoodOption 
            mood="motivated" 
            label="Motivated" 
            icon={<Flame className="h-6 w-6 text-orange-500" />} 
            color="bg-orange-100 border-orange-300 hover:bg-orange-200"
            selected={selectedMood === 'motivated'}
            onSelect={() => onMoodSelect('motivated')}
          />
          <MoodOption 
            mood="curious" 
            label="Curious" 
            icon={<Brain className="h-6 w-6 text-blue-500" />} 
            color="bg-blue-100 border-blue-300 hover:bg-blue-200"
            selected={selectedMood === 'curious'}
            onSelect={() => onMoodSelect('curious')}
          />
          <MoodOption 
            mood="neutral" 
            label="Neutral" 
            icon={<Smile className="h-6 w-6 text-gray-500" />} 
            color="bg-gray-100 border-gray-300 hover:bg-gray-200"
            selected={selectedMood === 'neutral'}
            onSelect={() => onMoodSelect('neutral')}
          />
          <MoodOption 
            mood="tired" 
            label="Tired" 
            icon={<Coffee className="h-6 w-6 text-sky-500" />} 
            color="bg-sky-100 border-sky-300 hover:bg-sky-200"
            selected={selectedMood === 'tired'}
            onSelect={() => onMoodSelect('tired')}
          />
          <MoodOption 
            mood="stressed" 
            label="Stressed" 
            icon={<HeartPulse className="h-6 w-6 text-purple-500" />} 
            color="bg-purple-100 border-purple-300 hover:bg-purple-200"
            selected={selectedMood === 'stressed'}
            onSelect={() => onMoodSelect('stressed')}
          />
          <MoodOption 
            mood="focused" 
            label="Focused" 
            icon={<Target className="h-6 w-6 text-emerald-500" />} 
            color="bg-emerald-100 border-emerald-300 hover:bg-emerald-200"
            selected={selectedMood === 'focused'}
            onSelect={() => onMoodSelect('focused')}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
