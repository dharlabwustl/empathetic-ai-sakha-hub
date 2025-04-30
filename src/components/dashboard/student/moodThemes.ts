
import { MoodType } from '@/types/user/base';

export interface MoodTheme {
  emoji: string;
  label: string;
  colors: {
    background: string;
    text: string;
    light: string;
    dark: string;
  };
}

export function getMoodTheme(mood: MoodType): MoodTheme {
  switch (mood) {
    case 'happy':
      return {
        emoji: '😊',
        label: 'Happy',
        colors: {
          background: 'bg-yellow-100',
          text: 'text-yellow-600',
          light: '#fef9c3', // yellow-100
          dark: '#ca8a04'   // yellow-600
        }
      };
    case 'motivated':
      return {
        emoji: '💪',
        label: 'Motivated',
        colors: {
          background: 'bg-green-100',
          text: 'text-green-600',
          light: '#dcfce7', // green-100
          dark: '#16a34a'   // green-600
        }
      };
    case 'neutral':
      return {
        emoji: '😐',
        label: 'Neutral',
        colors: {
          background: 'bg-blue-100',
          text: 'text-blue-600',
          light: '#dbeafe', // blue-100
          dark: '#2563eb'   // blue-600
        }
      };
    case 'stressed':
      return {
        emoji: '😰',
        label: 'Stressed',
        colors: {
          background: 'bg-orange-100',
          text: 'text-orange-600',
          light: '#ffedd5', // orange-100
          dark: '#ea580c'   // orange-600
        }
      };
    case 'confused':
      return {
        emoji: '🤔',
        label: 'Confused',
        colors: {
          background: 'bg-purple-100',
          text: 'text-purple-600',
          light: '#f3e8ff', // purple-100
          dark: '#9333ea'   // purple-600
        }
      };
    case 'sad':
      return {
        emoji: '😢',
        label: 'Sad',
        colors: {
          background: 'bg-indigo-100',
          text: 'text-indigo-600',
          light: '#e0e7ff', // indigo-100
          dark: '#4f46e5'   // indigo-600
        }
      };
    default:
      return {
        emoji: '😐',
        label: 'Neutral',
        colors: {
          background: 'bg-gray-100',
          text: 'text-gray-600',
          light: '#f3f4f6', // gray-100
          dark: '#4b5563'   // gray-600
        }
      };
  }
}
