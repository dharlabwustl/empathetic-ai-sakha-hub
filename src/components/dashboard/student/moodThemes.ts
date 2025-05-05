import { MoodType } from '@/types/user/base';
import { MoodThemes } from './mood-tracking/moodTypes';

const moodThemes: MoodThemes = {
  [MoodType.Happy]: {
    backgroundColor: '#ECFDF5',
    textColor: '#047857',
    borderColor: '#A7F3D0',
    darkBackgroundColor: '#064E3B',
    darkTextColor: '#6EE7B7',
    darkBorderColor: '#064E3B',
    emoji: '😊',
    message: "You're feeling happy and upbeat!",
    studyTip: "Great mood for learning! Try tackling challenging topics while your spirits are high."
  },
  [MoodType.Stressed]: {
    backgroundColor: '#FEF2F2',
    textColor: '#B91C1C',
    borderColor: '#FEE2E2',
    darkBackgroundColor: '#7F1D1D',
    darkTextColor: '#FCA5A5',
    darkBorderColor: '#7F1D1D',
    emoji: '😰',
    message: "You're feeling stressed and overwhelmed.",
    studyTip: "Take a break and do something relaxing. Try meditation or light exercise to clear your mind."
  },
  [MoodType.Motivated]: {
    backgroundColor: '#EFF6FF',
    textColor: '#1E3A8A',
    borderColor: '#DBEAFE',
    darkBackgroundColor: '#1E3A8A',
    darkTextColor: '#93C5FD',
    darkBorderColor: '#1E3A8A',
    emoji: '💪',
    message: "You're feeling motivated and ready to learn!",
    studyTip: "Use this energy to set ambitious goals and make significant progress in your studies."
  },
  [MoodType.Tired]: {
    backgroundColor: '#F8FAFC',
    textColor: '#4B5563',
    borderColor: '#E5E7EB',
    darkBackgroundColor: '#374151',
    darkTextColor: '#9CA3AF',
    darkBorderColor: '#374151',
    emoji: '😴',
    message: "You're feeling tired and lacking energy.",
    studyTip: "Get some rest and recharge. Avoid intense study sessions when you're fatigued."
  },
  [MoodType.Focused]: {
    backgroundColor: '#F0F9FF',
    textColor: '#075985',
    borderColor: '#BAE6FF',
    darkBackgroundColor: '#0C4A6E',
    darkTextColor: '#7DD3FC',
    darkBorderColor: '#0C4A6E',
    emoji: '🧠',
    message: "You're feeling focused and attentive.",
    studyTip: "Minimize distractions and concentrate on complex tasks that require deep thinking."
  },
  
  [MoodType.Confused]: {
    backgroundColor: '#FFF7ED',
    textColor: '#C2410C',
    borderColor: '#FFEDD5',
    darkBackgroundColor: '#7C2D12',
    darkTextColor: '#FB923C',
    darkBorderColor: '#7C2D12',
    emoji: '🤔',
    message: "You're feeling confused about something.",
    studyTip: "Take a step back and review fundamentals. Break complex topics into smaller chunks."
  },
  [MoodType.Calm]: {
    backgroundColor: '#F0FDFA',
    textColor: '#0F766E',
    borderColor: '#CCFBF1',
    darkBackgroundColor: '#134E4A',
    darkTextColor: '#5EEAD4',
    darkBorderColor: '#134E4A',
    emoji: '😌',
    message: "You're feeling calm and at peace.",
    studyTip: "This is a perfect time for deep learning and reflection. Focus on understanding concepts rather than memorizing."
  },
  [MoodType.Overwhelmed]: {
    backgroundColor: '#FEF2F2',
    textColor: '#B91C1C',
    borderColor: '#FEE2E2',
    darkBackgroundColor: '#7F1D1D',
    darkTextColor: '#FCA5A5',
    darkBorderColor: '#7F1D1D',
    emoji: '🥴',
    message: "You're feeling overwhelmed.",
    studyTip: "Break your tasks into smaller, manageable chunks. Take short breaks every 25-30 minutes."
  },
  [MoodType.Okay]: {
    backgroundColor: '#F9FAFB',
    textColor: '#4B5563',
    borderColor: '#E5E7EB',
    darkBackgroundColor: '#374151',
    darkTextColor: '#9CA3AF',
    darkBorderColor: '#374151',
    emoji: '🙂',
    message: "You're feeling okay.",
    studyTip: "Try starting with a subject you enjoy to build momentum for your study session."
  }
};

export default moodThemes;
