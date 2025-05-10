import { MoodType } from "@/types/user/base";

export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return "😐";
  
  switch (mood) {
    case MoodType.Happy:
      return "😊";
    case MoodType.Motivated:
      return "💪";
    case MoodType.Focused:
      return "🧠";
    case MoodType.Tired:
      return "😴";
    case MoodType.Stressed:
      return "😰";
    case MoodType.Anxious:
      return "😨";
    case MoodType.Overwhelmed:
      return "🥴";
    case MoodType.Curious:
      return "🤔";
    case MoodType.Calm:
      return "😌";
    case MoodType.Sad:
      return "😢";
    default:
      return "😐";
  }
};

export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return "bg-gray-200 text-gray-700";
  
  switch (mood) {
    case MoodType.Happy:
      return "bg-green-100 text-green-700";
    case MoodType.Motivated:
      return "bg-blue-100 text-blue-700";
    case MoodType.Focused:
      return "bg-indigo-100 text-indigo-700";
    case MoodType.Tired:
      return "bg-yellow-100 text-yellow-700";
    case MoodType.Stressed:
      return "bg-red-100 text-red-700";
    case MoodType.Anxious:
      return "bg-orange-100 text-orange-700";
    case MoodType.Overwhelmed:
      return "bg-purple-100 text-purple-700";
    case MoodType.Curious:
      return "bg-cyan-100 text-cyan-700";
    case MoodType.Calm:
      return "bg-teal-100 text-teal-700";
    case MoodType.Sad:
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  localStorage.setItem("currentMood", mood);
  
  // Also save with timestamp for mood history
  const moodHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");
  moodHistory.push({
    mood,
    timestamp: new Date().toISOString(),
  });
  
  // Keep only the last 30 days of mood data
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const filteredHistory = moodHistory.filter((entry: any) => 
    new Date(entry.timestamp) >= thirtyDaysAgo
  );
  
  localStorage.setItem("moodHistory", JSON.stringify(filteredHistory));
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const mood = localStorage.getItem("currentMood") as MoodType | null;
  return mood || undefined;
};

export const getMoodHistoryFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("moodHistory") || "[]");
};

export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return "Not Set";
  
  // Convert enum value to readable text (e.g., "HAPPY" to "Happy")
  return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
};
