import { MoodType } from '@/types/user/base';

// Mood-related utilities and data
export const moodEmojis: Record<MoodType, string> = {
  [MoodType.HAPPY]: '😊',
  [MoodType.MOTIVATED]: '🚀',
  [MoodType.FOCUSED]: '🎯',
  [MoodType.NEUTRAL]: '😐',
  [MoodType.TIRED]: '😴',
  [MoodType.ANXIOUS]: '😰',
  [MoodType.STRESSED]: '😤',
  [MoodType.SAD]: '😢'
};

export const moodLabels: Record<MoodType, string> = {
  [MoodType.HAPPY]: 'Happy',
  [MoodType.MOTIVATED]: 'Motivated',
  [MoodType.FOCUSED]: 'Focused',
  [MoodType.NEUTRAL]: 'Neutral',
  [MoodType.TIRED]: 'Tired',
  [MoodType.ANXIOUS]: 'Anxious',
  [MoodType.STRESSED]: 'Stressed',
  [MoodType.SAD]: 'Sad'
};

export const moodColors: Record<MoodType, string> = {
  [MoodType.HAPPY]: 'from-yellow-400 to-orange-400',
  [MoodType.MOTIVATED]: 'from-green-400 to-emerald-400',
  [MoodType.FOCUSED]: 'from-blue-400 to-cyan-400',
  [MoodType.NEUTRAL]: 'from-gray-400 to-slate-400',
  [MoodType.TIRED]: 'from-orange-400 to-red-400',
  [MoodType.ANXIOUS]: 'from-purple-400 to-violet-400',
  [MoodType.STRESSED]: 'from-red-400 to-pink-400',
  [MoodType.SAD]: 'from-indigo-400 to-blue-400'
};

// Study recommendations based on mood
export const studyRecommendations: Record<MoodType, string> = {
  [MoodType.HAPPY]: "Great mood for tackling challenging topics! Try some difficult practice problems.",
  [MoodType.MOTIVATED]: "Perfect time for intensive study sessions. Go for your hardest subjects!",
  [MoodType.FOCUSED]: "Excellent focus - ideal for concept learning and detail work.",
  [MoodType.NEUTRAL]: "Good time for regular study routine. Mix concepts and practice.",
  [MoodType.TIRED]: "Take it easy with light review or flashcards. Don't push too hard.",
  [MoodType.ANXIOUS]: "Start with easier topics to build confidence. Take breaks as needed.",
  [MoodType.STRESSED]: "Focus on relaxation first. Maybe try some light revision.",
  [MoodType.SAD]: "Be gentle with yourself. Light study or motivational content might help."
};

// Dashboard theme adjustments based on mood
export const moodThemes: Record<MoodType, {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}> = {
  [MoodType.HAPPY]: {
    primary: 'border-yellow-200 bg-yellow-50',
    secondary: 'bg-yellow-100',
    accent: 'text-yellow-700',
    background: 'from-yellow-50 to-orange-50'
  },
  [MoodType.MOTIVATED]: {
    primary: 'border-green-200 bg-green-50',
    secondary: 'bg-green-100',
    accent: 'text-green-700',
    background: 'from-green-50 to-emerald-50'
  },
  [MoodType.FOCUSED]: {
    primary: 'border-blue-200 bg-blue-50',
    secondary: 'bg-blue-100',
    accent: 'text-blue-700',
    background: 'from-blue-50 to-cyan-50'
  },
  [MoodType.NEUTRAL]: {
    primary: 'border-gray-200 bg-gray-50',
    secondary: 'bg-gray-100',
    accent: 'text-gray-700',
    background: 'from-gray-50 to-slate-50'
  },
  [MoodType.TIRED]: {
    primary: 'border-orange-200 bg-orange-50',
    secondary: 'bg-orange-100',
    accent: 'text-orange-700',
    background: 'from-orange-50 to-red-50'
  },
  [MoodType.ANXIOUS]: {
    primary: 'border-purple-200 bg-purple-50',
    secondary: 'bg-purple-100',
    accent: 'text-purple-700',
    background: 'from-purple-50 to-violet-50'
  },
  [MoodType.STRESSED]: {
    primary: 'border-red-200 bg-red-50',
    secondary: 'bg-red-100',
    accent: 'text-red-700',
    background: 'from-red-50 to-pink-50'
  },
  [MoodType.SAD]: {
    primary: 'border-indigo-200 bg-indigo-50',
    secondary: 'bg-indigo-100',
    accent: 'text-indigo-700',
    background: 'from-indigo-50 to-blue-50'
  }
};

// Utility functions
export const getMoodEmoji = (mood?: MoodType): string => {
  return mood ? moodEmojis[mood] : '😊';
};

export const getMoodLabel = (mood?: MoodType): string => {
  return mood ? moodLabels[mood] : 'Neutral';
};

export const getMoodColor = (mood?: MoodType): string => {
  return mood ? moodColors[mood] : moodColors[MoodType.NEUTRAL];
};

export const getStudyRecommendationForMood = (mood?: MoodType): string => {
  return mood ? studyRecommendations[mood] : studyRecommendations[MoodType.NEUTRAL];
};

export const getMoodTheme = (mood?: MoodType) => {
  return mood ? moodThemes[mood] : moodThemes[MoodType.NEUTRAL];
};

// Local storage helpers
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const saved = localStorage.getItem('current_mood');
    return saved ? (saved as MoodType) : undefined;
  } catch {
    return undefined;
  }
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    localStorage.setItem('current_mood', mood);
  } catch (error) {
    console.error('Failed to store mood in localStorage:', error);
  }
};

// Plan adjustment based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  const adjustments = {
    [MoodType.MOTIVATED]: { multiplier: 1.2, focus: 'challenging' },
    [MoodType.FOCUSED]: { multiplier: 1.1, focus: 'detailed' },
    [MoodType.TIRED]: { multiplier: 0.7, focus: 'light' },
    [MoodType.ANXIOUS]: { multiplier: 0.8, focus: 'easy' },
    [MoodType.STRESSED]: { multiplier: 0.6, focus: 'relaxed' },
    [MoodType.SAD]: { multiplier: 0.5, focus: 'motivational' },
    [MoodType.HAPPY]: { multiplier: 1.0, focus: 'balanced' },
    [MoodType.NEUTRAL]: { multiplier: 1.0, focus: 'standard' }
  };

  const adjustment = adjustments[mood];
  console.log(`Adjusting study plan for ${mood} mood:`, adjustment);
  
  // Here you would typically update the study plan in your backend/state
  // For now, we'll store it in localStorage
  try {
    localStorage.setItem('mood_study_adjustment', JSON.stringify({
      mood,
      adjustment,
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Failed to store study adjustment:', error);
  }
};

// Mood trend analysis
export const analyzeMoodTrends = () => {
  try {
    const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
    const recentMoods = moodHistory.slice(-7); // Last 7 entries
    
    const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.SAD];
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED];
    
    const stressCount = recentMoods.filter((entry: any) => 
      stressfulMoods.includes(entry.mood)
    ).length;
    
    const positiveCount = recentMoods.filter((entry: any) => 
      positiveMoods.includes(entry.mood)
    ).length;
    
    return {
      stressSignals: stressCount >= 4,
      improved: positiveCount > stressCount,
      trend: positiveCount > stressCount ? 'improving' : stressCount > positiveCount ? 'declining' : 'stable'
    };
  } catch {
    return { stressSignals: false, improved: false, trend: 'stable' };
  }
};

// Store mood in history for trend analysis
export const logMoodToHistory = (mood: MoodType): void => {
  try {
    const history = JSON.parse(localStorage.getItem('mood_history') || '[]');
    history.push({
      mood,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    });
    
    // Keep only last 30 entries
    const trimmedHistory = history.slice(-30);
    localStorage.setItem('mood_history', JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to log mood to history:', error);
  }
};
