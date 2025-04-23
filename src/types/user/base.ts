
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
  Parent = "parent",
  Mentor = "mentor"
}

export type MoodType = 'happy' | 'sad' | 'neutral' | 'motivated' | 'tired' | 'stressed' | 'focused' | 'curious' | 'overwhelmed' | 'okay';

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified?: boolean;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  education?: {
    school?: string;
    degree?: string;
    fieldOfStudy?: string;
    graduationYear?: number;
  };
  examPreparation?: {
    examDate: string;
    daysLeft: number;
    title: string;
  } | string;
  goals?: {
    title: string;
    progress: number;
    target: string;
  }[];
  subjects?: {
    name: string;
    progress: number;
    strength: 'strong' | 'weak' | 'moderate';
  }[];
  interests?: string[];
  bio?: string;
  subscription?: {
    planName: string;
    status: 'active' | 'inactive' | 'trial';
    endDate: string;
    isGroupLeader?: boolean;
  };
  createdAt?: string;
  lastLogin?: string;
  loginCount?: number;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
    studyPreferences?: {
      preferredTime?: 'morning' | 'afternoon' | 'evening' | 'night';
      sessionsPerDay?: number;
      sessionDuration?: number;
    };
  };
  // Stats tracking fields
  totalStudyHours?: number;
  accuracyRate?: number;
  streakDays?: number;
  completedLessons?: number;
  // Group subscription related fields
  isGroupLeader?: boolean;
  batchName?: string;
  batchCode?: string;
  batchMembers?: {
    id: string;
    name: string;
    email: string;
    progress: number;
  }[];
  // User mood tracking
  mood?: MoodType;
}

export interface AuthContextType {
  user: UserProfileType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}
