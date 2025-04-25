
import React from "react";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { motion } from "framer-motion";

interface MoodSelectionProps {
  onSelect: (mood: MoodType) => void;
  isLoading?: boolean;
}

const MoodSelection: React.FC<MoodSelectionProps> = ({ onSelect, isLoading = false }) => {
  const moods: { type: MoodType; emoji: string; label: string }[] = [
    { type: "happy", emoji: "😊", label: "Happy" },
    { type: "neutral", emoji: "😐", label: "Neutral" },
    { type: "motivated", emoji: "💪", label: "Motivated" },
    { type: "sad", emoji: "😔", label: "Sad" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">How are you feeling today?</h3>
        <p className="text-sm text-muted-foreground">
          Your mood affects how we'll personalize your experience
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {moods.map((mood) => (
          <motion.div
            key={mood.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => onSelect(mood.type)}
              disabled={isLoading}
              className="w-full h-auto py-6 flex flex-col items-center bg-white hover:bg-blue-50 border border-blue-200 text-blue-700"
              variant="outline"
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span>{mood.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelection;
