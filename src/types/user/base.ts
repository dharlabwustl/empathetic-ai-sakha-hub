
export enum UserRole {
  Admin = 'admin',
  Student = 'student',
  Teacher = 'teacher',
  Parent = 'parent'
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  PreferNotToSay = 'prefer_not_to_say'
}

export enum SignupType {
  Email = 'email',
  Google = 'google',
  Facebook = 'facebook',
  Apple = 'apple'
}

export enum StudyPace {
  Slow = 'slow',
  Moderate = 'moderate',
  Fast = 'fast'
}

export enum StudyPreferenceType {
  Solo = 'solo',
  Group = 'group',
  Both = 'both'
}

export enum MoodType {
  Happy = 'happy',
  Sad = 'sad',
  Focused = 'focused',
  Distracted = 'distracted',
  Overwhelmed = 'overwhelmed',
  Stressed = 'stressed',
  Tired = 'tired',
  Curious = 'curious',
  Motivated = 'motivated',
  Neutral = 'neutral',
  Okay = 'okay'
}

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Pro = 'pro',
  Enterprise = 'enterprise',
  ProMonthly = 'pro_monthly',
  ProYearly = 'pro_yearly',
  ProPremium = 'pro_premium'
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'bank' | 'wallet';
  isDefault: boolean;
  lastFour?: string;
  cardType?: string;
  expiryDate?: string;
  upiId?: string;
  bank?: string;
  walletProvider?: string;
}

export interface BillingHistory {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
  planName: string;
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  signupType?: SignupType;
  examPreparation?: string;
  avatar?: string;
  bio?: string;
  phoneNumber?: string;
  personalityType?: string;
  location?: string;
  gender?: Gender;
  grade?: string;
  goals?: {
    id: string;
    title: string;
    targetDate: string;
    progress: number;
    targetYear?: string;
  }[];
  subjects?: string[];
  studyPreferences?: {
    pace: StudyPace;
    hoursPerDay: number;
    preferredTimeStart: string;
    preferredTimeEnd: string;
    preferenceType: StudyPreferenceType;
  };
  preferences?: {
    studyReminders: boolean;
    emailNotifications: boolean;
    darkMode: boolean;
  };
  recentActivity?: {
    lastLogin: Date;
    lastStudySession?: Date;
    completedTasks?: number;
  };
  subscription?: SubscriptionType | {
    type?: string;
    startDate?: string;
    endDate?: string;
    expiryDate?: string;
    isActive?: boolean;
    planType?: string;
    features?: string[];
    memberLimit?: number;
  };
  studyStreak?: number;
  mood?: MoodType;
  paymentMethods?: PaymentMethod[];
  billingHistory?: BillingHistory[];
  loginCount?: number;
}

export interface UserProfileType extends UserProfileBase {
  // Additional student-specific properties if needed
}

export interface SubjectProgress {
  subject: string;
  progress: number;
  color: string;
}

export interface StudyStreak {
  current: number;
  longest: number;
  thisWeek: number[];
  lastWeek: number[];
}
