
// Base user types

export type UserRole = "Student" | "Professor" | "Employee" | "Doctor" | "Founder";
export type SubscriptionType = "Free" | "Basic" | "Premium" | "Enterprise";
export type PersonalityType = "Strategic Thinker" | "Creative Explorer" | "Detailed Analyzer" | "Collaborative Leader" | "Practical Implementer" | "Analytical Problem Solver" | "Creative Builder";
export type MoodType = "Happy" | "Okay" | "Tired" | "Overwhelmed" | "Focused";

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
  // Added missing properties
  subscription: SubscriptionType;
  joinDate: string;
  personalityType: PersonalityType;
  areasOfInterest: Array<{ id: string; name: string; level: "Beginner" | "Intermediate" | "Advanced" }>;
  lastActive: string;
}

// Combined user type (union of all user types)
export type UserProfileType = BaseUserProfile & {
  goals?: Array<{
    id: string;
    title: string;
    targetDate?: Date;
    progress: number;
    type?: string;
    description?: string; // Added this to fix description-related errors
    dueDate?: string;
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
  // Added for compatibility with StudentProfile
  examPreparation?: string;
};
