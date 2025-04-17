
import { MoodType } from "@/types/user/base";
import React from "react";
import { Smile, Sun, Target, Book, Coffee, Battery, BatteryLow, Cloud, CloudRain, ThumbsUp } from "lucide-react";

/**
 * Get the display name for a specific mood
 */
export const getMoodDisplayName = (mood: MoodType | undefined): string => {
  if (!mood) return "Log Mood";
  
  switch (mood) {
    case "happy": return "Happy";
    case "motivated": return "Motivated";
    case "focused": return "Focused"; 
    case "curious": return "Curious";
    case "neutral": return "Neutral";
    case "tired": return "Tired";
    case "stressed": return "Stressed";
    case "sad": return "Sad";
    case "overwhelmed": return "Overwhelmed";
    case "okay": return "Okay";
    default: return "Log Mood";
  }
};

/**
 * Get the toast content for mood updates
 */
export const getMoodToastContent = (mood: MoodType): string => {
  switch (mood) {
    case "happy": return "Great! Let's make the most of your positive energy.";
    case "motivated": return "You're on fire! Perfect time to tackle challenging topics.";
    case "focused": return "Excellent! Your concentration is at its peak.";
    case "curious": return "That's the spirit of learning! Let's explore new concepts.";
    case "neutral": return "Ready for a balanced learning session.";
    case "tired": return "Let's focus on lighter review activities today.";
    case "stressed": return "Let's take it one step at a time with manageable goals.";
    case "sad": return "Remember that learning can be a great mood lifter.";
    case "overwhelmed": return "Let's break things down into smaller, manageable tasks.";
    case "okay": return "Steady and ready. Let's make progress at your own pace.";
    default: return "Your mood has been recorded.";
  }
};

/**
 * Get the color class for a specific mood
 */
export const getMoodColor = (mood: MoodType | undefined): string => {
  if (!mood) return "bg-gray-100 text-gray-800";
  
  switch (mood) {
    case "happy": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "motivated": return "bg-green-100 text-green-800 hover:bg-green-200";
    case "focused": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "curious": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "neutral": return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    case "tired": return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case "stressed": return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    case "sad": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "overwhelmed": return "bg-red-100 text-red-800 hover:bg-red-200";
    case "okay": return "bg-teal-100 text-teal-800 hover:bg-teal-200";
    default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

/**
 * Get the icon for a specific mood
 */
export const getMoodIcon = (mood: MoodType | undefined): React.ReactNode => {
  if (!mood) return <Smile className="h-4 w-4 mr-1" />;
  
  switch (mood) {
    case "happy": return <Smile className="h-4 w-4 mr-1" />;
    case "motivated": return <Target className="h-4 w-4 mr-1" />;
    case "focused": return <Book className="h-4 w-4 mr-1" />;
    case "curious": return <Sun className="h-4 w-4 mr-1" />;
    case "neutral": return <ThumbsUp className="h-4 w-4 mr-1" />;
    case "tired": return <Coffee className="h-4 w-4 mr-1" />;
    case "stressed": return <BatteryLow className="h-4 w-4 mr-1" />;
    case "sad": return <Cloud className="h-4 w-4 mr-1" />;
    case "overwhelmed": return <CloudRain className="h-4 w-4 mr-1" />;
    case "okay": return <Battery className="h-4 w-4 mr-1" />;
    default: return <Smile className="h-4 w-4 mr-1" />;
  }
};

/**
 * Get a motivational quote for a specific mood
 */
export const getMoodMotivationalQuote = (mood: MoodType): string => {
  switch (mood) {
    case "happy":
      return "Your positive energy is contagious! It's a perfect day for learning new things.";
    case "motivated":
      return "Keep that motivation flowing! You're on the path to excellence.";
    case "focused":
      return "Your focus is your superpower today. Use it to conquer your most challenging topics.";
    case "curious":
      return "Curiosity drives discovery. Ask questions and dive deep into your subjects today.";
    case "neutral":
      return "Steady and ready. Take each topic one step at a time and watch your progress unfold.";
    case "tired":
      return "Even small steps forward count. Remember to take breaks and recharge when needed.";
    case "stressed":
      return "Break down big challenges into smaller parts. You've got this, one piece at a time.";
    case "sad":
      return "Learning can be a wonderful escape. Let your studies lift your spirits today.";
    case "overwhelmed":
      return "Focus on just one small task at a time. You don't have to climb the mountain in one go.";
    case "okay":
      return "You're in a good place to make steady progress. Consistent effort leads to remarkable results.";
    default:
      return "Every day is a new opportunity to learn and grow. You're doing great!";
  }
};

/**
 * Apply the mood theme to the document
 */
export const applyMoodTheme = (mood: MoodType): void => {
  // Remove existing mood classes
  document.body.classList.forEach(className => {
    if (className.startsWith('mood-')) {
      document.body.classList.remove(className);
    }
  });
  
  // Add the new mood class
  document.body.classList.add(`mood-${mood}`);
};

/**
 * Save the current mood to localStorage
 */
export const saveMoodToLocalStorage = (mood: MoodType): void => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  } catch (error) {
    console.error("Error saving mood to localStorage", error);
  }
};
