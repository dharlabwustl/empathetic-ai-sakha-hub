
import { MoodType } from "@/types/user/base";

export interface MoodTheme {
  background: string;
  text: string;
  border: string;
  icon: string;
}

export const getMoodTheme = (mood: MoodType): MoodTheme => {
  switch (mood) {
    case 'happy':
      return {
        background: 'bg-green-50',
        text: 'text-green-800',
        border: 'border-green-200',
        icon: '😊'
      };
    case 'focused':
      return {
        background: 'bg-blue-50',
        text: 'text-blue-800',
        border: 'border-blue-200',
        icon: '🧠'
      };
    case 'motivated':
      return {
        background: 'bg-purple-50',
        text: 'text-purple-800',
        border: 'border-purple-200',
        icon: '💪'
      };
    case 'tired':
      return {
        background: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        icon: '😴'
      };
    case 'stressed':
      return {
        background: 'bg-red-50',
        text: 'text-red-800',
        border: 'border-red-200',
        icon: '😰'
      };
    case 'anxious':
      return {
        background: 'bg-orange-50',
        text: 'text-orange-800',
        border: 'border-orange-200',
        icon: '😟'
      };
    case 'overwhelmed':
      return {
        background: 'bg-red-50',
        text: 'text-red-800',
        border: 'border-red-200',
        icon: '🥵'
      };
    case 'sad':
      return {
        background: 'bg-blue-50',
        text: 'text-blue-800',
        border: 'border-blue-200',
        icon: '😢'
      };
    case 'curious':
      return {
        background: 'bg-teal-50',
        text: 'text-teal-800',
        border: 'border-teal-200',
        icon: '🧐'
      };
    case 'okay':
      return {
        background: 'bg-gray-50',
        text: 'text-gray-800',
        border: 'border-gray-200',
        icon: '😐'
      };
    case 'neutral':
    default:
      return {
        background: 'bg-gray-50',
        text: 'text-gray-800',
        border: 'border-gray-200',
        icon: '😐'
      };
  }
};

export default getMoodTheme;
