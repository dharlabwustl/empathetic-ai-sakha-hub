import { MoodType } from '@/types/user/base';

// Enhanced mood utilities with daily plan integration
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😊';
  
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.HAPPY]: '😊',
    [MoodType.MOTIVATED]: '🚀',
    [MoodType.FOCUSED]: '🎯',
    [MoodType.NEUTRAL]: '😐',
    [MoodType.TIRED]: '😴',
    [MoodType.ANXIOUS]: '😰',
    [MoodType.STRESSED]: '😫',
    [MoodType.SAD]: '😢'
  };
  
  return moodEmojis[mood] || '😊';
};

export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Good';
  
  const moodLabels: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Happy',
    [MoodType.MOTIVATED]: 'Motivated',
    [MoodType.FOCUSED]: 'Focused',
    [MoodType.NEUTRAL]: 'Neutral',
    [MoodType.TIRED]: 'Tired',
    [MoodType.ANXIOUS]: 'Anxious',
    [MoodType.STRESSED]: 'Stressed',
    [MoodType.SAD]: 'Sad'
  };
  
  return moodLabels[mood] || 'Good';
};

export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.HAPPY]: "Great mood for tackling challenging topics! Try some difficult practice problems.",
    [MoodType.MOTIVATED]: "Perfect time to set ambitious goals and dive deep into new concepts.",
    [MoodType.FOCUSED]: "Excellent focus! This is ideal for concentrated study sessions.",
    [MoodType.NEUTRAL]: "Steady progress mode. Mix review with learning new material.",
    [MoodType.TIRED]: "Take it easy with light review or consider a short break.",
    [MoodType.ANXIOUS]: "Try structured review of familiar topics to build confidence.",
    [MoodType.STRESSED]: "Break down tasks into smaller chunks. Take deep breaths.",
    [MoodType.SAD]: "Gentle learning with favorite subjects. Be kind to yourself."
  };
  
  return recommendations[mood] || "Keep up the good work!";
};

// Store mood in localStorage with timestamp
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    const moodData = {
      mood,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };
    
    localStorage.setItem('current_mood', JSON.stringify(moodData));
    
    // Store in mood history for trend analysis
    const history = getMoodHistory();
    history.push(moodData);
    
    // Keep only last 30 entries
    if (history.length > 30) {
      history.splice(0, history.length - 30);
    }
    
    localStorage.setItem('mood_history', JSON.stringify(history));
  } catch (error) {
    console.error('Error storing mood:', error);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const stored = localStorage.getItem('current_mood');
    if (stored) {
      const moodData = JSON.parse(stored);
      return moodData.mood as MoodType;
    }
  } catch (error) {
    console.error('Error retrieving mood:', error);
  }
  return undefined;
};

// Get mood history for trend analysis
export const getMoodHistory = (): Array<{mood: MoodType, timestamp: string, date: string}> => {
  try {
    const stored = localStorage.getItem('mood_history');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error retrieving mood history:', error);
  }
  return [];
};

// Analyze mood trends
export const analyzeMoodTrends = () => {
  const history = getMoodHistory();
  const recent = history.slice(-7); // Last 7 entries
  
  const stressMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.SAD];
  const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED];
  
  const stressCount = recent.filter(entry => stressMoods.includes(entry.mood)).length;
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
    Physics: 60,
    Chemistry: 60,
    Biology: 60,
    Mathematics: 60
  };
  
  let adjustedAllocations;
  
  switch (mood) {
    case MoodType.FOCUSED:
    case MoodType.MOTIVATED:
      // Increase challenging subjects
      adjustedAllocations = {
        Physics: 75,
        Chemistry: 70,
        Biology: 55,
        Mathematics: 65
      };
      break;
    case MoodType.TIRED:
    case MoodType.STRESSED:
      // Reduce overall time, focus on easier subjects
      adjustedAllocations = {
        Physics: 40,
        Chemistry: 45,
        Biology: 65,
        Mathematics: 50
      };
      break;
    case MoodType.ANXIOUS:
      // Focus on familiar, confidence-building topics
      adjustedAllocations = {
        Physics: 45,
        Chemistry: 50,
        Biology: 70,
        Mathematics: 60
      };
      break;
    default:
      adjustedAllocations = baseAllocations;
  }
  
  localStorage.setItem('mood_adjusted_allocations', JSON.stringify(adjustedAllocations));
};

// Get mood-adjusted study plan
export const getMoodAdjustedStudyPlan = (mood: MoodType) => {
  const plans: Record<MoodType, any> = {
    [MoodType.HAPPY]: {
      focus: 'challenging_topics',
      duration: 'extended',
      subjects: ['Physics', 'Mathematics'],
      breakFrequency: 'normal'
    },
    [MoodType.MOTIVATED]: {
      focus: 'new_concepts',
      duration: 'extended',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      breakFrequency: 'minimal'
    },
    [MoodType.FOCUSED]: {
      focus: 'deep_learning',
      duration: 'concentrated',
      subjects: ['most_challenging'],
      breakFrequency: 'minimal'
    },
    [MoodType.TIRED]: {
      focus: 'revision',
      duration: 'short',
      subjects: ['Biology', 'easier_topics'],
      breakFrequency: 'frequent'
    },
    [MoodType.STRESSED]: {
      focus: 'familiar_topics',
      duration: 'short',
      subjects: ['strongest_subjects'],
      breakFrequency: 'frequent'
    },
    [MoodType.ANXIOUS]: {
      focus: 'confidence_building',
      duration: 'moderate',
      subjects: ['Biology', 'practiced_topics'],
      breakFrequency: 'normal'
    },
    [MoodType.SAD]: {
      focus: 'light_engagement',
      duration: 'flexible',
      subjects: ['favorite_subjects'],
      breakFrequency: 'as_needed'
    },
    [MoodType.NEUTRAL]: {
      focus: 'balanced',
      duration: 'normal',
      subjects: ['all_subjects'],
      breakFrequency: 'normal'
    }
  };
  
  return plans[mood] || plans[MoodType.NEUTRAL];
};

// Apply mood theme to dashboard
export const applyMoodTheme = (mood: MoodType): void => {
  const body = document.body;
  
  // Remove existing mood classes
  Object.values(MoodType).forEach(moodValue => {
    body.classList.remove(`mood-${moodValue}`);
  });
  
  // Add current mood class
  body.classList.add(`mood-${mood}`);
};
