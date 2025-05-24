
import { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood: MoodType): string => {
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.Happy]: '😊',
    [MoodType.Motivated]: '💪',
    [MoodType.Focused]: '🎯',
    [MoodType.Calm]: '😌',
    [MoodType.Tired]: '😴',
    [MoodType.Confused]: '🤔',
    [MoodType.Anxious]: '😰',
    [MoodType.Stressed]: '😫',
    [MoodType.Overwhelmed]: '🤯',
    [MoodType.Neutral]: '😐',
    [MoodType.Okay]: '👍',
    [MoodType.Sad]: '😢',
    [MoodType.Curious]: '🤔'
  };
  return moodEmojis[mood] || '😐';
};

export const getMoodLabel = (mood: MoodType): string => {
  const moodLabels: Record<MoodType, string> = {
    [MoodType.Happy]: 'Happy',
    [MoodType.Motivated]: 'Motivated',
    [MoodType.Focused]: 'Focused',
    [MoodType.Calm]: 'Calm',
    [MoodType.Tired]: 'Tired',
    [MoodType.Confused]: 'Confused',
    [MoodType.Anxious]: 'Anxious',
    [MoodType.Stressed]: 'Stressed',
    [MoodType.Overwhelmed]: 'Overwhelmed',
    [MoodType.Neutral]: 'Neutral',
    [MoodType.Okay]: 'Okay',
    [MoodType.Sad]: 'Sad',
    [MoodType.Curious]: 'Curious'
  };
  return moodLabels[mood] || 'Unknown';
};

export const getMoodColor = (mood: MoodType): string => {
  const moodColors: Record<MoodType, string> = {
    [MoodType.Happy]: 'bg-yellow-100 text-yellow-800',
    [MoodType.Motivated]: 'bg-green-100 text-green-800',
    [MoodType.Focused]: 'bg-blue-100 text-blue-800',
    [MoodType.Calm]: 'bg-teal-100 text-teal-800',
    [MoodType.Tired]: 'bg-orange-100 text-orange-800',
    [MoodType.Confused]: 'bg-purple-100 text-purple-800',
    [MoodType.Anxious]: 'bg-red-100 text-red-800',
    [MoodType.Stressed]: 'bg-red-100 text-red-800',
    [MoodType.Overwhelmed]: 'bg-red-100 text-red-800',
    [MoodType.Neutral]: 'bg-gray-100 text-gray-800',
    [MoodType.Okay]: 'bg-emerald-100 text-emerald-800',
    [MoodType.Sad]: 'bg-indigo-100 text-indigo-800',
    [MoodType.Curious]: 'bg-violet-100 text-violet-800'
  };
  return moodColors[mood] || 'bg-gray-100 text-gray-800';
};
