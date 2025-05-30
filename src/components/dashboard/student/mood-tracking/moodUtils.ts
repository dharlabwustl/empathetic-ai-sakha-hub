
import { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😐';
  
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.HAPPY]: '😊',
    [MoodType.MOTIVATED]: '🔥',
    [MoodType.FOCUSED]: '🎯',
    [MoodType.NEUTRAL]: '😐',
    [MoodType.TIRED]: '😴',
    [MoodType.ANXIOUS]: '😰',
    [MoodType.STRESSED]: '😫',
    [MoodType.SAD]: '😢',
    [MoodType.OVERWHELMED]: '🤯',
    [MoodType.CURIOUS]: '🤔',
    [MoodType.OKAY]: '👍',
    [MoodType.CONFUSED]: '😕',
    [MoodType.CALM]: '😌'
  };
  
  return moodEmojis[mood] || '😐';
};

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
    [MoodType.OVERWHELMED]: 'Overwhelmed',
    [MoodType.CURIOUS]: 'Curious',
    [MoodType.OKAY]: 'Okay',
    [MoodType.CONFUSED]: 'Confused',
    [MoodType.CALM]: 'Calm'
  };
  
  return moodLabels[mood] || 'Neutral';
};

export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Perfect time to tackle challenging topics! Your positive energy will help you learn effectively.',
    [MoodType.MOTIVATED]: 'Channel this motivation into your most important study goals. Set ambitious targets for today!',
    [MoodType.FOCUSED]: 'Excellent! Use this focus for deep learning sessions and complex problem-solving.',
    [MoodType.NEUTRAL]: 'A good time for steady progress. Follow your regular study routine.',
    [MoodType.TIRED]: 'Consider light review or take a short break. Your brain needs rest to learn effectively.',
    [MoodType.ANXIOUS]: 'Try some breathing exercises first, then start with familiar topics to build confidence.',
    [MoodType.STRESSED]: 'Break your study into smaller chunks. Focus on one topic at a time.',
    [MoodType.SAD]: 'Be gentle with yourself. Light studying or creative learning methods might help.',
    [MoodType.OVERWHELMED]: 'Prioritize your tasks. Focus on just one subject today.',
    [MoodType.CURIOUS]: 'Great time to explore new concepts and dive deeper into interesting topics!',
    [MoodType.OKAY]: 'Maintain steady progress with your planned study schedule.',
    [MoodType.CONFUSED]: 'Perfect time to review fundamentals and ask for help with difficult concepts.',
    [MoodType.CALM]: 'Use this peaceful state for thoughtful study and connecting concepts.'
  };
  
  return recommendations[mood] || 'Continue with your regular study plan.';
};

export const adjustDailyPlanForMood = (mood: MoodType): { 
  studyIntensity: 'light' | 'moderate' | 'intensive';
  recommendedActivities: string[];
  timeAllocation: { study: number; break: number; review: number };
} => {
  const adjustments = {
    [MoodType.HAPPY]: {
      studyIntensity: 'intensive' as const,
      recommendedActivities: ['New concept learning', 'Problem solving', 'Group study'],
      timeAllocation: { study: 70, break: 15, review: 15 }
    },
    [MoodType.MOTIVATED]: {
      studyIntensity: 'intensive' as const,
      recommendedActivities: ['Goal setting', 'Challenging topics', 'Practice tests'],
      timeAllocation: { study: 75, break: 10, review: 15 }
    },
    [MoodType.FOCUSED]: {
      studyIntensity: 'intensive' as const,
      recommendedActivities: ['Deep study', 'Complex problems', 'Detailed notes'],
      timeAllocation: { study: 80, break: 10, review: 10 }
    },
    [MoodType.TIRED]: {
      studyIntensity: 'light' as const,
      recommendedActivities: ['Light review', 'Audio lessons', 'Rest breaks'],
      timeAllocation: { study: 40, break: 40, review: 20 }
    },
    [MoodType.STRESSED]: {
      studyIntensity: 'light' as const,
      recommendedActivities: ['Structured revision', 'Breathing exercises', 'Easy topics'],
      timeAllocation: { study: 50, break: 30, review: 20 }
    },
    [MoodType.ANXIOUS]: {
      studyIntensity: 'moderate' as const,
      recommendedActivities: ['Familiar topics', 'Confidence building', 'Relaxation'],
      timeAllocation: { study: 55, break: 25, review: 20 }
    }
  };

  return adjustments[mood] || {
    studyIntensity: 'moderate' as const,
    recommendedActivities: ['Regular study', 'Balanced approach'],
    timeAllocation: { study: 60, break: 20, review: 20 }
  };
};

export const getMoodThemeClass = (mood?: MoodType): string => {
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
    [MoodType.OVERWHELMED]: 'mood-overwhelmed',
    [MoodType.CURIOUS]: 'mood-curious',
    [MoodType.OKAY]: 'mood-okay',
    [MoodType.CONFUSED]: 'mood-confused',
    [MoodType.CALM]: 'mood-calm'
  };
  
  return themeClasses[mood] || '';
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    const moodData = {
      mood,
      timestamp: new Date().toISOString(),
      dailyPlanAdjustment: adjustDailyPlanForMood(mood)
    };
    localStorage.setItem('current_mood', JSON.stringify(moodData));
    
    // Also store in user data
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      parsed.mood = mood;
      parsed.lastMoodUpdate = new Date().toISOString();
      localStorage.setItem('userData', JSON.stringify(parsed));
    }
  } catch (error) {
    console.error('Error storing mood:', error);
  }
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const moodData = localStorage.getItem('current_mood');
    if (moodData) {
      const parsed = JSON.parse(moodData);
      return parsed.mood as MoodType;
    }
    
    // Fallback to userData
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed.mood as MoodType;
    }
  } catch (error) {
    console.error('Error retrieving mood:', error);
  }
  return undefined;
};

export const analyzeMoodTrends = (): { stressSignals: boolean; improved: boolean } => {
  try {
    const moodHistory = localStorage.getItem('mood_history');
    if (!moodHistory) return { stressSignals: false, improved: false };
    
    const history = JSON.parse(moodHistory);
    const recentMoods = history.slice(-5); // Last 5 entries
    
    const stressSignals = recentMoods.filter((entry: any) => 
      [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED].includes(entry.mood)
    ).length >= 3;
    
    const improved = recentMoods.length >= 2 && 
      recentMoods[recentMoods.length - 1].mood === MoodType.HAPPY ||
      recentMoods[recentMoods.length - 1].mood === MoodType.MOTIVATED;
    
    return { stressSignals, improved };
  } catch (error) {
    return { stressSignals: false, improved: false };
  }
};

export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  const adjustment = adjustDailyPlanForMood(mood);
  
  try {
    const allocations = {
      moodBasedAdjustment: adjustment,
      timestamp: new Date().toISOString(),
      appliedMood: mood
    };
    
    localStorage.setItem('study_time_allocations', JSON.stringify(allocations));
    
    // Trigger custom event for other components
    const event = new CustomEvent('study-plan-adjusted', { 
      detail: { mood, adjustment } 
    });
    document.dispatchEvent(event);
  } catch (error) {
    console.error('Error updating study allocations:', error);
  }
};
