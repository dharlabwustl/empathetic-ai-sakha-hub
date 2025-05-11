import { MoodType } from '@/types/user/base';

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    // Get existing user data
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      // Update mood
      localStorage.setItem('userData', JSON.stringify({
        ...parsedData,
        mood: mood
      }));
    } else {
      // Create new user data if none exists
      localStorage.setItem('userData', JSON.stringify({ mood }));
    }
    
    // Also store mood history
    const now = new Date();
    const moodEntry = {
      mood,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString()
    };
    
    // Get mood history
    const moodHistoryString = localStorage.getItem('mood_history');
    let moodHistory = moodHistoryString ? JSON.parse(moodHistoryString) : [];
    
    // Add new mood entry
    moodHistory.push(moodEntry);
    
    // Keep only last 30 entries
    if (moodHistory.length > 30) {
      moodHistory = moodHistory.slice(-30);
    }
    
    // Save updated history
    localStorage.setItem('mood_history', JSON.stringify(moodHistory));
    
  } catch (error) {
    console.error('Error storing mood in localStorage:', error);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.mood) {
        // Validate that the mood is a valid MoodType
        const moodValue = parsedData.mood as string;
        if (Object.values(MoodType).includes(moodValue as MoodType)) {
          return moodValue as MoodType;
        } else {
          // If the stored mood is not a valid MoodType, return a default
          return MoodType.MOTIVATED;
        }
      }
    }
    return undefined;
  } catch (error) {
    console.error('Error retrieving mood from localStorage:', error);
    return undefined;
  }
};

// Get mood history from localStorage
export const getMoodHistoryFromLocalStorage = () => {
  try {
    const moodHistoryString = localStorage.getItem('mood_history');
    return moodHistoryString ? JSON.parse(moodHistoryString) : [];
  } catch (error) {
    console.error('Error retrieving mood history from localStorage:', error);
    return [];
  }
};

// Get mood color based on mood type
export const getMoodColor = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return '#4ade80'; // green-400
    case MoodType.MOTIVATED:
      return '#f59e0b'; // amber-500
    case MoodType.FOCUSED:
      return '#3b82f6'; // blue-500
    case MoodType.TIRED:
      return '#f97316'; // orange-500
    case MoodType.STRESSED:
      return '#ef4444'; // red-500
    default:
      return '#a1a1aa'; // gray-400
  }
};

// Get emotion icon name based on mood
export const getMoodIconName = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return 'smile';
    case MoodType.MOTIVATED:
      return 'zap';
    case MoodType.FOCUSED:
      return 'eye';
    case MoodType.TIRED:
      return 'moon';
    case MoodType.STRESSED:
      return 'frown';
    default:
      return 'smile';
  }
};
