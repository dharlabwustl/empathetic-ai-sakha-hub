
import React from "react";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { motion } from "framer-motion";

interface MoodSelectionProps {
  onSelect: (mood: MoodType) => void;
  isLoading?: boolean;
}

const MoodSelection: React.FC<MoodSelectionProps> = ({ onSelect, isLoading = false }) => {
  const moodOptions: {value: MoodType, emoji: string, label: string}[] = [
    { value: "happy", emoji: "😊", label: "Happy" },
    { value: "neutral", emoji: "😐", label: "Neutral" },
    { value: "sad", emoji: "😔", label: "Sad" },
    { value: "motivated", emoji: "💪", label: "Motivated" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">How are you feeling today?</h3>
        <p className="text-sm text-muted-foreground">
          This helps us adapt your learning experience to match your mood.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {moodOptions.map((mood) => (
          <motion.div 
            key={mood.value}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={() => onSelect(mood.value)}
              disabled={isLoading}
              className="w-full h-auto py-6 bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
              variant="outline"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">{mood.emoji}</span>
                <span className="font-medium">{mood.label}</span>
              </div>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MoodSelection;
