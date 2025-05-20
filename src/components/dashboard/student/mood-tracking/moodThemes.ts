
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
}

export type MoodThemesType = {
  [key in MoodType]: MoodTheme;
};

const moodThemes: MoodThemesType = {
  [MoodType.HAPPY]: {
    backgroundColor: 'rgba(252, 231, 121, 0.2)',
    textColor: '#926D27',
    borderColor: 'rgba(252, 211, 77, 0.5)',
    darkBackgroundColor: 'rgba(252, 211, 77, 0.15)',
    darkTextColor: '#FCD34D',
    darkBorderColor: 'rgba(252, 211, 77, 0.3)',
    emoji: '😊',
    message: "That's great! You're in a positive mood which is perfect for productive studying.",
    studyTip: "Use this positive energy for challenging topics that require creativity or problem-solving."
  },
  [MoodType.MOTIVATED]: {
    backgroundColor: 'rgba(147, 197, 253, 0.2)',
    textColor: '#1E429F',
    borderColor: 'rgba(147, 197, 253, 0.5)',
    darkBackgroundColor: 'rgba(147, 197, 253, 0.15)',
    darkTextColor: '#93C5FD',
    darkBorderColor: 'rgba(147, 197, 253, 0.3)',
    emoji: '💪',
    message: "You're motivated and ready to tackle anything! This is the perfect state for studying.",
    studyTip: "Set ambitious goals today and work on high-priority tasks that need focus and determination."
  },
  [MoodType.OKAY]: {
    backgroundColor: 'rgba(209, 213, 219, 0.2)',
    textColor: '#4B5563',
    borderColor: 'rgba(209, 213, 219, 0.5)',
    darkBackgroundColor: 'rgba(209, 213, 219, 0.15)',
    darkTextColor: '#D1D5DB',
    darkBorderColor: 'rgba(209, 213, 219, 0.3)',
    emoji: '😐',
    message: "You're feeling neutral today. That's fine for steady progress.",
    studyTip: "Focus on routine tasks and review material you already understand well to build momentum."
  },
  [MoodType.STRESSED]: {
    backgroundColor: 'rgba(254, 202, 202, 0.2)',
    textColor: '#991B1B',
    borderColor: 'rgba(254, 202, 202, 0.5)',
    darkBackgroundColor: 'rgba(254, 202, 202, 0.15)',
    darkTextColor: '#FECACA',
    darkBorderColor: 'rgba(254, 202, 202, 0.3)',
    emoji: '😓',
    message: "You're feeling stressed. Let's take a different approach to your studies today.",
    studyTip: "Break tasks into smaller chunks and take frequent breaks. Consider starting with easier material."
  },
  [MoodType.TIRED]: {
    backgroundColor: 'rgba(167, 139, 250, 0.2)',
    textColor: '#6D28D9',
    borderColor: 'rgba(167, 139, 250, 0.5)',
    darkBackgroundColor: 'rgba(167, 139, 250, 0.15)',
    darkTextColor: '#A78BFA',
    darkBorderColor: 'rgba(167, 139, 250, 0.3)',
    emoji: '😴',
    message: "You're feeling tired today. Let's adjust your study approach accordingly.",
    studyTip: "Focus on passive learning like watching videos or listening to lectures. Take power naps between sessions."
  },
  [MoodType.FOCUSED]: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    textColor: '#155E75',
    borderColor: 'rgba(6, 182, 212, 0.5)',
    darkBackgroundColor: 'rgba(6, 182, 212, 0.15)',
    darkTextColor: '#06B6D4',
    darkBorderColor: 'rgba(6, 182, 212, 0.3)',
    emoji: '🧠',
    message: "You're in a state of focus. Perfect for deep work.",
    studyTip: "Tackle your most difficult or complex subjects now. Try the Pomodoro technique to maintain focus."
  },
  [MoodType.CONFUSED]: {
    backgroundColor: 'rgba(251, 146, 60, 0.2)',
    textColor: '#9A3412',
    borderColor: 'rgba(251, 146, 60, 0.5)',
    darkBackgroundColor: 'rgba(251, 146, 60, 0.15)',
    darkTextColor: '#FB923C',
    darkBorderColor: 'rgba(251, 146, 60, 0.3)',
    emoji: '🤔',
    message: "You're feeling confused. Let's bring some clarity to your studies.",
    studyTip: "Review fundamentals and basic concepts. Use visual aids and seek explanations from different sources."
  },
  [MoodType.BORED]: {
    backgroundColor: 'rgba(216, 180, 254, 0.2)',
    textColor: '#7E22CE',
    borderColor: 'rgba(216, 180, 254, 0.5)',
    darkBackgroundColor: 'rgba(216, 180, 254, 0.15)',
    darkTextColor: '#D8B4FE',
    darkBorderColor: 'rgba(216, 180, 254, 0.3)',
    emoji: '😒',
    message: "You're feeling bored. Let's make your study session more engaging.",
    studyTip: "Change your environment, try a new study method, or switch to a more interesting subject temporarily."
  },
  [MoodType.EXCITED]: {
    backgroundColor: 'rgba(134, 239, 172, 0.2)',
    textColor: '#166534',
    borderColor: 'rgba(134, 239, 172, 0.5)',
    darkBackgroundColor: 'rgba(134, 239, 172, 0.15)',
    darkTextColor: '#86EFAC',
    darkBorderColor: 'rgba(134, 239, 172, 0.3)',
    emoji: '🤩',
    message: "You're excited! Channel this energy into productive study sessions.",
    studyTip: "Use this enthusiasm to start new topics or explore advanced concepts that interest you."
  },
  [MoodType.CALM]: {
    backgroundColor: 'rgba(125, 211, 252, 0.2)',
    textColor: '#075985',
    borderColor: 'rgba(125, 211, 252, 0.5)',
    darkBackgroundColor: 'rgba(125, 211, 252, 0.15)',
    darkTextColor: '#7DD3FC',
    darkBorderColor: 'rgba(125, 211, 252, 0.3)',
    emoji: '😌',
    message: "You're feeling calm and collected. This is great for focused learning.",
    studyTip: "Take advantage of your clear mind for analytical tasks and detailed review of complex topics."
  },
  [MoodType.SAD]: {
    backgroundColor: 'rgba(147, 197, 253, 0.2)',
    textColor: '#1E40AF',
    borderColor: 'rgba(147, 197, 253, 0.5)',
    darkBackgroundColor: 'rgba(147, 197, 253, 0.15)',
    darkTextColor: '#93C5FD',
    darkBorderColor: 'rgba(147, 197, 253, 0.3)',
    emoji: '😢',
    message: "You're feeling sad today. Let's adapt your study approach to be gentle with yourself.",
    studyTip: "Choose lighter topics, take more breaks, and consider incorporating mood-boosting activities between sessions."
  }
};

export default moodThemes;
