
export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin'
}

export enum MoodType {
  HAPPY = 5,
  NEUTRAL = 3,
  SAD = 1,
  MOTIVATED = 'motivated',
  FOCUSED = 'focused',
  CALM = 'calm',
  TIRED = 'tired',
  CONFUSED = 'confused',
  ANXIOUS = 'anxious',
  STRESSED = 'stressed',
  OVERWHELMED = 'overwhelmed',
  OKAY = 'okay',
  CURIOUS = 'curious'
}

export enum PersonalityType {
  INTROVERT = 'introvert',
  EXTROVERT = 'extrovert',
  AMBIVERT = 'ambivert'
}

export enum SubscriptionType {
  FREE = 'free',
  PRO = 'pro',
  GROUP = 'group',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
  PRO_MONTHLY = 'pro_monthly'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum SignupType {
  Email = 'email',
  Google = 'google',
  Facebook = 'facebook'
}

export enum StudyPace {
  Slow = 'slow',
  Moderate = 'moderate',
  Fast = 'fast'
}

export enum StudyPreferenceType {
  Solo = 'solo',
  Group = 'group',
  Mixed = 'mixed'
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
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
  planName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  subscription?: {
    type: SubscriptionType;
    planType?: string;
    startDate?: string | Date;
    expiryDate?: string | Date;
    isActive?: boolean;
  };
  credits?: {
    standard: number;
    exam: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  permissions: string[];
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscription?: SubscriptionType | {
    type: SubscriptionType;
    planType?: string;
    startDate?: string | Date;
    expiryDate?: string | Date;
    isActive?: boolean;
  };
  avatar?: string;
  loginCount?: number;
  studyStreak?: number;
}

export interface UserProfileType extends UserProfileBase {
  signupType?: SignupType;
  examPreparation?: string;
  avatar?: string;
  bio?: string;
  phoneNumber?: string;
  personalityType?: string;
  location?: string;
  gender?: Gender;
  grade?: string;
  photoURL?: string;
  goals?: Array<{
    id: string;
    title: string;
    targetDate: string;
    progress: number;
    targetYear: string;
  }>;
  subjects?: string[];
  studyPreferences?: {
    pace: StudyPace | string;
    hoursPerDay: number;
    preferredTimeStart: string;
    preferredTimeEnd: string;
    preferenceType?: StudyPreferenceType;
  };
  preferences?: {
    studyReminders: boolean;
    emailNotifications: boolean;
    darkMode: boolean;
  };
  recentActivity?: {
    lastLogin?: Date;
    lastStudySession?: Date;
    completedTasks: number;
  };
  studyStreak?: number;
  mood?: MoodType;
  paymentMethods?: PaymentMethod[];
  billingHistory?: BillingHistory[];
  loginCount?: number;
}

export interface SubjectProgress {
  subject: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastActive: Date;
}
