
import { MoodType } from "@/types/user/base";

export const getMoodDisplayName = (mood?: MoodType): string => {
  if (!mood) return "Log Mood";
  
  switch (mood) {
    case MoodType.Happy:
      return "Happy";
    case MoodType.Motivated:
      return "Motivated";
    case MoodType.Focused:
      return "Focused";
    case MoodType.Neutral:
      return "Neutral";
    case MoodType.Tired:
      return "Tired";
    case MoodType.Anxious:
      return "Anxious";
    case MoodType.Stressed:
      return "Stressed";
    case MoodType.Sad:
      return "Sad";
    default:
      return "Log Mood";
  }
};

export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return "bg-gray-100 text-gray-600 hover:bg-gray-200";
  
  switch (mood) {
    case MoodType.Happy:
      return "bg-green-100 text-green-600 hover:bg-green-200";
    case MoodType.Motivated:
      return "bg-blue-100 text-blue-600 hover:bg-blue-200";
    case MoodType.Focused:
      return "bg-indigo-100 text-indigo-600 hover:bg-indigo-200";
    case MoodType.Neutral:
      return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    case MoodType.Tired:
      return "bg-orange-100 text-orange-600 hover:bg-orange-200";
    case MoodType.Anxious:
      return "bg-amber-100 text-amber-600 hover:bg-amber-200";
    case MoodType.Stressed:
      return "bg-red-100 text-red-600 hover:bg-red-200";
    case MoodType.Sad:
      return "bg-purple-100 text-purple-600 hover:bg-purple-200";
    default:
      return "bg-gray-100 text-gray-600 hover:bg-gray-200";
  }
};

export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return "😊";
  
  switch (mood) {
    case MoodType.Happy:
      return "😊";
    case MoodType.Motivated:
      return "💪";
    case MoodType.Focused:
      return "🧠";
    case MoodType.Neutral:
      return "😐";
    case MoodType.Tired:
      return "😴";
    case MoodType.Anxious:
      return "😰";
    case MoodType.Stressed:
      return "😓";
    case MoodType.Sad:
      return "😢";
    default:
      return "😊";
  }
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
    console.log("Mood stored successfully:", mood);
  } catch (error) {
    console.error("Error storing mood in localStorage:", error);
  }
};
