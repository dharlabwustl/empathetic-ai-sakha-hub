
export interface MoodTheme {
  background: string;
  backgroundColor?: string;
  text: string;
  textColor?: string;
  accent: string;
  border: string;
}

export const moodThemes: Record<string, MoodTheme> = {
  'happy': {
    background: 'bg-yellow-50',
    backgroundColor: '#fefce8',
    text: 'text-yellow-800',
    textColor: '#854d0e',
    accent: 'text-yellow-600',
    border: 'border-yellow-200'
  },
  'focused': {
    background: 'bg-blue-50',
    backgroundColor: '#eff6ff',
    text: 'text-blue-800',
    textColor: '#1e40af',
    accent: 'text-blue-600',
    border: 'border-blue-200'
  },
  'tired': {
    background: 'bg-gray-50',
    backgroundColor: '#f9fafb',
    text: 'text-gray-800',
    textColor: '#1f2937',
    accent: 'text-gray-600',
    border: 'border-gray-200'
  },
  'stressed': {
    background: 'bg-red-50',
    backgroundColor: '#fef2f2',
    text: 'text-red-800',
    textColor: '#991b1b',
    accent: 'text-red-600',
    border: 'border-red-200'
  },
  'curious': {
    background: 'bg-purple-50',
    backgroundColor: '#faf5ff',
    text: 'text-purple-800',
    textColor: '#6b21a8',
    accent: 'text-purple-600',
    border: 'border-purple-200'
  },
  'okay': {
    background: 'bg-green-50',
    backgroundColor: '#f0fdf4',
    text: 'text-green-800',
    textColor: '#166534',
    accent: 'text-green-600',
    border: 'border-green-200'
  }
};

export const getMoodTheme = (mood: string): MoodTheme => {
  return moodThemes[mood] || moodThemes['okay'];
};
