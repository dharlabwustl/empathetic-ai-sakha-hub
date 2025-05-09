
import { MoodThemes } from '@/types/user/base';

export const moodThemes: MoodThemes = {
  Happy: {
    backgroundColor: '#e0f2fe',
    textColor: '#0369a1',
    borderColor: '#bae6fd',
    darkBackgroundColor: '#075985',
    darkTextColor: '#e0f2fe',
    darkBorderColor: '#0ea5e9',
    emoji: '😄',
    message: 'You seem happy today! That\'s a great state of mind for learning.',
    studyTip: 'Channel your positive energy into tackling challenging topics that require creativity.',
    colors: {
      primary: '#0ea5e9',
      secondary: '#38bdf8'
    }
  },
  Motivated: {
    backgroundColor: '#fee2e2',
    textColor: '#b91c1c',
    borderColor: '#fecaca',
    darkBackgroundColor: '#7f1d1d',
    darkTextColor: '#fee2e2',
    darkBorderColor: '#ef4444',
    emoji: '🔥',
    message: 'You\'re motivated! Perfect time to make significant progress.',
    studyTip: 'Set ambitious goals today and push your boundaries - you have the energy for it!',
    colors: {
      primary: '#ef4444',
      secondary: '#f87171'
    }
  },
  Focused: {
    backgroundColor: '#e0e7ff',
    textColor: '#4338ca',
    borderColor: '#c7d2fe',
    darkBackgroundColor: '#3730a3',
    darkTextColor: '#e0e7ff',
    darkBorderColor: '#6366f1',
    emoji: '🎯',
    message: 'You\'re in a focused state of mind. Great for deep work!',
    studyTip: 'This is the perfect time for complex problem-solving and deep concept analysis.',
    colors: {
      primary: '#6366f1',
      secondary: '#818cf8'
    }
  },
  Neutral: {
    backgroundColor: '#f3f4f6',
    textColor: '#4b5563',
    borderColor: '#e5e7eb',
    darkBackgroundColor: '#374151',
    darkTextColor: '#f3f4f6',
    darkBorderColor: '#9ca3af',
    emoji: '😐',
    message: 'You\'re feeling neutral today. That\'s fine for steady progress.',
    studyTip: 'Focus on routine study tasks and review sessions to maintain productivity.',
    colors: {
      primary: '#6b7280',
      secondary: '#9ca3af'
    }
  },
  Tired: {
    backgroundColor: '#fef3c7',
    textColor: '#92400e',
    borderColor: '#fde68a',
    darkBackgroundColor: '#78350f',
    darkTextColor: '#fef3c7',
    darkBorderColor: '#f59e0b',
    emoji: '😴',
    message: 'You seem tired. Let\'s plan your study accordingly.',
    studyTip: 'Consider shorter study sessions with more breaks, focusing on review rather than new material.',
    colors: {
      primary: '#f59e0b',
      secondary: '#fbbf24'
    }
  },
  Stressed: {
    backgroundColor: '#fce7f3',
    textColor: '#be185d',
    borderColor: '#fbcfe8',
    darkBackgroundColor: '#9d174d',
    darkTextColor: '#fce7f3',
    darkBorderColor: '#ec4899',
    emoji: '😰',
    message: 'You\'re feeling stressed. Let\'s adjust to make studying more manageable.',
    studyTip: 'Break down your tasks into smaller chunks and celebrate small wins to reduce anxiety.',
    colors: {
      primary: '#ec4899',
      secondary: '#f472b6'
    }
  },
  Confused: {
    backgroundColor: '#fef9c3',
    textColor: '#854d0e',
    borderColor: '#fef08a',
    darkBackgroundColor: '#713f12',
    darkTextColor: '#fef9c3',
    darkBorderColor: '#eab308',
    emoji: '🤔',
    message: 'Feeling confused? Let\'s clear things up.',
    studyTip: 'Revisit fundamental concepts and seek clarification before moving forward to more complex topics.',
    colors: {
      primary: '#eab308',
      secondary: '#facc15'
    }
  },
  Calm: {
    backgroundColor: '#dcfce7',
    textColor: '#166534',
    borderColor: '#bbf7d0',
    darkBackgroundColor: '#14532d',
    darkTextColor: '#dcfce7',
    darkBorderColor: '#22c55e',
    emoji: '😌',
    message: 'You\'re feeling calm. Great for focused and mindful learning.',
    studyTip: 'Use this balanced state to work on comprehension tasks that require patience and clarity.',
    colors: {
      primary: '#22c55e',
      secondary: '#4ade80'
    }
  },
  Overwhelmed: {
    backgroundColor: '#f5f5f5',
    textColor: '#525252',
    borderColor: '#e5e5e5',
    darkBackgroundColor: '#404040',
    darkTextColor: '#f5f5f5',
    darkBorderColor: '#737373',
    emoji: '😵',
    message: 'You\'re feeling overwhelmed. Let\'s make things manageable.',
    studyTip: 'Focus on just one small task at a time. Take breaks and practice deep breathing.',
    colors: {
      primary: '#525252',
      secondary: '#737373'
    }
  }
};

export default moodThemes;
