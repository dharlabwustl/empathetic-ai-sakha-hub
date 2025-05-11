import { MoodType } from '@/types/user/base';

/**
 * Gets the emoji representation for a given mood
 */
export const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.FOCUSED:
      return '🧐';
    case MoodType.MOTIVATED:
      return '💪';
    case MoodType.CALM:
      return '😌';
    case MoodType.TIRED:
      return '😴';
    case MoodType.CONFUSED:
      return '🤔';
    case MoodType.ANXIOUS:
      return '😰';
    case MoodType.STRESSED:
      return '😓';
    case MoodType.OVERWHELMED:
      return '😩';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.OKAY:
      return '👍';
    case MoodType.SAD:
      return '😔';
    case MoodType.CURIOUS:
      return '🤓';
    default:
      return '😐';
  }
};

/**
 * Gets a color class for a given mood for styling
 */
export const getMoodColorClass = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
    case MoodType.MOTIVATED:
      return 'text-green-600 bg-green-100';
    case MoodType.FOCUSED:
    case MoodType.CALM:
      return 'text-blue-600 bg-blue-100';
    case MoodType.TIRED:
    case MoodType.CONFUSED:
      return 'text-amber-600 bg-amber-100';
    case MoodType.ANXIOUS:
    case MoodType.STRESSED:
    case MoodType.OVERWHELMED:
      return 'text-red-600 bg-red-100';
    case MoodType.NEUTRAL:
    case MoodType.OKAY:
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

/**
 * Saves the current mood to localStorage
 */
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    // Save as the current mood
    localStorage.setItem('current_mood', mood);
    
    // Also save to user data if it exists
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    }
    
    // Save to mood history
    const now = new Date();
    const moodEntry = {
      mood,
      timestamp: now.toISOString()
    };
    
    const moodHistory = getMoodHistoryFromLocalStorage();
    moodHistory.push(moodEntry);
    
    // Keep only last 30 entries
    while (moodHistory.length > 30) {
      moodHistory.shift();
    }
    
    localStorage.setItem('mood_history', JSON.stringify(moodHistory));
  } catch (error) {
    console.error('Error saving mood to localStorage:', error);
  }
};

/**
 * Gets the current mood from localStorage
 */
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    // First check dedicated mood storage
    const currentMood = localStorage.getItem('current_mood');
    if (currentMood) {
      return currentMood as MoodType;
    }
    
    // Fall back to user data
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.mood) {
        return parsedData.mood as MoodType;
      }
    }
    
    return undefined;
  } catch (error) {
    console.error('Error getting mood from localStorage:', error);
    return undefined;
  }
};

/**
 * Gets the mood history from localStorage
 */
export const getMoodHistoryFromLocalStorage = (): Array<{mood: MoodType, timestamp: string}> => {
  try {
    const moodHistory = localStorage.getItem('mood_history');
    return moodHistory ? JSON.parse(moodHistory) : [];
  } catch (error) {
    console.error('Error getting mood history from localStorage:', error);
    return [];
  }
};

/**
 * Get suggestions based on the current mood
 */
export const getMoodBasedSuggestions = (mood: MoodType): string[] => {
  switch (mood) {
    case MoodType.HAPPY:
    case MoodType.MOTIVATED:
      return [
        'Great time to tackle challenging topics',
        'Try advancing to the next lesson',
        'Help a fellow student by answering questions'
      ];
    case MoodType.FOCUSED:
      return [
        'Perfect time for deep work sessions',
        'Work on complex problem-solving',
        'Review difficult concepts'
      ];
    case MoodType.TIRED:
      return [
        'Take a short 15-minute break',
        'Try some light review instead of new material',
        'Consider a power nap before continuing'
      ];
    case MoodType.STRESSED:
    case MoodType.ANXIOUS:
    case MoodType.OVERWHELMED:
      return [
        'Try a 5-minute breathing exercise',
        'Break your work into smaller chunks',
        'Consider talking to a study advisor'
      ];
    case MoodType.CONFUSED:
      return [
        'Revisit the fundamentals of this topic',
        'Try watching a video explanation',
        'Post a question in the student forum'
      ];
    default:
      return [
        'Focus on your scheduled topics for today',
        'Review material from your last session',
        'Set specific goals for your study session'
      ];
  }
};

/**
 * Gets a human-readable label for a mood
 */
export const getMoodLabel = (mood: MoodType): string => {
  return mood.charAt(0) + mood.slice(1).toLowerCase();
};

/**
 * Get study recommendations based on current mood
 */
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great mood! This is a perfect time to tackle challenging topics or help others.";
    case MoodType.FOCUSED:
      return "You're in the zone! Consider deep work on complex problems.";
    case MoodType.MOTIVATED:
      return "Channel that motivation into tackling your most important tasks.";
    case MoodType.CALM:
      return "Your calm state is ideal for thoughtful reading and reflection.";
    case MoodType.TIRED:
      return "Consider a short break or switch to reviewing familiar material.";
    case MoodType.CONFUSED:
      return "Try revisiting fundamentals or watching tutorial videos on difficult topics.";
    case MoodType.ANXIOUS:
      return "Take a few deep breaths and break your work into smaller, manageable chunks.";
    case MoodType.STRESSED:
      return "Consider a 10-minute mindfulness break before continuing your studies.";
    case MoodType.OVERWHELMED:
      return "Let's prioritize your tasks and focus on just one thing at a time.";
    case MoodType.NEUTRAL:
      return "A balanced mood is good for steady progress through your study plan.";
    case MoodType.OKAY:
      return "You're doing fine. Focus on your scheduled topics for today.";
    case MoodType.SAD:
      return "Consider a short break with something uplifting before returning to studies.";
    case MoodType.CURIOUS:
      return "Great time to explore new topics or dive deeper into interesting concepts.";
    default:
      return "Focus on your scheduled topics and take breaks when needed.";
  }
};

/**
 * Analyze mood trends from history
 */
export const analyzeMoodTrends = () => {
  const moodHistory = getMoodHistoryFromLocalStorage();
  
  // Default return if not enough data
  if (moodHistory.length < 3) {
    return {
      stressSignals: false,
      improved: false,
      consistent: true,
      recommendation: "Not enough mood data to analyze trends yet."
    };
  }
  
  // Get the last 7 entries or all if fewer
  const recentMoods = moodHistory.slice(-7);
  
  // Count stress-related moods
  const stressCount = recentMoods.filter(entry => 
    entry.mood === MoodType.STRESSED || 
    entry.mood === MoodType.ANXIOUS || 
    entry.mood === MoodType.OVERWHELMED
  ).length;
  
  // Count positive moods
  const positiveCount = recentMoods.filter(entry =>
    entry.mood === MoodType.HAPPY ||
    entry.mood === MoodType.MOTIVATED ||
    entry.mood === MoodType.FOCUSED
  ).length;
  
  // Check if recent moods are better than earlier ones
  const olderMoods = moodHistory.slice(0, -7);
  let olderPositiveRatio = 0;
  if (olderMoods.length > 0) {
    const olderPositiveCount = olderMoods.filter(entry =>
      entry.mood === MoodType.HAPPY ||
      entry.mood === MoodType.MOTIVATED ||
      entry.mood === MoodType.FOCUSED
    ).length;
    olderPositiveRatio = olderPositiveCount / olderMoods.length;
  }
  
  const recentPositiveRatio = positiveCount / recentMoods.length;
  const improved = recentPositiveRatio > olderPositiveRatio && olderMoods.length > 0;
  
  // Check for stress signals
  const stressSignals = stressCount / recentMoods.length > 0.5;
  
  // Generate recommendation
  let recommendation = "Keep tracking your mood to get personalized study recommendations.";
  
  if (stressSignals) {
    recommendation = "You've been feeling stressed lately. Consider taking more breaks and practicing mindfulness.";
  } else if (improved) {
    recommendation = "Your mood has been improving! Keep up whatever you're doing.";
  } else if (positiveCount / recentMoods.length > 0.7) {
    recommendation = "You've been in a great mood lately. This is an excellent time to tackle challenging material.";
  }
  
  return {
    stressSignals,
    improved,
    consistent: stressCount < 2,
    recommendation
  };
};

export default {
  getMoodEmoji,
  getMoodColorClass,
  getMoodLabel,
  storeMoodInLocalStorage,
  getCurrentMoodFromLocalStorage,
  getMoodHistoryFromLocalStorage,
  getMoodBasedSuggestions,
  getStudyRecommendationForMood,
  analyzeMoodTrends
};
