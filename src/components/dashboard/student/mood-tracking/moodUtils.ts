import { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😊';
  
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.MOTIVATED:
      return '🚀';
    case MoodType.FOCUSED:
      return '🎯';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.TIRED:
      return '😴';
    case MoodType.ANXIOUS:
      return '😰';
    case MoodType.STRESSED:
      return '😫';
    case MoodType.SAD:
      return '😢';
    case MoodType.CALM:
      return '😌';
    case MoodType.CONFUSED:
      return '😕';
    case MoodType.OKAY:
      return '🙂';
    case MoodType.OVERWHELMED:
      return '🤯';
    case MoodType.CURIOUS:
      return '🤔';
    default:
      return '😊';
  }
};

export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Happy';
  
  switch (mood) {
    case MoodType.HAPPY:
      return 'Happy';
    case MoodType.MOTIVATED:
      return 'Motivated';
    case MoodType.FOCUSED:
      return 'Focused';
    case MoodType.NEUTRAL:
      return 'Neutral';
    case MoodType.TIRED:
      return 'Tired';
    case MoodType.ANXIOUS:
      return 'Anxious';
    case MoodType.STRESSED:
      return 'Stressed';
    case MoodType.SAD:
      return 'Sad';
    case MoodType.CALM:
      return 'Calm';
    case MoodType.CONFUSED:
      return 'Confused';
    case MoodType.OKAY:
      return 'Okay';
    case MoodType.OVERWHELMED:
      return 'Overwhelmed';
    case MoodType.CURIOUS:
      return 'Curious';
    default:
      return 'Happy';
  }
};

export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return 'Great energy! Perfect time for challenging topics and group study.';
    case MoodType.MOTIVATED:
      return 'Channel this motivation into ambitious goals and extended practice.';
    case MoodType.FOCUSED:
      return 'Excellent focus! Ideal for deep work sessions and complex concepts.';
    case MoodType.TIRED:
      return 'Light review session recommended. Consider a short break.';
    case MoodType.STRESSED:
      return 'Break tasks into smaller chunks. Try breathing exercises.';
    case MoodType.ANXIOUS:
      return 'Focus on familiar topics to build confidence. Try grounding exercises.';
    case MoodType.SAD:
      return 'Light engagement with enjoyable subjects. Try creative study methods.';
    case MoodType.CALM:
      return 'Perfect for thoughtful analysis and connecting concepts.';
    case MoodType.CONFUSED:
      return 'Revisit fundamentals and seek alternative explanations.';
    case MoodType.OVERWHELMED:
      return 'Focus on single topics. Reassess and prioritize your study plan.';
    case MoodType.CURIOUS:
      return 'Great time to explore new topics and do deep research.';
    default:
      return 'Maintain steady progress through your planned materials.';
  }
};

export const getMoodThemeClass = (mood?: MoodType): string => {
  if (!mood) return 'mood-theme-happy';
  return `mood-theme-${mood.toLowerCase()}`;
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      parsedData.lastMoodUpdate = new Date().toISOString();
      localStorage.setItem('userData', JSON.stringify(parsedData));
    } else {
      localStorage.setItem('userData', JSON.stringify({ 
        mood, 
        lastMoodUpdate: new Date().toISOString() 
      }));
    }
    
    // Store mood history for trends
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    moodHistory.push({
      mood,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    });
    
    // Keep only last 30 entries
    if (moodHistory.length > 30) {
      moodHistory.splice(0, moodHistory.length - 30);
    }
    
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  } catch (error) {
    console.error('Error storing mood:', error);
  }
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.mood as MoodType;
    }
  } catch (error) {
    console.error('Error retrieving mood:', error);
  }
  return undefined;
};

export const analyzeMoodTrends = () => {
  try {
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    
    if (moodHistory.length < 3) {
      return { stressSignals: false, improved: false, stable: true };
    }
    
    const recentMoods = moodHistory.slice(-7); // Last 7 entries
    const stressedMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED, MoodType.SAD];
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CALM];
    
    const stressCount = recentMoods.filter(entry => stressedMoods.includes(entry.mood)).length;
    const positiveCount = recentMoods.filter(entry => positiveMoods.includes(entry.mood)).length;
    
    return {
      stressSignals: stressCount >= 4, // More than half are stress moods
      improved: positiveCount >= 4, // More than half are positive
      stable: Math.abs(positiveCount - stressCount) <= 1
    };
  } catch (error) {
    console.error('Error analyzing mood trends:', error);
    return { stressSignals: false, improved: false, stable: true };
  }
};

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
      adjustedAllocations = {
        Physics: 75,
        Chemistry: 75,
        Biology: 50,
        Mathematics: 60
      };
      break;
    case MoodType.TIRED:
    case MoodType.STRESSED:
      adjustedAllocations = {
        Physics: 40,
        Chemistry: 45,
        Biology: 70,
        Mathematics: 45
      };
      break;
    case MoodType.CONFUSED:
      adjustedAllocations = {
        Physics: 50,
        Chemistry: 50,
        Biology: 65,
        Mathematics: 75
      };
      break;
  }
  
  localStorage.setItem('study_time_allocations', JSON.stringify(adjustedAllocations));
};

export const adjustDailyPlanForMood = (mood: MoodType) => {
  const recommendations = getStudyRecommendationForMood(mood);
  
  // Store daily plan adjustments
  const dailyPlanAdjustments = {
    mood,
    recommendations,
    timestamp: new Date().toISOString(),
    adjustments: {
      focusTime: mood === MoodType.FOCUSED ? 120 : 60,
      breakFrequency: [MoodType.TIRED, MoodType.STRESSED].includes(mood) ? 30 : 60,
      sessionLength: [MoodType.ANXIOUS, MoodType.OVERWHELMED].includes(mood) ? 25 : 45
    }
  };
  
  localStorage.setItem('dailyPlanAdjustments', JSON.stringify(dailyPlanAdjustments));
  
  return dailyPlanAdjustments;
};
