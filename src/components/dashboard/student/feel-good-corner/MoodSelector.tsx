
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { moodEmojis } from "./types";

interface MoodSelectorProps {
  onMoodSubmit: () => void;
}

export function MoodSelector({ onMoodSubmit }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmitMood = () => {
    if (selectedMood) {
      // In a real app, this would save to a database
      onMoodSubmit();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-medium text-center">How are you feeling today?</h3>
      <div className="grid grid-cols-6 gap-2">
        {moodEmojis.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${
              selectedMood === mood.value
                ? 'bg-violet-200 dark:bg-violet-800/50 ring-2 ring-violet-500'
                : 'hover:bg-violet-100 dark:hover:bg-violet-900/30'
            }`}
          >
            <span className="text-2xl">{mood.label}</span>
            <span className="text-xs mt-1">{mood.description}</span>
          </button>
        ))}
      </div>
      <Button 
        onClick={handleSubmitMood}
        disabled={!selectedMood}
        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
      >
        Log My Mood
      </Button>
    </div>
  );
}
