
import { MoodType } from "@/types/user/base";

export interface MoodTheme {
  icon: string;
  label: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  gradientStart: string;
  gradientEnd: string;
  backgroundColor: string;
  textColor: string;
  emoji: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

type MoodThemesType = {
  [key in MoodType]: MoodTheme;
};

export const moodThemes: MoodThemesType = {
  [MoodType.Happy]: {
    icon: "sun",
    label: "Happy",
    description: "You're feeling positive and enthusiastic!",
    primaryColor: "#FFD700",
    secondaryColor: "#FFA500",
    gradientStart: "#FFD700",
    gradientEnd: "#FFA500",
    backgroundColor: "#FFFAE6",
    textColor: "#664D00",
    emoji: "😊",
    colors: {
      primary: "#FFD700",
      secondary: "#FFA500",
      background: "#FFFAE6",
      text: "#664D00"
    }
  },
  [MoodType.Focused]: {
    icon: "target",
    label: "Focused",
    description: "You're in the zone and ready to concentrate!",
    primaryColor: "#4CAF50",
    secondaryColor: "#2E7D32",
    gradientStart: "#4CAF50",
    gradientEnd: "#2E7D32",
    backgroundColor: "#E8F5E9",
    textColor: "#1B5E20",
    emoji: "🎯",
    colors: {
      primary: "#4CAF50",
      secondary: "#2E7D32",
      background: "#E8F5E9",
      text: "#1B5E20"
    }
  },
  [MoodType.Overwhelmed]: {
    icon: "frown",
    label: "Overwhelmed",
    description: "You're feeling a bit overwhelmed today.",
    primaryColor: "#9C27B0",
    secondaryColor: "#6A1B9A",
    gradientStart: "#9C27B0",
    gradientEnd: "#6A1B9A",
    backgroundColor: "#F3E5F5",
    textColor: "#4A148C",
    emoji: "😵",
    colors: {
      primary: "#9C27B0",
      secondary: "#6A1B9A",
      background: "#F3E5F5",
      text: "#4A148C"
    }
  },
  [MoodType.Tired]: {
    icon: "moon",
    label: "Tired",
    description: "You're feeling low on energy today.",
    primaryColor: "#607D8B",
    secondaryColor: "#455A64",
    gradientStart: "#607D8B",
    gradientEnd: "#455A64",
    backgroundColor: "#ECEFF1",
    textColor: "#263238",
    emoji: "😴",
    colors: {
      primary: "#607D8B",
      secondary: "#455A64",
      background: "#ECEFF1",
      text: "#263238"
    }
  },
  [MoodType.Curious]: {
    icon: "search",
    label: "Curious",
    description: "You're feeling inquisitive and ready to explore!",
    primaryColor: "#2196F3",
    secondaryColor: "#1565C0",
    gradientStart: "#2196F3",
    gradientEnd: "#1565C0",
    backgroundColor: "#E3F2FD",
    textColor: "#0D47A1",
    emoji: "🧐",
    colors: {
      primary: "#2196F3",
      secondary: "#1565C0",
      background: "#E3F2FD",
      text: "#0D47A1"
    }
  },
  [MoodType.Okay]: {
    icon: "meh",
    label: "Okay",
    description: "You're feeling neutral today.",
    primaryColor: "#9E9E9E",
    secondaryColor: "#616161",
    gradientStart: "#9E9E9E",
    gradientEnd: "#616161",
    backgroundColor: "#F5F5F5",
    textColor: "#212121",
    emoji: "😐",
    colors: {
      primary: "#9E9E9E",
      secondary: "#616161",
      background: "#F5F5F5",
      text: "#212121"
    }
  },
  [MoodType.Stressed]: {
    icon: "alert-circle",
    label: "Stressed",
    description: "You're feeling pressured and tense.",
    primaryColor: "#F44336",
    secondaryColor: "#C62828",
    gradientStart: "#F44336",
    gradientEnd: "#C62828",
    backgroundColor: "#FFEBEE",
    textColor: "#B71C1C",
    emoji: "😖",
    colors: {
      primary: "#F44336",
      secondary: "#C62828",
      background: "#FFEBEE",
      text: "#B71C1C"
    }
  },
  [MoodType.Anxious]: {
    icon: "alert-triangle",
    label: "Anxious",
    description: "You're feeling worried or uneasy.",
    primaryColor: "#FF9800",
    secondaryColor: "#EF6C00",
    gradientStart: "#FF9800",
    gradientEnd: "#EF6C00",
    backgroundColor: "#FFF3E0",
    textColor: "#E65100",
    emoji: "😰",
    colors: {
      primary: "#FF9800",
      secondary: "#EF6C00",
      background: "#FFF3E0",
      text: "#E65100"
    }
  },
  [MoodType.Motivated]: {
    icon: "trending-up",
    label: "Motivated",
    description: "You're feeling driven and determined!",
    primaryColor: "#673AB7",
    secondaryColor: "#4527A0",
    gradientStart: "#673AB7",
    gradientEnd: "#4527A0",
    backgroundColor: "#EDE7F6",
    textColor: "#311B92",
    emoji: "💪",
    colors: {
      primary: "#673AB7",
      secondary: "#4527A0",
      background: "#EDE7F6",
      text: "#311B92"
    }
  },
  [MoodType.Confused]: {
    icon: "help-circle",
    label: "Confused",
    description: "You're feeling uncertain or puzzled.",
    primaryColor: "#009688",
    secondaryColor: "#00695C",
    gradientStart: "#009688",
    gradientEnd: "#00695C",
    backgroundColor: "#E0F2F1",
    textColor: "#004D40",
    emoji: "🤔",
    colors: {
      primary: "#009688",
      secondary: "#00695C",
      background: "#E0F2F1",
      text: "#004D40"
    }
  }
};
