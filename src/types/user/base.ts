
export enum UserRole {
  Student = 'student',
  Tutor = 'tutor',
  Admin = 'admin',
  Parent = 'parent'
}

export enum MoodType {
  Happy = 'happy',
  Sad = 'sad',
  Stressed = 'stressed',
  Relaxed = 'relaxed',
  Focused = 'focused',
  Motivated = 'motivated',
  Overwhelmed = 'overwhelmed',
  Tired = 'tired',
  Curious = 'curious',
  Okay = 'okay',
  Neutral = 'neutral',
  Anxious = 'anxious',
  Confused = 'confused',
  Calm = 'calm'
}

export enum StudyPace {
  Relaxed = 'relaxed',
  Moderate = 'moderate',
  Intensive = 'intensive'
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  PreferNotToSay = 'prefer-not-to-say'
}

export enum StudyPreferenceType {
  Visual = 'visual',
  Auditory = 'auditory',
  ReadWrite = 'read-write',
  Kinesthetic = 'kinesthetic',
  Mixed = 'mixed'
}

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Group = 'group',
  Enterprise = 'enterprise'
}

export enum SignupType {
  Standard = 'standard',
  Google = 'google',
  Facebook = 'facebook',
  Apple = 'apple',
  Batch = 'batch'
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  createdAt?: string;
  lastLogin?: string;
  avatarUrl?: string;
  avatar?: string;
  loginCount?: number;
  goals?: {
    id: string;
    title: string;
    description?: string;
  }[];
  subscription?: {
    type: SubscriptionType;
    planType?: string;
    expiresAt?: string;
    features?: string[];
  };
  studyPace?: StudyPace;
  studyPreference?: StudyPreferenceType;
  completedOnboarding?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions?: string[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'bank';
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
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
  planName: string;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  progress: number;
  proficiency: "strong" | "moderate" | "weak";
  topics: any[];
  color: string;
  hoursPerWeek: number;
  priority: number;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
}

export interface StudyStreak {
  current: number;
  best: number;
  lastStudyDate: string;
}

export interface UserProfileType extends UserProfileBase {
  // Additional user profile fields
  [key: string]: any;
}
