export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
  lastLogin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum SignupType {
  Email = 'email',
  Google = 'google',
  Facebook = 'facebook',
}

export enum StudyPace {
  Slow = 'slow',
  Moderate = 'moderate',
  Fast = 'fast',
}

export enum StudyPreferenceType {
  Solo = 'solo',
  Group = 'group',
  Both = 'both',
}

export enum MoodType {
  Happy = 'Happy',
  Sad = 'Sad',
  Anxious = 'Anxious',
  Excited = 'Excited',
  Tired = 'Tired',
  Stressed = 'Stressed',
  Motivated = 'Motivated',
  Focused = 'Focused',
  Confused = 'Confused',
  Overwhelmed = 'Overwhelmed',
  Neutral = 'Neutral',
  Okay = 'Okay',
  Curious = 'Curious'
}

export const SubscriptionType = {
  FREE: 'free',
  BASIC: 'basic',
  PRO: 'pro',
  PREMIUM: 'premium',
  PRO_MONTHLY: 'pro_monthly',
  PRO_YEARLY: 'pro_yearly',
  GROUP: 'group'
} as const;

export type SubscriptionTypeValue = typeof SubscriptionType[keyof typeof SubscriptionType];

export interface UserProfileBase {
  id: string;
  name?: string;
  email: string;
  role?: UserRole;
  signupType?: SignupType;
  avatar?: string;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  gender?: Gender;
  grade?: string;
  examPreparation?: string;
  photoURL?: string;
  loginCount?: number;
  paymentMethods?: PaymentMethod[];
  billingHistory?: BillingHistory[];
  subscription?: Subscription;
  studyStreak?: number;
  goals?: Goal[];
}

export interface Goal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  targetYear: string;
}

export interface StudyPreferences {
  pace: StudyPace;
  hoursPerDay: number;
  preferredTimeStart: string;
  preferredTimeEnd: string;
  preferenceType: StudyPreferenceType;
}

export interface Preferences {
  studyReminders: boolean;
  emailNotifications: boolean;
  darkMode: boolean;
}

export interface RecentActivity {
  lastLogin: Date;
  lastStudySession?: Date;
  completedTasks: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi';
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
  cardType?: string;
  upiId?: string;
}

export interface BillingHistory {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'failed' | 'pending';
  invoiceUrl: string;
  planName: string;
}

export interface Subscription {
  type: SubscriptionTypeValue;
  startDate: string;
  endDate: string;
  isActive: boolean;
  planType: string;
  features: string[];
  memberLimit: number;
  expiryDate?: string | Date;
  status?: 'active' | 'expired' | 'cancelled';
  autoRenew?: boolean;
}

export interface UserProfileType extends UserProfileBase {
  personalityType?: string;
  goals?: Goal[];
  subjects?: string[];
  studyPreferences?: StudyPreferences;
  preferences?: Preferences;
  recentActivity?: RecentActivity;
  subscription?: Subscription;
  studyStreak?: number;
  mood?: MoodType;
  paymentMethods?: PaymentMethod[];
  billingHistory?: BillingHistory[];
  photoURL?: string;
}

// Add User interface for compatibility
export interface User extends UserProfileBase {
  subscription?: Subscription;
}
