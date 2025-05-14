
import { MoodType } from '@/types/user/base';

// Define the theme interface
export interface MoodTheme {
  background: string;
  text: string;
  accent: string;
  moodColor: string;
  gradientStart: string;
  gradientEnd: string;
  emoji: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

// Define themes for each mood
export const moodThemes: Record<MoodType, MoodTheme> = {
  [MoodType.HAPPY]: {
    background: 'bg-yellow-50',
    text: 'text-yellow-900',
    accent: 'border-yellow-300',
    moodColor: 'text-yellow-500',
    gradientStart: 'from-yellow-100',
    gradientEnd: 'to-yellow-50',
    emoji: '😊',
    description: 'You feel happy and optimistic.',
    colors: {
      primary: '#facc15',
      secondary: '#fef3c7'
    }
  },
  [MoodType.FOCUSED]: {
    background: 'bg-blue-50',
    text: 'text-blue-900',
    accent: 'border-blue-300',
    moodColor: 'text-blue-500',
    gradientStart: 'from-blue-100',
    gradientEnd: 'to-blue-50',
    emoji: '🧠',
    description: 'You are focused and clear-headed.',
    colors: {
      primary: '#3b82f6',
      secondary: '#dbeafe'
    }
  },
  [MoodType.TIRED]: {
    background: 'bg-gray-50',
    text: 'text-gray-900',
    accent: 'border-gray-300',
    moodColor: 'text-gray-500',
    gradientStart: 'from-gray-100',
    gradientEnd: 'to-gray-50',
    emoji: '😴',
    description: 'You feel tired and need rest.',
    colors: {
      primary: '#9ca3af',
      secondary: '#f3f4f6'
    }
  },
  [MoodType.STRESSED]: {
    background: 'bg-amber-50',
    text: 'text-amber-900',
    accent: 'border-amber-300',
    moodColor: 'text-amber-500',
    gradientStart: 'from-amber-100',
    gradientEnd: 'to-amber-50',
    emoji: '😰',
    description: 'You feel stressed and under pressure.',
    colors: {
      primary: '#f59e0b',
      secondary: '#fef3c7'
    }
  },
  [MoodType.CURIOUS]: {
    background: 'bg-purple-50',
    text: 'text-purple-900',
    accent: 'border-purple-300',
    moodColor: 'text-purple-500',
    gradientStart: 'from-purple-100',
    gradientEnd: 'to-purple-50',
    emoji: '🤔',
    description: 'You feel curious and inquisitive.',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ede9fe'
    }
  },
  [MoodType.OKAY]: {
    background: 'bg-green-50',
    text: 'text-green-900',
    accent: 'border-green-300',
    moodColor: 'text-green-500',
    gradientStart: 'from-green-100',
    gradientEnd: 'to-green-50',
    emoji: '😐',
    description: 'You feel okay, neither good nor bad.',
    colors: {
      primary: '#10b981',
      secondary: '#d1fae5'
    }
  },
  [MoodType.OVERWHELMED]: {
    background: 'bg-red-50',
    text: 'text-red-900',
    accent: 'border-red-300',
    moodColor: 'text-red-500',
    gradientStart: 'from-red-100',
    gradientEnd: 'to-red-50',
    emoji: '🥵',
    description: 'You feel overwhelmed by tasks or information.',
    colors: {
      primary: '#ef4444',
      secondary: '#fee2e2'
    }
  },
  [MoodType.ANXIOUS]: {
    background: 'bg-orange-50',
    text: 'text-orange-900',
    accent: 'border-orange-300',
    moodColor: 'text-orange-500',
    gradientStart: 'from-orange-100',
    gradientEnd: 'to-orange-50',
    emoji: '😟',
    description: 'You feel anxious or worried.',
    colors: {
      primary: '#f97316',
      secondary: '#ffedd5'
    }
  },
  [MoodType.MOTIVATED]: {
    background: 'bg-emerald-50',
    text: 'text-emerald-900',
    accent: 'border-emerald-300',
    moodColor: 'text-emerald-500',
    gradientStart: 'from-emerald-100',
    gradientEnd: 'to-emerald-50',
    emoji: '💪',
    description: 'You feel motivated and ready to achieve.',
    colors: {
      primary: '#10b981',
      secondary: '#d1fae5'
    }
  },
  [MoodType.CONFUSED]: {
    background: 'bg-indigo-50',
    text: 'text-indigo-900',
    accent: 'border-indigo-300',
    moodColor: 'text-indigo-500',
    gradientStart: 'from-indigo-100',
    gradientEnd: 'to-indigo-50',
    emoji: '🤔',
    description: 'You feel confused or uncertain.',
    colors: {
      primary: '#6366f1',
      secondary: '#e0e7ff'
    }
  },
  [MoodType.NEUTRAL]: {
    background: 'bg-slate-50',
    text: 'text-slate-900',
    accent: 'border-slate-300',
    moodColor: 'text-slate-500',
    gradientStart: 'from-slate-100',
    gradientEnd: 'to-slate-50',
    emoji: '😐',
    description: 'You feel neutral, balanced.',
    colors: {
      primary: '#64748b',
      secondary: '#f1f5f9'
    }
  },
  [MoodType.SAD]: {
    background: 'bg-cyan-50',
    text: 'text-cyan-900',
    accent: 'border-cyan-300',
    moodColor: 'text-cyan-500',
    gradientStart: 'from-cyan-100',
    gradientEnd: 'to-cyan-50',
    emoji: '😢',
    description: 'You feel sad or down.',
    colors: {
      primary: '#0e7490',
      secondary: '#cffafe'
    }
  }
};

// Helper function to get theme based on mood
export const getMoodTheme = (mood: MoodType): MoodTheme => {
  return moodThemes[mood] || moodThemes[MoodType.NEUTRAL];
};
