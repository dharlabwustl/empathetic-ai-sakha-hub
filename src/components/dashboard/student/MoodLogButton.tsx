
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SmilePlus } from "lucide-react";
import { MoodType } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";

export interface MoodLogButtonProps {
  onMoodSelect?: (mood: MoodType) => void;
  currentMood?: MoodType;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ onMoodSelect, currentMood }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const moods: { value: MoodType; label: string; emoji: string }[] = [
    { value: "sad", label: "Sad", emoji: "😔" },
    { value: "neutral", label: "Okay", emoji: "😐" },
    { value: "happy", label: "Happy", emoji: "😊" },
    { value: "motivated", label: "Motivated", emoji: "🔥" },
  ];

  const handleMoodSelect = (mood: MoodType) => {
    setIsOpen(false);
    
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
    
    // Save user mood to local storage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
    
    toast({
      title: "Mood updated",
      description: `Your mood has been set to ${mood}`,
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`flex items-center gap-1 border-dashed ${
            currentMood ? "border-primary text-primary" : ""
          }`}
        >
          {currentMood ? (
            <>
              <span>
                {moods.find(m => m.value === currentMood)?.emoji || "🙂"}
              </span>
              <span className="capitalize text-xs">{currentMood}</span>
            </>
          ) : (
            <>
              <SmilePlus className="h-4 w-4 mr-1" />
              <span className="text-xs">Log Mood</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        <div className="space-y-1">
          <p className="text-sm font-medium mb-2">How are you feeling today?</p>
          <div className="grid grid-cols-2 gap-2">
            {moods.map((mood) => (
              <Button
                key={mood.value}
                variant="outline"
                size="sm"
                className="flex flex-col items-center justify-center h-16 hover:bg-primary/10"
                onClick={() => handleMoodSelect(mood.value)}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs mt-1">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoodLogButton;
