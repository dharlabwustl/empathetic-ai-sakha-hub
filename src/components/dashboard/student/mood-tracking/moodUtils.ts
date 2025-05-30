import { MoodType } from '@/types/user/base';

// Mood data structure for tracking
export interface MoodEntry {
  mood: MoodType;
  timestamp: string;
  date: string;
}

// Mood-specific recommendations for daily plans
export const getMoodRecommendation = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great mood! Perfect time to tackle challenging topics and explore new concepts.";
    case MoodType.MOTIVATED:
      return "Channel this energy into your toughest subjects. Set ambitious goals for today!";
    case MoodType.FOCUSED:
      return "Excellent focus! Use this time for deep learning and complex problem-solving.";
    case MoodType.TIRED:
      return "Take it easy today. Focus on light review and consider shorter study sessions.";
    case MoodType.STRESSED:
      return "Let's reduce the pressure. Break tasks into smaller chunks and take breaks.";
    case MoodType.ANXIOUS:
      return "Focus on familiar topics first to build confidence. Practice relaxation techniques.";
    case MoodType.SAD:
      return "Be gentle with yourself. Light study with encouraging content works best today.";
    case MoodType.NEUTRAL:
      return "A balanced approach works well. Mix review with new learning.";
    default:
      return "Listen to your body and mind. Adjust your study plan accordingly.";
  }
};

// Get mood emoji
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return "😊";
  
  switch (mood) {
    case MoodType.HAPPY: return "😄";
    case MoodType.MOTIVATED: return "🚀";
    case MoodType.FOCUSED: return "🎯";
    case MoodType.TIRED: return "😴";
    case MoodType.STRESSED: return "😰";
    case MoodType.ANXIOUS: return "😟";
    case MoodType.SAD: return "😢";
    case MoodType.NEUTRAL: return "😐";
    default: return "😊";
  }
};

// Get mood label
export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return "Good";
  
  switch (mood) {
    case MoodType.HAPPY: return "Happy";
    case MoodType.MOTIVATED: return "Motivated";
    case MoodType.FOCUSED: return "Focused";
    case MoodType.TIRED: return "Tired";
    case MoodType.STRESSED: return "Stressed";
    case MoodType.ANXIOUS: return "Anxious";
    case MoodType.SAD: return "Sad";
    case MoodType.NEUTRAL: return "Neutral";
    default: return "Good";
  }
};

// Get study recommendation based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Perfect time for challenging topics! Your positive energy will help you tackle difficult concepts.";
    case MoodType.MOTIVATED:
      return "Channel this motivation into your priority subjects. Set ambitious targets for today!";
    case MoodType.FOCUSED:
      return "Excellent focus! Use this for deep work on complex topics and problem-solving.";
    case MoodType.TIRED:
      return "Take it slow today. Light review of familiar topics and shorter study sessions work best.";
    case MoodType.STRESSED:
      return "Break your study plan into smaller, manageable chunks. Take regular breaks and practice breathing exercises.";
    case MoodType.ANXIOUS:
      return "Start with topics you're confident about to build momentum. Consider relaxation techniques before studying.";
    case MoodType.SAD:
      return "Be kind to yourself. Focus on lighter content and consider motivational videos or success stories.";
    case MoodType.NEUTRAL:
      return "A balanced mix of review and new learning works well. Maintain steady progress.";
    default:
      return "Adjust your study approach based on how you're feeling right now.";
  }
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  const moodEntry: MoodEntry = {
    mood,
    timestamp: new Date().toISOString(),
    date: new Date().toDateString()
  };
  
  // Store current mood
  localStorage.setItem('current_mood', JSON.stringify(moodEntry));
  
  // Store in mood history
  const moodHistory = getMoodHistory();
  moodHistory.push(moodEntry);
  
  // Keep only last 30 entries
  const recentHistory = moodHistory.slice(-30);
  localStorage.setItem('mood_history', JSON.stringify(recentHistory));
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const storedMood = localStorage.getItem('current_mood');
    if (storedMood) {
      const moodEntry: MoodEntry = JSON.parse(storedMood);
      return moodEntry.mood;
    }
  } catch (error) {
    console.error('Error retrieving mood from localStorage:', error);
  }
  return undefined;
};

// Get mood history
export const getMoodHistory = (): MoodEntry[] => {
  try {
    const history = localStorage.getItem('mood_history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error retrieving mood history:', error);
    return [];
  }
};

// Analyze mood trends
export const analyzeMoodTrends = () => {
  const history = getMoodHistory();
  const recentMoods = history.slice(-7); // Last 7 entries
  
  const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.SAD];
  const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED];
  
  const stressCount = recentMoods.filter(entry => 
    stressfulMoods.includes(entry.mood)
  ).length;
  
  const positiveCount = recentMoods.filter(entry => 
    positiveMoods.includes(entry.mood)
  ).length;
  
  return {
    stressSignals: stressCount >= 3,
    improved: positiveCount >= 4,
    stable: recentMoods.length > 0 && stressCount <= 1 && positiveCount >= 2
  };
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  const baseAllocations = {
    "Physics": 60,
    "Chemistry": 60,
    "Biology": 60,
    "Mathematics": 60
  };
  
  let adjustedAllocations = { ...baseAllocations };
  
  switch (mood) {
    case MoodType.MOTIVATED:
    case MoodType.FOCUSED:
      // Increase time for challenging subjects
      adjustedAllocations = {
        "Physics": 75,
        "Chemistry": 75,
        "Biology": 50,
        "Mathematics": 70
      };
      break;
    case MoodType.TIRED:
    case MoodType.STRESSED:
      // Reduce overall time, focus on easier review
      adjustedAllocations = {
        "Physics": 30,
        "Chemistry": 35,
        "Biology": 45,
        "Mathematics": 40
      };
      break;
    case MoodType.ANXIOUS:
      // Focus on confidence-building subjects
      adjustedAllocations = {
        "Physics": 40,
        "Chemistry": 45,
        "Biology": 60,
        "Mathematics": 55
      };
      break;
    case MoodType.HAPPY:
      // Balanced approach with slight increase
      adjustedAllocations = {
        "Physics": 65,
        "Chemistry": 65,
        "Biology": 65,
        "Mathematics": 65
      };
      break;
  }
  
  localStorage.setItem('mood_adjusted_allocations', JSON.stringify(adjustedAllocations));
};

// Get mood-adjusted theme class
export const getMoodThemeClass = (mood?: MoodType): string => {
  if (!mood) return '';
  
  switch (mood) {
    case MoodType.HAPPY: return 'mood-happy';
    case MoodType.MOTIVATED: return 'mood-motivated';
    case MoodType.FOCUSED: return 'mood-focused';
    case MoodType.TIRED: return 'mood-tired';
    case MoodType.STRESSED: return 'mood-stressed';
    case MoodType.ANXIOUS: return 'mood-anxious';
    case MoodType.SAD: return 'mood-sad';
    case MoodType.NEUTRAL: return 'mood-neutral';
    default: return '';
  }
};
