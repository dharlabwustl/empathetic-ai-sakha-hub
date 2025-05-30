import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

// Re-export MoodType to fix import error
export { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😐';
  
  const moodEmojiMap: Record<MoodType, string> = {
    [MoodType.HAPPY]: '😊',
    [MoodType.MOTIVATED]: '🚀',
    [MoodType.FOCUSED]: '🎯',
    [MoodType.NEUTRAL]: '😐',
    [MoodType.TIRED]: '😴',
    [MoodType.ANXIOUS]: '😰',
    [MoodType.STRESSED]: '😤',
    [MoodType.SAD]: '😢'
  };
  
  return moodEmojiMap[mood] || '😐';
};

export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Neutral';
  
  const moodLabelMap: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Happy',
    [MoodType.MOTIVATED]: 'Motivated',
    [MoodType.FOCUSED]: 'Focused',
    [MoodType.NEUTRAL]: 'Neutral',
    [MoodType.TIRED]: 'Tired',
    [MoodType.ANXIOUS]: 'Anxious',
    [MoodType.STRESSED]: 'Stressed',
    [MoodType.SAD]: 'Sad'
  };
  
  return moodLabelMap[mood] || 'Neutral';
};

export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.HAPPY]: 'Great mood for tackling challenging topics! Consider working on difficult concepts.',
    [MoodType.MOTIVATED]: 'Perfect time for intensive study sessions. Set ambitious goals!',
    [MoodType.FOCUSED]: 'Excellent focus - ideal for deep learning and complex problem-solving.',
    [MoodType.NEUTRAL]: 'Good time for balanced study - mix review with new concepts.',
    [MoodType.TIRED]: 'Take it easy - light review or consider a short break.',
    [MoodType.ANXIOUS]: 'Focus on familiar topics to build confidence. Practice breathing exercises.',
    [MoodType.STRESSED]: 'Break tasks into smaller chunks. Consider relaxation techniques.',
    [MoodType.SAD]: 'Gentle study approach recommended. Try visual or interactive content.'
  };
  
  return recommendations[mood] || 'Continue with your planned study schedule.';
};

export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  const moodAllocations: Record<MoodType, Record<string, number>> = {
    [MoodType.HAPPY]: { Physics: 75, Chemistry: 70, Biology: 60, Mathematics: 65 },
    [MoodType.MOTIVATED]: { Physics: 80, Chemistry: 75, Biology: 65, Mathematics: 70 },
    [MoodType.FOCUSED]: { Physics: 85, Chemistry: 80, Biology: 60, Mathematics: 75 },
    [MoodType.NEUTRAL]: { Physics: 60, Chemistry: 60, Biology: 60, Mathematics: 60 },
    [MoodType.TIRED]: { Physics: 40, Chemistry: 45, Biology: 70, Mathematics: 45 },
    [MoodType.ANXIOUS]: { Physics: 45, Chemistry: 50, Biology: 65, Mathematics: 50 },
    [MoodType.STRESSED]: { Physics: 35, Chemistry: 40, Biology: 75, Mathematics: 40 },
    [MoodType.SAD]: { Physics: 30, Chemistry: 35, Biology: 80, Mathematics: 35 }
  };
  
  const allocations = moodAllocations[mood];
  localStorage.setItem('mood_study_allocations', JSON.stringify(allocations));
  localStorage.setItem('last_mood_update', new Date().toISOString());
};

export const analyzeMoodTrends = (): { stressSignals: boolean; improved: boolean } => {
  try {
    const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
    const recentMoods = moodHistory.slice(-5);
    
    const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.SAD];
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED];
    
    const stressCount = recentMoods.filter((entry: any) => 
      stressfulMoods.includes(entry.mood)
    ).length;
    
    const positiveCount = recentMoods.filter((entry: any) => 
      positiveMoods.includes(entry.mood)
    ).length;
    
    return {
      stressSignals: stressCount >= 3,
      improved: positiveCount >= 3
    };
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
    
    // Apply mood theme to document
    applyMoodTheme(mood);
  } catch (error) {
    console.error('Error storing mood:', error);
  }
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const mood = localStorage.getItem('current_mood') as MoodType;
    return mood || undefined;
  } catch {
    return undefined;
  }
};

export const applyMoodTheme = (mood: MoodType): void => {
  const body = document.body;
  
  // Remove existing mood classes
  const moodClasses = Object.values(MoodType).map(m => `mood-${m}`);
  body.classList.remove(...moodClasses);
  
  // Add new mood class
  body.classList.add(`mood-${mood}`);
};
