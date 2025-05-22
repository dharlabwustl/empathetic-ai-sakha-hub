
import { MoodType } from "@/types/user/base";

interface MoodTheme {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  darkBackgroundColor: string;
  darkTextColor: string;
  darkBorderColor: string;
  emoji: string;
  message: string;
  studyTip: string;
}

type MoodThemes = {
  [key in MoodType]: MoodTheme
};

export const moodThemes: MoodThemes = {
  [MoodType.HAPPY]: {
    backgroundColor: "#E3F2FD",
    textColor: "#1565C0",
    borderColor: "#90CAF9",
    darkBackgroundColor: "rgba(33, 150, 243, 0.2)",
    darkTextColor: "#90CAF9",
    darkBorderColor: "#1976D2",
    emoji: "😊",
    message: "You're in a good mood!",
    studyTip: "This is a great time to tackle challenging subjects or start new material."
  },
  [MoodType.MOTIVATED]: {
    backgroundColor: "#E1F5FE",
    textColor: "#0277BD",
    borderColor: "#81D4FA",
    darkBackgroundColor: "rgba(3, 169, 244, 0.2)",
    darkTextColor: "#4FC3F7",
    darkBorderColor: "#0288D1",
    emoji: "💪",
    message: "You're feeling motivated today!",
    studyTip: "Channel this energy into your most important topics and aim for deep work sessions."
  },
  [MoodType.FOCUSED]: {
    backgroundColor: "#E8EAF6",
    textColor: "#283593",
    borderColor: "#9FA8DA",
    darkBackgroundColor: "rgba(63, 81, 181, 0.2)",
    darkTextColor: "#7986CB",
    darkBorderColor: "#3949AB",
    emoji: "🧠",
    message: "You're in a focused state of mind!",
    studyTip: "Perfect time for complex problem-solving and detailed conceptual work."
  },
  [MoodType.NEUTRAL]: {
    backgroundColor: "#F3F4F6",
    textColor: "#4B5563",
    borderColor: "#D1D5DB",
    darkBackgroundColor: "rgba(107, 114, 128, 0.2)",
    darkTextColor: "#9CA3AF",
    darkBorderColor: "#6B7280",
    emoji: "😐",
    message: "You're feeling neutral today.",
    studyTip: "Good for balanced study sessions across multiple subjects."
  },
  [MoodType.TIRED]: {
    backgroundColor: "#E8EAF6",
    textColor: "#303F9F",
    borderColor: "#9FA8DA",
    darkBackgroundColor: "rgba(63, 81, 181, 0.2)",
    darkTextColor: "#7986CB",
    darkBorderColor: "#3949AB",
    emoji: "😴",
    message: "You're feeling tired today.",
    studyTip: "Try shorter study sessions with more frequent breaks. Focus on review rather than new material."
  },
  [MoodType.ANXIOUS]: {
    backgroundColor: "#E3F2FD",
    textColor: "#1565C0",
    borderColor: "#90CAF9",
    darkBackgroundColor: "rgba(33, 150, 243, 0.2)",
    darkTextColor: "#90CAF9",
    darkBorderColor: "#1976D2",
    emoji: "😰",
    message: "You're feeling anxious today.",
    studyTip: "Start with something easy to build confidence. Take breaks for deep breathing exercises."
  },
  [MoodType.STRESSED]: {
    backgroundColor: "#E1F5FE",
    textColor: "#0277BD",
    borderColor: "#81D4FA",
    darkBackgroundColor: "rgba(3, 169, 244, 0.2)",
    darkTextColor: "#4FC3F7",
    darkBorderColor: "#0288D1",
    emoji: "😓",
    message: "You're feeling stressed today.",
    studyTip: "Choose review activities over new concepts. Break tasks into smaller chunks."
  },
  [MoodType.SAD]: {
    backgroundColor: "#E8EAF6",
    textColor: "#303F9F",
    borderColor: "#9FA8DA",
    darkBackgroundColor: "rgba(63, 81, 181, 0.2)",
    darkTextColor: "#7986CB",
    darkBorderColor: "#3949AB",
    emoji: "😢",
    message: "You're feeling down today.",
    studyTip: "Focus on subjects you enjoy. Set small, achievable goals to boost your mood."
  },
  [MoodType.CURIOUS]: {
    backgroundColor: "#E1F5FE",
    textColor: "#0277BD",
    borderColor: "#81D4FA",
    darkBackgroundColor: "rgba(3, 169, 244, 0.2)",
    darkTextColor: "#4FC3F7",
    darkBorderColor: "#0288D1",
    emoji: "🤔",
    message: "You're feeling curious today!",
    studyTip: "Great time to explore new topics or dive deeper into concepts that interest you."
  },
  [MoodType.OKAY]: {
    backgroundColor: "#E3F2FD",
    textColor: "#1565C0",
    borderColor: "#90CAF9",
    darkBackgroundColor: "rgba(33, 150, 243, 0.2)",
    darkTextColor: "#90CAF9",
    darkBorderColor: "#1976D2",
    emoji: "👍",
    message: "You're feeling okay today.",
    studyTip: "Good for steady progress. Mix review with new material for best results."
  },
  [MoodType.OVERWHELMED]: {
    backgroundColor: "#E3F2FD",
    textColor: "#1565C0",
    borderColor: "#90CAF9",
    darkBackgroundColor: "rgba(33, 150, 243, 0.2)",
    darkTextColor: "#90CAF9",
    darkBorderColor: "#1976D2",
    emoji: "😵",
    message: "You're feeling overwhelmed today.",
    studyTip: "Break work into the smallest possible tasks. Focus on one thing at a time."
  }
};

export const getMoodTheme = (mood: MoodType | undefined): MoodTheme => {
  if (!mood || !(mood in moodThemes)) {
    return moodThemes[MoodType.NEUTRAL]; // Default to neutral
  }
  return moodThemes[mood];
};
