
import { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😐';
  
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.MOTIVATED:
      return '💪';
    case MoodType.FOCUSED:
      return '🧠';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.TIRED:
      return '😴';
    case MoodType.ANXIOUS:
      return '😰';
    case MoodType.STRESSED:
      return '😓';
    case MoodType.SAD:
      return '😢';
    default:
      return '😐';
  }
};

export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Neutral';
  
  switch (mood) {
    case MoodType.HAPPY:
      return 'Happy';
    case MoodType.MOTIVATED:
      return 'Motivated';
    case MoodType.FOCUSED:
      return 'Focused';
    case MoodType.NEUTRAL:
      return 'Neutral';
    case MoodType.TIRED:
      return 'Tired';
    case MoodType.ANXIOUS:
      return 'Anxious';
    case MoodType.STRESSED:
      return 'Stressed';
    case MoodType.SAD:
      return 'Sad';
    default:
      return 'Neutral';
  }
};

export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great mood! This is perfect for tackling challenging topics.";
    case MoodType.MOTIVATED:
      return "You're energized! Time for intensive study sessions.";
    case MoodType.FOCUSED:
      return "Excellent focus! Ideal for learning new concepts.";
    case MoodType.TIRED:
      return "Take shorter study sessions with frequent breaks today.";
    case MoodType.STRESSED:
      return "Focus on review rather than new material. Take deep breaths.";
    case MoodType.ANXIOUS:
      return "Try some calming exercises before studying.";
    case MoodType.SAD:
      return "Start with small, achievable goals to build momentum.";
    case MoodType.NEUTRAL:
    default:
      return "A balanced approach to studying would work well today.";
  }
};

export const getMoodBasedStudyPlan = (mood: MoodType) => {
  const basePlan = {
    physics: 60,
    chemistry: 60, 
    biology: 60,
    mathematics: 60
  };

  switch (mood) {
    case MoodType.MOTIVATED:
    case MoodType.FOCUSED:
      return {
        ...basePlan,
        physics: 75,
        mathematics: 75,
        chemistry: 65,
        biology: 55
      };
    case MoodType.TIRED:
    case MoodType.STRESSED:
      return {
        ...basePlan,
        physics: 40,
        mathematics: 45,
        chemistry: 50,
        biology: 65
      };
    case MoodType.ANXIOUS:
      return {
        ...basePlan,
        physics: 45,
        mathematics: 50,
        chemistry: 55,
        biology: 70
      };
    case MoodType.HAPPY:
      return {
        ...basePlan,
        physics: 70,
        mathematics: 70,
        chemistry: 65,
        biology: 55
      };
    default:
      return basePlan;
  }
};

export const getMoodTheme = (mood?: MoodType) => {
  if (!mood) return {
    background: 'bg-gray-50 dark:bg-gray-900',
    accent: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700'
  };

  switch (mood) {
    case MoodType.HAPPY:
      return {
        background: 'bg-yellow-50 dark:bg-yellow-900/20',
        accent: 'text-yellow-600 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-700'
      };
    case MoodType.MOTIVATED:
      return {
        background: 'bg-green-50 dark:bg-green-900/20',
        accent: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-700'
      };
    case MoodType.FOCUSED:
      return {
        background: 'bg-blue-50 dark:bg-blue-900/20',
        accent: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-700'
      };
    case MoodType.TIRED:
      return {
        background: 'bg-orange-50 dark:bg-orange-900/20',
        accent: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-700'
      };
    case MoodType.STRESSED:
      return {
        background: 'bg-red-50 dark:bg-red-900/20',
        accent: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-700'
      };
    case MoodType.ANXIOUS:
      return {
        background: 'bg-purple-50 dark:bg-purple-900/20',
        accent: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-700'
      };
    case MoodType.SAD:
      return {
        background: 'bg-indigo-50 dark:bg-indigo-900/20',
        accent: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-indigo-200 dark:border-indigo-700'
      };
    default:
      return {
        background: 'bg-gray-50 dark:bg-gray-900',
        accent: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-700'
      };
  }
};

export const analyzeMoodTrends = () => {
  // Simple mock analysis - in real app this would analyze stored mood data
  return {
    stressSignals: false,
    improved: false,
    consistent: true
  };
};

export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  const newAllocations = getMoodBasedStudyPlan(mood);
  localStorage.setItem('mood_based_study_plan', JSON.stringify(newAllocations));
  return newAllocations;
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed.mood;
    }
  } catch (error) {
    console.error('Error getting mood from localStorage:', error);
  }
  return undefined;
};

export const storeMoodInLocalStorage = (mood: MoodType) => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      parsed.mood = mood;
      parsed.lastMoodUpdate = new Date().toISOString();
      localStorage.setItem('userData', JSON.stringify(parsed));
    } else {
      localStorage.setItem('userData', JSON.stringify({
        mood,
        lastMoodUpdate: new Date().toISOString()
      }));
    }
  } catch (error) {
    console.error('Error storing mood in localStorage:', error);
  }
};
