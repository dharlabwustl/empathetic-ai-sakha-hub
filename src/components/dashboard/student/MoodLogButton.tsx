
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, ChevronDown } from "lucide-react";
import { MoodType } from "@/types/user/base";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
}

const moodsData = [
  { value: MoodType.Happy, label: "Happy", emoji: "😊" },
  { value: MoodType.Motivated, label: "Motivated", emoji: "💪" },
  { value: MoodType.Focused, label: "Focused", emoji: "🧠" },
  { value: MoodType.Curious, label: "Curious", emoji: "🤔" },
  { value: MoodType.Okay, label: "Okay", emoji: "😐" },
  { value: MoodType.Neutral, label: "Neutral", emoji: "😶" },
  { value: MoodType.Tired, label: "Tired", emoji: "😴" },
  { value: MoodType.Stressed, label: "Stressed", emoji: "😫" },
  { value: MoodType.Overwhelmed, label: "Overwhelmed", emoji: "😵" },
  { value: MoodType.Anxious, label: "Anxious", emoji: "😰" },
  { value: MoodType.Sad, label: "Sad", emoji: "😔" },
  { value: MoodType.Calm, label: "Calm", emoji: "😌" },
];

const MoodLogButton = ({ currentMood, onMoodChange, className }: MoodLogButtonProps) => {
  const getMoodEmoji = () => {
    const mood = moodsData.find(m => m.value === currentMood);
    return mood ? mood.emoji : "😊";
  };
  
  const getMoodLabel = () => {
    const mood = moodsData.find(m => m.value === currentMood);
    return mood ? mood.label : "Log Mood";
  };

  const handleMoodSelect = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
      
      // Store mood in localStorage
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          parsedData.mood = mood;
          localStorage.setItem("userData", JSON.stringify(parsedData));
        } catch (err) {
          console.error("Error updating mood in localStorage:", err);
          localStorage.setItem("userData", JSON.stringify({ mood }));
        }
      } else {
        localStorage.setItem("userData", JSON.stringify({ mood }));
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-1.5",
            currentMood && "bg-white dark:bg-gray-900",
            className
          )}
          size="sm"
        >
          <span className="mr-1">{currentMood ? getMoodEmoji() : <Heart className="h-4 w-4" />}</span>
          <span>{getMoodLabel()}</span>
          <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 grid grid-cols-2 gap-1 p-2">
        {moodsData.map(mood => (
          <DropdownMenuItem
            key={mood.value}
            className={cn(
              "flex items-center gap-2 justify-center cursor-pointer",
              currentMood === mood.value && "bg-accent text-accent-foreground font-medium"
            )}
            onClick={() => handleMoodSelect(mood.value)}
          >
            <span>{mood.emoji}</span>
            <span>{mood.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoodLogButton;
