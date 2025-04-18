
import { MoodType } from "@/types/user/base";

export type MoodTheme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    moodIndicator?: string;
    moodBackground?: string;
    cardBackground?: string;
    heading?: string;
    personalityBadge?: string;
  };
  avatarUrlMale: string; // Male avatar URL
  avatarUrlFemale: string; // Female avatar URL
  avatarUrl: string; // For backwards compatibility
  message: string;
  suggestion: string;
};

export const moodThemes: Record<MoodType, MoodTheme> = {
  happy: {
    colors: {
      primary: "from-yellow-200 to-green-100",
      secondary: "from-yellow-100 to-mint-50",
      background: "bg-gradient-to-br from-yellow-50/50 to-green-50/50",
      text: "text-yellow-700",
      moodIndicator: "bg-yellow-500",
      moodBackground: "bg-yellow-50",
      cardBackground: "bg-gradient-to-br from-yellow-50 to-green-50",
      heading: "text-yellow-800",
      personalityBadge: "bg-yellow-50 text-yellow-700 border-yellow-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/happy-avatar.png",
    message: "Your positive energy is contagious! Let's make the most of it! 🌟",
    suggestion: "Perfect time to tackle challenging topics or help peers!"
  },
  sad: {
    colors: {
      primary: "from-blue-100 to-gray-100",
      secondary: "from-blue-50 to-gray-50",
      background: "bg-gradient-to-br from-blue-50/30 to-gray-50/30",
      text: "text-blue-700",
      moodIndicator: "bg-blue-500",
      moodBackground: "bg-blue-50",
      cardBackground: "bg-gradient-to-br from-blue-50 to-slate-50",
      heading: "text-blue-800",
      personalityBadge: "bg-blue-50 text-blue-700 border-blue-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/sad-avatar.png",
    message: "It's okay to have down moments. Take it easy today 💙",
    suggestion: "How about some light reading or review sessions?"
  },
  tired: {
    colors: {
      primary: "from-amber-100 to-cream-100",
      secondary: "from-amber-50 to-cream-50",
      background: "bg-gradient-to-br from-amber-50/30 to-orange-50/30",
      text: "text-amber-700",
      moodIndicator: "bg-amber-500",
      moodBackground: "bg-amber-50",
      cardBackground: "bg-gradient-to-br from-amber-50 to-orange-50",
      heading: "text-amber-800",
      personalityBadge: "bg-amber-50 text-amber-700 border-amber-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/tired-avatar.png",
    message: "Rest is part of the learning journey 🌙",
    suggestion: "Consider a short power nap or light review session"
  },
  neutral: {
    colors: {
      primary: "from-gray-100 to-blue-50",
      secondary: "from-gray-50 to-blue-50",
      background: "bg-gradient-to-br from-gray-50/30 to-blue-50/30",
      text: "text-gray-700",
      moodIndicator: "bg-gray-500",
      moodBackground: "bg-gray-50",
      cardBackground: "bg-gradient-to-br from-gray-50 to-blue-50",
      heading: "text-gray-800",
      personalityBadge: "bg-gray-50 text-gray-700 border-gray-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/neutral-avatar.png",
    message: "Steady and focused - that's the way! 🎯",
    suggestion: "A balanced mix of study and breaks might work well today"
  },
  focused: {
    colors: {
      primary: "from-violet-200 to-indigo-100",
      secondary: "from-violet-100 to-indigo-50",
      background: "bg-gradient-to-br from-violet-50/50 to-indigo-50/50",
      text: "text-violet-700",
      moodIndicator: "bg-violet-500",
      moodBackground: "bg-violet-50",
      cardBackground: "bg-gradient-to-br from-violet-50 to-indigo-50",
      heading: "text-violet-800",
      personalityBadge: "bg-violet-50 text-violet-700 border-violet-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/focused-avatar.png",
    message: "Your concentration is at its peak! Great time to learn deeply 🔍",
    suggestion: "Take on challenging concepts that require deep focus"
  },
  motivated: {
    colors: {
      primary: "from-emerald-200 to-teal-100",
      secondary: "from-emerald-100 to-teal-50",
      background: "bg-gradient-to-br from-emerald-50/50 to-teal-50/50",
      text: "text-emerald-700",
      moodIndicator: "bg-emerald-500",
      moodBackground: "bg-emerald-50",
      cardBackground: "bg-gradient-to-br from-emerald-50 to-teal-50",
      heading: "text-emerald-800",
      personalityBadge: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/motivated-avatar.png",
    message: "Your motivation is soaring! What will you accomplish today? 🚀",
    suggestion: "Set ambitious goals and track your progress!"
  },
  curious: {
    colors: {
      primary: "from-cyan-200 to-blue-100",
      secondary: "from-cyan-100 to-blue-50",
      background: "bg-gradient-to-br from-cyan-50/50 to-blue-50/50",
      text: "text-cyan-700",
      moodIndicator: "bg-cyan-500",
      moodBackground: "bg-cyan-50",
      cardBackground: "bg-gradient-to-br from-cyan-50 to-blue-50",
      heading: "text-cyan-800",
      personalityBadge: "bg-cyan-50 text-cyan-700 border-cyan-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/curious-avatar.png",
    message: "Your curiosity is a superpower! Explore new concepts today! 🔭",
    suggestion: "Try connecting different subjects or explore supplementary materials"
  },
  stressed: {
    colors: {
      primary: "from-rose-200 to-red-100",
      secondary: "from-rose-100 to-red-50",
      background: "bg-gradient-to-br from-rose-50/50 to-red-50/50",
      text: "text-rose-700",
      moodIndicator: "bg-rose-500",
      moodBackground: "bg-rose-50",
      cardBackground: "bg-gradient-to-br from-rose-50 to-red-50",
      heading: "text-rose-800",
      personalityBadge: "bg-rose-50 text-rose-700 border-rose-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/stressed-avatar.png",
    message: "Take a deep breath. Stress is temporary, your progress is permanent 🧘",
    suggestion: "Try a few minutes of meditation or a short walk outside"
  },
  okay: {
    colors: {
      primary: "from-sky-100 to-indigo-50",
      secondary: "from-sky-50 to-indigo-25",
      background: "bg-gradient-to-br from-sky-50/30 to-indigo-50/30",
      text: "text-sky-700",
      moodIndicator: "bg-sky-500",
      moodBackground: "bg-sky-50",
      cardBackground: "bg-gradient-to-br from-sky-50 to-indigo-50",
      heading: "text-sky-800",
      personalityBadge: "bg-sky-50 text-sky-700 border-sky-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/okay-avatar.png",
    message: "You're doing fine! Steady progress is still progress 👍",
    suggestion: "Continue with your regular study routine"
  },
  overwhelmed: {
    colors: {
      primary: "from-purple-200 to-fuchsia-100",
      secondary: "from-purple-100 to-fuchsia-50",
      background: "bg-gradient-to-br from-purple-50/30 to-fuchsia-50/30",
      text: "text-purple-700",
      moodIndicator: "bg-purple-500",
      moodBackground: "bg-purple-50",
      cardBackground: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
      heading: "text-purple-800",
      personalityBadge: "bg-purple-50 text-purple-700 border-purple-200"
    },
    avatarUrlMale: "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png",
    avatarUrlFemale: "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png",
    avatarUrl: "/avatars/overwhelmed-avatar.png",
    message: "One step at a time. Break things down into manageable tasks 📝",
    suggestion: "Focus on just one small task right now"
  }
};

export const getMoodTheme = (mood: MoodType): MoodTheme => {
  return moodThemes[mood] || moodThemes.neutral;
};
