
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import { MoodType } from "@/types/user/base";
import MoodSelectionDialog from "./mood-tracking/MoodSelectionDialog";
import { useToast } from "@/hooks/use-toast";
import { getMoodDisplayName, getMoodColor } from "./mood-tracking/moodUtils";

interface MoodLogButtonProps {
  className?: string;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ className }) => {
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(() => {
    // Try to load mood from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        return parsedData.mood;
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    return undefined;
  });
  const { toast } = useToast();

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    
    // Save mood to localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        parsedData.moodTimestamp = new Date().toISOString();
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } catch (e) {
        console.error("Error updating mood:", e);
      }
    } else {
      localStorage.setItem("userData", JSON.stringify({ 
        mood, 
        moodTimestamp: new Date().toISOString() 
      }));
    }

    toast({
      title: "Mood updated",
      description: `You're feeling ${mood} today. We'll adjust your experience accordingly.`,
    });
  };

  const handleClose = () => {
    setShowMoodDialog(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowMoodDialog(true)}
        className={`transition-all ${getMoodColor(currentMood)} shadow-sm border rounded-full px-4 py-2 ${className}`}
      >
        <Smile className="h-4 w-4 mr-2" />
        <span>{getMoodDisplayName(currentMood)}</span>
      </Button>
      
      <MoodSelectionDialog 
        isOpen={showMoodDialog}
        onClose={handleClose}
        selectedMood={currentMood}
        onSelectMood={handleMoodChange}
      />
    </>
  );
};

export default MoodLogButton;
