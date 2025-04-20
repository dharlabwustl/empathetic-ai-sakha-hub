
import { UserProfileType } from "@/types/user";

export interface StudentProfile extends UserProfileType {
  // Additional student-specific properties
  grade?: string;
  schoolName?: string;
  testScores?: {
    subject: string;
    score: number;
    date: string;
  }[];
  attendance?: {
    total: number;
    present: number;
    percentage: number;
  };
}

export interface StudentGoal {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  status: "not-started" | "in-progress" | "completed";
  progress: number;
  steps?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export interface OnboardingData {
  examDate?: string;
  studyHoursPerDay?: number;
  strongSubjects?: string[];
  weakSubjects?: string[];
  studyTime?: "Morning" | "Afternoon" | "Evening" | "Night";
  studyPace?: "Aggressive" | "Balanced" | "Relaxed";
  goal?: string;
}

export interface StudentSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  displayPreferences: {
    darkMode: boolean;
    fontSize: "small" | "medium" | "large";
    colorScheme: string;
  };
  studySettings: {
    breakReminders: boolean;
    autoPlayVideo: boolean;
    showProgressBar: boolean;
  };
}
