
import { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return '😊';
    case MoodType.Focused:
      return '🧐';
    case MoodType.Tired:
      return '😴';
    case MoodType.Stressed:
      return '😓';
    case MoodType.Curious:
      return '🤓';
    case MoodType.Okay:
      return '👍';
    case MoodType.Overwhelmed:
      return '😩';
    case MoodType.Anxious:
      return '😰';
    case MoodType.Motivated:
      return '💪';
    case MoodType.Confused:
      return '🤔';
    case MoodType.Neutral:
      return '😐';
    case MoodType.Sad:
      return '😔';
    case MoodType.Calm:
      return '😌';
    default:
      return '😊';
  }
};

export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Select your mood';
  
  // Convert enum value to title case
  return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  localStorage.setItem('current_mood', mood);
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const savedMood = localStorage.getItem('current_mood');
  return savedMood as MoodType || undefined;
};
