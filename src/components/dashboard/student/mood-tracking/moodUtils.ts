
import { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood: MoodType): string => {
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.Happy]: '😊',
    [MoodType.Motivated]: '🚀',
    [MoodType.Focused]: '🎯',
    [MoodType.Tired]: '😴',
    [MoodType.Anxious]: '😰',
    [MoodType.Neutral]: '😐',
    [MoodType.Stressed]: '😫',
    [MoodType.Sad]: '😢',
    [MoodType.Calm]: '😌',
    [MoodType.Confused]: '😕',
    [MoodType.Overwhelmed]: '🤯',
    [MoodType.Okay]: '👌',
    [MoodType.Curious]: '🤔'
  };
  
  return moodEmojis[mood] || '😐';
};

export const getMoodLabel = (mood: MoodType): string => {
  const moodLabels: Record<MoodType, string> = {
    [MoodType.Happy]: 'Happy',
    [MoodType.Motivated]: 'Motivated',
    [MoodType.Focused]: 'Focused',
    [MoodType.Tired]: 'Tired',
    [MoodType.Anxious]: 'Anxious',
    [MoodType.Neutral]: 'Neutral',
    [MoodType.Stressed]: 'Stressed',
    [MoodType.Sad]: 'Sad',
    [MoodType.Calm]: 'Calm',
    [MoodType.Confused]: 'Confused',
    [MoodType.Overwhelmed]: 'Overwhelmed',
    [MoodType.Okay]: 'Okay',
    [MoodType.Curious]: 'Curious'
  };
  
  return moodLabels[mood] || 'Unknown';
};

export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.Happy]: 'Great time to tackle challenging topics!',
    [MoodType.Motivated]: 'Perfect for starting new concepts or difficult subjects.',
    [MoodType.Focused]: 'Ideal for deep learning and complex problem solving.',
    [MoodType.Tired]: 'Consider light review or taking a break.',
    [MoodType.Anxious]: 'Try some breathing exercises before studying.',
    [MoodType.Neutral]: 'Good time for regular study activities.',
    [MoodType.Stressed]: 'Take a short break and try relaxation techniques.',
    [MoodType.Sad]: 'Consider gentle activities like reviewing notes.',
    [MoodType.Calm]: 'Perfect for focused study sessions.',
    [MoodType.Confused]: 'Good time to ask questions and seek help.',
    [MoodType.Overwhelmed]: 'Break tasks into smaller, manageable pieces.',
    [MoodType.Okay]: 'Standard study approach should work well.',
    [MoodType.Curious]: 'Great time to explore new topics and concepts!'
  };
  
  return recommendations[mood] || 'Continue with your planned studies.';
};

export const getCurrentMoodFromLocalStorage = (): MoodType | null => {
  try {
    const stored = localStorage.getItem('currentMood');
    if (stored && Object.values(MoodType).includes(stored as MoodType)) {
      return stored as MoodType;
    }
  } catch (error) {
    console.error('Error getting mood from localStorage:', error);
  }
  return null;
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    localStorage.setItem('currentMood', mood);
    localStorage.setItem('lastMoodUpdate', new Date().toISOString());
  } catch (error) {
    console.error('Error storing mood in localStorage:', error);
  }
};

export const analyzeMoodTrends = () => {
  // Mock implementation for mood trend analysis
  const mockTrends = {
    stressSignals: Math.random() > 0.7,
    improved: Math.random() > 0.5,
    pattern: 'stable'
  };
  return mockTrends;
};

export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  // Mock implementation for updating study time allocations
  console.log('Updating study time allocations for mood:', mood);
  
  const allocations = {
    [MoodType.Happy]: { focused: 0.6, review: 0.2, new: 0.2 },
    [MoodType.Tired]: { focused: 0.2, review: 0.6, new: 0.2 },
    [MoodType.Stressed]: { focused: 0.3, review: 0.5, new: 0.2 },
    [MoodType.Motivated]: { focused: 0.5, review: 0.2, new: 0.3 }
  };
  
  // Store in localStorage for demo purposes
  try {
    localStorage.setItem('studyAllocations', JSON.stringify(allocations[mood] || allocations[MoodType.Neutral]));
  } catch (error) {
    console.error('Error storing study allocations:', error);
  }
};
