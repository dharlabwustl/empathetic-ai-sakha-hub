
import React from "react";
import { 
  Smile, 
  Sun, 
  Cloud, 
  Wind, 
  Battery, 
  Target, 
  Heart, 
  Clock, 
  AlertCircle, 
  ThumbsUp 
} from "lucide-react";
import { MoodType } from "@/types/user/base";

// Get human-readable display name for each mood
export const getMoodDisplayName = (mood?: MoodType): string => {
  switch (mood) {
    case "motivated":
      return "Motivated";
    case "curious":
      return "Curious";
    case "neutral":
      return "Neutral";
    case "tired":
      return "Tired";
    case "stressed":
      return "Stressed";
    case "focused":
      return "Focused";
    case "happy":
      return "Happy";
    case "okay":
      return "Okay";
    case "overwhelmed":
      return "Overwhelmed";
    case "sad":
      return "Sad";
    default:
      return "How are you feeling?";
  }
};

// Get color classes for each mood
export const getMoodColor = (mood?: MoodType): string => {
  switch (mood) {
    case "happy":
      return "bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-200";
    case "motivated":
      return "bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-200";
    case "focused":
      return "bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200";
    case "curious":
      return "bg-teal-100 hover:bg-teal-200 text-teal-700 border-teal-200";
    case "neutral":
      return "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200";
    case "tired":
      return "bg-orange-100 hover:bg-orange-200 text-orange-700 border-orange-200";
    case "stressed":
      return "bg-red-100 hover:bg-red-200 text-red-700 border-red-200";
    case "sad":
      return "bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border-indigo-200";
    case "overwhelmed":
      return "bg-pink-100 hover:bg-pink-200 text-pink-700 border-pink-200";
    case "okay":
      return "bg-sky-100 hover:bg-sky-200 text-sky-700 border-sky-200";
    default:
      return "bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-200";
  }
};

// Get icon for each mood
export const getMoodIcon = (mood?: MoodType) => {
  switch (mood) {
    case "happy":
      return React.createElement(Heart, { className: "h-4 w-4 mr-2 text-yellow-500" });
    case "motivated":
      return React.createElement(Smile, { className: "h-4 w-4 mr-2 text-purple-500" });
    case "focused":
      return React.createElement(Target, { className: "h-4 w-4 mr-2 text-blue-500" });
    case "curious":
      return React.createElement(Sun, { className: "h-4 w-4 mr-2 text-teal-500" });
    case "neutral":
      return React.createElement(ThumbsUp, { className: "h-4 w-4 mr-2 text-gray-500" });
    case "tired":
      return React.createElement(Battery, { className: "h-4 w-4 mr-2 text-orange-500" });
    case "stressed":
      return React.createElement(Wind, { className: "h-4 w-4 mr-2 text-red-500" });
    case "sad":
      return React.createElement(Cloud, { className: "h-4 w-4 mr-2 text-indigo-500" });
    case "overwhelmed":
      return React.createElement(AlertCircle, { className: "h-4 w-4 mr-2 text-pink-500" });
    case "okay":
      return React.createElement(Clock, { className: "h-4 w-4 mr-2 text-sky-500" });
    default:
      return React.createElement(Smile, { className: "h-4 w-4 mr-2" });
  }
};

// Get toast content for each mood
export const getMoodToastContent = (mood: MoodType) => {
  switch (mood) {
    case "happy":
      return {
        title: "Feeling Happy!",
        description: "Great time to tackle challenging topics with enthusiasm."
      };
    case "motivated":
      return {
        title: "Feeling Motivated!",
        description: "Perfect time to set goals and make progress on difficult tasks."
      };
    case "focused":
      return {
        title: "Feeling Focused!",
        description: "Your concentration is high—ideal for deep work sessions."
      };
    case "curious":
      return {
        title: "Feeling Curious!",
        description: "Great mood for exploring new topics and concepts."
      };
    case "neutral":
      return {
        title: "Feeling Neutral",
        description: "A balanced state good for routine study tasks."
      };
    case "tired":
      return {
        title: "Feeling Tired",
        description: "Consider shorter study sessions with more breaks today."
      };
    case "stressed":
      return {
        title: "Feeling Stressed",
        description: "Try a quick breathing exercise before starting your study session."
      };
    case "sad":
      return {
        title: "Feeling Sad",
        description: "Start with easier topics today and be kind to yourself."
      };
    case "overwhelmed":
      return {
        title: "Feeling Overwhelmed",
        description: "Break tasks into smaller chunks and focus on one thing at a time."
      };
    case "okay":
      return {
        title: "Feeling Okay",
        description: "A good state for steady progress on your studies."
      };
    default:
      return {
        title: "Mood Updated",
        description: "Your learning experience has been adjusted accordingly."
      };
  }
};

export const getMoodMotivationalQuote = (mood: MoodType): string => {
  const quotes = {
    happy: [
      "Your positive energy is contagious! Perfect time to tackle challenging topics.",
      "A happy mind learns better. Make the most of this great mood!",
      "Happiness boosts memory retention. Let's use this to your advantage!"
    ],
    motivated: [
      "Motivation is the fuel for achievement. Keep your momentum going!",
      "When motivation strikes, the impossible becomes possible. Let's make progress!",
      "Your drive today can create momentum for tomorrow. Keep it up!"
    ],
    focused: [
      "Deep focus is a superpower. Make the most of this concentrated energy.",
      "In the zone! This is the perfect state for tackling difficult concepts.",
      "Your focused mind is ready for challenges. Let's make great progress today!"
    ],
    curious: [
      "Curiosity is the engine of achievement. Follow where it leads you today!",
      "Great discoveries start with curiosity. What will you discover today?",
      "Your curious mind is open to new concepts. Perfect for exploring new topics!"
    ],
    neutral: [
      "A neutral mood is a clean slate. Good for methodical, steady progress.",
      "Balance and steadiness can lead to consistent results. Keep moving forward!",
      "Sometimes neutrality is the best foundation for clear thinking."
    ],
    tired: [
      "Even when tired, small steps add up. Be gentle with yourself today.",
      "Consider focusing on review rather than new concepts when energy is low.",
      "It's okay to take more breaks today. Quality over quantity!"
    ],
    stressed: [
      "Breathe deeply. Learning happens best when we manage our stress.",
      "One small step at a time will get you through stressful periods.",
      "Remember: this feeling is temporary. Focus on what's in your control."
    ],
    sad: [
      "It's okay not to be okay. Be kind to yourself today.",
      "Small achievements on tough days count double. Celebrate any progress.",
      "Sometimes learning can be a welcome distraction when feeling down."
    ],
    overwhelmed: [
      "Break everything down into tiny steps. One small task at a time.",
      "It's okay to pause and regroup when feeling overwhelmed.",
      "Focus only on the next 5 minutes. Small progress adds up."
    ],
    okay: [
      "A steady mood makes for steady progress. You've got this!",
      "Today is a good day for consistent, methodical learning.",
      "Being okay is a solid foundation for learning. Let's build on it!"
    ]
  };

  if (!mood || !quotes[mood]) return "Every moment is an opportunity to learn something new.";

  const moodQuotes = quotes[mood];
  return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
};

// Apply mood theme to body
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

// Save mood to localStorage
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
