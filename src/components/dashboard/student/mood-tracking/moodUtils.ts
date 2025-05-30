import { MoodType } from '@/types/user/base';

// Get mood emoji with enhanced visual representation
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😐';
  
  const moodEmojis = {
    [MoodType.HAPPY]: '😊',
    [MoodType.MOTIVATED]: '🚀',
    [MoodType.FOCUSED]: '🎯',
    [MoodType.NEUTRAL]: '😐',
    [MoodType.TIRED]: '😴',
    [MoodType.ANXIOUS]: '😰',
    [MoodType.STRESSED]: '😤',
    [MoodType.SAD]: '😢',
    [MoodType.OKAY]: '🙂',
    [MoodType.OVERWHELMED]: '😵',
    [MoodType.CURIOUS]: '🤔',
    [MoodType.CONFUSED]: '😕'
  };
  
  return moodEmojis[mood] || '😐';
};

// Get mood label
export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Neutral';
  
  const moodLabels = {
    [MoodType.HAPPY]: 'Happy',
    [MoodType.MOTIVATED]: 'Motivated',
    [MoodType.FOCUSED]: 'Focused',
    [MoodType.NEUTRAL]: 'Neutral',
    [MoodType.TIRED]: 'Tired',
    [MoodType.ANXIOUS]: 'Anxious',
    [MoodType.STRESSED]: 'Stressed',
    [MoodType.SAD]: 'Sad',
    [MoodType.OKAY]: 'Okay',
    [MoodType.OVERWHELMED]: 'Overwhelmed',
    [MoodType.CURIOUS]: 'Curious',
    [MoodType.CONFUSED]: 'Confused'
  };
  
  return moodLabels[mood] || 'Neutral';
};

// Get study recommendations based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations = {
    [MoodType.HAPPY]: "Great mood for tackling challenging topics! Try some practice problems.",
    [MoodType.MOTIVATED]: "Perfect time for deep learning! Focus on your weakest subjects.",
    [MoodType.FOCUSED]: "Excellent concentration! This is ideal for complex concepts.",
    [MoodType.NEUTRAL]: "Good steady energy. Continue with your planned study schedule.",
    [MoodType.TIRED]: "Take a short break or switch to lighter revision topics.",
    [MoodType.ANXIOUS]: "Try some breathing exercises, then start with familiar topics.",
    [MoodType.STRESSED]: "Consider a 10-minute break, then focus on easier review materials.",
    [MoodType.SAD]: "Be gentle with yourself. Light revision or motivational content might help.",
    [MoodType.OKAY]: "A stable mood for consistent progress. Stick to your routine.",
    [MoodType.OVERWHELMED]: "Break tasks into smaller pieces. Focus on one topic at a time.",
    [MoodType.CURIOUS]: "Great time to explore new concepts and dive deeper into interesting topics!",
    [MoodType.CONFUSED]: "Perfect opportunity to clarify doubts. Try reviewing fundamentals."
  };
  
  return recommendations[mood] || "Continue with your regular study plan.";
};

// Update daily plan based on mood
export const updateDailyPlanByMood = (mood: MoodType) => {
  const currentPlan = JSON.parse(localStorage.getItem('dailyStudyPlan') || '{}');
  
  const moodAdjustments = {
    [MoodType.HAPPY]: {
      difficultyLevel: 'challenging',
      sessionDuration: 45,
      breakFrequency: 30,
      focus: 'practice-problems'
    },
    [MoodType.MOTIVATED]: {
      difficultyLevel: 'advanced',
      sessionDuration: 60,
      breakFrequency: 25,
      focus: 'new-concepts'
    },
    [MoodType.FOCUSED]: {
      difficultyLevel: 'complex',
      sessionDuration: 90,
      breakFrequency: 45,
      focus: 'deep-learning'
    },
    [MoodType.TIRED]: {
      difficultyLevel: 'easy',
      sessionDuration: 25,
      breakFrequency: 15,
      focus: 'revision'
    },
    [MoodType.STRESSED]: {
      difficultyLevel: 'moderate',
      sessionDuration: 30,
      breakFrequency: 10,
      focus: 'familiar-topics'
    },
    [MoodType.ANXIOUS]: {
      difficultyLevel: 'easy',
      sessionDuration: 25,
      breakFrequency: 10,
      focus: 'confidence-building'
    },
    [MoodType.OVERWHELMED]: {
      difficultyLevel: 'basic',
      sessionDuration: 20,
      breakFrequency: 5,
      focus: 'small-chunks'
    },
    [MoodType.CURIOUS]: {
      difficultyLevel: 'exploratory',
      sessionDuration: 50,
      breakFrequency: 30,
      focus: 'new-exploration'
    },
    [MoodType.CONFUSED]: {
      difficultyLevel: 'fundamental',
      sessionDuration: 35,
      breakFrequency: 20,
      focus: 'clarification'
    },
    [MoodType.NEUTRAL]: {
      difficultyLevel: 'balanced',
      sessionDuration: 45,
      breakFrequency: 25,
      focus: 'routine-plan'
    },
    [MoodType.OKAY]: {
      difficultyLevel: 'standard',
      sessionDuration: 40,
      breakFrequency: 25,
      focus: 'steady-progress'
    },
    [MoodType.SAD]: {
      difficultyLevel: 'gentle',
      sessionDuration: 30,
      breakFrequency: 15,
      focus: 'comfort-learning'
    }
  };

  const adjustment = moodAdjustments[mood];
  const updatedPlan = {
    ...currentPlan,
    moodBasedAdjustment: adjustment,
    lastMoodUpdate: new Date().toISOString(),
    currentMood: mood,
    recommendations: getStudyRecommendationForMood(mood)
  };

  localStorage.setItem('dailyStudyPlan', JSON.stringify(updatedPlan));
  return updatedPlan;
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  const baseAllocations = JSON.parse(localStorage.getItem('studyTimeAllocations') || '{"Physics": 60, "Chemistry": 60, "Biology": 60, "Mathematics": 60}');
  
  const moodMultipliers = {
    [MoodType.HAPPY]: { Physics: 1.2, Chemistry: 1.1, Biology: 0.9, Mathematics: 1.0 },
    [MoodType.MOTIVATED]: { Physics: 1.3, Chemistry: 1.2, Biology: 1.0, Mathematics: 1.1 },
    [MoodType.FOCUSED]: { Physics: 1.4, Chemistry: 1.3, Biology: 0.8, Mathematics: 1.2 },
    [MoodType.TIRED]: { Physics: 0.7, Chemistry: 0.8, Biology: 1.2, Mathematics: 0.6 },
    [MoodType.STRESSED]: { Physics: 0.8, Chemistry: 0.7, Biology: 1.1, Mathematics: 0.7 },
    [MoodType.ANXIOUS]: { Physics: 0.6, Chemistry: 0.7, Biology: 1.3, Mathematics: 0.5 },
    [MoodType.OVERWHELMED]: { Physics: 0.5, Chemistry: 0.6, Biology: 1.4, Mathematics: 0.4 },
    [MoodType.CURIOUS]: { Physics: 1.1, Chemistry: 1.0, Biology: 1.2, Mathematics: 0.9 },
    [MoodType.CONFUSED]: { Physics: 0.9, Chemistry: 0.8, Biology: 1.1, Mathematics: 1.0 },
    [MoodType.NEUTRAL]: { Physics: 1.0, Chemistry: 1.0, Biology: 1.0, Mathematics: 1.0 },
    [MoodType.OKAY]: { Physics: 1.0, Chemistry: 1.0, Biology: 1.0, Mathematics: 1.0 },
    [MoodType.SAD]: { Physics: 0.8, Chemistry: 0.9, Biology: 1.2, Mathematics: 0.7 }
  };

  const multipliers = moodMultipliers[mood];
  const adjustedAllocations: Record<string, number> = {};

  Object.keys(baseAllocations).forEach(subject => {
    const multiplier = multipliers[subject as keyof typeof multipliers] || 1.0;
    adjustedAllocations[subject] = Math.round(baseAllocations[subject] * multiplier);
  });

  localStorage.setItem('moodAdjustedAllocations', JSON.stringify(adjustedAllocations));
  return adjustedAllocations;
};

// Apply dashboard theme based on mood
export const applyMoodTheme = (mood: MoodType) => {
  const body = document.body;
  
  // Remove existing mood classes
  const moodClasses = [
    'mood-happy', 'mood-motivated', 'mood-focused', 'mood-neutral',
    'mood-tired', 'mood-anxious', 'mood-stressed', 'mood-sad',
    'mood-okay', 'mood-overwhelmed', 'mood-curious', 'mood-confused'
  ];
  
  moodClasses.forEach(className => body.classList.remove(className));
  
  // Add new mood class
  const moodClass = `mood-${mood.toLowerCase().replace('_', '-')}`;
  body.classList.add(moodClass);
  
  // Store current theme
  localStorage.setItem('currentMoodTheme', moodClass);
};

// Analyze mood trends for insights
export const analyzeMoodTrends = () => {
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  
  if (moodHistory.length < 3) {
    return { trends: 'insufficient-data', stressSignals: false, improved: false };
  }
  
  const recentMoods = moodHistory.slice(-7); // Last 7 entries
  const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED, MoodType.SAD];
  const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CURIOUS];
  
  const stressCount = recentMoods.filter((entry: any) => stressfulMoods.includes(entry.mood)).length;
  const positiveCount = recentMoods.filter((entry: any) => positiveMoods.includes(entry.mood)).length;
  
  return {
    trends: stressCount > 4 ? 'concerning' : positiveCount > 4 ? 'positive' : 'stable',
    stressSignals: stressCount > 4,
    improved: positiveCount > recentMoods.length - positiveCount
  };
};

// Store mood in local storage with history
export const storeMoodInLocalStorage = (mood: MoodType) => {
  const moodEntry = {
    mood,
    timestamp: new Date().toISOString(),
    date: new Date().toDateString()
  };
  
  // Store current mood
  localStorage.setItem('currentMood', mood);
  
  // Update mood history
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  moodHistory.push(moodEntry);
  
  // Keep only last 30 entries
  if (moodHistory.length > 30) {
    moodHistory.splice(0, moodHistory.length - 30);
  }
  
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  
  // Update daily plan and time allocations
  updateDailyPlanByMood(mood);
  updateStudyTimeAllocationsByMood(mood);
  
  // Apply theme
  applyMoodTheme(mood);
  
  return moodEntry;
};

// Get current mood from local storage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const mood = localStorage.getItem('currentMood');
  return mood ? (mood as MoodType) : undefined;
};

// Get mood recommendation based on time and context
export const getMoodRecommendation = (mood: MoodType): string => {
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  
  const contextualRecommendations = {
    morning: {
      [MoodType.TIRED]: "Start with light stretching and a healthy breakfast before studying.",
      [MoodType.MOTIVATED]: "Great morning energy! Tackle your most challenging subjects now.",
      [MoodType.FOCUSED]: "Perfect morning focus! Dive into complex problem-solving."
    },
    afternoon: {
      [MoodType.TIRED]: "Consider a short power nap or some fresh air before continuing.",
      [MoodType.STRESSED]: "Take a brief walk or do some breathing exercises.",
      [MoodType.OVERWHELMED]: "Break down your remaining tasks into smaller, manageable chunks."
    },
    evening: {
      [MoodType.ANXIOUS]: "Try some calming activities and light review before tomorrow.",
      [MoodType.CONFUSED]: "Review today's concepts slowly and prepare questions for tomorrow.",
      [MoodType.HAPPY]: "Great time to consolidate today's learning with practice problems."
    }
  };
  
  const timeSpecific = contextualRecommendations[timeOfDay]?.[mood];
  return timeSpecific || getStudyRecommendationForMood(mood);
};

export default {
  getMoodEmoji,
  getMoodLabel,
  getStudyRecommendationForMood,
  updateDailyPlanByMood,
  updateStudyTimeAllocationsByMood,
  applyMoodTheme,
  analyzeMoodTrends,
  storeMoodInLocalStorage,
  getCurrentMoodFromLocalStorage,
  getMoodRecommendation
};
