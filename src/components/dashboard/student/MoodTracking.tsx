import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoodType } from "@/types/user/base";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const moods = [
  { icon: "😊", label: "Happy", value: MoodType.HAPPY },
  { icon: "💪", label: "Motivated", value: MoodType.MOTIVATED },
  { icon: "🧠", label: "Focused", value: MoodType.FOCUSED },
  { icon: "😐", label: "Neutral", value: MoodType.NEUTRAL },
  { icon: "😴", label: "Tired", value: MoodType.TIRED },
  { icon: "😰", label: "Anxious", value: MoodType.ANXIOUS },
  { icon: "😓", label: "Stressed", value: MoodType.STRESSED },
  { icon: "😔", label: "Sad", value: MoodType.SAD },
];

const getMoodIcon = (mood?: MoodType) => {
  switch (mood) {
    case MoodType.HAPPY:
      return "😊";
    case MoodType.MOTIVATED:
      return "💪";
    case MoodType.FOCUSED:
      return "🧠";
    case MoodType.NEUTRAL:
      return "😐";
    case MoodType.TIRED:
      return "😴";
    case MoodType.ANXIOUS:
      return "😰";
    case MoodType.STRESSED:
      return "😓";
    case MoodType.SAD:
      return "😔";
    default:
      return "😐";
  }
};

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ currentMood, onMoodChange }) => {
  const [open, setOpen] = useState(false);

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    setOpen(false);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpen(!open)}
            className="relative"
          >
            {getMoodIcon(currentMood)}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Log how you're feeling today</p>
        </TooltipContent>
      </Tooltip>

      {open && (
        <div className="absolute top-12 right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <Card className="w-48">
            <CardContent className="p-3">
              <div className="grid grid-cols-4 gap-2">
                {moods.map((mood) => (
                  <TooltipProvider key={mood.value}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMoodChange(mood.value)}
                        >
                          {mood.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{mood.label}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </TooltipProvider>
  );
};

export default MoodLogButton;
