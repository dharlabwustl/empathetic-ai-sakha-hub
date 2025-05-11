
import { MoodType } from '@/types/user/base';

// Get emoji for a given mood
export const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "😊";
    case MoodType.MOTIVATED:
      return "💪";
    case MoodType.FOCUSED:
      return "🧠";
    case MoodType.CALM:
      return "😌";
    case MoodType.TIRED:
      return "😴";
    case MoodType.CONFUSED:
      return "😕";
    case MoodType.ANXIOUS:
      return "😟";
    case MoodType.STRESSED:
      return "😰";
    case MoodType.OVERWHELMED:
      return "🥴";
    case MoodType.NEUTRAL:
      return "😐";
    case MoodType.OKAY:
      return "👌";
    case MoodType.SAD:
      return "😢";
    case MoodType.CURIOUS:
      return "🤔";
    default:
      return "❓";
  }
};

// Get string label for a given mood
export const getMoodLabel = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Happy";
    case MoodType.MOTIVATED:
      return "Motivated";
    case MoodType.FOCUSED:
      return "Focused";
    case MoodType.CALM:
      return "Calm";
    case MoodType.TIRED:
      return "Tired";
    case MoodType.CONFUSED:
      return "Confused";
    case MoodType.ANXIOUS:
      return "Anxious";
    case MoodType.STRESSED:
      return "Stressed";
    case MoodType.OVERWHELMED:
      return "Overwhelmed";
    case MoodType.NEUTRAL:
      return "Neutral";
    case MoodType.OKAY:
      return "Okay";
    case MoodType.SAD:
      return "Sad";
    case MoodType.CURIOUS:
      return "Curious";
    default:
      return "Unknown";
  }
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } catch (err) {
      console.error("Error updating mood in localStorage:", err);
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  } else {
    localStorage.setItem("userData", JSON.stringify({ mood }));
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      return parsedData.mood;
    } catch (err) {
      console.error("Error parsing user data from localStorage:", err);
      return undefined;
    }
  }
  return undefined;
};

// Get CSS class for mood
export const getMoodClass = (mood?: MoodType): string => {
  if (!mood) return "";
  
  switch (mood) {
    case MoodType.HAPPY:
      return "bg-green-50 text-green-700";
    case MoodType.MOTIVATED:
      return "bg-blue-50 text-blue-700";
    case MoodType.FOCUSED:
      return "bg-indigo-50 text-indigo-700";
    case MoodType.CALM:
      return "bg-teal-50 text-teal-700";
    case MoodType.TIRED:
      return "bg-orange-50 text-orange-700";
    case MoodType.CONFUSED:
      return "bg-purple-50 text-purple-700";
    case MoodType.ANXIOUS:
      return "bg-amber-50 text-amber-700";
    case MoodType.STRESSED:
      return "bg-red-50 text-red-700";
    case MoodType.OVERWHELMED:
      return "bg-pink-50 text-pink-700";
    case MoodType.NEUTRAL:
      return "bg-gray-50 text-gray-700";
    case MoodType.OKAY:
      return "bg-cyan-50 text-cyan-700";
    case MoodType.SAD:
      return "bg-blue-50 text-blue-700";
    case MoodType.CURIOUS:
      return "bg-violet-50 text-violet-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
};
