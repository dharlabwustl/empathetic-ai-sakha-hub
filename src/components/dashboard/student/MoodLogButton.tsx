
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoodType } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";
import {
  Smile,
  ChevronDown,
  Frown,
  Meh,
  Sun,
  Moon
} from "lucide-react";
import { motion } from "framer-motion";

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
}

type MoodOption = {
  value: MoodType;
  label: string;
  icon: React.ReactNode;
  color: string;
};

const moodOptions: MoodOption[] = [
  {
    value: "happy",
    label: "Happy",
    icon: <Smile className="mr-2 h-4 w-4" />,
    color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400"
  },
  {
    value: "motivated",
    label: "Motivated",
    icon: <Sun className="mr-2 h-4 w-4" />,
    color: "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400"
  },
  {
    value: "neutral",
    label: "Neutral",
    icon: <Meh className="mr-2 h-4 w-4" />,
    color: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400"
  },
  {
    value: "sad",
    label: "Sad",
    icon: <Frown className="mr-2 h-4 w-4" />,
    color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400"
  },
];

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ 
  currentMood,
  onMoodChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const handleMoodSelect = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    } else {
      // If no handler is provided, save to localStorage
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } else {
        localStorage.setItem("userData", JSON.stringify({ mood }));
      }
      
      // Force reload to apply mood changes
      window.location.reload();
    }
    
    setIsOpen(false);
    
    toast({
      title: "Mood updated",
      description: `Your mood has been set to ${getMoodLabel(mood)}`,
    });
  };
  
  const getMoodLabel = (mood?: MoodType): string => {
    if (!mood) return "How are you feeling?";
    return moodOptions.find(option => option.value === mood)?.label || "Unknown";
  };
  
  const getMoodIcon = (mood?: MoodType) => {
    if (!mood) return <Smile className="h-4 w-4 mr-1" />;
    return moodOptions.find(option => option.value === mood)?.icon || <Smile className="h-4 w-4 mr-1" />;
  };
  
  const currentMoodOption = currentMood ? moodOptions.find(option => option.value === currentMood) : null;
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={currentMoodOption ? "outline" : "default"} 
          size="sm"
          className={`flex items-center gap-1 ${
            currentMoodOption ? `${currentMoodOption.color} border` : "bg-gradient-to-r from-blue-600 to-indigo-600"
          } ${className}`}
        >
          {getMoodIcon(currentMood)}
          {getMoodLabel(currentMood)}
          <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-100 dark:border-gray-800">
        <div className="mb-2 px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
          How are you feeling today?
        </div>
        {moodOptions.map((option) => (
          <motion.div key={option.value} whileHover={{ scale: 1.02 }}>
            <DropdownMenuItem
              className={`flex items-center cursor-pointer ${option.color} my-1 rounded-md`}
              onClick={() => handleMoodSelect(option.value)}
            >
              {option.icon}
              <span>{option.label}</span>
            </DropdownMenuItem>
          </motion.div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoodLogButton;
