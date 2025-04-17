
import { MoodType } from "@/types/user/base";
import { Smile, Sun, BookOpen, Brain, Coffee, Moon, Frown, AlertTriangle, Zap } from "lucide-react";
import React from "react";

export function getMoodDisplayName(mood: MoodType): string {
  const moodNames: Record<MoodType, string> = {
    happy: "Happy",
    motivated: "Motivated",
    focused: "Focused",
    curious: "Curious",
    neutral: "Neutral",
    tired: "Tired",
    stressed: "Stressed",
    sad: "Sad",
    overwhelmed: "Overwhelmed",
    okay: "Okay"
  };
  
  return moodNames[mood] || "Unknown";
}

export function getMoodColor(mood?: MoodType): string {
  if (!mood) return "";
  
  const moodColors: Record<MoodType, string> = {
    happy: "bg-yellow-100 text-yellow-700",
    motivated: "bg-purple-100 text-purple-700",
    focused: "bg-blue-100 text-blue-700",
    curious: "bg-teal-100 text-teal-700",
    neutral: "bg-gray-100 text-gray-700",
    tired: "bg-orange-100 text-orange-700",
    stressed: "bg-red-100 text-red-700",
    sad: "bg-indigo-100 text-indigo-700",
    overwhelmed: "bg-purple-100 text-purple-700",
    okay: "bg-green-100 text-green-700"
  };
  
  return moodColors[mood] || "bg-gray-100 text-gray-700";
}

export function getMoodIcon(mood: MoodType): React.ReactNode {
  switch (mood) {
    case "happy":
      return <Sun className="text-amber-500" size={24} />;
    case "motivated":
      return <Zap className="text-amber-500" size={24} />;
    case "focused":
      return <Brain className="text-blue-500" size={24} />;
    case "curious":
      return <BookOpen className="text-emerald-500" size={24} />;
    case "neutral":
      return <Coffee className="text-gray-500" size={24} />;
    case "tired":
      return <Moon className="text-indigo-500" size={24} />;
    case "stressed":
      return <AlertTriangle className="text-red-500" size={24} />;
    case "sad":
      return <Frown className="text-blue-500" size={24} />;
    case "overwhelmed":
      return <AlertTriangle className="text-purple-500" size={24} />;
    case "okay":
      return <Smile className="text-green-500" size={24} />;
    default:
      return <Smile className="text-gray-500" size={24} />;
  }
}

export function getMoodMotivationalQuote(mood: MoodType): string {
  const quotes: Record<MoodType, string[]> = {
    happy: [
      "Happiness opens your mind to possibilities. What will you explore today?",
      "Your positive energy is contagious. Share it with someone who needs it!",
    ],
    motivated: [
      "You're in your power zone! Set ambitious goals for today.",
      "This motivation is your superpower. Use it wisely to achieve something meaningful.",
    ],
    focused: [
      "Deep work happens in this state. Pick your most challenging task.",
      "When focused, your mind processes information more efficiently. Make the most of it!",
    ],
    curious: [
      "Curiosity leads to discoveries. Follow your questions today.",
      "The curious mind expands possibilities. What will you learn today?",
    ],
    neutral: [
      "A balanced state is perfect for making rational decisions.",
      "From neutral ground, you can choose any direction. Where will you go?",
    ],
    tired: [
      "Rest is as important as work. Take short breaks to restore your energy.",
      "Even brief moments of relaxation can reset your focus. Try a 5-minute break.",
    ],
    stressed: [
      "Stress signals something needs attention. What small step can address it?",
      "Break down what's overwhelming you into small, manageable tasks.",
    ],
    sad: [
      "It's okay to feel down sometimes. Be gentle with yourself today.",
      "Emotions come and go like clouds. This feeling will pass too.",
    ],
    overwhelmed: [
      "Focus on just one small task. Progress happens one step at a time.",
      "When everything feels like too much, pause and take three deep breaths.",
    ],
    okay: [
      "You're in a good place to make steady progress today.",
      "Stable energy is perfect for consistent work. What will you accomplish?",
    ]
  };

  const moodQuotes = quotes[mood] || quotes.neutral;
  return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
}

export function getMoodToastContent(mood: MoodType) {
  return {
    title: `You're feeling ${getMoodDisplayName(mood.toLowerCase() as MoodType)}`,
    description: "We'll personalize your experience based on your mood"
  };
}

export function applyMoodTheme(mood: MoodType) {
  // Remove all existing mood classes
  document.body.classList.forEach(className => {
    if (className.startsWith('mood-')) {
      document.body.classList.remove(className);
    }
  });
    
  // Add the new mood class
  document.body.classList.add(`mood-${mood}`);
}

export function saveMoodToLocalStorage(mood: MoodType) {
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
}
