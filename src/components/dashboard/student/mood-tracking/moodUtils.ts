
import { MoodType } from "@/types/user/base";

export const getMoodDisplayName = (mood?: MoodType): string => {
  if (!mood) return "Log Mood";
  
  const moodNames: Record<MoodType, string> = {
    [MoodType.Happy]: "Happy",
    [MoodType.Motivated]: "Motivated",
    [MoodType.Focused]: "Focused",
    [MoodType.Neutral]: "Neutral",
    [MoodType.Tired]: "Tired", 
    [MoodType.Anxious]: "Anxious",
    [MoodType.Stressed]: "Stressed",
    [MoodType.Sad]: "Sad",
    [MoodType.Curious]: "Curious",
    [MoodType.Okay]: "Okay",
    [MoodType.Overwhelmed]: "Overwhelmed"
  };
  
  return moodNames[mood] || "Unknown";
};

export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  
  const moodColors: Record<MoodType, string> = {
    [MoodType.Happy]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    [MoodType.Motivated]: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    [MoodType.Focused]: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    [MoodType.Neutral]: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300",
    [MoodType.Tired]: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    [MoodType.Anxious]: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    [MoodType.Stressed]: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    [MoodType.Sad]: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    [MoodType.Curious]: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    [MoodType.Okay]: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300",
    [MoodType.Overwhelmed]: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
  };
  
  return moodColors[mood] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
};

export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return "📝";
  
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.Happy]: "😊",
    [MoodType.Motivated]: "💪",
    [MoodType.Focused]: "🧠",
    [MoodType.Neutral]: "😐",
    [MoodType.Tired]: "😴",
    [MoodType.Anxious]: "😰",
    [MoodType.Stressed]: "😓",
    [MoodType.Sad]: "😢",
    [MoodType.Curious]: "🤔",
    [MoodType.Okay]: "👍",
    [MoodType.Overwhelmed]: "😵"
  };
  
  return moodEmojis[mood] || "📝";
};

export const getMoodDescription = (mood?: MoodType): string => {
  if (!mood) return "Log your mood to get personalized recommendations";
  
  const moodDescriptions: Record<MoodType, string> = {
    [MoodType.Happy]: "Great mood! This is a perfect time to tackle challenging concepts.",
    [MoodType.Motivated]: "You're in peak condition for productive study sessions!",
    [MoodType.Focused]: "Excellent! Your concentration is high, ideal for deep learning.",
    [MoodType.Neutral]: "A balanced state of mind, good for steady progress.",
    [MoodType.Tired]: "Consider shorter study sessions with more frequent breaks today.",
    [MoodType.Anxious]: "Try some breathing exercises before starting your studies.",
    [MoodType.Stressed]: "Focus on review rather than new concepts today.",
    [MoodType.Sad]: "Start with small, achievable goals to build momentum.",
    [MoodType.Curious]: "Your inquisitive state is perfect for exploring new concepts!",
    [MoodType.Okay]: "You're doing fine, focus on topics you enjoy to build momentum.",
    [MoodType.Overwhelmed]: "Take a step back, breathe, and break tasks into smaller chunks."
  };
  
  return moodDescriptions[mood] || "Track how you're feeling to personalize your study plan.";
};
