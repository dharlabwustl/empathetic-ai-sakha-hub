
import { MoodType } from '@/types/user/base';

/**
 * Gets the appropriate emoji for a given mood
 */
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😐';
  
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.MOTIVATED:
      return '💪';
    case MoodType.FOCUSED:
      return '🧠';
    case MoodType.RELAXED:
      return '😌';
    case MoodType.TIRED:
      return '😴';
    case MoodType.STRESSED:
      return '😓';
    case MoodType.OVERWHELMED:
      return '😩';
    case MoodType.ANXIOUS:
      return '😰';
    case MoodType.SAD:
      return '😢';
    case MoodType.CONFUSED:
      return '🤔';
    case MoodType.NEUTRAL:
    case MoodType.OKAY:
      return '😐';
    default:
      return '😐';
  }
};

/**
 * Gets a user-friendly label for a mood
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
      return "Great mood! This is perfect for tackling challenging concepts and problem-solving.";
    case MoodType.MOTIVATED:
      return "Your motivation is high! Focus on completing difficult tasks and complex topics.";
    case MoodType.FOCUSED:
      return "Excellent focus state! Ideal for deep conceptual work and detailed memorization.";
    case MoodType.RELAXED:
      return "You're relaxed - perfect for review sessions and connecting concepts together.";
    case MoodType.TIRED:
      return "Consider shorter study sessions with more frequent breaks today.";
    case MoodType.STRESSED:
      return "Focus on easier topics today and use more visual learning methods.";
    case MoodType.OVERWHELMED:
      return "Break down your study into smaller chunks and celebrate small wins.";
    case MoodType.ANXIOUS:
      return "Start with reviewing familiar material and practice breathing exercises between topics.";
    case MoodType.SAD:
      return "Try audio learning or video lessons today instead of reading. Small goals help build momentum.";
    case MoodType.CONFUSED:
      return "Focus on clarifying fundamentals before moving to complex topics.";
    case MoodType.NEUTRAL:
    case MoodType.OKAY:
      return "A balanced approach works well today - mix challenging and easy topics.";
    default:
      return "Focus on what feels most manageable today and adjust as needed.";
  }
};

/**
 * Analyze mood history for patterns
 */
export const analyzeMoodTrends = () => {
  try {
    const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
    if (moodHistory.length < 3) return { stressSignals: false, improved: false };
    
    // Get last 5 entries
    const recentMoods = moodHistory.slice(-5).map((entry: any) => entry.mood);
    
    // Check for stress patterns
    const stressMoods = [MoodType.STRESSED, MoodType.OVERWHELMED, MoodType.ANXIOUS];
    const stressCount = recentMoods.filter((mood: MoodType) => stressMoods.includes(mood)).length;
    
    // Check for improvement patterns
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.RELAXED];
    const recentPositiveCount = recentMoods.slice(-2).filter((mood: MoodType) => positiveMoods.includes(mood)).length;
    const earlierPositiveCount = recentMoods.slice(0, 3).filter((mood: MoodType) => positiveMoods.includes(mood)).length;
    
    return {
      stressSignals: stressCount >= 3, // 3 or more stress moods in last 5 entries
      improved: recentPositiveCount > 0 && recentPositiveCount > earlierPositiveCount
    };
  } catch (e) {
    console.error("Error analyzing mood trends:", e);
    return { stressSignals: false, improved: false };
  }
};

/**
 * Store current mood in localStorage
 */
export const storeMoodInLocalStorage = (mood: MoodType) => {
  try {
    // Store current mood
    localStorage.setItem('current_mood', mood);
    
    // Record in mood history
    const now = new Date().toISOString();
    const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
    moodHistory.push({ mood, timestamp: now });
    localStorage.setItem('mood_history', JSON.stringify(moodHistory.slice(-50))); // Keep last 50 entries
    
    // Update user data
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    }
    
    return true;
  } catch (e) {
    console.error('Error storing mood:', e);
    return false;
  }
};

/**
 * Get current mood from localStorage
 */
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    // Try getting from current_mood
    const currentMood = localStorage.getItem('current_mood') as MoodType | null;
    if (currentMood) return currentMood;
    
    // Try getting from userData
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.mood) return parsedData.mood as MoodType;
    }
    
    return undefined;
  } catch (e) {
    console.error('Error retrieving current mood:', e);
    return undefined;
  }
};

/**
 * Generate CSS class based on mood
 */
export const getMoodCssClass = (mood?: MoodType): string => {
  if (!mood) return 'mood-neutral';
  return `mood-${mood.toLowerCase()}`;
};
