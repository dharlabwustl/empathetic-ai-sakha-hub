import { MoodType } from '@/types/user/base';

// Mood emoji mappings
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😊';
  
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.HAPPY]: '😊',
    [MoodType.FOCUSED]: '🎯',
    [MoodType.TIRED]: '😴',
    [MoodType.STRESSED]: '😰',
    [MoodType.CURIOUS]: '🤔',
    [MoodType.OKAY]: '👍',
    [MoodType.OVERWHELMED]: '😵',
    [MoodType.ANXIOUS]: '😟',
    [MoodType.MOTIVATED]: '🚀',
    [MoodType.CONFUSED]: '😕',
    [MoodType.NEUTRAL]: '😐',
    [MoodType.SAD]: '😢',
    [MoodType.CALM]: '😌'
  };
  
  return moodEmojis[mood] || '😊';
};

// Mood label mappings
export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Happy';
  
  const moodLabels: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Happy',
    [MoodType.FOCUSED]: 'Focused',
    [MoodType.TIRED]: 'Tired',
    [MoodType.STRESSED]: 'Stressed',
    [MoodType.CURIOUS]: 'Curious',
    [MoodType.OKAY]: 'Okay',
    [MoodType.OVERWHELMED]: 'Overwhelmed',
    [MoodType.ANXIOUS]: 'Anxious',
    [MoodType.MOTIVATED]: 'Motivated',
    [MoodType.CONFUSED]: 'Confused',
    [MoodType.NEUTRAL]: 'Neutral',
    [MoodType.SAD]: 'Sad',
    [MoodType.CALM]: 'Calm'
  };
  
  return moodLabels[mood] || 'Happy';
};

// Study recommendations based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Great mood for tackling challenging topics! Try learning new concepts.',
    [MoodType.FOCUSED]: 'Perfect time for deep work. Tackle your most difficult subjects.',
    [MoodType.TIRED]: 'Take a short break or do light revision of familiar topics.',
    [MoodType.STRESSED]: 'Break tasks into smaller chunks. Focus on breathing exercises first.',
    [MoodType.CURIOUS]: 'Explore interesting topics and follow your natural learning flow.',
    [MoodType.OKAY]: 'Good time for balanced study sessions mixing review and new content.',
    [MoodType.OVERWHELMED]: 'Focus on one small task at a time. Prioritize what\'s most important.',
    [MoodType.ANXIOUS]: 'Start with familiar topics to build confidence, then gradually progress.',
    [MoodType.MOTIVATED]: 'Channel this energy into your most important goals and challenging topics.',
    [MoodType.CONFUSED]: 'Revisit fundamentals and seek clarification on unclear concepts.',
    [MoodType.NEUTRAL]: 'Good time for steady, consistent progress through your study plan.',
    [MoodType.SAD]: 'Be gentle with yourself. Light study or creative learning approaches work best.',
    [MoodType.CALM]: 'Excellent for thoughtful analysis and connecting different concepts.'
  };
  
  return recommendations[mood] || 'Keep up the good work!';
};

// Get mood recommendation for daily plan adjustments
export const getMoodRecommendation = (mood: MoodType): string => {
  return getStudyRecommendationForMood(mood);
};

// Store mood in localStorage with timestamp
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  const moodData = {
    mood,
    timestamp: new Date().toISOString(),
    date: new Date().toDateString()
  };
  
  localStorage.setItem('current_mood', JSON.stringify(moodData));
  
  // Store in mood history
  const historyKey = 'mood_history';
  const existingHistory = localStorage.getItem(historyKey);
  let history = [];
  
  if (existingHistory) {
    try {
      history = JSON.parse(existingHistory);
    } catch (error) {
      console.error('Error parsing mood history:', error);
      history = [];
    }
  }
  
  history.push(moodData);
  
  // Keep only last 30 entries
  if (history.length > 30) {
    history = history.slice(-30);
  }
  
  localStorage.setItem(historyKey, JSON.stringify(history));
  
  // Apply theme based on mood
  applyMoodTheme(mood);
  
  // Adjust daily plan based on mood
  adjustDailyPlanForMood(mood);
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

// Apply mood-based theme to dashboard
export const applyMoodTheme = (mood: MoodType): void => {
  const body = document.body;
  
  // Remove all existing mood classes
  const moodClasses = Object.values(MoodType).map(m => `mood-${m}`);
  body.classList.remove(...moodClasses);
  
  // Add new mood class
  body.classList.add(`mood-${mood}`);
  
  // Store theme preference
  localStorage.setItem('mood_theme', mood);
};

// Adjust daily plan based on mood
export const adjustDailyPlanForMood = (mood: MoodType): void => {
  const adjustments: Record<MoodType, any> = {
    [MoodType.HAPPY]: {
      studyIntensity: 'high',
      breakFrequency: 'normal',
      focusAreas: ['challenging_topics', 'new_concepts']
    },
    [MoodType.FOCUSED]: {
      studyIntensity: 'very_high',
      breakFrequency: 'minimal',
      focusAreas: ['difficult_subjects', 'deep_work']
    },
    [MoodType.TIRED]: {
      studyIntensity: 'low',
      breakFrequency: 'frequent',
      focusAreas: ['revision', 'light_topics']
    },
    [MoodType.STRESSED]: {
      studyIntensity: 'low',
      breakFrequency: 'frequent',
      focusAreas: ['breathing_exercises', 'familiar_topics']
    },
    [MoodType.MOTIVATED]: {
      studyIntensity: 'very_high',
      breakFrequency: 'minimal',
      focusAreas: ['goals', 'challenging_topics']
    },
    [MoodType.OVERWHELMED]: {
      studyIntensity: 'very_low',
      breakFrequency: 'very_frequent',
      focusAreas: ['single_task', 'prioritization']
    },
    [MoodType.ANXIOUS]: {
      studyIntensity: 'low',
      breakFrequency: 'frequent',
      focusAreas: ['confidence_building', 'familiar_topics']
    },
    [MoodType.CONFUSED]: {
      studyIntensity: 'medium',
      breakFrequency: 'normal',
      focusAreas: ['fundamentals', 'clarification']
    },
    [MoodType.CURIOUS]: {
      studyIntensity: 'high',
      breakFrequency: 'normal',
      focusAreas: ['exploration', 'interesting_topics']
    },
    [MoodType.NEUTRAL]: {
      studyIntensity: 'medium',
      breakFrequency: 'normal',
      focusAreas: ['balanced_approach']
    },
    [MoodType.OKAY]: {
      studyIntensity: 'medium',
      breakFrequency: 'normal',
      focusAreas: ['steady_progress']
    },
    [MoodType.SAD]: {
      studyIntensity: 'low',
      breakFrequency: 'frequent',
      focusAreas: ['gentle_approach', 'creative_learning']
    },
    [MoodType.CALM]: {
      studyIntensity: 'high',
      breakFrequency: 'normal',
      focusAreas: ['analysis', 'connections']
    }
  };
  
  const adjustment = adjustments[mood];
  localStorage.setItem('daily_plan_adjustment', JSON.stringify(adjustment));
  
  console.log(`Daily plan adjusted for ${mood} mood:`, adjustment);
};

// Analyze mood trends
export const analyzeMoodTrends = (): { stressSignals: boolean; improved: boolean } => {
  try {
    const history = localStorage.getItem('mood_history');
    if (!history) return { stressSignals: false, improved: false };
    
    const moodHistory = JSON.parse(history);
    if (moodHistory.length < 3) return { stressSignals: false, improved: false };
    
    const recentMoods = moodHistory.slice(-5);
    const stressMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED];
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CALM];
    
    const stressCount = recentMoods.filter((entry: any) => 
      stressMoods.includes(entry.mood)
    ).length;
    
    const positiveCount = recentMoods.filter((entry: any) => 
      positiveMoods.includes(entry.mood)
    ).length;
    
    return {
      stressSignals: stressCount >= 3,
      improved: positiveCount >= 3
    };
  } catch (error) {
    console.error('Error analyzing mood trends:', error);
    return { stressSignals: false, improved: false };
  }
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
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
      // Increase time for challenging subjects
      adjustedAllocations.Physics += 15;
      adjustedAllocations.Mathematics += 15;
      break;
    case MoodType.TIRED:
    case MoodType.STRESSED:
      // Reduce overall time, focus on easier subjects
      adjustedAllocations.Physics -= 20;
      adjustedAllocations.Chemistry -= 15;
      adjustedAllocations.Biology += 10;
      break;
    case MoodType.OVERWHELMED:
      // Significantly reduce and focus on one subject
      adjustedAllocations.Physics = 30;
      adjustedAllocations.Chemistry = 30;
      adjustedAllocations.Biology = 40;
      adjustedAllocations.Mathematics = 30;
      break;
  }
  
  localStorage.setItem('mood_adjusted_allocations', JSON.stringify(adjustedAllocations));
};
