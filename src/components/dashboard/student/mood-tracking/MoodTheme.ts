
import { MoodType } from '@/types/user/base';

export interface MoodTheme {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  darkBackgroundColor: string;
  darkTextColor: string;
  darkBorderColor: string;
  emoji: string;
  message: string;
  studyTip: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export type MoodThemes = Record<MoodType, MoodTheme> & {
  confused: MoodTheme;
  calm: MoodTheme;
};

export const moodThemes: MoodThemes = {
  [MoodType.Happy]: {
    backgroundColor: '#f0fdf4',
    textColor: '#16a34a',
    borderColor: '#dcfce7',
    darkBackgroundColor: '#052e16',
    darkTextColor: '#4ade80',
    darkBorderColor: '#166534',
    emoji: '😄',
    message: "You're feeling happy! Great energy for learning!",
    studyTip: "Capitalize on your positive mood by tackling challenging topics. Your brain is more receptive when you're happy!",
    colors: {
      primary: '#16a34a',
      secondary: '#dcfce7',
      accent: '#f0fdf4'
    }
  },
  [MoodType.Stressed]: {
    backgroundColor: '#fef2f2',
    textColor: '#dc2626',
    borderColor: '#fee2e2',
    darkBackgroundColor: '#450a0a',
    darkTextColor: '#f87171',
    darkBorderColor: '#991b1b',
    emoji: '😰',
    message: "You're feeling stressed. Let's take it easy today.",
    studyTip: "Break your study session into smaller 25-minute blocks. Take deep breaths between sessions to reset your stress levels.",
    colors: {
      primary: '#dc2626',
      secondary: '#fee2e2',
      accent: '#fef2f2'
    }
  },
  [MoodType.Tired]: {
    backgroundColor: '#f5f3ff',
    textColor: '#7c3aed',
    borderColor: '#ede9fe',
    darkBackgroundColor: '#2e1065',
    darkTextColor: '#a78bfa',
    darkBorderColor: '#5b21b6',
    emoji: '😴',
    message: "You're feeling tired. Consider a short power nap.",
    studyTip: "Focus on review rather than new content when tired. Try a 20-minute power nap followed by a brief walk to refresh.",
    colors: {
      primary: '#7c3aed',
      secondary: '#ede9fe',
      accent: '#f5f3ff'
    }
  },
  [MoodType.Motivated]: {
    backgroundColor: '#ecfeff',
    textColor: '#0891b2',
    borderColor: '#cffafe',
    darkBackgroundColor: '#083344',
    darkTextColor: '#22d3ee',
    darkBorderColor: '#155e75',
    emoji: '💪',
    message: "You're feeling motivated! Time to make progress!",
    studyTip: "Take advantage of your motivation by working on your most challenging subjects first, when your focus is strongest.",
    colors: {
      primary: '#0891b2',
      secondary: '#cffafe',
      accent: '#ecfeff'
    }
  },
  [MoodType.Focused]: {
    backgroundColor: '#eff6ff',
    textColor: '#2563eb',
    borderColor: '#dbeafe',
    darkBackgroundColor: '#172554',
    darkTextColor: '#60a5fa',
    darkBorderColor: '#1e40af',
    emoji: '🧠',
    message: "You're in the zone! Great time for deep work.",
    studyTip: "When focused, use the Pomodoro technique: 25 minutes of intense study followed by a 5-minute break to maintain concentration.",
    colors: {
      primary: '#2563eb',
      secondary: '#dbeafe',
      accent: '#eff6ff'
    }
  },
  confused: {
    backgroundColor: '#fff7ed',
    textColor: '#c2410c',
    borderColor: '#ffedd5',
    darkBackgroundColor: '#431407',
    darkTextColor: '#fb923c',
    darkBorderColor: '#9a3412',
    emoji: '😕',
    message: "You're feeling confused. Let's break things down.",
    studyTip: "When confused, work backwards from what you do understand. Create simple diagrams to visualize complex concepts.",
    colors: {
      primary: '#c2410c',
      secondary: '#ffedd5',
      accent: '#fff7ed'
    }
  },
  calm: {
    backgroundColor: '#f0f9ff',
    textColor: '#0369a1',
    borderColor: '#e0f2fe',
    darkBackgroundColor: '#082f49',
    darkTextColor: '#38bdf8',
    darkBorderColor: '#0c4a6e',
    emoji: '😌',
    message: "You're feeling calm. Perfect for thoughtful study.",
    studyTip: "Use this calm state for deep reading and connecting concepts. Your brain absorbs information well when relaxed.",
    colors: {
      primary: '#0369a1',
      secondary: '#e0f2fe',
      accent: '#f0f9ff'
    }
  }
};

export default moodThemes;
