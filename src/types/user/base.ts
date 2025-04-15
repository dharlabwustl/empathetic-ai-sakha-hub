
// Base user types

export type UserRole = 'student' | 'employee' | 'doctor' | 'founder' | 'admin' | 'content_creator' | 'teacher' | 'parent';
export type SubscriptionType = 'Free' | 'Basic' | 'Premium' | 'Enterprise';
export type PersonalityType = 'Strategic Thinker' | 'Creative Explorer' | 'Detailed Analyzer' | 'Collaborative Leader' | 'Practical Implementer' | 'Analytical Problem Solver' | 'Creative Builder';
export type MoodType = 
  | 'Happy' | 'happy'
  | 'Okay' | 'okay'
  | 'Tired' | 'tired'
  | 'Overwhelmed'
  | 'Focused'
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

// Enhanced UserStats to match the one in user.ts
export interface UserStats {
  totalStudyTime: number;
  questionsAnswered: number;
  testsCompleted: number;
  averageScore: number;
  lastActive?: string;
  weeklyStudyTime: number[];
  studyStreak?: number;
  totalStudyHours?: number;
  quizzesCompleted?: number;
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
}

// Combined user type (union of all user types)
export type UserProfileType = BaseUserProfile & {
  goals?: Array<{
    id: string;
    title: string;
    targetDate?: string;
    progress: number;
    type: GoalType;
    description?: string;
    dueDate?: string;
  }>;
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

export interface MoodEntry {
  mood: MoodType;
  timestamp: string;
  note?: string;
}
