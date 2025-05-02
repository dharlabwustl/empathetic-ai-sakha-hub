
import { MoodType } from '@/types/user/base';

export const getMoodDisplayName = (mood?: MoodType): string => {
  if (!mood) return 'Log Mood';
  
  switch (mood) {
    case MoodType.HAPPY:
      return 'Happy';
    case MoodType.MOTIVATED:
      return 'Motivated';
    case MoodType.FOCUSED:
      return 'Focused';
    case MoodType.TIRED:
      return 'Tired';
    case MoodType.STRESSED:
      return 'Stressed';
    case MoodType.CONFUSED:
      return 'Confused';
    case MoodType.ANXIOUS:
      return 'Anxious';
    case MoodType.NEUTRAL:
      return 'Neutral';
    case MoodType.OKAY:
      return 'Okay';
    case MoodType.OVERWHELMED:
      return 'Overwhelmed';
    case MoodType.CURIOUS:
      return 'Curious';
    case MoodType.SAD:
      return 'Sad';
    case MoodType.CALM:
      return 'Calm';
    case MoodType.RELAXED:
      return 'Relaxed';
    default:
      return 'Unknown';
  }
};

export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return 'bg-gray-100 text-gray-800';
  
  switch (mood) {
    case MoodType.HAPPY:
      return 'bg-yellow-100 text-yellow-800';
    case MoodType.MOTIVATED:
      return 'bg-green-100 text-green-800';
    case MoodType.FOCUSED:
      return 'bg-blue-100 text-blue-800';
    case MoodType.TIRED:
      return 'bg-orange-100 text-orange-800';
    case MoodType.STRESSED:
      return 'bg-red-100 text-red-800';
    case MoodType.CONFUSED:
      return 'bg-amber-100 text-amber-800';
    case MoodType.ANXIOUS:
      return 'bg-purple-100 text-purple-800';
    case MoodType.NEUTRAL:
      return 'bg-gray-100 text-gray-800';
    case MoodType.OKAY:
      return 'bg-indigo-100 text-indigo-800';
    case MoodType.OVERWHELMED:
      return 'bg-pink-100 text-pink-800';
    case MoodType.CURIOUS:
      return 'bg-teal-100 text-teal-800';
    case MoodType.SAD:
      return 'bg-blue-100 text-blue-800';
    case MoodType.CALM:
      return 'bg-teal-100 text-teal-800';
    case MoodType.RELAXED:
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
