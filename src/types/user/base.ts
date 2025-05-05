
// Base user types

// User Roles Enum
export enum UserRole {
  Admin = 'admin',
  Student = 'student',
  Teacher = 'teacher',
  Parent = 'parent',
  Guest = 'guest'
}

// User Subscription Types
export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise'
}

// Gender enum
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  PreferNotToSay = 'prefer-not-to-say'
}

// User mood enum - using PascalCase for consistency with other enums
export enum MoodType {
  Happy = 'happy',
  Motivated = 'motivated',
  Focused = 'focused',
  Neutral = 'neutral',
  Tired = 'tired',
  Anxious = 'anxious',
  Stressed = 'stressed',
  Sad = 'sad',
  Overwhelmed = 'overwhelmed',
  Curious = 'curious',
  Confused = 'confused',
  Calm = 'calm'
}

// Study pace enum
export enum StudyPace {
  Slow = 'slow',
  Moderate = 'moderate',
  Fast = 'fast'
}

// Study preference type
export enum StudyPreferenceType {
  Visual = 'visual',
  Auditory = 'auditory',
  Reading = 'reading',
  Kinesthetic = 'kinesthetic'
}

// SignupType enum
export enum SignupType {
  Email = 'email',
  Google = 'google',
  Apple = 'apple',
  Facebook = 'facebook'
}

// User Achievement type
export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  date: string | Date;
  badge?: string;
}

// Base user profile interface
export interface UserProfileBase {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string | Date;
  lastLogin?: string | Date;
  onboardingCompleted?: boolean;
  profileCompleted?: boolean;
  subscriptionType?: SubscriptionType; 
  loginCount?: number;
  subscription?: {
    planType: string;
    expiryDate?: string;
    startDate?: string;
    autoRenew?: boolean;
    status?: 'active' | 'expired' | 'canceled' | 'trial';
  };
  currentMood?: MoodType;
  goals?: Array<{
    id: string;
    title: string;
    description?: string;
    targetDate?: string | Date;
    progress?: number;
  }>;
}

// Full user profile type
export interface UserProfileType extends UserProfileBase {
  phone?: string;
  birthDate?: string | Date;
  gender?: Gender;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  school?: {
    name?: string;
    type?: 'public' | 'private' | 'charter' | 'homeschool' | 'other';
    grade?: number | string;
    graduationYear?: number;
  };
  parentInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    relation?: 'mother' | 'father' | 'guardian' | 'other';
  };
  preferences?: {
    studyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
    studyDuration?: number;
    studyPace?: StudyPace;
    studyPreference?: StudyPreferenceType;
    notifications?: boolean;
    emailUpdates?: boolean;
  };
  achievements?: UserAchievement[];
  signupType?: SignupType;
  tutorAssigned?: {
    id: string;
    name: string;
    avatarUrl?: string;
    subject?: string;
    rating?: number;
  };
  badges?: Array<{
    id: string;
    title: string;
    imageUrl: string;
    dateEarned: string | Date;
  }>;
  stats?: {
    testsCompleted: number;
    questionsAnswered: number;
    hoursStudied: number;
    streakDays: number;
    masteryScore: number;
  };
}

// Export the types to be used in other files
export type { UserProfileBase, UserProfileType, UserAchievement };
