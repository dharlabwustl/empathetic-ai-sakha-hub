import { MoodType } from '@/types/user/base';

// Mood emoji mapping
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😊';
  
  const emojiMap: Record<MoodType, string> = {
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
    [MoodType.CONFUSED]: '😕'
  };
  
  return emojiMap[mood] || '😊';
};

// Mood label mapping
export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Neutral';
  
  const labelMap: Record<MoodType, string> = {
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
    [MoodType.CONFUSED]: 'Confused'
  };
  
  return labelMap[mood] || 'Neutral';
};

// Study recommendations based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Great time to tackle challenging concepts! Your positive energy will help with difficult topics.',
    [MoodType.MOTIVATED]: 'Perfect for setting ambitious goals and long study sessions. Make the most of this energy!',
    [MoodType.FOCUSED]: 'Ideal for deep work and complex problem-solving. Dive into your most challenging subjects.',
    [MoodType.NEUTRAL]: 'Good for steady progress. Mix review with new concepts for balanced learning.',
    [MoodType.TIRED]: 'Light review and familiar topics work best. Consider taking a short break first.',
    [MoodType.ANXIOUS]: 'Start with topics you know well to build confidence. Use breathing exercises before studying.',
    [MoodType.STRESSED]: 'Break tasks into smaller chunks. Focus on what you can control and take regular breaks.',
    [MoodType.SAD]: 'Be gentle with yourself. Try creative study methods or lighter topics today.',
    [MoodType.OVERWHELMED]: 'Pick just one small topic to focus on. Sometimes less is more.',
    [MoodType.CURIOUS]: 'Great time to explore new topics and follow your interests beyond the curriculum.',
    [MoodType.OKAY]: 'Steady progress mode. Work through your planned materials at a comfortable pace.',
    [MoodType.CONFUSED]: 'Perfect time to revisit fundamentals and ask for help. Clarity comes with practice.'
  };
  
  return recommendations[mood];
};

// Mood-based study time adjustments
export const updateStudyTimeAllocationsByMood = (mood: MoodType): Record<string, number> => {
  const baseAllocations = {
    Physics: 60,
    Chemistry: 60,
    Biology: 60,
    Mathematics: 60
  };
  
  const adjustments: Record<MoodType, Record<string, number>> = {
    [MoodType.FOCUSED]: { Physics: 75, Chemistry: 75, Biology: 50, Mathematics: 70 },
    [MoodType.MOTIVATED]: { Physics: 80, Chemistry: 70, Biology: 60, Mathematics: 70 },
    [MoodType.TIRED]: { Physics: 40, Chemistry: 45, Biology: 70, Mathematics: 45 },
    [MoodType.STRESSED]: { Physics: 45, Chemistry: 50, Biology: 65, Mathematics: 40 },
    [MoodType.ANXIOUS]: { Physics: 50, Chemistry: 55, Biology: 60, Mathematics: 35 },
    [MoodType.OVERWHELMED]: { Physics: 30, Chemistry: 35, Biology: 50, Mathematics: 35 },
    [MoodType.CONFUSED]: { Physics: 40, Chemistry: 40, Biology: 60, Mathematics: 80 },
    [MoodType.HAPPY]: baseAllocations,
    [MoodType.NEUTRAL]: baseAllocations,
    [MoodType.SAD]: { Physics: 45, Chemistry: 50, Biology: 65, Mathematics: 40 },
    [MoodType.CURIOUS]: { Physics: 70, Chemistry: 65, Biology: 55, Mathematics: 60 },
    [MoodType.OKAY]: baseAllocations
  };
  
  const newAllocations = adjustments[mood] || baseAllocations;
  localStorage.setItem('mood_based_study_allocations', JSON.stringify(newAllocations));
  return newAllocations;
};

// Mood trend analysis
export const analyzeMoodTrends = (): { stressSignals: boolean; improved: boolean } => {
  const moodHistory = getMoodHistory();
  if (moodHistory.length < 3) return { stressSignals: false, improved: false };
  
  const recent = moodHistory.slice(-3);
  const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED];
  const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED];
  
  const stressSignals = recent.filter(entry => stressfulMoods.includes(entry.mood)).length >= 2;
  const improved = recent.some(entry => positiveMoods.includes(entry.mood)) && 
                   !recent.slice(-1)[0] || !stressfulMoods.includes(recent.slice(-1)[0].mood);
  
  return { stressSignals, improved };
};

// Storage functions
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  const moodEntry = {
    mood,
    timestamp: new Date().toISOString(),
    date: new Date().toDateString()
  };
  
  // Store current mood
  localStorage.setItem('current_mood', mood);
  
  // Add to mood history
  const history = getMoodHistory();
  history.push(moodEntry);
  
  // Keep only last 30 entries
  const recentHistory = history.slice(-30);
  localStorage.setItem('mood_history', JSON.stringify(recentHistory));
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const mood = localStorage.getItem('current_mood');
  return mood as MoodType | undefined;
};

export const getMoodHistory = (): Array<{ mood: MoodType; timestamp: string; date: string }> => {
  try {
    const history = localStorage.getItem('mood_history');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

// Dashboard theme based on mood
export const getMoodThemeClass = (mood?: MoodType): string => {
  if (!mood) return '';
  return `mood-${mood}`;
};
