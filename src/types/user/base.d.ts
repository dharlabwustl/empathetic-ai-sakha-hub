export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
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
  Motivated = 'motivated',
  Focused = 'focused',
  Tired = 'tired',
  Anxious = 'anxious',
  Happy = 'happy',
  Neutral = 'neutral',
  Stressed = 'stressed',
  Sad = 'sad',
}

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

export type SubscriptionType = 'free' | 'pro_monthly' | 'pro_yearly' | 'group';

export interface Subscription {
  type: SubscriptionType;
  startDate: string;
  endDate: string;
  isActive: boolean;
  planType: string;
  features: string[];
  memberLimit: number;
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
}
