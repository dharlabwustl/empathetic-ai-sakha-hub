
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';
import {
  Smile,
  Meh,
  Frown,
  Rocket,
  Bed,
  AlertTriangle,
  Target,
  HelpCircle,
  Check
} from "lucide-react";

interface MoodLogButtonProps {
  onMoodSelect: (mood: MoodType | undefined) => void;
  className?: string;
  selectedMood?: MoodType;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ onMoodSelect, className = '', selectedMood: initialMood }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(initialMood);
  const { toast } = useToast();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
    
    toast({
      title: "Mood Logged!",
      description: `You've logged your mood as ${mood}.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`flex items-center ${className}`}>
          {selectedMood ? (
            <>
              {selectedMood === 'happy' && <Smile className="mr-2 h-4 w-4" />}
              {selectedMood === 'sad' && <Frown className="mr-2 h-4 w-4" />}
              {selectedMood === 'neutral' && <Meh className="mr-2 h-4 w-4" />}
              {selectedMood === 'motivated' && <Rocket className="mr-2 h-4 w-4" />}
              {selectedMood === 'tired' && <Bed className="mr-2 h-4 w-4" />}
              {selectedMood === 'stressed' && <AlertTriangle className="mr-2 h-4 w-4" />}
              {selectedMood === 'focused' && <Target className="mr-2 h-4 w-4" />}
              {selectedMood === 'curious' && <HelpCircle className="mr-2 h-4 w-4" />}
              {selectedMood === 'overwhelmed' && <Frown className="mr-2 h-4 w-4" />}
              {selectedMood === 'okay' && <Check className="mr-2 h-4 w-4" />}
              {selectedMood}
            </>
          ) : (
            "Log Mood"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => handleMoodSelect('happy')}>
          <Smile className="mr-2 h-4 w-4" />
          Happy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodSelect('sad')}>
          <Frown className="mr-2 h-4 w-4" />
          Sad
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodSelect('neutral')}>
          <Meh className="mr-2 h-4 w-4" />
          Neutral
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodSelect('motivated')}>
          <Rocket className="mr-2 h-4 w-4" />
          Motivated
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodSelect('tired')}>
          <Bed className="mr-2 h-4 w-4" />
          Tired
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodSelect('stressed')}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Stressed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodSelect('focused')}>
          <Target className="mr-2 h-4 w-4" />
          Focused
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodSelect('curious')}>
          <HelpCircle className="mr-2 h-4 w-4" />
          Curious
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodSelect('overwhelmed')}>
          <Frown className="mr-2 h-4 w-4" />
          Overwhelmed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodSelect('okay')}>
          <Check className="mr-2 h-4 w-4" />
          Okay
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          setSelectedMood(undefined);
          onMoodSelect(undefined);
        }}>
          Reset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoodLogButton;
