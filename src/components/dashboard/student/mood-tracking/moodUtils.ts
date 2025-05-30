import { MoodType } from '@/types/user/base';

// Mood to emoji mapping
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😊';
  
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.HAPPY]: '😊',
    [MoodType.MOTIVATED]: '🔥',
    [MoodType.FOCUSED]: '🎯',
    [MoodType.NEUTRAL]: '😐',
    [MoodType.TIRED]: '😴',
    [MoodType.ANXIOUS]: '😰',
    [MoodType.STRESSED]: '😖',
    [MoodType.SAD]: '😢',
    [MoodType.OVERWHELMED]: '🤯',
    [MoodType.CURIOUS]: '🤔',
    [MoodType.CONFUSED]: '😕',
    [MoodType.OKAY]: '🙂'
  };
  
  return moodEmojis[mood] || '😊';
};

// Mood to label mapping
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
    [MoodType.CONFUSED]: 'Confused',
    [MoodType.OKAY]: 'Okay'
  };
  
  return moodLabels[mood] || 'Neutral';
};

// Get study recommendation based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.HAPPY]: "Great mood! Perfect time to tackle challenging topics and new concepts.",
    [MoodType.MOTIVATED]: "Channel this energy into your priority subjects and practice tests.",
    [MoodType.FOCUSED]: "Excellent! Use this focus for detailed study sessions and complex problems.",
    [MoodType.NEUTRAL]: "Steady progress - mix review with new learning for balanced growth.",
    [MoodType.TIRED]: "Take it easy with light review or consider a short break to recharge.",
    [MoodType.ANXIOUS]: "Start with familiar topics to build confidence, then gradually progress.",
    [MoodType.STRESSED]: "Break tasks into smaller chunks and use relaxation techniques.",
    [MoodType.SAD]: "Be gentle with yourself - try lighter subjects or creative study methods.",
    [MoodType.OVERWHELMED]: "Focus on just one topic at a time and prioritize essential concepts.",
    [MoodType.CURIOUS]: "Perfect for exploring new topics and connecting concepts!",
    [MoodType.CONFUSED]: "Revisit fundamentals and seek clarification on difficult concepts.",
    [MoodType.OKAY]: "Solid foundation for steady learning - maintain your current pace."
  };
  
  return recommendations[mood] || "Keep up the good work with your studies!";
};

// Adjust study plan based on mood
export const getStudyPlanAdjustments = (mood: MoodType) => {
  const adjustments: Record<MoodType, {
    timeAllocation: Record<string, number>;
    difficulty: 'easy' | 'medium' | 'hard';
    breakFrequency: number;
    focusType: string;
  }> = {
    [MoodType.HAPPY]: {
      timeAllocation: { Physics: 75, Chemistry: 70, Biology: 60, Mathematics: 65 },
      difficulty: 'hard',
      breakFrequency: 45,
      focusType: 'challenging-concepts'
    },
    [MoodType.MOTIVATED]: {
      timeAllocation: { Physics: 80, Chemistry: 75, Biology: 65, Mathematics: 70 },
      difficulty: 'hard',
      breakFrequency: 60,
      focusType: 'new-learning'
    },
    [MoodType.FOCUSED]: {
      timeAllocation: { Physics: 90, Chemistry: 85, Biology: 70, Mathematics: 80 },
      difficulty: 'hard',
      breakFrequency: 90,
      focusType: 'deep-study'
    },
    [MoodType.TIRED]: {
      timeAllocation: { Physics: 30, Chemistry: 35, Biology: 50, Mathematics: 40 },
      difficulty: 'easy',
      breakFrequency: 20,
      focusType: 'light-review'
    },
    [MoodType.STRESSED]: {
      timeAllocation: { Physics: 40, Chemistry: 45, Biology: 55, Mathematics: 45 },
      difficulty: 'medium',
      breakFrequency: 25,
      focusType: 'structured-review'
    },
    [MoodType.ANXIOUS]: {
      timeAllocation: { Physics: 35, Chemistry: 40, Biology: 60, Mathematics: 50 },
      difficulty: 'easy',
      breakFrequency: 20,
      focusType: 'confidence-building'
    },
    [MoodType.NEUTRAL]: {
      timeAllocation: { Physics: 60, Chemistry: 60, Biology: 60, Mathematics: 60 },
      difficulty: 'medium',
      breakFrequency: 45,
      focusType: 'balanced-learning'
    },
    [MoodType.SAD]: {
      timeAllocation: { Physics: 25, Chemistry: 30, Biology: 45, Mathematics: 35 },
      difficulty: 'easy',
      breakFrequency: 15,
      focusType: 'gentle-review'
    },
    [MoodType.OVERWHELMED]: {
      timeAllocation: { Physics: 20, Chemistry: 25, Biology: 40, Mathematics: 30 },
      difficulty: 'easy',
      breakFrequency: 15,
      focusType: 'single-concept'
    },
    [MoodType.CURIOUS]: {
      timeAllocation: { Physics: 70, Chemistry: 65, Biology: 80, Mathematics: 60 },
      difficulty: 'medium',
      breakFrequency: 50,
      focusType: 'exploration'
    },
    [MoodType.CONFUSED]: {
      timeAllocation: { Physics: 45, Chemistry: 50, Biology: 55, Mathematics: 65 },
      difficulty: 'easy',
      breakFrequency: 30,
      focusType: 'fundamentals'
    },
    [MoodType.OKAY]: {
      timeAllocation: { Physics: 55, Chemistry: 55, Biology: 55, Mathematics: 55 },
      difficulty: 'medium',
      breakFrequency: 40,
      focusType: 'steady-progress'
    }
  };
  
  return adjustments[mood] || adjustments[MoodType.NEUTRAL];
};

// Store mood in localStorage with timestamp
export const storeMoodInLocalStorage = (mood: MoodType) => {
  const moodData = {
    mood,
    timestamp: new Date().toISOString(),
    date: new Date().toDateString()
  };
  
  localStorage.setItem('current_mood', JSON.stringify(moodData));
  
  // Store in mood history
  const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
  moodHistory.push(moodData);
  
  // Keep only last 30 entries
  if (moodHistory.length > 30) {
    moodHistory.splice(0, moodHistory.length - 30);
  }
  
  localStorage.setItem('mood_history', JSON.stringify(moodHistory));
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const moodData = localStorage.getItem('current_mood');
    if (moodData) {
      const parsed = JSON.parse(moodData);
      return parsed.mood;
    }
  } catch (error) {
    console.error('Error retrieving mood from localStorage:', error);
  }
  return undefined;
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  const adjustments = getStudyPlanAdjustments(mood);
  localStorage.setItem('study_time_allocations', JSON.stringify(adjustments.timeAllocation));
  
  // Store other adjustments for reference
  localStorage.setItem('study_adjustments', JSON.stringify({
    difficulty: adjustments.difficulty,
    breakFrequency: adjustments.breakFrequency,
    focusType: adjustments.focusType,
    mood,
    timestamp: new Date().toISOString()
  }));
};

// Analyze mood trends
export const analyzeMoodTrends = () => {
  try {
    const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
    const recentMoods = moodHistory.slice(-7); // Last 7 entries
    
    const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED];
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED];
    
    const stressCount = recentMoods.filter((entry: any) => 
      stressfulMoods.includes(entry.mood)
    ).length;
    
    const positiveCount = recentMoods.filter((entry: any) => 
      positiveMoods.includes(entry.mood)
    ).length;
    
    return {
      stressSignals: stressCount >= 3,
      improved: positiveCount > stressCount,
      trend: positiveCount > stressCount ? 'improving' : stressCount > positiveCount ? 'declining' : 'stable'
    };
  } catch (error) {
    console.error('Error analyzing mood trends:', error);
    return { stressSignals: false, improved: false, trend: 'stable' };
  }
};

// Get mood-based dashboard theme
export const getMoodTheme = (mood?: MoodType) => {
  if (!mood) return 'mood-neutral';
  
  const themeMap: Record<MoodType, string> = {
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
    [MoodType.CONFUSED]: 'mood-confused',
    [MoodType.OKAY]: 'mood-okay'
  };
  
  return themeMap[mood] || 'mood-neutral';
};
