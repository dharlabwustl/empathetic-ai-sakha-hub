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
import { toast } from "@/hooks/use-toast";

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

// Apply mood-based theme to the UI
export const applyMoodTheme = (mood: MoodType) => {
  // Remove all existing mood classes
  document.body.classList.remove(
    "mood-happy",
    "mood-motivated",
    "mood-focused",
    "mood-curious",
    "mood-neutral",
    "mood-tired",
    "mood-stressed",
    "mood-sad",
    "mood-overwhelmed",
    "mood-okay"
  );
  
  // Add the new mood class
  document.body.classList.add(`mood-${mood}`);
  
  // Show toast notification
  const toastContent = getMoodToastContent(mood);
  toast({
    title: toastContent.title,
    description: toastContent.description,
  });
};

// Save mood to localStorage
export const saveMoodToLocalStorage = (mood: MoodType) => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsedData = JSON.parse(userData);
    parsedData.mood = mood;
    localStorage.setItem("userData", JSON.stringify(parsedData));
  } else {
    localStorage.setItem("userData", JSON.stringify({ mood }));
  }
};

// Get mood-specific motivational quotes
export const getMoodMotivationalQuote = (mood: MoodType): string => {
  const quotes = {
    happy: [
      "Happiness is a great motivator. Use this positive energy to tackle difficult topics!",
      "A happy mind is an effective learning machine. Make the most of it!",
      "Joy improves memory retention. Perfect time for challenging material!"
    ],
    motivated: [
      "Motivation is the fuel for achievement. Keep your momentum going!",
      "When motivation strikes, the impossible becomes possible. Aim high today!",
      "Use this drive to push past your usual limits. You've got this!"
    ],
    focused: [
      "Your focus determines your reality. Make the most of this clarity!",
      "Deep focus is a superpower. Use it wisely on your most important tasks.",
      "In this state of concentration, you can achieve exceptional results."
    ],
    curious: [
      "Curiosity is the path to new knowledge. Explore widely today!",
      "Questions lead to understanding. Keep asking and discovering!",
      "A curious mind is always growing. Let your questions guide your learning."
    ],
    neutral: [
      "A neutral state provides balance. Good time for consistent progress.",
      "Sometimes steady and stable is exactly what you need for consistent results.",
      "Neutrality can be clarity. Use this balanced state for methodical work."
    ],
    tired: [
      "Rest when you need to. Short, focused sessions work best when tired.",
      "Energy management is key. Try the Pomodoro technique: 25 minutes work, 5 minutes rest.",
      "Quality trumps quantity when energy is low. Focus on understanding, not volume."
    ],
    stressed: [
      "Take a deep breath. Stress narrows focus—use it for single-task concentration.",
      "Remember: you've overcome challenges before. Take one step at a time.",
      "Convert stress to focused energy by organizing tasks from smallest to largest."
    ],
    sad: [
      "Be gentle with yourself. Start with topics that bring you joy or confidence.",
      "Learning can be a positive distraction. Find a subject that sparks interest.",
      "Small wins build momentum. Set easily achievable goals today."
    ],
    overwhelmed: [
      "Break it down. The biggest tasks become manageable in small pieces.",
      "Focus on just the next step. Progress comes one action at a time.",
      "It's okay to ask for help. Reaching out is a sign of strength, not weakness."
    ],
    okay: [
      "Steady progress adds up. Consistency beats intensity in the long run.",
      "This balanced state is perfect for reviewing material and filling knowledge gaps.",
      "Sometimes 'okay' is the perfect space for learning—not too high, not too low."
    ]
  };
  
  // Get quotes for the current mood or default to neutral if none exist
  const moodQuotes = quotes[mood] || quotes.neutral;
  
  // Return a random quote from the array
  return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
};
