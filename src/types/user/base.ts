
// Enums
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Parent = 'parent',
  Admin = 'admin',
  Support = 'support',
  Guest = 'guest'
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  PreferNotToSay = 'prefer_not_to_say'
}

export enum MoodType {
  Happy = 'happy',
  Tired = 'tired',
  Motivated = 'motivated',
  Focused = 'focused',
  Neutral = 'neutral',
  Stressed = 'stressed',
  Anxious = 'anxious',
  Confused = 'confused',
  Distracted = 'distracted',
  Confident = 'confident',
  Sad = 'sad'
}

export enum StudyPace {
  Fast = 'fast',
  Medium = 'medium',
  Slow = 'slow',
  Adaptive = 'adaptive'
}

export enum StudyPreferenceType {
  Visual = 'visual',
  Auditory = 'auditory',
  Reading = 'reading',
  Kinesthetic = 'kinesthetic',
  Mixed = 'mixed'
}

export enum SignupType {
  Email = 'email',
  Google = 'google',
  Facebook = 'facebook',
  Phone = 'phone',
  Guest = 'guest'
}

// User profile interfaces
export interface UserProfile {
  id?: string;
  uid?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  photoURL?: string;
  role?: UserRole;
  gender?: Gender;
  age?: number;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  isVerified?: boolean;
  isActive?: boolean;
  loginCount?: number;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  signupType?: SignupType;
  studyPreferences?: {
    type?: StudyPreferenceType;
    pace?: StudyPace;
    preferredSubjects?: string[];
    weakSubjects?: string[];
    dailyStudyTime?: number; // in minutes
  };
  goals?: {
    id?: string;
    title?: string;
    description?: string;
    targetDate?: string;
    progress?: number;
    isCompleted?: boolean;
    priority?: number;
    type?: string;
    subgoals?: any[];
  }[];
  academicInfo?: {
    school?: string;
    grade?: string;
    board?: string;
    subjects?: string[];
    stream?: string;
    averageMarks?: number;
  };
  mood?: MoodType;
  moodHistory?: {
    mood: MoodType;
    timestamp: string;
    notes?: string;
  }[];
  streakDays?: number;
  totalStudyHours?: number;
  lastActivity?: {
    type: string;
    description: string;
    timestamp: string;
  };
}

// Alias for backward compatibility
export type UserProfileBase = UserProfile;
export type UserProfileType = UserProfile;

export interface SubjectProgress {
  subject: string;
  progress: number; // 0 to 1
  color: string;
  totalQuestions?: number;
  completedQuestions?: number;
  topics?: {
    name: string;
    progress: number;
  }[];
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  streakHistory: {
    date: string;
    minutes: number;
  }[];
  weeklyAverage: number;
}

// Add more interfaces as needed for user management
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    showProfileToAll: boolean;
    shareLearningActivity: boolean;
    allowMessageRequests: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    reducedMotion: boolean;
  };
  studyReminders: {
    enabled: boolean;
    frequency: 'daily' | 'weekly';
    preferredTime: string; // HH:MM format
  };
  language: string;
}
