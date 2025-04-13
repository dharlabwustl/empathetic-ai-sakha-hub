
// Base user types

export type UserRole = "Student" | "Professor" | "Employee" | "Doctor" | "Founder";

export interface BaseUserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  loginCount?: number;
  completedOnboarding?: boolean;
}

// Combined user type (union of all user types)
export type UserProfileType = BaseUserProfile & {
  goals?: Array<{
    id: string;
    title: string;
    targetDate?: Date;
    progress: number;
    type?: string;
  }>;
  subjects?: Array<{
    id: string;
    name: string;
    progress: number;
    lastStudied?: Date;
  }>;
  schedule?: {
    preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
    studyHoursPerDay?: number;
    studyDays?: string[];
  };
  examDetails?: {
    examId?: string;
    examName?: string;
    examDate?: Date;
  };
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    emailNotifications?: boolean;
    pushNotifications?: boolean;
  };
  stats?: {
    averageScore?: number;
    studyStreak?: number;
    totalStudyHours?: number;
    quizzesCompleted?: number;
  };
};
