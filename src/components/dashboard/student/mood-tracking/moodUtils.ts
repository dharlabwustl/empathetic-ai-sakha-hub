import { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return '😊';
    case MoodType.Stressed:
      return '😰';
    case MoodType.Motivated:
      return '💪';
    case MoodType.Tired:
      return '😴';
    case MoodType.Focused:
      return '🧠';
    case MoodType.Confused:
      return '🤔';
    case MoodType.Calm:
      return '😌';
    case MoodType.Overwhelmed:
      return '🥴';
    case MoodType.Okay:
      return '🙂';
    default:
      return '😐';
  }
};

export const getMoodColor = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return '#22c55e'; // green-500
    case MoodType.Stressed:
      return '#ef4444'; // red-500
    case MoodType.Motivated:
      return '#3b82f6'; // blue-500
    case MoodType.Tired:
      return '#a855f7'; // purple-500
    case MoodType.Focused:
      return '#eab308'; // yellow-500
    case MoodType.Confused:
      return '#64748b'; // gray-500
    case MoodType.Calm:
      return '#14b8a6'; // teal-500
    case MoodType.Overwhelmed:
      return '#f472b6'; // pink-500
    case MoodType.Okay:
      return '#6B7280'; // gray-500
    default:
      return '#6B7280'; // default gray color
  }
};
