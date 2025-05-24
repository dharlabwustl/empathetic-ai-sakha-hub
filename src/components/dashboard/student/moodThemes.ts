
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
    text: 'text-yellow-800',
    accent: 'text-yellow-600',
    border: 'border-yellow-200',
    backgroundColor: '#fefce8',
    textColor: '#92400e'
  },
  'focused': {
    background: 'bg-blue-50',
    text: 'text-blue-800',
    accent: 'text-blue-600',
    border: 'border-blue-200',
    backgroundColor: '#eff6ff',
    textColor: '#1e40af'
  },
  'tired': {
    background: 'bg-gray-50',
    text: 'text-gray-800',
    accent: 'text-gray-600',
    border: 'border-gray-200',
    backgroundColor: '#f9fafb',
    textColor: '#374151'
  },
  'stressed': {
    background: 'bg-red-50',
    text: 'text-red-800',
    accent: 'text-red-600',
    border: 'border-red-200',
    backgroundColor: '#fef2f2',
    textColor: '#dc2626'
  },
  'curious': {
    background: 'bg-purple-50',
    text: 'text-purple-800',
    accent: 'text-purple-600',
    border: 'border-purple-200',
    backgroundColor: '#faf5ff',
    textColor: '#7c3aed'
  },
  'okay': {
    background: 'bg-green-50',
    text: 'text-green-800',
    accent: 'text-green-600',
    border: 'border-green-200',
    backgroundColor: '#f0fdf4',
    textColor: '#16a34a'
  },
  'calm': {
    background: 'bg-teal-50',
    text: 'text-teal-800',
    accent: 'text-teal-600',
    border: 'border-teal-200',
    backgroundColor: '#f0fdfa',
    textColor: '#0f766e'
  }
};

export const getMoodTheme = (mood: string): MoodTheme => {
  return moodThemes[mood] || moodThemes['okay'];
};
