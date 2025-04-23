
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

// Updated the PersonalityType to match what StepHandler is using
export interface PersonalityType {
  type: string;
  traits: string[];
  learningStyle: string;
}

export type GoalStatus = 'in-progress' | 'completed' | 'planned' | 'overdue';

// Convert this from type to enum for use as a value
export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise',
  Group = 'group',
  Pro = 'pro',
  Elite = 'elite'
}

export interface KpiData {
  id: string;
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  changeValue?: number;
  changePercentage?: number;
  description?: string;
  icon?: string;
  color?: string;
  target?: number;
  period?: string;
}

export interface UserSubscription {
  plan: string;
  status: 'active' | 'inactive' | 'trial';
  endDate: string;
  isGroupLeader?: boolean;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified?: boolean;
  phone?: string;
  phoneNumber?: string;
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
    id?: string; // Added id property here
    title: string;
    progress: number;
    target: string;
    examDate?: string;
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
    plan?: string;
    expiresAt?: string;
    id?: string;
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
    phoneNumber?: string;
    city?: string;
    state?: string;
    school?: string;
    grade?: string;
    board?: string;
  };
  // Added personalInfo to match what's used in the components
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    occupation?: string;
    location?: string;
    phoneNumber?: string;
    city?: string;
    state?: string;
    school?: string;
    grade?: string;
    board?: string;
    address?: string;
  };
  location?: string;
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
