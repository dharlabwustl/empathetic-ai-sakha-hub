import { MoodType } from '@/types/user/base';

// Enhanced mood emojis with better visual appeal
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😊';
  
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.HAPPY]: '😊',
    [MoodType.FOCUSED]: '🎯',
    [MoodType.TIRED]: '😴',
    [MoodType.STRESSED]: '😰',
    [MoodType.CURIOUS]: '🤔',
    [MoodType.OKAY]: '😐',
    [MoodType.OVERWHELMED]: '😵',
    [MoodType.ANXIOUS]: '😟',
    [MoodType.MOTIVATED]: '💪',
    [MoodType.CONFUSED]: '😵‍💫',
    [MoodType.NEUTRAL]: '😑',
    [MoodType.SAD]: '😢',
    [MoodType.CALM]: '😌'
  };
  
  return moodEmojis[mood] || '😊';
};

export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Neutral';
  
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
  
  return moodLabels[mood] || 'Neutral';
};

export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return 'gray';
  
  const moodColors: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'yellow',
    [MoodType.FOCUSED]: 'blue',
    [MoodType.TIRED]: 'orange',
    [MoodType.STRESSED]: 'red',
    [MoodType.CURIOUS]: 'purple',
    [MoodType.OKAY]: 'gray',
    [MoodType.OVERWHELMED]: 'red',
    [MoodType.ANXIOUS]: 'orange',
    [MoodType.MOTIVATED]: 'green',
    [MoodType.CONFUSED]: 'purple',
    [MoodType.NEUTRAL]: 'gray',
    [MoodType.SAD]: 'blue',
    [MoodType.CALM]: 'green'
  };
  
  return moodColors[mood] || 'gray';
};

export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Great energy! Try tackling challenging topics or group study.',
    [MoodType.FOCUSED]: 'Perfect for deep work! Focus on complex concepts that need concentration.',
    [MoodType.TIRED]: 'Take it easy. Light revision or a short break might help.',
    [MoodType.STRESSED]: 'Break tasks into smaller chunks. Consider breathing exercises.',
    [MoodType.CURIOUS]: 'Explore new topics! Follow your curiosity to discover connections.',
    [MoodType.OKAY]: 'Steady progress! Mix review with learning new concepts.',
    [MoodType.OVERWHELMED]: 'Focus on one small topic at a time. Prioritize what matters most.',
    [MoodType.ANXIOUS]: 'Review familiar concepts to build confidence. Try grounding exercises.',
    [MoodType.MOTIVATED]: 'Channel this energy! Set ambitious goals and tackle practice sessions.',
    [MoodType.CONFUSED]: 'Go back to fundamentals. Use AI tutor for alternative explanations.',
    [MoodType.NEUTRAL]: 'Balanced approach! Mix different study methods.',
    [MoodType.SAD]: 'Be gentle with yourself. Try creative study methods or enjoyable topics.',
    [MoodType.CALM]: 'Perfect for thoughtful analysis and connecting concepts.'
  };
  
  return recommendations[mood] || 'Keep studying at your own pace!';
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
  localStorage.setItem('mood_last_updated', new Date().toISOString());
  
  // Trigger custom event for daily plan update
  const event = new CustomEvent('mood-study-plan-updated', {
    detail: { mood, allocations: adjustedAllocations }
  });
  document.dispatchEvent(event);
};

export const analyzeMoodTrends = (): { stressSignals: boolean; improved: boolean } => {
  try {
    const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
    const recentMoods = moodHistory.slice(-5);
    
    const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED];
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CALM];
    
    const stressSignals = recentMoods.filter((entry: any) => 
      stressfulMoods.includes(entry.mood)).length >= 3;
    
    const improved = recentMoods.length >= 3 && 
      positiveMoods.includes(recentMoods[recentMoods.length - 1]?.mood);
    
    return { stressSignals, improved };
  } catch {
    return { stressSignals: false, improved: false };
  }
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
    const newEntry = {
      mood,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };
    
    moodHistory.push(newEntry);
    
    // Keep only last 30 entries
    if (moodHistory.length > 30) {
      moodHistory.splice(0, moodHistory.length - 30);
    }
    
    localStorage.setItem('mood_history', JSON.stringify(moodHistory));
    localStorage.setItem('current_mood', mood);
    
    // Apply dashboard theme based on mood
    updateDashboardThemeByMood(mood);
  } catch (error) {
    console.error('Error storing mood:', error);
  }
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const savedMood = localStorage.getItem('current_mood');
    return savedMood ? (savedMood as MoodType) : undefined;
  } catch {
    return undefined;
  }
};

export const updateDashboardThemeByMood = (mood: MoodType): void => {
  const body = document.body;
  
  // Remove existing mood classes
  body.classList.remove(
    'mood-happy', 'mood-focused', 'mood-tired', 'mood-stressed',
    'mood-curious', 'mood-okay', 'mood-overwhelmed', 'mood-anxious',
    'mood-motivated', 'mood-confused', 'mood-neutral', 'mood-sad', 'mood-calm'
  );
  
  // Add new mood class
  body.classList.add(`mood-${mood}`);
  
  // Store theme preference
  localStorage.setItem('dashboard_mood_theme', mood);
};
