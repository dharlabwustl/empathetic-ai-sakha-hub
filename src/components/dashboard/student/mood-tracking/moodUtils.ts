
import { MoodType } from '@/types/user/base';

// Mood emoji mappings
const moodEmojis: Record<MoodType, string> = {
  [MoodType.HAPPY]: "😊",
  [MoodType.MOTIVATED]: "🔥",
  [MoodType.FOCUSED]: "🎯",
  [MoodType.NEUTRAL]: "😐",
  [MoodType.TIRED]: "😴",
  [MoodType.ANXIOUS]: "😰",
  [MoodType.STRESSED]: "😓",
  [MoodType.SAD]: "😢",
  [MoodType.OKAY]: "👍",
  [MoodType.OVERWHELMED]: "🤯",
  [MoodType.CURIOUS]: "🤔",
  [MoodType.CONFUSED]: "😕"
};

// Mood label mappings
const moodLabels: Record<MoodType, string> = {
  [MoodType.HAPPY]: "Happy",
  [MoodType.MOTIVATED]: "Motivated",
  [MoodType.FOCUSED]: "Focused",
  [MoodType.NEUTRAL]: "Neutral",
  [MoodType.TIRED]: "Tired",
  [MoodType.ANXIOUS]: "Anxious",
  [MoodType.STRESSED]: "Stressed",
  [MoodType.SAD]: "Sad",
  [MoodType.OKAY]: "Okay",
  [MoodType.OVERWHELMED]: "Overwhelmed",
  [MoodType.CURIOUS]: "Curious",
  [MoodType.CONFUSED]: "Confused"
};

// Study recommendations based on mood
const studyRecommendations: Record<MoodType, string> = {
  [MoodType.HAPPY]: "Great time to tackle challenging topics! Your positive energy will help with difficult concepts.",
  [MoodType.MOTIVATED]: "Perfect for setting ambitious goals and tackling new subjects. Channel this energy into learning!",
  [MoodType.FOCUSED]: "Ideal for deep work sessions. Use this focus for complex problem-solving and detailed study.",
  [MoodType.NEUTRAL]: "A balanced approach works best. Mix review with new concepts at a steady pace.",
  [MoodType.TIRED]: "Take it easy with light review. Consider a short break or power nap before continuing.",
  [MoodType.ANXIOUS]: "Start with familiar topics to build confidence. Break tasks into smaller, manageable chunks.",
  [MoodType.STRESSED]: "Focus on structured revision. Take regular breaks and practice breathing exercises.",
  [MoodType.SAD]: "Be gentle with yourself. Try lighter study activities or creative learning methods.",
  [MoodType.OKAY]: "Steady progress is good. Work through your planned materials at a comfortable pace.",
  [MoodType.OVERWHELMED]: "Simplify your approach. Pick just one topic and focus on that for now.",
  [MoodType.CURIOUS]: "Perfect for exploring new topics! Follow your interests to discover connected concepts.",
  [MoodType.CONFUSED]: "Time to revisit fundamentals. Use the AI tutor for alternative explanations."
};

// Daily plan adjustments based on mood
const moodBasedPlanAdjustments: Record<MoodType, { 
  studyIntensity: 'light' | 'moderate' | 'intense';
  recommendedHours: number;
  prioritySubjects: string[];
  breakFrequency: number; // minutes between breaks
}> = {
  [MoodType.HAPPY]: {
    studyIntensity: 'intense',
    recommendedHours: 6,
    prioritySubjects: ['Physics', 'Mathematics'],
    breakFrequency: 45
  },
  [MoodType.MOTIVATED]: {
    studyIntensity: 'intense',
    recommendedHours: 7,
    prioritySubjects: ['Physics', 'Chemistry', 'Mathematics'],
    breakFrequency: 50
  },
  [MoodType.FOCUSED]: {
    studyIntensity: 'intense',
    recommendedHours: 6,
    prioritySubjects: ['Physics', 'Mathematics'],
    breakFrequency: 60
  },
  [MoodType.NEUTRAL]: {
    studyIntensity: 'moderate',
    recommendedHours: 4,
    prioritySubjects: ['Biology', 'Chemistry'],
    breakFrequency: 30
  },
  [MoodType.TIRED]: {
    studyIntensity: 'light',
    recommendedHours: 2,
    prioritySubjects: ['Biology'],
    breakFrequency: 20
  },
  [MoodType.ANXIOUS]: {
    studyIntensity: 'light',
    recommendedHours: 3,
    prioritySubjects: ['Biology', 'Chemistry'],
    breakFrequency: 25
  },
  [MoodType.STRESSED]: {
    studyIntensity: 'light',
    recommendedHours: 3,
    prioritySubjects: ['Biology'],
    breakFrequency: 20
  },
  [MoodType.SAD]: {
    studyIntensity: 'light',
    recommendedHours: 2,
    prioritySubjects: ['Biology'],
    breakFrequency: 15
  },
  [MoodType.OKAY]: {
    studyIntensity: 'moderate',
    recommendedHours: 4,
    prioritySubjects: ['Chemistry', 'Biology'],
    breakFrequency: 30
  },
  [MoodType.OVERWHELMED]: {
    studyIntensity: 'light',
    recommendedHours: 2,
    prioritySubjects: ['Biology'],
    breakFrequency: 15
  },
  [MoodType.CURIOUS]: {
    studyIntensity: 'moderate',
    recommendedHours: 5,
    prioritySubjects: ['Physics', 'Chemistry'],
    breakFrequency: 40
  },
  [MoodType.CONFUSED]: {
    studyIntensity: 'light',
    recommendedHours: 3,
    prioritySubjects: ['Mathematics', 'Physics'],
    breakFrequency: 25
  }
};

export const getMoodEmoji = (mood?: MoodType): string => {
  return mood ? moodEmojis[mood] : "😐";
};

export const getMoodLabel = (mood?: MoodType): string => {
  return mood ? moodLabels[mood] : "Unknown";
};

export const getStudyRecommendationForMood = (mood: MoodType): string => {
  return studyRecommendations[mood];
};

export const getMoodRecommendation = (mood: MoodType): string => {
  return studyRecommendations[mood];
};

export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  const adjustment = moodBasedPlanAdjustments[mood];
  
  // Store the mood-based adjustments in localStorage
  const moodBasedPlan = {
    mood,
    studyIntensity: adjustment.studyIntensity,
    recommendedHours: adjustment.recommendedHours,
    prioritySubjects: adjustment.prioritySubjects,
    breakFrequency: adjustment.breakFrequency,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('mood_based_study_plan', JSON.stringify(moodBasedPlan));
  
  // Update daily plan with mood adjustments
  const currentPlan = JSON.parse(localStorage.getItem('daily_study_plan') || '{}');
  const updatedPlan = {
    ...currentPlan,
    moodAdjustment: moodBasedPlan,
    lastUpdated: new Date().toISOString()
  };
  
  localStorage.setItem('daily_study_plan', JSON.stringify(updatedPlan));
};

export const analyzeMoodTrends = (): { stressSignals: boolean; improved: boolean } => {
  const moodHistory = getMoodHistory();
  
  if (moodHistory.length < 3) {
    return { stressSignals: false, improved: false };
  }
  
  const recentMoods = moodHistory.slice(0, 3);
  const stressMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED, MoodType.SAD];
  const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CURIOUS];
  
  // Check for stress signals (2+ stress moods in recent history)
  const stressCount = recentMoods.filter(entry => stressMoods.includes(entry.mood)).length;
  const stressSignals = stressCount >= 2;
  
  // Check for improvement (latest mood is positive after negative)
  const latestMood = recentMoods[0].mood;
  const previousMood = recentMoods[1]?.mood;
  const improved = positiveMoods.includes(latestMood) && stressMoods.includes(previousMood);
  
  return { stressSignals, improved };
};

export const getMoodHistory = (): Array<{ mood: MoodType; timestamp: Date }> => {
  try {
    const history = localStorage.getItem('mood_history');
    if (history) {
      const parsed = JSON.parse(history);
      return parsed.map((entry: any) => ({
        mood: entry.mood,
        timestamp: new Date(entry.timestamp)
      }));
    }
  } catch (error) {
    console.error('Error retrieving mood history:', error);
  }
  return [];
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  const moodEntry = {
    mood,
    timestamp: new Date().toISOString()
  };
  
  const history = getMoodHistory();
  const updatedHistory = [moodEntry, ...history.slice(0, 29)]; // Keep last 30 entries
  
  localStorage.setItem('mood_history', JSON.stringify(updatedHistory));
  localStorage.setItem('current_mood', mood);
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const currentMood = localStorage.getItem('current_mood');
    return currentMood as MoodType;
  } catch (error) {
    console.error('Error retrieving current mood:', error);
    return undefined;
  }
};

export const getMoodBasedDailyPlan = (): any => {
  try {
    const plan = localStorage.getItem('mood_based_study_plan');
    return plan ? JSON.parse(plan) : null;
  } catch (error) {
    console.error('Error retrieving mood-based daily plan:', error);
    return null;
  }
};
