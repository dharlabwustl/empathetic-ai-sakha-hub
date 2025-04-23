
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
  Parent = "parent",
  Mentor = "mentor",
  // Additional roles needed by the codebase
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder"
}

export type MoodType = 'happy' | 'sad' | 'neutral' | 'motivated' | 'tired' | 'stressed' | 'focused' | 'curious' | 'overwhelmed' | 'okay';

// Add the missing types referenced in errors
export type PersonalityType = 'analytical' | 'creative' | 'practical' | 'social' | 'independent' | 'competitive';
export type GoalStatus = 'in-progress' | 'completed' | 'planned' | 'overdue';
export type SubscriptionType = 'free' | 'basic' | 'premium' | 'enterprise' | 'group';

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
    examDate?: string; // Added for the errors in OverviewTab
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
    plan?: string; // Added for errors in DashboardHeader and others
    expiresAt?: string; // Added for errors in DashboardHeader and others
    id?: string; // Added for ProfileBillingSection
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
  currentMood?: MoodType;
  // Personal details field needed by ProfileDetailsSection
  personalDetails?: {
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    occupation?: string;
    location?: string;
  };
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
