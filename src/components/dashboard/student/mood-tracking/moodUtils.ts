import { MoodType } from '@/types/user/base';

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
      return "Great mood for learning! Try tackling new concepts today.";
    case MoodType.MOTIVATED:
      return "Channel this energy into intensive practice sessions!";
    case MoodType.FOCUSED:
      return "Perfect for deep learning. Dive into complex topics.";
    case MoodType.TIRED:
      return "Take it easy with light review or flashcards.";
    case MoodType.STRESSED:
      return "Consider a break or visit the Feel Good Corner.";
    case MoodType.ANXIOUS:
      return "Start with familiar topics to build confidence.";
    case MoodType.SAD:
      return "Be gentle with yourself. Light study or motivation videos might help.";
    default:
      return "A balanced study approach works well today.";
  }
};

export const analyzeMoodTrends = () => {
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  const recentMoods = moodHistory.slice(-5);
  
  const stressSignals = recentMoods.filter((entry: any) => 
    [MoodType.STRESSED, MoodType.ANXIOUS].includes(entry.mood)
  ).length >= 3;
  
  const improved = recentMoods.length >= 2 && 
    [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED].includes(recentMoods[recentMoods.length - 1]?.mood);
  
  return { stressSignals, improved };
};

export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  const allocations = {
    [MoodType.MOTIVATED]: { intensity: 'high', duration: 'long' },
    [MoodType.FOCUSED]: { intensity: 'high', duration: 'medium' },
    [MoodType.HAPPY]: { intensity: 'medium', duration: 'medium' },
    [MoodType.TIRED]: { intensity: 'low', duration: 'short' },
    [MoodType.STRESSED]: { intensity: 'low', duration: 'short' },
    [MoodType.ANXIOUS]: { intensity: 'low', duration: 'short' },
    [MoodType.SAD]: { intensity: 'low', duration: 'short' },
    [MoodType.NEUTRAL]: { intensity: 'medium', duration: 'medium' }
  };
  
  const allocation = allocations[mood] || allocations[MoodType.NEUTRAL];
  localStorage.setItem('currentStudyAllocation', JSON.stringify(allocation));
  
  return allocation;
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.mood as MoodType;
    }
  } catch (err) {
    console.error("Error getting mood from localStorage:", err);
  }
  return undefined;
};

export const storeMoodInLocalStorage = (mood: MoodType) => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
    
    // Also store in mood history for trends
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    moodHistory.push({
      mood,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 30 entries
    if (moodHistory.length > 30) {
      moodHistory.splice(0, moodHistory.length - 30);
    }
    
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  } catch (err) {
    console.error("Error storing mood in localStorage:", err);
  }
};
