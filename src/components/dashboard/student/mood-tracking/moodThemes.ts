
import { MoodType } from '@/types/user/base';

export interface MoodTheme {
  emoji: string;
  label: string;
  colors: {
    background: string;
    text: string;
  };
}

export type MoodThemes = {
  [key in MoodType]: MoodTheme;
};

export const getMoodTheme = (mood?: MoodType): MoodTheme => {
  if (!mood) {
    return {
      emoji: '😐',
      label: 'Not Set',
      colors: {
        background: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-700 dark:text-gray-300'
      }
    };
  }
  
  const themes: MoodThemes = {
    [MoodType.Happy]: {
      emoji: '😊',
      label: 'Happy',
      colors: {
        background: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-700 dark:text-amber-300'
      }
    },
    [MoodType.Focused]: {
      emoji: '🧐',
      label: 'Focused',
      colors: {
        background: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-300'
      }
    },
    [MoodType.Motivated]: {
      emoji: '💪',
      label: 'Motivated',
      colors: {
        background: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-700 dark:text-emerald-300'
      }
    },
    [MoodType.Tired]: {
      emoji: '😴',
      label: 'Tired',
      colors: {
        background: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-700 dark:text-gray-300'
      }
    },
    [MoodType.Stressed]: {
      emoji: '😓',
      label: 'Stressed',
      colors: {
        background: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300'
      }
    },
    [MoodType.Confused]: {
      emoji: '🤔',
      label: 'Confused',
      colors: {
        background: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-700 dark:text-purple-300'
      }
    },
    [MoodType.Anxious]: {
      emoji: '😰',
      label: 'Anxious',
      colors: {
        background: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-700 dark:text-orange-300'
      }
    },
    [MoodType.Neutral]: {
      emoji: '😐',
      label: 'Neutral',
      colors: {
        background: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-700 dark:text-gray-300'
      }
    },
    [MoodType.Okay]: {
      emoji: '👍',
      label: 'Okay',
      colors: {
        background: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-300'
      }
    },
    [MoodType.Overwhelmed]: {
      emoji: '😩',
      label: 'Overwhelmed',
      colors: {
        background: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300'
      }
    },
    [MoodType.Curious]: {
      emoji: '🤓',
      label: 'Curious',
      colors: {
        background: 'bg-violet-100 dark:bg-violet-900/30',
        text: 'text-violet-700 dark:text-violet-300'
      }
    },
    [MoodType.Sad]: {
      emoji: '😔',
      label: 'Sad',
      colors: {
        background: 'bg-indigo-100 dark:bg-indigo-900/30',
        text: 'text-indigo-700 dark:text-indigo-300'
      }
    },
  };
  
  return themes[mood];
};
