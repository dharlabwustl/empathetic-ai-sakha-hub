
import React from "react";
import { Button } from "@/components/ui/button";

interface SentimentStepProps {
  onMoodSelect: (mood: string) => void;
}

const SentimentStep: React.FC<SentimentStepProps> = ({ onMoodSelect }) => {
  const moodOptions = [
    "😊 Motivated", "🤔 Curious", "😐 Neutral", "😓 Tired", "😔 Stressed"
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {moodOptions.map((mood) => (
        <Button
          key={mood}
          onClick={() => onMoodSelect(mood)}
          className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-4 flex flex-col items-center"
          variant="outline"
        >
          <span className="text-2xl mb-2">{mood.split(" ")[0]}</span>
          <span>{mood.split(" ")[1]}</span>
        </Button>
      ))}
    </div>
  );
};

export default SentimentStep;
