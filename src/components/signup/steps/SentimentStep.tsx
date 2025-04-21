
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoodType } from "@/types/user/base";

interface SentimentStepProps {
  onMoodSelect?: (mood: MoodType) => void;
  onSelect?: (mood: MoodType) => void;
}

const SentimentStep: React.FC<SentimentStepProps> = ({ onMoodSelect, onSelect }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const moods: { value: MoodType; emoji: string; label: string }[] = [
    { value: "happy", emoji: "😊", label: "Happy" },
    { value: "motivated", emoji: "💪", label: "Motivated" },
    { value: "focused", emoji: "🎯", label: "Focused" },
    { value: "curious", emoji: "🤔", label: "Curious" },
    { value: "okay", emoji: "😐", label: "Okay" },
    { value: "tired", emoji: "😴", label: "Tired" },
    { value: "stressed", emoji: "😰", label: "Stressed" },
    { value: "overwhelmed", emoji: "😩", label: "Overwhelmed" },
    { value: "sad", emoji: "😔", label: "Sad" }
  ];

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
    
    if (onSelect) {
      onSelect(mood);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">How are you feeling today?</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
        Your emotional state affects how you learn. We'll adjust your experience accordingly.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {moods.map((mood) => (
          <motion.div
            key={mood.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border ${
              selectedMood === mood.value
                ? "border-primary bg-primary/10"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
            }`}
            onClick={() => handleMoodSelect(mood.value)}
          >
            <span className="text-4xl">{mood.emoji}</span>
            <span className="mt-2 text-sm">{mood.label}</span>
          </motion.div>
        ))}
      </div>

      {selectedMood && (
        <div className="text-center">
          <Button
            onClick={() => {
              if (selectedMood && onMoodSelect) {
                onMoodSelect(selectedMood);
              }
              if (selectedMood && onSelect) {
                onSelect(selectedMood);
              }
            }}
            className="w-full sm:w-auto"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default SentimentStep;
