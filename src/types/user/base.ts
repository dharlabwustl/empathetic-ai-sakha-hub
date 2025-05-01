
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

export enum MoodType {
  Happy = 'happy',
  Focused = 'focused',
  Tired = 'tired',
  Stressed = 'stressed',
  Motivated = 'motivated',
  Confused = 'confused',
  Anxious = 'anxious',
  Overwhelmed = 'overwhelmed',
  Neutral = 'neutral',
  Okay = 'okay',
  Sad = 'sad',
  Calm = 'calm',
  Curious = 'curious'
}

export enum SignupType {
  Email = 'email',
  Google = 'google',
  Facebook = 'facebook',
  Mobile = 'mobile'
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  PreferNotToSay = 'prefer_not_to_say'
}

export enum StudyPace {
  Light = 'light',
  Moderate = 'moderate',
  Intense = 'intense'
}

export enum StudyPreferenceType {
  Solo = 'solo',
  Group = 'group',
  AIAssisted = 'ai_assisted'
}

export enum SubscriptionType {
  Free = 'free',
  Premium = 'premium',
  Pro = 'pro',
  Trial = 'trial',
  GroupSmall = 'group_small',
  GroupMedium = 'group_medium',
  GroupLarge = 'group_large',
  GroupAnnual = 'group_annual',
  ProMonthly = 'pro_monthly',
  ProAnnual = 'pro_annual',
  Enterprise = 'enterprise'
}

export interface Goal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  targetYear?: string;
}

export interface UserRecentActivity {
  lastLogin: Date;
  lastStudySession?: Date;
  completedTasks: number;
}

export interface StudyPreferences {
  pace: StudyPace;
  hoursPerDay?: number;
  preferredTimeStart?: string;
  preferredTimeEnd?: string;
  preferenceType: StudyPreferenceType;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'paypal';
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
  upiId?: string;
  paypalEmail?: string;
  cardType?: string;
}

export interface BillingHistory {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
  planName: string;
}

export interface BatchMember {
  id: string;
  name: string;
  email: string;
  joinStatus: 'joined' | 'pending' | 'declined';
  joinDate?: string;
}

export interface Batch {
  id: string;
  name: string;
  examGoal: string;
  targetYear: string;
  createdAt: string;
  leaderId: string;
  memberLimit: number;
  members: BatchMember[];
  settings: {
    allowProgressVisibility: boolean;
    allowLeadershipTransfer: boolean;
  };
}

export interface SubscriptionPlan {
  type: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  planType: string;
  features?: string[];
  memberLimit?: number;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  signupType?: SignupType;
  examPreparation?: string;
  avatar?: string;
  bio?: string;
  phoneNumber?: string;
  personalityType?: string;
  location?: string;
  gender?: Gender;
  grade?: string;
  goals?: Goal[];
  subjects?: string[];
  studyPreferences?: StudyPreferences;
  preferences?: {
    studyReminders?: boolean;
    emailNotifications?: boolean;
    darkMode?: boolean;
  };
  recentActivity: UserRecentActivity;
  loginCount?: number;
  subscription?: SubscriptionPlan;
  studyStreak?: number;
  mood?: MoodType;
  batch?: Batch;
  isBatchLeader?: boolean;
  paymentMethods?: PaymentMethod[];
  billingHistory?: BillingHistory[];
}

// Alias for UserProfileType to maintain compatibility
export type UserProfileBase = UserProfileType;
