
// Base user types

export type UserRole = 'student' | 'employee' | 'doctor' | 'founder' | 'admin' | 'content_creator' | 'teacher' | 'parent';
export type SubscriptionType = 'Free' | 'Basic' | 'Premium' | 'Enterprise';
export type PersonalityType = 'Strategic Thinker' | 'Creative Explorer' | 'Detailed Analyzer' | 'Collaborative Leader' | 'Practical Implementer' | 'Analytical Problem Solver' | 'Creative Builder';
export type MoodType = 
  | 'happy'
  | 'okay'
  | 'tired'
  | 'overwhelmed'
  | 'focused'
  | 'sad'
  | 'neutral'
  | 'motivated'
  | 'curious'
  | 'stressed';

export type GoalType = 'exam' | 'course' | 'skill' | 'other';

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
  subscription: SubscriptionType;
  joinDate: string;
  createdAt: string;
  personalityType: PersonalityType;
  areasOfInterest: Array<{ id: string; name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' }>;
  lastActive: string;
}

// Define Goal interface to match what's used in both user.ts and user/base.ts
export interface Goal {
  id: string;
  title: string;
  progress: number;
  target: string;
  targetDate?: string;
  type?: string;
  description?: string;
  dueDate?: string;
}

// Enhanced UserStats to match the one in user.ts
export interface UserStats {
  totalStudyTime: number;
  questionsAnswered: number;
  testsCompleted: number;
  averageScore: number;
  lastActive?: string;
  weeklyStudyTime: number[];
  studyStreak: number;  // Changed from optional to required
  totalStudyHours: number; // Changed from optional to required
  quizzesCompleted?: number;
  // Adding the missing properties from user.ts
  questionsAttempted: number; // Changed from optional to required
  conceptsMastered: number; // Changed from optional to required
}

// Updated UserPreferences to match the one in user.ts
export interface UserPreferences {
  theme: string;
  notifications: boolean;
  studyReminders: boolean;
  contentFormat: 'text' | 'visual' | 'audio' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  studySessionDuration: number;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  // Add the missing properties from the user.ts file
  notificationsEnabled: boolean;
  language: string;
}

export interface MoodEntry {
  mood: MoodType;
  timestamp: string;
  note?: string;
}

// Combined user type (union of all user types)
export type UserProfileType = BaseUserProfile & {
  goals?: Goal[];
  subjects?: Array<{
    id: string;
    name: string;
    progress: number;
    lastStudied?: string;
  }>;
  schedule?: {
    preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
    studyHoursPerDay?: number;
    studyDays?: string[];
  };
  examDetails?: {
    examId?: string;
    examName?: string;
    examDate?: string;
  };
  preferences?: UserPreferences;
  stats?: UserStats;
  examPreparation?: string;
  moodHistory?: MoodEntry[];
  profileImage?: string;
  school?: string;
  grade?: string;
};
