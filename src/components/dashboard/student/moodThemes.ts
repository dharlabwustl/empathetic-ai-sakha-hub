
export interface MoodTheme {
  background: string;
  text: string;
  accent: string;
  border: string;
  backgroundColor?: string;
  textColor?: string;
}

export const moodThemes: Record<string, MoodTheme> = {
  'happy': {
    background: 'bg-yellow-50',
    backgroundColor: 'bg-yellow-50',
    text: 'text-yellow-800',
    textColor: 'text-yellow-800',
    accent: 'text-yellow-600',
    border: 'border-yellow-200'
  },
  'focused': {
    background: 'bg-blue-50',
    backgroundColor: 'bg-blue-50',
    text: 'text-blue-800',
    textColor: 'text-blue-800',
    accent: 'text-blue-600',
    border: 'border-blue-200'
  },
  'tired': {
    background: 'bg-gray-50',
    backgroundColor: 'bg-gray-50',
    text: 'text-gray-800',
    textColor: 'text-gray-800',
    accent: 'text-gray-600',
    border: 'border-gray-200'
  },
  'stressed': {
    background: 'bg-red-50',
    backgroundColor: 'bg-red-50',
    text: 'text-red-800',
    textColor: 'text-red-800',
    accent: 'text-red-600',
    border: 'border-red-200'
  },
  'curious': {
    background: 'bg-purple-50',
    backgroundColor: 'bg-purple-50',
    text: 'text-purple-800',
    textColor: 'text-purple-800',
    accent: 'text-purple-600',
    border: 'border-purple-200'
  },
  'okay': {
    background: 'bg-green-50',
    backgroundColor: 'bg-green-50',
    text: 'text-green-800',
    textColor: 'text-green-800',
    accent: 'text-green-600',
    border: 'border-green-200'
  }
};

export const getMoodTheme = (mood: string): MoodTheme => {
  return moodThemes[mood] || moodThemes['okay'];
};
