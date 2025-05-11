import { MoodType } from "@/types/user/base";

export interface MoodTheme {
  gradient: string;
  textColor: string;
  bgColor: string;
  lightBg: string;
  darkBg: string;
  icon: string;
}

export interface MoodThemes {
  [key: string]: MoodTheme;
}

export const moodThemes: MoodThemes = {
  [MoodType.HAPPY]: {
    gradient: "from-green-500 to-emerald-400",
    textColor: "text-green-500 dark:text-green-400",
    bgColor: "bg-green-500",
    lightBg: "bg-green-50",
    darkBg: "bg-green-900",
    icon: "smile"
  },
  [MoodType.FOCUSED]: {
    gradient: "from-blue-500 to-indigo-400",
    textColor: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-500",
    lightBg: "bg-blue-50",
    darkBg: "bg-blue-900",
    icon: "target"
  },
  [MoodType.TIRED]: {
    gradient: "from-orange-500 to-amber-400",
    textColor: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-500",
    lightBg: "bg-orange-50",
    darkBg: "bg-orange-900",
    icon: "battery"
  },
  [MoodType.NEUTRAL]: {
    gradient: "from-gray-500 to-gray-400",
    textColor: "text-gray-500 dark:text-gray-400",
    bgColor: "bg-gray-500",
    lightBg: "bg-gray-50",
    darkBg: "bg-gray-900",
    icon: "sun"
  },
  [MoodType.ANXIOUS]: {
    gradient: "from-indigo-500 to-purple-400",
    textColor: "text-indigo-500 dark:text-indigo-400",
    bgColor: "bg-indigo-500",
    lightBg: "bg-indigo-50",
    darkBg: "bg-indigo-900",
    icon: "wind"
  },
  [MoodType.STRESSED]: {
    gradient: "from-red-500 to-rose-400",
    textColor: "text-red-500 dark:text-red-400",
    bgColor: "bg-red-500",
    lightBg: "bg-red-50",
    darkBg: "bg-red-900",
    icon: "alert-triangle"
  },
  [MoodType.SAD]: {
    gradient: "from-gray-600 to-blue-gray-500",
    textColor: "text-gray-600 dark:text-gray-400",
    bgColor: "bg-gray-600",
    lightBg: "bg-gray-50",
    darkBg: "bg-gray-900",
    icon: "cloud-rain"
  },
  [MoodType.OKAY]: {
    gradient: "from-blue-400 to-cyan-400",
    textColor: "text-blue-400 dark:text-cyan-400",
    bgColor: "bg-blue-400",
    lightBg: "bg-blue-50",
    darkBg: "bg-blue-900",
    icon: "thumbs-up"
  },
  [MoodType.OVERWHELMED]: {
    gradient: "from-red-700 to-red-500",
    textColor: "text-red-700 dark:text-red-500",
    bgColor: "bg-red-700",
    lightBg: "bg-red-50",
    darkBg: "bg-red-900",
    icon: "frown"
  },
  [MoodType.CONFUSED]: {
    gradient: "from-purple-500 to-violet-400",
    textColor: "text-purple-500 dark:text-violet-400",
    bgColor: "bg-purple-500",
    lightBg: "bg-purple-50",
    darkBg: "bg-purple-900",
    icon: "help-circle"
  }
};

export const getMoodTheme = (mood: MoodType | string | null | undefined): MoodTheme => {
  if (!mood) return moodThemes[MoodType.NEUTRAL];
  
  // Convert string mood to enum if needed
  const moodKey = typeof mood === 'string' ? mood.toUpperCase() : mood;
  return moodThemes[moodKey as MoodType] || moodThemes[MoodType.NEUTRAL];
};

export default moodThemes;
