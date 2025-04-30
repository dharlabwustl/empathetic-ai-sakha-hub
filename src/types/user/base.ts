
export enum UserRole {
  Student = 'student',
  Parent = 'parent',
  Teacher = 'teacher',
  Admin = 'admin'
}

export enum MoodType {
  Happy = 'happy',
  Motivated = 'motivated',
  Focused = 'focused',
  Neutral = 'neutral',
  Tired = 'tired',
  Anxious = 'anxious',
  Stressed = 'stressed',
  Sad = 'sad'
}

export enum PersonalityType {
  Analytical = 'analytical',
  Creative = 'creative',
  Practical = 'practical',
  Visual = 'visual',
  Auditory = 'auditory',
  Kinesthetic = 'kinesthetic'
}

export interface MoodTheme {
  label: string;
  icon: React.ReactNode;
  colors: {
    bg: string;
    border: string;
    text: string;
  };
}

export interface UserProfileBase {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  loginCount?: number;
  createdAt?: string;
  lastLogin?: string;
  subscription?: string | {
    planType: string;
    expiryDate?: string;
    features?: string[];
  };
  goals?: {
    id?: string;
    title: string;
    progress?: number;
    target?: string;
    targetDate?: string;
  }[];
  currentMood?: MoodType;
  personalityType?: PersonalityType;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  token?: string;
}

export type UserProfileType = UserProfileBase;

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Pro = 'pro',
}
