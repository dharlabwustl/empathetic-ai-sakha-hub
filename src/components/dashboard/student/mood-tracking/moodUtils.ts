import { MoodType } from '@/types/user/base';

// Mood emoji mapping
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😐';
  
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.MOTIVATED:
      return '🚀';
    case MoodType.FOCUSED:
      return '🎯';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.TIRED:
      return '😴';
    case MoodType.ANXIOUS:
      return '😰';
    case MoodType.STRESSED:
      return '😤';
    case MoodType.SAD:
      return '😢';
    default:
      return '😐';
  }
};

// Mood label mapping
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

// Study recommendations based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great mood for learning! Try tackling challenging topics today.";
    case MoodType.MOTIVATED:
      return "Perfect energy for intensive study sessions. Go for it!";
    case MoodType.FOCUSED:
      return "Excellent focus! This is ideal for complex problem-solving.";
    case MoodType.NEUTRAL:
      return "Steady mood for consistent progress. Stick to your plan.";
    case MoodType.TIRED:
      return "Take it easy. Light review or rest might be better today.";
    case MoodType.ANXIOUS:
      return "Try some breathing exercises before studying. Start with easier topics.";
    case MoodType.STRESSED:
      return "Consider taking a break or doing some relaxation activities first.";
    case MoodType.SAD:
      return "Be gentle with yourself. Light study or motivational content might help.";
    default:
      return "Listen to your body and mind. Adjust your study approach accordingly.";
  }
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  // This is a placeholder for actual study time allocation logic
  console.log(`Updating study allocations for mood: ${mood}`);
};

// Analyze mood trends
export const analyzeMoodTrends = (): { stressSignals: boolean; improved: boolean } => {
  // This is a placeholder for actual mood trend analysis
  return {
    stressSignals: false,
    improved: Math.random() > 0.7 // 30% chance of improvement message
  };
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.mood;
    }
  } catch (err) {
    console.error("Error parsing user data from localStorage:", err);
  }
  return undefined;
};

// Store mood in localStorage
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
  } catch (err) {
    console.error("Error storing mood in localStorage:", err);
    localStorage.setItem("userData", JSON.stringify({ mood }));
  }
};
