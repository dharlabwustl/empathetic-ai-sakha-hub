
import { MoodType } from '@/types/user/base';

const MOOD_THEMES: Record<MoodType, { background: string; textColor: string }> = {
  [MoodType.HAPPY]: { background: 'bg-yellow-100', textColor: 'text-yellow-800' },
  [MoodType.MOTIVATED]: { background: 'bg-green-100', textColor: 'text-green-800' },
  [MoodType.FOCUSED]: { background: 'bg-blue-100', textColor: 'text-blue-800' },
  [MoodType.CALM]: { background: 'bg-teal-100', textColor: 'text-teal-800' },
  [MoodType.TIRED]: { background: 'bg-gray-100', textColor: 'text-gray-800' },
  [MoodType.CONFUSED]: { background: 'bg-amber-100', textColor: 'text-amber-800' },
  [MoodType.ANXIOUS]: { background: 'bg-red-100', textColor: 'text-red-800' },
  [MoodType.STRESSED]: { background: 'bg-orange-100', textColor: 'text-orange-800' },
  [MoodType.OVERWHELMED]: { background: 'bg-red-200', textColor: 'text-red-900' },
  [MoodType.NEUTRAL]: { background: 'bg-slate-100', textColor: 'text-slate-800' },
  [MoodType.OKAY]: { background: 'bg-cyan-100', textColor: 'text-cyan-800' },
  [MoodType.SAD]: { background: 'bg-indigo-100', textColor: 'text-indigo-800' },
  [MoodType.CURIOUS]: { background: 'bg-emerald-100', textColor: 'text-emerald-800' },
  [MoodType.CONFIDENT]: { background: 'bg-purple-100', textColor: 'text-purple-800' },
  [MoodType.EXCITED]: { background: 'bg-pink-100', textColor: 'text-pink-800' }
};

export const getMoodTheme = (mood: MoodType) => {
  return MOOD_THEMES[mood] || MOOD_THEMES[MoodType.NEUTRAL];
};

export const storeMoodInLocalStorage = (mood: MoodType) => {
  localStorage.setItem('user_current_mood', mood);
};

export const getCurrentMoodFromLocalStorage = (): MoodType | null => {
  const mood = localStorage.getItem('user_current_mood');
  return mood ? mood as MoodType : null;
};

export const getMoodDisplayName = (mood: MoodType): string => {
  return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
};
