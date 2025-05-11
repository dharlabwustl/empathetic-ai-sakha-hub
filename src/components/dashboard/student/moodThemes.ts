
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
    darkPrimary: string;
    darkSecondary: string;
    darkAccent: string;
  };
}

export interface MoodThemes {
  [key in MoodType]: MoodTheme;
  confused: MoodTheme;
  calm: MoodTheme;
}

const moodThemes: MoodThemes = {
  [MoodType.Happy]: {
    backgroundColor: '#f0fdf4',
    textColor: '#166534',
    borderColor: '#bbf7d0',
    darkBackgroundColor: '#052e16',
    darkTextColor: '#4ade80',
    darkBorderColor: '#166534',
    emoji: '😊',
    message: "You're feeling happy today! This positive energy can enhance your learning.",
    studyTip: "Happiness boosts creativity. Try tackling challenging problems or creative assignments today.",
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#a7f3d0',
      darkPrimary: '#059669',
      darkSecondary: '#10b981',
      darkAccent: '#6ee7b7'
    }
  },
  [MoodType.Stressed]: {
    backgroundColor: '#fff1f2',
    textColor: '#9f1239',
    borderColor: '#fecdd3',
    darkBackgroundColor: '#4c0519',
    darkTextColor: '#fb7185',
    darkBorderColor: '#9f1239',
    emoji: '😰',
    message: "You're feeling stressed. Let's find ways to make studying more manageable.",
    studyTip: "Break tasks into smaller chunks and focus on one at a time. Take regular short breaks.",
    colors: {
      primary: '#f43f5e',
      secondary: '#fb7185',
      accent: '#fecdd3',
      darkPrimary: '#e11d48',
      darkSecondary: '#f43f5e',
      darkAccent: '#fda4af'
    }
  },
  [MoodType.Motivated]: {
    backgroundColor: '#ecfeff',
    textColor: '#155e75',
    borderColor: '#a5f3fc',
    darkBackgroundColor: '#083344',
    darkTextColor: '#22d3ee',
    darkBorderColor: '#155e75',
    emoji: '🚀',
    message: "You're motivated today! Perfect time to make significant progress.",
    studyTip: "Channel your motivation into your most challenging subjects or tasks now.",
    colors: {
      primary: '#06b6d4',
      secondary: '#22d3ee',
      accent: '#a5f3fc',
      darkPrimary: '#0891b2',
      darkSecondary: '#06b6d4',
      darkAccent: '#67e8f9'
    }
  },
  [MoodType.Tired]: {
    backgroundColor: '#fef3c7',
    textColor: '#92400e',
    borderColor: '#fde68a',
    darkBackgroundColor: '#451a03',
    darkTextColor: '#fbbf24',
    darkBorderColor: '#92400e',
    emoji: '😴',
    message: "You're feeling tired. Let's adapt your study approach accordingly.",
    studyTip: "Focus on review rather than new material. Use active methods like practice questions to stay engaged.",
    colors: {
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#fde68a',
      darkPrimary: '#b45309',
      darkSecondary: '#d97706',
      darkAccent: '#fbbf24'
    }
  },
  [MoodType.Focused]: {
    backgroundColor: '#eff6ff',
    textColor: '#1e40af',
    borderColor: '#bfdbfe',
    darkBackgroundColor: '#172554',
    darkTextColor: '#3b82f6',
    darkBorderColor: '#1e40af',
    emoji: '🧠',
    message: "You're feeling focused. This is ideal for deep learning sessions.",
    studyTip: "Take advantage of your focus by tackling your most complex or detail-oriented subjects.",
    colors: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#bfdbfe',
      darkPrimary: '#2563eb',
      darkSecondary: '#3b82f6',
      darkAccent: '#93c5fd'
    }
  },
  [MoodType.Confident]: {
    backgroundColor: '#faf5ff',
    textColor: '#6b21a8',
    borderColor: '#e9d5ff',
    darkBackgroundColor: '#3b0764',
    darkTextColor: '#a855f7',
    darkBorderColor: '#6b21a8',
    emoji: '💪',
    message: "You're feeling confident. Great time to challenge yourself!",
    studyTip: "Test your knowledge with practice exams or challenging problems.",
    colors: {
      primary: '#8b5cf6',
      secondary: '#a855f7',
      accent: '#e9d5ff',
      darkPrimary: '#7c3aed',
      darkSecondary: '#8b5cf6',
      darkAccent: '#d8b4fe'
    }
  },
  [MoodType.Confused]: {
    backgroundColor: '#fdf4ff',
    textColor: '#86198f',
    borderColor: '#f5d0fe',
    darkBackgroundColor: '#4a044e',
    darkTextColor: '#d946ef',
    darkBorderColor: '#86198f',
    emoji: '🤔',
    message: "You're feeling confused. Let's clarify concepts step by step.",
    studyTip: "Revisit foundational concepts and seek additional explanations for challenging topics.",
    colors: {
      primary: '#d946ef',
      secondary: '#e879f9',
      accent: '#f5d0fe',
      darkPrimary: '#c026d3',
      darkSecondary: '#d946ef',
      darkAccent: '#f0abfc'
    }
  },
  [MoodType.Bored]: {
    backgroundColor: '#f1f5f9',
    textColor: '#475569',
    borderColor: '#cbd5e1',
    darkBackgroundColor: '#1e293b',
    darkTextColor: '#94a3b8',
    darkBorderColor: '#475569',
    emoji: '😑',
    message: "You're feeling bored. Let's find ways to make studying more engaging.",
    studyTip: "Try a change of environment, study method, or subject to reignite your interest.",
    colors: {
      primary: '#64748b',
      secondary: '#94a3b8',
      accent: '#e2e8f0',
      darkPrimary: '#475569',
      darkSecondary: '#64748b',
      darkAccent: '#cbd5e1'
    }
  },
  [MoodType.Anxious]: {
    backgroundColor: '#fefce8',
    textColor: '#854d0e',
    borderColor: '#fef08a',
    darkBackgroundColor: '#422006',
    darkTextColor: '#facc15',
    darkBorderColor: '#854d0e',
    emoji: '😟',
    message: "You're feeling anxious. Let's manage those feelings to help you study effectively.",
    studyTip: "Start with small, achievable tasks to build momentum and confidence.",
    colors: {
      primary: '#eab308',
      secondary: '#facc15',
      accent: '#fef08a',
      darkPrimary: '#ca8a04',
      darkSecondary: '#eab308',
      darkAccent: '#fde047'
    }
  },
  [MoodType.Calm]: {
    backgroundColor: '#f0f9ff',
    textColor: '#0c4a6e',
    borderColor: '#bae6fd',
    darkBackgroundColor: '#082f49',
    darkTextColor: '#38bdf8',
    darkBorderColor: '#0c4a6e',
    emoji: '😌',
    message: "You're feeling calm. This balanced state is perfect for thoughtful study.",
    studyTip: "Use this calm state for comprehensive review or connecting concepts across subjects.",
    colors: {
      primary: '#0ea5e9',
      secondary: '#38bdf8',
      accent: '#bae6fd',
      darkPrimary: '#0284c7',
      darkSecondary: '#0ea5e9',
      darkAccent: '#7dd3fc'
    }
  },
  [MoodType.Overwhelmed]: {
    backgroundColor: '#ffedd5',
    textColor: '#9a3412',
    borderColor: '#fed7aa',
    darkBackgroundColor: '#431407',
    darkTextColor: '#fb923c',
    darkBorderColor: '#9a3412',
    emoji: '😵',
    message: "You're feeling overwhelmed. Let's break things down to make them manageable.",
    studyTip: "Create a prioritized list and focus on just one task at a time.",
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#fed7aa',
      darkPrimary: '#ea580c',
      darkSecondary: '#f97316',
      darkAccent: '#fdba74'
    }
  }
};

export default moodThemes;
