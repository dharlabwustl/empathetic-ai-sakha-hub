import { MoodType } from "@/types/user/base";

// Get emoji for a specific mood type
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return "❓"; // Return question mark if no mood is provided
  
  switch (mood) {
    case MoodType.HAPPY:
      return "😊";
    case MoodType.MOTIVATED:
      return "💪";
    case MoodType.FOCUSED:
      return "🧠";
    case MoodType.NEUTRAL:
      return "😐";
    case MoodType.TIRED:
      return "😴";
    case MoodType.ANXIOUS:
      return "😰";
    case MoodType.STRESSED:
      return "😓";
    case MoodType.SAD:
      return "😢";
    default:
      return "❓"; // Fallback for unknown mood
  }
};

// Get label for a specific mood type
export const getMoodLabel = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Happy";
    case MoodType.MOTIVATED:
      return "Motivated";
    case MoodType.FOCUSED:
      return "Focused";
    case MoodType.NEUTRAL:
      return "Neutral";
    case MoodType.TIRED:
      return "Tired";
    case MoodType.ANXIOUS:
      return "Anxious";
    case MoodType.STRESSED:
      return "Stressed";
    case MoodType.SAD:
      return "Sad";
    default:
      return "Unknown";
  }
};

// Get study recommendation based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great mood! This is a perfect time to tackle challenging concepts.";
    case MoodType.MOTIVATED:
      return "You're in peak condition for productive study sessions!";
    case MoodType.FOCUSED:
      return "Excellent! Your concentration is high, ideal for deep learning.";
    case MoodType.NEUTRAL:
      return "A balanced state of mind, good for steady progress.";
    case MoodType.TIRED:
      return "Consider shorter study sessions with more frequent breaks today.";
    case MoodType.ANXIOUS:
      return "Try some breathing exercises before starting your studies.";
    case MoodType.STRESSED:
      return "Focus on review rather than new concepts today.";
    case MoodType.SAD:
      return "Start with small, achievable goals to build momentum.";
    default:
      return "Focus on what feels right for you today.";
  }
};

// Analyze mood trends - placeholder for more complex implementation
export const analyzeMoodTrends = () => {
  // This would analyze the history of mood entries
  // and return insights about patterns
  return {
    stressSignals: false,
    improved: true,
    consistentFocus: false
  };
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  // This would adjust recommended study durations and breaks
  // based on the current mood
  const recommendations = {
    sessionDuration: 0,
    breakFrequency: 0,
    focusActivities: [] as string[]
  };
  
  switch (mood) {
    case MoodType.HAPPY:
    case MoodType.MOTIVATED:
      recommendations.sessionDuration = 45; // minutes
      recommendations.breakFrequency = 45; // every 45 minutes
      recommendations.focusActivities = ["Problem solving", "New concepts"];
      break;
    case MoodType.FOCUSED:
      recommendations.sessionDuration = 50;
      recommendations.breakFrequency = 50;
      recommendations.focusActivities = ["Deep work", "Complex problems"];
      break;
    case MoodType.NEUTRAL:
      recommendations.sessionDuration = 35;
      recommendations.breakFrequency = 35;
      recommendations.focusActivities = ["Review", "Practice problems"];
      break;
    case MoodType.TIRED:
      recommendations.sessionDuration = 25;
      recommendations.breakFrequency = 25;
      recommendations.focusActivities = ["Light review", "Quick wins"];
      break;
    case MoodType.ANXIOUS:
    case MoodType.STRESSED:
      recommendations.sessionDuration = 20;
      recommendations.breakFrequency = 20;
      recommendations.focusActivities = ["Review familiar material", "Organize notes"];
      break;
    case MoodType.SAD:
      recommendations.sessionDuration = 15;
      recommendations.breakFrequency = 15;
      recommendations.focusActivities = ["Small goals", "Confidence building"];
      break;
    default:
      recommendations.sessionDuration = 30;
      recommendations.breakFrequency = 30;
      recommendations.focusActivities = ["Mixed activities"];
  }
  
  return recommendations;
};

// Store the current mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  localStorage.setItem('currentMood', mood);
};

// Get the current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const savedMood = localStorage.getItem('currentMood');
  return savedMood ? savedMood as MoodType : undefined;
};
