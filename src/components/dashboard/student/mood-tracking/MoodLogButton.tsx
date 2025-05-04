
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { speakMessage } from '../voice/voiceUtils';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
  size?: 'sm' | 'default' | 'lg';
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ 
  currentMood, 
  onMoodChange,
  size = 'default'
}) => {
  const moodOptions = [
    {type: MoodType.Motivated, label: "Motivated", emoji: "🚀"},
    {type: MoodType.Focused, label: "Focused", emoji: "🎯"},
    {type: MoodType.Tired, label: "Tired", emoji: "😴"},
    {type: MoodType.Anxious, label: "Anxious", emoji: "😰"},
    {type: MoodType.Happy, label: "Happy", emoji: "😊"},
    {type: MoodType.Neutral, label: "Neutral", emoji: "😐"},
    {type: MoodType.Stressed, label: "Stressed", emoji: "😓"},
    {type: MoodType.Sad, label: "Sad", emoji: "😢"}
  ];

  const getMoodEmoji = (mood?: MoodType) => {
    if (!mood) return "😊";
    const foundMood = moodOptions.find(m => m.type === mood);
    return foundMood?.emoji || "😊";
  };
  
  const getMoodFeedback = (mood: MoodType): string => {
    switch(mood) {
      case MoodType.Motivated:
        return "Great to see you're feeling motivated! This is perfect energy for tackling challenging topics.";
      case MoodType.Focused:
        return "I notice you're focused today. Let's make the most of this concentration with some deep learning.";
      case MoodType.Tired:
        return "I understand you're feeling tired. Let's adjust your plan with shorter study sessions and more breaks today.";
      case MoodType.Anxious:
        return "I see you're feeling anxious. Let's start with some easier review topics to build confidence.";
      case MoodType.Happy:
        return "You're in a great mood today! Let's use this positive energy for some creative problem-solving.";
      case MoodType.Neutral:
        return "Thanks for sharing how you feel. We'll keep your regular study pace for today.";
      case MoodType.Stressed:
        return "I understand you're feeling stressed. Let's adjust today's plan to include some relaxation techniques between study sessions.";
      case MoodType.Sad:
        return "I'm sorry you're feeling down today. Let's focus on some review topics you enjoy, and remember it's okay to take breaks when needed.";
      default:
        return "Thanks for sharing how you're feeling today. I'll adjust your recommendations accordingly.";
    }
  };
  
  const handleSelectMood = (mood: MoodType) => {
    onMoodChange(mood);
    
    // Provide voice feedback
    const message = getMoodFeedback(mood);
    speakMessage(message, {
      enabled: true,
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
      voice: null,
      language: 'en-US',
      autoGreet: false,
      muted: false
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size={size}
          className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 border-indigo-100 dark:border-indigo-800/30"
        >
          <span className="text-xl">{getMoodEmoji(currentMood)}</span>
          <span className="capitalize">{currentMood?.toLowerCase() || "How are you feeling?"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>How are you feeling today?</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {moodOptions.map((mood) => (
          <DropdownMenuItem 
            key={mood.type} 
            onClick={() => handleSelectMood(mood.type)}
            className="cursor-pointer flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </span>
            {currentMood === mood.type && (
              <span className="ml-auto">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoodLogButton;
