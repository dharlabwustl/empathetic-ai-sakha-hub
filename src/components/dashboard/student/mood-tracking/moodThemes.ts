
import { MoodType } from "@/types/user/base";

export interface MoodTheme {
  background: string;
  textColor: string;
  borderColor: string;
  icon: string;
}

export const getMoodTheme = (mood: MoodType): MoodTheme => {
  const themes: Record<MoodType, MoodTheme> = {
    [MoodType.HAPPY]: {
      background: "bg-yellow-100 text-yellow-800",
      textColor: "#f59e0b",
      borderColor: "border-yellow-200",
      icon: "😊"
    },
    [MoodType.FOCUSED]: {
      background: "bg-blue-100 text-blue-800",
      textColor: "#3b82f6",
      borderColor: "border-blue-200",
      icon: "🎯"
    },
    [MoodType.TIRED]: {
      background: "bg-gray-100 text-gray-800",
      textColor: "#6b7280",
      borderColor: "border-gray-200",
      icon: "😴"
    },
    [MoodType.STRESSED]: {
      background: "bg-red-100 text-red-800",
      textColor: "#ef4444",
      borderColor: "border-red-200",
      icon: "😰"
    },
    [MoodType.CURIOUS]: {
      background: "bg-purple-100 text-purple-800",
      textColor: "#a855f7",
      borderColor: "border-purple-200",
      icon: "🤔"
    },
    [MoodType.OKAY]: {
      background: "bg-green-100 text-green-800",
      textColor: "#22c55e",
      borderColor: "border-green-200",
      icon: "😐"
    },
    [MoodType.OVERWHELMED]: {
      background: "bg-orange-100 text-orange-800",
      textColor: "#f97316",
      borderColor: "border-orange-200",
      icon: "😵"
    },
    [MoodType.ANXIOUS]: {
      background: "bg-red-100 text-red-800",
      textColor: "#dc2626",
      borderColor: "border-red-200",
      icon: "😟"
    },
    [MoodType.MOTIVATED]: {
      background: "bg-emerald-100 text-emerald-800",
      textColor: "#059669",
      borderColor: "border-emerald-200",
      icon: "💪"
    },
    [MoodType.CONFUSED]: {
      background: "bg-amber-100 text-amber-800",
      textColor: "#d97706",
      borderColor: "border-amber-200",
      icon: "😕"
    },
    [MoodType.NEUTRAL]: {
      background: "bg-slate-100 text-slate-800",
      textColor: "#64748b",
      borderColor: "border-slate-200",
      icon: "😑"
    },
    [MoodType.SAD]: {
      background: "bg-blue-100 text-blue-800",
      textColor: "#2563eb",
      borderColor: "border-blue-200",
      icon: "😢"
    },
    [MoodType.CALM]: {
      background: "bg-teal-100 text-teal-800",
      textColor: "#0d9488",
      borderColor: "border-teal-200",
      icon: "😌"
    }
  };

  return themes[mood] || themes[MoodType.NEUTRAL];
};
