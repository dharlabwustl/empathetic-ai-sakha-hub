import { MoodType } from '@/types/user/base';

// Mood emoji mappings
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😐';
  
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.HAPPY]: '😊',
    [MoodType.MOTIVATED]: '💪',
    [MoodType.FOCUSED]: '🧠',
    [MoodType.NEUTRAL]: '😐',
    [MoodType.TIRED]: '😴',
    [MoodType.ANXIOUS]: '😰',
    [MoodType.STRESSED]: '😓',
    [MoodType.SAD]: '😢',
    [MoodType.CONFUSED]: '🤔',
    [MoodType.OVERWHELMED]: '😵',
    [MoodType.CURIOUS]: '🤓',
    [MoodType.OKAY]: '🙂',
    [MoodType.CALM]: '😌'
  };
  
  return moodEmojis[mood] || '😐';
};

// Mood label mappings
export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Neutral';
  
  const moodLabels: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Happy',
    [MoodType.MOTIVATED]: 'Motivated',
    [MoodType.FOCUSED]: 'Focused', 
    [MoodType.NEUTRAL]: 'Neutral',
    [MoodType.TIRED]: 'Tired',
    [MoodType.ANXIOUS]: 'Anxious',
    [MoodType.STRESSED]: 'Stressed',
    [MoodType.SAD]: 'Sad',
    [MoodType.CONFUSED]: 'Confused',
    [MoodType.OVERWHELMED]: 'Overwhelmed',
    [MoodType.CURIOUS]: 'Curious',
    [MoodType.OKAY]: 'Okay',
    [MoodType.CALM]: 'Calm'
  };
  
  return moodLabels[mood] || 'Neutral';
};

// Study recommendations based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.HAPPY]: "Great energy! Perfect time to tackle challenging topics or start new concepts.",
    [MoodType.MOTIVATED]: "You're fired up! Use this momentum for your most difficult subjects.",
    [MoodType.FOCUSED]: "Excellent concentration! Dive deep into complex problems or detailed study.",
    [MoodType.NEUTRAL]: "Steady state - good for consistent progress and review sessions.",
    [MoodType.TIRED]: "Take it easy with light review or flashcards. Consider a short break.",
    [MoodType.ANXIOUS]: "Start with familiar topics to build confidence, then gradually progress.",
    [MoodType.STRESSED]: "Break tasks into smaller chunks. Try some breathing exercises first.",
    [MoodType.SAD]: "Gentle learning today. Maybe watch educational videos or light reading.",
    [MoodType.CONFUSED]: "Perfect time to clarify doubts. Use AI tutor or review fundamentals.",
    [MoodType.OVERWHELMED]: "Focus on just one small task. Prioritize and take breaks.",
    [MoodType.CURIOUS]: "Explore! Follow your interests and discover new connections.",
    [MoodType.OKAY]: "Balanced approach works well. Mix review with new learning.",
    [MoodType.CALM]: "Great time for thoughtful analysis and connecting concepts together."
  };
  
  return recommendations[mood] || "Continue with your planned studies.";
};

// Get dashboard theme based on mood
export const getDashboardTheme = (mood?: MoodType): string => {
  if (!mood) return 'default';
  
  const themeMap: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'warm-yellow',
    [MoodType.MOTIVATED]: 'energetic-green',
    [MoodType.FOCUSED]: 'calm-blue',
    [MoodType.NEUTRAL]: 'balanced-gray',
    [MoodType.TIRED]: 'soft-orange',
    [MoodType.ANXIOUS]: 'gentle-purple',
    [MoodType.STRESSED]: 'calming-red',
    [MoodType.SAD]: 'soothing-indigo',
    [MoodType.CONFUSED]: 'clarity-teal',
    [MoodType.OVERWHELMED]: 'minimal-gray',
    [MoodType.CURIOUS]: 'bright-lime',
    [MoodType.OKAY]: 'default',
    [MoodType.CALM]: 'serene-blue'
  };
  
  return themeMap[mood] || 'default';
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  const moodData = {
    mood,
    timestamp: new Date().toISOString(),
    date: new Date().toDateString()
  };
  
  localStorage.setItem('currentMood', JSON.stringify(moodData));
  
  // Store in mood history
  const history = getMoodHistory();
  history.push(moodData);
  
  // Keep only last 30 entries
  if (history.length > 30) {
    history.splice(0, history.length - 30);
  }
  
  localStorage.setItem('moodHistory', JSON.stringify(history));
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const moodData = localStorage.getItem('currentMood');
    if (moodData) {
      const parsed = JSON.parse(moodData);
      return parsed.mood;
    }
  } catch (error) {
    console.error('Error getting mood from localStorage:', error);
  }
  return undefined;
};

// Get mood history
export const getMoodHistory = (): Array<{mood: MoodType, timestamp: string, date: string}> => {
  try {
    const history = localStorage.getItem('moodHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting mood history:', error);
    return [];
  }
};

// Analyze mood trends
export const analyzeMoodTrends = () => {
  const history = getMoodHistory();
  const recent = history.slice(-7); // Last 7 moods
  
  const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED];
  const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED];
  
  const stressCount = recent.filter(entry => stressfulMoods.includes(entry.mood)).length;
  const positiveCount = recent.filter(entry => positiveMoods.includes(entry.mood)).length;
  
  return {
    stressSignals: stressCount >= 3,
    improved: positiveCount > stressCount,
    trend: positiveCount > stressCount ? 'improving' : stressCount > positiveCount ? 'declining' : 'stable'
  };
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  const baseAllocations = {
    concepts: 40,
    flashcards: 30,
    practiceExams: 30,
    revision: 20
  };
  
  let adjustedAllocations = { ...baseAllocations };
  
  switch (mood) {
    case MoodType.MOTIVATED:
    case MoodType.FOCUSED:
      adjustedAllocations = {
        concepts: 50,
        flashcards: 25,
        practiceExams: 35,
        revision: 15
      };
      break;
    case MoodType.TIRED:
    case MoodType.STRESSED:
      adjustedAllocations = {
        concepts: 25,
        flashcards: 40,
        practiceExams: 15,
        revision: 35
      };
      break;
    case MoodType.CONFUSED:
      adjustedAllocations = {
        concepts: 20,
        flashcards: 30,
        practiceExams: 10,
        revision: 50
      };
      break;
    case MoodType.CURIOUS:
      adjustedAllocations = {
        concepts: 60,
        flashcards: 20,
        practiceExams: 20,
        revision: 10
      };
      break;
    case MoodType.CALM:
      adjustedAllocations = {
        concepts: 45,
        flashcards: 25,
        practiceExams: 25,
        revision: 25
      };
      break;
  }
  
  localStorage.setItem('moodBasedTimeAllocations', JSON.stringify(adjustedAllocations));
};

// Get mood-based CSS classes for theming
export const getMoodThemeClasses = (mood?: MoodType): string => {
  if (!mood) return '';
  
  const themeClasses: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'mood-happy',
    [MoodType.MOTIVATED]: 'mood-motivated',
    [MoodType.FOCUSED]: 'mood-focused',
    [MoodType.NEUTRAL]: 'mood-neutral',
    [MoodType.TIRED]: 'mood-tired',
    [MoodType.ANXIOUS]: 'mood-anxious',
    [MoodType.STRESSED]: 'mood-stressed',
    [MoodType.SAD]: 'mood-sad',
    [MoodType.CONFUSED]: 'mood-confused',
    [MoodType.OVERWHELMED]: 'mood-overwhelmed',
    [MoodType.CURIOUS]: 'mood-curious',
    [MoodType.OKAY]: 'mood-okay',
    [MoodType.CALM]: 'mood-calm'
  };
  
  return themeClasses[mood] || '';
};

// Get mood recommendation for display
export const getMoodRecommendation = (mood: MoodType): string => {
  return getStudyRecommendationForMood(mood);
};
