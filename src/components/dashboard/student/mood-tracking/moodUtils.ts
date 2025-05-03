
import { MoodType } from "@/types/user/base";

export const getMoodDisplayName = (mood?: MoodType): string => {
  if (!mood) return "Log Mood";

  const moodLabels: Record<MoodType, string> = {
    [MoodType.Happy]: "Happy",
    [MoodType.Motivated]: "Motivated",
    [MoodType.Focused]: "Focused",
    [MoodType.Neutral]: "Neutral",
    [MoodType.Tired]: "Tired",
    [MoodType.Anxious]: "Anxious",
    [MoodType.Stressed]: "Stressed",
    [MoodType.Sad]: "Sad"
  };

  return moodLabels[mood] || "Log Mood";
};

export const getMoodColor = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return "bg-green-100 text-green-700";
    case MoodType.Motivated:
      return "bg-purple-100 text-purple-700";
    case MoodType.Focused:
      return "bg-blue-100 text-blue-700";
    case MoodType.Neutral:
      return "bg-gray-100 text-gray-700";
    case MoodType.Tired:
      return "bg-amber-100 text-amber-700";
    case MoodType.Anxious:
      return "bg-yellow-100 text-yellow-700";
    case MoodType.Stressed:
      return "bg-orange-100 text-orange-700";
    case MoodType.Sad:
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const getMoodEmoji = (mood: MoodType): string => {
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
      return "😖";
    case MoodType.Sad:
      return "😢";
    default:
      return "❓";
  }
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    // Store the current mood
    localStorage.setItem('current_mood', mood);
    
    // Store mood history
    const now = new Date();
    const moodEntry = {
      mood,
      timestamp: now.toISOString()
    };
    
    // Get existing history or create new array
    const existingHistory = localStorage.getItem('mood_history');
    let moodHistory = existingHistory ? JSON.parse(existingHistory) : [];
    
    // Add new entry and save
    moodHistory.push(moodEntry);
    localStorage.setItem('mood_history', JSON.stringify(moodHistory));
  } catch (error) {
    console.error("Error storing mood in localStorage:", error);
  }
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const storedMood = localStorage.getItem('current_mood');
    return storedMood ? storedMood as MoodType : undefined;
  } catch (error) {
    console.error("Error retrieving mood from localStorage:", error);
    return undefined;
  }
};
