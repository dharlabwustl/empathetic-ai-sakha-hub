
import { MoodType } from '@/types/user/base';

export const getMoodDisplayName = (mood?: MoodType): string => {
  if (!mood) return 'Set Mood';
  
  const displayNames: Record<MoodType, string> = {
    [MoodType.Happy]: 'Happy',
    [MoodType.Focused]: 'Focused',
    [MoodType.Motivated]: 'Motivated',
    [MoodType.Tired]: 'Tired',
    [MoodType.Stressed]: 'Stressed',
    [MoodType.Confused]: 'Confused',
    [MoodType.Anxious]: 'Anxious',
    [MoodType.Neutral]: 'Neutral',
    [MoodType.Okay]: 'Okay',
    [MoodType.Overwhelmed]: 'Overwhelmed',
    [MoodType.Curious]: 'Curious',
    [MoodType.Sad]: 'Sad',
  };
  
  return displayNames[mood] || 'Unknown';
};

export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😐';
  
  const emojis: Record<MoodType, string> = {
    [MoodType.Happy]: '😊',
    [MoodType.Focused]: '🧐',
    [MoodType.Motivated]: '💪',
    [MoodType.Tired]: '😴',
    [MoodType.Stressed]: '😓',
    [MoodType.Confused]: '🤔',
    [MoodType.Anxious]: '😰',
    [MoodType.Neutral]: '😐',
    [MoodType.Okay]: '👍',
    [MoodType.Overwhelmed]: '😩',
    [MoodType.Curious]: '🤓',
    [MoodType.Sad]: '😔',
  };
  
  return emojis[mood] || '😐';
};

export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return '';
  
  const moodColors: Record<MoodType, string> = {
    [MoodType.Happy]: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400',
    [MoodType.Focused]: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400',
    [MoodType.Motivated]: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400',
    [MoodType.Tired]: 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
    [MoodType.Stressed]: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400',
    [MoodType.Confused]: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400',
    [MoodType.Anxious]: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400',
    [MoodType.Neutral]: 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
    [MoodType.Okay]: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400',
    [MoodType.Overwhelmed]: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400',
    [MoodType.Curious]: 'text-violet-600 bg-violet-50 dark:bg-violet-900/20 dark:text-violet-400',
    [MoodType.Sad]: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400',
  };
  
  return moodColors[mood] || '';
};

export const getMoodSuggestion = (mood?: MoodType): string => {
  if (!mood) return '';
  
  const suggestions: Record<MoodType, string> = {
    [MoodType.Happy]: 'Great day to tackle challenging concepts! Add a bonus practice test?',
    [MoodType.Focused]: 'Maximize this energy! Aim for 10% extra progress today.',
    [MoodType.Motivated]: 'Channel this motivation into tackling your most challenging tasks.',
    [MoodType.Tired]: "Let's lighten today's plan. Focus only on Flashcards or Quick Revision.",
    [MoodType.Stressed]: 'Take it easy. 15 minutes of flashcards only. Tomorrow, we rebuild momentum.',
    [MoodType.Confused]: 'Start with reviewing fundamentals before moving to new material.',
    [MoodType.Anxious]: 'Breathe. Start with 1 simple concept you know well to build confidence.',
    [MoodType.Neutral]: 'Follow your regular study plan for best results.',
    [MoodType.Okay]: 'A balanced day ahead. Mix concepts, practice, and revision equally.',
    [MoodType.Overwhelmed]: 'Simplify your focus. Work on just one subject today.',
    [MoodType.Curious]: 'Great time to explore new connections between topics!',
    [MoodType.Sad]: 'Start with lighter material that you enjoy. Short studying sessions today.',
  };
  
  return suggestions[mood] || '';
};
