import { MoodType } from "@/types/user/base";

export const getMoodDisplayName = (mood?: MoodType): string => {
  switch (mood) {
    case 'happy': return 'Happy';
    case 'sad': return 'Sad';
    case 'neutral': return 'Neutral';
    case 'motivated': return 'Motivated';
    case 'tired': return 'Tired';
    case 'stressed': return 'Stressed';
    case 'focused': return 'Focused';
    case 'curious': return 'Curious';
    case 'overwhelmed': return 'Overwhelmed';
    case 'okay': return 'Okay';
    default: return 'How are you feeling?';
  }
};

export const getMoodColor = (mood?: MoodType): string => {
  switch (mood) {
    case 'happy': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'sad': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'neutral': return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'motivated': return 'bg-green-100 text-green-700 border-green-200';
    case 'tired': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'stressed': return 'bg-red-100 text-red-700 border-red-200';
    case 'focused': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'curious': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    case 'overwhelmed': return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'okay': return 'bg-sky-100 text-sky-700 border-sky-200';
    default: return 'bg-violet-100 text-violet-700 border-violet-200';
  }
};

export const getMoodIcon = (mood?: MoodType) => {
  // You can return different icons based on mood if needed
  return mood;
};
