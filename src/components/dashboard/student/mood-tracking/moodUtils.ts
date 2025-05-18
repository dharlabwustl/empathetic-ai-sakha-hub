import { MoodType } from "@/types/user/base";

// Get the current date in YYYY-MM-DD format
export const getFormattedDate = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// Store mood in localStorage with timestamp
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  const currentDate = getFormattedDate();
  localStorage.setItem('current_mood', mood);
  localStorage.setItem('mood_timestamp', currentDate);
  
  // Also store in mood history for tracking
  const moodHistory = getMoodHistoryFromLocalStorage();
  moodHistory.push({
    mood: mood,
    timestamp: new Date().toISOString(),
  });
  
  // Keep only last 30 days of mood data
  if (moodHistory.length > 30) {
    moodHistory.shift(); // Remove oldest entry
  }
  
  localStorage.setItem('mood_history', JSON.stringify(moodHistory));
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const mood = localStorage.getItem('current_mood') as MoodType | null;
  const timestamp = localStorage.getItem('mood_timestamp');
  const currentDate = getFormattedDate();
  
  // Only return mood if it was set today
  if (mood && timestamp === currentDate) {
    return mood;
  }
  
  return undefined;
};

// Get mood history from localStorage
export const getMoodHistoryFromLocalStorage = (): { mood: MoodType; timestamp: string }[] => {
  const moodHistoryJson = localStorage.getItem('mood_history');
  
  if (!moodHistoryJson) {
    return [];
  }
  
  try {
    return JSON.parse(moodHistoryJson);
  } catch (e) {
    console.error('Error parsing mood history:', e);
    return [];
  }
};

// Get mood emoji for display
export const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.MOTIVATED:
      return '💪';
    case MoodType.FOCUSED:
      return '🎯';
    case MoodType.CALM:
      return '😌';
    case MoodType.TIRED:
      return '😴';
    case MoodType.CONFUSED:
      return '😕';
    case MoodType.ANXIOUS:
      return '😰';
    case MoodType.STRESSED:
      return '😫';
    case MoodType.SAD:
      return '😢';
    case MoodType.OVERWHELMED:
      return '🤯';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.OKAY:
      return '👍';
    default:
      return '😐';
  }
};

// Get mood color for UI elements
export const getMoodColor = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return 'bg-green-500';
    case MoodType.MOTIVATED:
      return 'bg-purple-500';
    case MoodType.FOCUSED:
      return 'bg-blue-500';
    case MoodType.CALM:
      return 'bg-teal-500';
    case MoodType.TIRED:
      return 'bg-gray-400';
    case MoodType.CONFUSED:
      return 'bg-yellow-500';
    case MoodType.ANXIOUS:
      return 'bg-orange-400';
    case MoodType.STRESSED:
      return 'bg-red-500';
    case MoodType.SAD:
      return 'bg-blue-400';
    case MoodType.OVERWHELMED:
      return 'bg-red-600';
    case MoodType.NEUTRAL:
      return 'bg-gray-500';
    case MoodType.OKAY:
      return 'bg-teal-400';
    default:
      return 'bg-gray-500';
  }
};

// Convert a string mood to the proper MoodType enum
export const stringToMoodType = (moodString: string): MoodType => {
  const upperCaseMood = moodString.toUpperCase();
  
  switch (upperCaseMood) {
    case 'HAPPY': return MoodType.HAPPY;
    case 'MOTIVATED': return MoodType.MOTIVATED;
    case 'FOCUSED': return MoodType.FOCUSED;
    case 'CALM': return MoodType.CALM;
    case 'TIRED': return MoodType.TIRED;
    case 'CONFUSED': return MoodType.CONFUSED;
    case 'ANXIOUS': return MoodType.ANXIOUS;
    case 'STRESSED': return MoodType.STRESSED;
    case 'SAD': return MoodType.SAD;
    case 'OVERWHELMED': return MoodType.OVERWHELMED;
    case 'NEUTRAL': return MoodType.NEUTRAL;
    case 'OKAY': return MoodType.OKAY;
    default: return MoodType.NEUTRAL;
  }
};
