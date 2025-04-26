
import { MoodType } from '@/types/student/todaysPlan';

export interface MoodTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    moodIndicator: string;
    moodBackground: string;
    cardBackground: string;
    heading: string;
    personalityBadge: string;
  };
  icon: string;
  emoji: string;
  message: string;
  suggestion: string;
}

const moodThemes: Record<MoodType, MoodTheme> = {
  happy: {
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      background: '#ecfdf5',
      text: '#065f46',
      moodIndicator: '#10b981',
      moodBackground: '#d1fae5',
      cardBackground: '#f0fdfa',
      heading: '#047857',
      personalityBadge: '#a7f3d0',
    },
    icon: 'sun',
    emoji: '😊',
    message: "You're feeling great today!",
    suggestion: "Perfect time to tackle challenging topics."
  },
  motivated: {
    colors: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      background: '#eef2ff',
      text: '#3730a3',
      moodIndicator: '#6366f1',
      moodBackground: '#c7d2fe',
      cardBackground: '#f5f7ff',
      heading: '#4338ca',
      personalityBadge: '#a5b4fc',
    },
    icon: 'zap',
    emoji: '💪',
    message: "You're highly motivated today!",
    suggestion: "Great time to set ambitious study goals."
  },
  neutral: {
    colors: {
      primary: '#6b7280',
      secondary: '#4b5563',
      background: '#f9fafb',
      text: '#374151',
      moodIndicator: '#9ca3af',
      moodBackground: '#e5e7eb',
      cardBackground: '#f9fafb',
      heading: '#4b5563',
      personalityBadge: '#d1d5db',
    },
    icon: 'minus',
    emoji: '😐',
    message: "You're feeling okay today.",
    suggestion: "Focus on review and incremental progress."
  },
  sad: {
    colors: {
      primary: '#60a5fa',
      secondary: '#3b82f6',
      background: '#eff6ff',
      text: '#1e40af',
      moodIndicator: '#60a5fa',
      moodBackground: '#bfdbfe',
      cardBackground: '#f5f9ff',
      heading: '#2563eb',
      personalityBadge: '#93c5fd',
    },
    icon: 'cloud-rain',
    emoji: '😔',
    message: "You're feeling down today.",
    suggestion: "Try short study sessions with breaks."
  },
  focused: {
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      background: '#f5f3ff',
      text: '#5b21b6',
      moodIndicator: '#8b5cf6',
      moodBackground: '#ddd6fe',
      cardBackground: '#f8f7ff',
      heading: '#6d28d9',
      personalityBadge: '#c4b5fd',
    },
    icon: 'target',
    emoji: '🧠',
    message: "You're highly focused today!",
    suggestion: "Perfect for deep work on difficult concepts."
  },
  overwhelmed: {
    colors: {
      primary: '#f43f5e',
      secondary: '#e11d48',
      background: '#fff1f2',
      text: '#be123c',
      moodIndicator: '#f43f5e',
      moodBackground: '#fecdd3',
      cardBackground: '#fff5f6',
      heading: '#be123c',
      personalityBadge: '#fda4af',
    },
    icon: 'loader',
    emoji: '😵',
    message: "You're feeling overwhelmed.",
    suggestion: "Break tasks into smaller steps."
  },
  tired: {
    colors: {
      primary: '#94a3b8',
      secondary: '#64748b',
      background: '#f8fafc',
      text: '#334155',
      moodIndicator: '#94a3b8',
      moodBackground: '#cbd5e1',
      cardBackground: '#f9fafc',
      heading: '#475569',
      personalityBadge: '#cbd5e1',
    },
    icon: 'battery-low',
    emoji: '😴',
    message: "You're feeling tired today.",
    suggestion: "Consider light review sessions with breaks."
  },
  stressed: {
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      background: '#fff7ed',
      text: '#9a3412',
      moodIndicator: '#f97316',
      moodBackground: '#fed7aa',
      cardBackground: '#fffaf5',
      heading: '#c2410c',
      personalityBadge: '#fdba74',
    },
    icon: 'alert-triangle',
    emoji: '😰',
    message: "You're feeling stressed.",
    suggestion: "Try breathing exercises before studying."
  },
  anxious: {
    colors: {
      primary: '#fb923c',
      secondary: '#f97316',
      background: '#fff7ed',
      text: '#9a3412',
      moodIndicator: '#fb923c',
      moodBackground: '#fed7aa',
      cardBackground: '#fffaf5',
      heading: '#ea580c',
      personalityBadge: '#fdba74',
    },
    icon: 'alert-circle',
    emoji: '😟',
    message: "You're feeling anxious.",
    suggestion: "Start with easy wins to build confidence."
  },
  curious: {
    colors: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      background: '#ecfeff',
      text: '#155e75',
      moodIndicator: '#06b6d4',
      moodBackground: '#a5f3fc',
      cardBackground: '#f0fdff',
      heading: '#0e7490',
      personalityBadge: '#67e8f9',
    },
    icon: 'search',
    emoji: '🧐',
    message: "You're feeling curious today!",
    suggestion: "Great time to explore new topics."
  },
  okay: {
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      background: '#f5f3ff',
      text: '#5b21b6',
      moodIndicator: '#8b5cf6',
      moodBackground: '#ddd6fe',
      cardBackground: '#f8f7ff',
      heading: '#6d28d9',
      personalityBadge: '#c4b5fd',
    },
    icon: 'check-circle',
    emoji: '👌',
    message: "You're doing okay.",
    suggestion: "A balanced mix of review and new topics."
  }
};

export default moodThemes;
