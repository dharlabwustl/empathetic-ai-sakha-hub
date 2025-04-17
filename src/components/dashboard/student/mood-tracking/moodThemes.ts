
import { MoodType } from "@/types/user/base";

export type MoodTheme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  avatarUrl: string; // Mood-specific avatar URL
  message: string;
  suggestion: string;
};

export const moodThemes: Record<MoodType, MoodTheme> = {
  happy: {
    colors: {
      primary: "from-yellow-200 to-green-100",
      secondary: "from-yellow-100 to-mint-50",
      background: "bg-gradient-to-br from-yellow-50/50 to-green-50/50",
      text: "text-yellow-700"
    },
    avatarUrl: "/avatars/happy-avatar.png",
    message: "Your positive energy is contagious! Let's make the most of it! 🌟",
    suggestion: "Perfect time to tackle challenging topics or help peers!"
  },
  sad: {
    colors: {
      primary: "from-blue-100 to-gray-100",
      secondary: "from-blue-50 to-gray-50",
      background: "bg-gradient-to-br from-blue-50/30 to-gray-50/30",
      text: "text-blue-700"
    },
    avatarUrl: "/avatars/sad-avatar.png",
    message: "It's okay to have down moments. Take it easy today 💙",
    suggestion: "How about some light reading or review sessions?"
  },
  stressed: {
    colors: {
      primary: "from-lavender-200 to-beige-100",
      secondary: "from-lavender-100 to-beige-50",
      background: "bg-gradient-to-br from-purple-50/30 to-amber-50/30",
      text: "text-purple-700"
    },
    avatarUrl: "/avatars/anxious-avatar.png",
    message: "Let's take things one step at a time 🌱",
    suggestion: "Try our 5-minute mindfulness exercise before studying"
  },
  tired: {
    colors: {
      primary: "from-amber-100 to-cream-100",
      secondary: "from-amber-50 to-cream-50",
      background: "bg-gradient-to-br from-amber-50/30 to-orange-50/30",
      text: "text-amber-700"
    },
    avatarUrl: "/avatars/tired-avatar.png",
    message: "Rest is part of the learning journey 🌙",
    suggestion: "Consider a short power nap or light review session"
  },
  // Remove 'excited' as it's not in the MoodType definition
  neutral: {
    colors: {
      primary: "from-gray-100 to-blue-50",
      secondary: "from-gray-50 to-blue-50",
      background: "bg-gradient-to-br from-gray-50/30 to-blue-50/30",
      text: "text-gray-700"
    },
    avatarUrl: "/avatars/neutral-avatar.png",
    message: "Steady and focused - that's the way! 🎯",
    suggestion: "A balanced mix of study and breaks might work well today"
  },
  motivated: {
    colors: {
      primary: "from-green-100 to-blue-50",
      secondary: "from-green-50 to-blue-50",
      background: "bg-gradient-to-br from-green-50/30 to-blue-50/30",
      text: "text-green-700"
    },
    avatarUrl: "/avatars/motivated-avatar.png",
    message: "You're in the zone today! Keep up the momentum! 🚀",
    suggestion: "Great time to push through difficult topics or review complex concepts"
  },
  curious: {
    colors: {
      primary: "from-teal-100 to-blue-50",
      secondary: "from-teal-50 to-blue-50",
      background: "bg-gradient-to-br from-teal-50/30 to-blue-50/30",
      text: "text-teal-700"
    },
    avatarUrl: "/avatars/curious-avatar.png",
    message: "Your curiosity can unlock new possibilities! 💡",
    suggestion: "Explore a new topic that connects to what you're already studying"
  },
  focused: {
    colors: {
      primary: "from-indigo-100 to-blue-50",
      secondary: "from-indigo-50 to-blue-50",
      background: "bg-gradient-to-br from-indigo-50/30 to-blue-50/30",
      text: "text-indigo-700"
    },
    avatarUrl: "/avatars/focused-avatar.png",
    message: "Your concentration is impressive! Maintain the flow ⏱️",
    suggestion: "Use the Pomodoro technique to maximize your focus sessions"
  },
  okay: {
    colors: {
      primary: "from-blue-100 to-gray-50",
      secondary: "from-blue-50 to-gray-50",
      background: "bg-gradient-to-br from-blue-50/30 to-gray-50/30",
      text: "text-blue-600"
    },
    avatarUrl: "/avatars/okay-avatar.png",
    message: "You're doing fine! Small steps lead to big progress.",
    suggestion: "Balance your study with some relaxing activities today"
  },
  overwhelmed: {
    colors: {
      primary: "from-purple-100 to-pink-50",
      secondary: "from-purple-50 to-pink-50",
      background: "bg-gradient-to-br from-purple-50/30 to-pink-50/30",
      text: "text-purple-700"
    },
    avatarUrl: "/avatars/overwhelmed-avatar.png",
    message: "Let's break things down and make them manageable 📝",
    suggestion: "Start with just one small task and celebrate that win"
  }
};

export const getMoodTheme = (mood: MoodType): MoodTheme => {
  return moodThemes[mood] || moodThemes.neutral;
};
