
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import { MoodType } from "@/types/user/base";
import MoodSelectionDialog from "./MoodSelectionDialog";
import { motion } from "framer-motion";

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ currentMood, onMoodChange }) => {
  const [showMoodDialog, setShowMoodDialog] = useState(false);

  // Get display name for current mood
  const getMoodDisplayName = (mood?: MoodType): string => {
    if (!mood) return "Log Today's Mood";
    
    const moodMap: Record<MoodType, string> = {
      motivated: "Motivated",
      curious: "Curious",
      neutral: "Neutral",
      tired: "Tired",
      stressed: "Stressed",
      focused: "Focused",
      happy: "Happy",
      okay: "Okay",
      overwhelmed: "Overwhelmed",
      sad: "Sad"
    };
    
    return moodMap[mood] || "Log Today's Mood";
  };
  
  const getMoodColor = (mood?: MoodType): string => {
    if (!mood) return "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300";
    
    const moodColorMap: Record<MoodType, string> = {
      motivated: "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
      curious: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
      neutral: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300",
      tired: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
      stressed: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300",
      focused: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
      happy: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300",
      okay: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
      overwhelmed: "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
      sad: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300"
    };
    
    return moodColorMap[mood] || "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300";
  };

  const getMoodIcon = (mood?: MoodType) => {
    // You can customize this to return different icons based on mood
    return <Smile className="h-4 w-4 mr-2" />;
  };

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMoodDialog(true)}
          className={`transition-all ${getMoodColor(currentMood)} shadow-sm border rounded-full px-4 py-2`}
        >
          {getMoodIcon(currentMood)}
          <span>{getMoodDisplayName(currentMood)}</span>
        </Button>
      </motion.div>
      
      <MoodSelectionDialog 
        isOpen={showMoodDialog}
        onOpenChange={setShowMoodDialog}
        selectedMood={currentMood}
        onSelectMood={(mood) => {
          onMoodChange(mood);
          setShowMoodDialog(false);
        }}
      />
    </>
  );
};

export default MoodLogButton;
