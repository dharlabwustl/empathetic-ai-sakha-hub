
import React from 'react';
import { Button } from "@/components/ui/button";

interface MoodSelectionProps {
  moods: Array<{ value: string; label: string }>;
  currentMood: string;
  onMoodChange: (mood: string) => void;
}

const MoodSelection: React.FC<MoodSelectionProps> = ({ moods, currentMood, onMoodChange }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
      <p className="w-full text-sm text-gray-600 mb-2">How are you feeling today?</p>
      {moods.map((mood) => (
        <Button
          key={mood.value}
          variant={currentMood === mood.value ? "default" : "outline"}
          size="sm"
          onClick={() => onMoodChange(mood.value)}
          className="flex-shrink-0"
        >
          {mood.label}
        </Button>
      ))}
    </div>
  );
};

export default MoodSelection;
