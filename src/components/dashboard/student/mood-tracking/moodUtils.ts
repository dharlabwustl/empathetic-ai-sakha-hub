
import { MoodType } from '@/types/user/base';

// Get mood emoji for display
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return "😐";
  
  switch (mood) {
    case MoodType.HAPPY:
      return "😊";
    case MoodType.MOTIVATED:
      return "💪";
    case MoodType.FOCUSED:
      return "🎯";
    case MoodType.TIRED:
      return "😴";
    case MoodType.STRESSED:
      return "😰";
    case MoodType.ANXIOUS:
      return "😟";
    case MoodType.SAD:
      return "😢";
    case MoodType.NEUTRAL:
      return "😐";
    case MoodType.CURIOUS:
      return "🤔";
    case MoodType.OKAY:
      return "🙂";
    case MoodType.OVERWHELMED:
      return "😵";
    case MoodType.CONFUSED:
      return "😕";
    default:
      return "😐";
  }
};

// Get mood label for display
export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return "Unknown";
  
  switch (mood) {
    case MoodType.HAPPY:
      return "Happy";
    case MoodType.MOTIVATED:
      return "Motivated";
    case MoodType.FOCUSED:
      return "Focused";
    case MoodType.TIRED:
      return "Tired";
    case MoodType.STRESSED:
      return "Stressed";
    case MoodType.ANXIOUS:
      return "Anxious";
    case MoodType.SAD:
      return "Sad";
    case MoodType.NEUTRAL:
      return "Neutral";
    case MoodType.CURIOUS:
      return "Curious";
    case MoodType.OKAY:
      return "Okay";
    case MoodType.OVERWHELMED:
      return "Overwhelmed";
    case MoodType.CONFUSED:
      return "Confused";
    default:
      return "Unknown";
  }
};

// Get study recommendations based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great energy for learning new concepts!";
    case MoodType.MOTIVATED:
      return "Perfect time for challenging practice sessions!";
    case MoodType.FOCUSED:
      return "Ideal for deep concept study and problem solving!";
    case MoodType.TIRED:
      return "Take it easy with light review and flashcards.";
    case MoodType.STRESSED:
      return "Consider taking a break or trying relaxation activities.";
    case MoodType.ANXIOUS:
      return "Start with familiar topics to build confidence.";
    case MoodType.SAD:
      return "Gentle study sessions and positive reinforcement recommended.";
    case MoodType.NEUTRAL:
      return "A balanced study approach works well.";
    case MoodType.CURIOUS:
      return "Great time to explore new topics and concepts!";
    case MoodType.OKAY:
      return "Steady progress with regular study sessions.";
    case MoodType.OVERWHELMED:
      return "Break tasks into smaller, manageable chunks.";
    case MoodType.CONFUSED:
      return "Focus on clarifying concepts with examples.";
    default:
      return "Maintain a consistent study routine.";
  }
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    const moodData = {
      mood,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('currentMood', JSON.stringify(moodData));
  } catch (error) {
    console.error('Error storing mood:', error);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const moodData = localStorage.getItem('currentMood');
    if (moodData) {
      const parsed = JSON.parse(moodData);
      return parsed.mood as MoodType;
    }
  } catch (error) {
    console.error('Error getting mood:', error);
  }
  return undefined;
};

// Analyze mood trends (mock implementation)
export const analyzeMoodTrends = () => {
  return {
    stressSignals: false,
    improved: false
  };
};

// Update study time allocations based on mood (mock implementation)
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  console.log(`Updating study allocations for mood: ${mood}`);
};
