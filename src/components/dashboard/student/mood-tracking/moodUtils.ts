
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
