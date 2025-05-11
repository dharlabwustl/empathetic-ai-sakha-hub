
import { MoodType } from "@/types/user/base";

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    localStorage.setItem('current_mood', mood);
    
    // Also store in mood history
    const now = new Date();
    const moodEntry = {
      mood,
      timestamp: now.toISOString()
    };
    
    // Get existing mood history
    const moodHistoryString = localStorage.getItem('mood_history');
    const moodHistory = moodHistoryString ? JSON.parse(moodHistoryString) : [];
    
    // Add new entry and limit history to 30 entries
    moodHistory.unshift(moodEntry);
    if (moodHistory.length > 30) {
      moodHistory.pop();
    }
    
    localStorage.setItem('mood_history', JSON.stringify(moodHistory));
  } catch (error) {
    console.error('Error storing mood in localStorage:', error);
  }
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const mood = localStorage.getItem('current_mood') as MoodType;
    return mood || undefined;
  } catch (error) {
    console.error('Error retrieving mood from localStorage:', error);
    return undefined;
  }
};

export const getMoodHistoryFromLocalStorage = (): Array<{mood: MoodType, timestamp: string}> => {
  try {
    const moodHistoryString = localStorage.getItem('mood_history');
    return moodHistoryString ? JSON.parse(moodHistoryString) : [];
  } catch (error) {
    console.error('Error retrieving mood history from localStorage:', error);
    return [];
  }
};

export const getFormattedMoodDate = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch (error) {
    return 'Unknown date';
  }
};

export const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return "😊";
    case MoodType.Sad:
      return "😔";
    case MoodType.Stressed:
      return "😰";
    case MoodType.Tired:
      return "😴";
    case MoodType.Motivated:
      return "💪";
    case MoodType.Focused:
      return "🧠";
    case MoodType.Confused:
      return "😕";
    case MoodType.Overwhelmed:
      return "😫";
    default:
      return "😐";
  }
};

export const getMoodColor = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return "#4ade80"; // green-400
    case MoodType.Sad:
      return "#60a5fa"; // blue-400
    case MoodType.Stressed:
      return "#f87171"; // red-400
    case MoodType.Tired:
      return "#a78bfa"; // violet-400
    case MoodType.Motivated:
      return "#fb923c"; // orange-400
    case MoodType.Focused:
      return "#22d3ee"; // cyan-400
    case MoodType.Confused:
      return "#fbbf24"; // amber-400
    case MoodType.Overwhelmed:
      return "#f43f5e"; // rose-500
    default:
      return "#94a3b8"; // slate-400
  }
};
