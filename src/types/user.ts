
// Define the allowed mood types
export type MoodType = "happy" | "tired" | "sad" | "neutral" | "motivated" | "curious" | "stressed";

// User Profile Type
export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  goals?: {
    id: string;
    title: string;
    progress: number;
    target: string;
    dueDate?: string;
  }[];
  stats?: {
    studyStreak: number;
    totalStudyHours: number;
    questionsAttempted: number;
    conceptsMastered: number;
  };
  preferences?: {
    theme: string;
    notificationsEnabled: boolean;
    studyReminders: boolean;
    language: string;
  };
  recentActivities?: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }[];
  badges?: {
    id: string;
    name: string;
    description: string;
    image: string;
    dateEarned: string;
  }[];
  loginCount?: number;
}
