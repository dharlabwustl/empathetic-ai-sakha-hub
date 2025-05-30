import { MoodType } from '@/types/user/base';

// Mood to emoji mapping with fallback
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '🎯';
  
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.HAPPY]: '😊',
    [MoodType.MOTIVATED]: '🔥',
    [MoodType.FOCUSED]: '🎯',
    [MoodType.NEUTRAL]: '😐',
    [MoodType.TIRED]: '😴',
    [MoodType.ANXIOUS]: '😰',
    [MoodType.STRESSED]: '😵',
    [MoodType.SAD]: '😢',
    [MoodType.CONFUSED]: '😕',
    [MoodType.OKAY]: '👌',
    [MoodType.OVERWHELMED]: '🤯',
    [MoodType.CURIOUS]: '🤔',
    [MoodType.CALM]: '😌'
  };
  
  return moodEmojis[mood] || '🎯';
};

// Mood to label mapping
export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Unknown';
  
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
    [MoodType.OKAY]: 'Okay',
    [MoodType.OVERWHELMED]: 'Overwhelmed',
    [MoodType.CURIOUS]: 'Curious',
    [MoodType.CALM]: 'Calm'
  };
  
  return moodLabels[mood] || 'Unknown';
};

// Get study recommendation based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Great energy! Perfect time to tackle challenging topics.',
    [MoodType.MOTIVATED]: 'Channel this motivation into your most important subjects.',
    [MoodType.FOCUSED]: 'Excellent focus! Dive deep into complex concepts.',
    [MoodType.NEUTRAL]: 'Steady progress - mix review with new concepts.',
    [MoodType.TIRED]: 'Light review session recommended. Consider a short break.',
    [MoodType.ANXIOUS]: 'Focus on familiar topics to build confidence.',
    [MoodType.STRESSED]: 'Break tasks into smaller chunks. Try breathing exercises.',
    [MoodType.SAD]: 'Be gentle with yourself. Try engaging with lighter topics.',
    [MoodType.CONFUSED]: 'Review fundamentals and seek clarification.',
    [MoodType.OKAY]: 'Maintain steady progress with balanced study sessions.',
    [MoodType.OVERWHELMED]: 'Focus on one topic at a time. Prioritize essentials.',
    [MoodType.CURIOUS]: 'Perfect time to explore new topics and dive deeper.',
    [MoodType.CALM]: 'Use this peaceful state for thoughtful analysis.'
  };
  
  return recommendations[mood] || 'Focus on your study plan.';
};

// Analyze mood trends for insights
export const analyzeMoodTrends = () => {
  const moodHistory = getMoodHistory();
  const recentMoods = moodHistory.slice(-7); // Last 7 entries
  
  const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED];
  const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED];
  
  const stressCount = recentMoods.filter(entry => 
    stressfulMoods.includes(entry.mood)
  ).length;
  
  const positiveCount = recentMoods.filter(entry => 
    positiveMoods.includes(entry.mood)
  ).length;
  
  return {
    stressSignals: stressCount >= 3,
    improved: positiveCount > stressCount,
    trending: recentMoods.length >= 3 ? recentMoods[recentMoods.length - 1].mood : null
  };
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  const baseAllocations = {
    Physics: 60,
    Chemistry: 60,
    Biology: 60,
    Mathematics: 60
  };
  
  let adjustedAllocations = { ...baseAllocations };
  
  switch (mood) {
    case MoodType.FOCUSED:
    case MoodType.MOTIVATED:
      // Increase challenging subjects
      adjustedAllocations.Physics += 15;
      adjustedAllocations.Mathematics += 15;
      adjustedAllocations.Biology -= 10;
      adjustedAllocations.Chemistry -= 10;
      break;
    case MoodType.TIRED:
    case MoodType.STRESSED:
      // Reduce overall time, focus on easier review
      adjustedAllocations = {
        Physics: 40,
        Chemistry: 45,
        Biology: 70,
        Mathematics: 45
      };
      break;
    case MoodType.ANXIOUS:
      // Focus on confidence-building subjects
      adjustedAllocations.Biology += 20;
      adjustedAllocations.Physics -= 15;
      adjustedAllocations.Mathematics -= 5;
      break;
  }
  
  localStorage.setItem('mood_adjusted_allocations', JSON.stringify(adjustedAllocations));
  return adjustedAllocations;
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType) => {
  const moodEntry = {
    mood,
    timestamp: new Date().toISOString(),
    id: Date.now().toString()
  };
  
  const moodHistory = getMoodHistory();
  moodHistory.push(moodEntry);
  
  // Keep only last 30 entries
  if (moodHistory.length > 30) {
    moodHistory.splice(0, moodHistory.length - 30);
  }
  
  localStorage.setItem('mood_history', JSON.stringify(moodHistory));
  localStorage.setItem('current_mood', mood);
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const currentMood = localStorage.getItem('current_mood');
  return currentMood as MoodType || undefined;
};

// Get mood history from localStorage
export const getMoodHistory = () => {
  const history = localStorage.getItem('mood_history');
  return history ? JSON.parse(history) : [];
};

// Get mood theme class for dashboard
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
    [MoodType.CONFUSED]: 'mood-confused',
    [MoodType.OKAY]: 'mood-okay',
    [MoodType.OVERWHELMED]: 'mood-overwhelmed',
    [MoodType.CURIOUS]: 'mood-curious',
    [MoodType.CALM]: 'mood-calm'
  };
  
  return themeClasses[mood] || '';
};
