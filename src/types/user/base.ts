
export enum MoodType {
  Happy = 'happy',
  Focused = 'focused',
  Tired = 'tired',
  Stressed = 'stressed',
  Curious = 'curious',
  Okay = 'okay',
  Overwhelmed = 'overwhelmed',
  Anxious = 'anxious',
  Motivated = 'motivated',
  Confused = 'confused',
  Neutral = 'neutral',
  Sad = 'sad',
  Calm = 'calm',
}

export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  PREMIUM = 'premium',
  ProMonthly = 'pro_monthly',
  ProAnnual = 'pro_annual',
  GroupSmall = 'group_small',
  GroupLarge = 'group_large',
  GroupAnnual = 'group_annual'
}

export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  PreferNotToSay = 'prefer-not-to-say'
}

export enum SignupType {
  Email = 'email',
  Google = 'google',
  Facebook = 'facebook',
  Apple = 'apple',
  Mobile = 'mobile' // Added mobile signup type
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

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  phoneNumber?: string;
  mobileNumber?: string; // Added mobile number field
  role: 'student' | 'teacher' | 'admin';
  subscription?: SubscriptionType | {
    planType: string;
    startDate?: Date | string;
    expiryDate?: Date | string;
    status?: 'active' | 'expired' | 'cancelled';
    autoRenew?: boolean;
  };
  goals?: {
    id: string;
    title: string;
    description?: string;
    targetDate?: Date;
    progress?: number;
  }[];
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
    emailAlerts?: boolean;
    language?: string;
    studyPace?: StudyPace; // Added study pace preference
    dailyStudyHours?: number; // Added daily study hours
    preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night'; // Added preferred study time
    breakFrequency?: string; // Added break frequency
    stressManagement?: string; // Added stress management technique
    studyEnvironment?: string; // Added study environment preference
    learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'analytical' | 'creative' | 'practical'; // Added learning style
  };
  demographics?: { // Added demographics section
    age?: number;
    city?: string;
    educationLevel?: string;
    examAppearingDate?: Date | string;
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
  lastLogin?: Date | string;
  loginCount?: number;
}

export type UserProfileType = UserProfileBase;

// Additional types that might be useful
export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: Date;
}

export interface SubjectProgress {
  id?: string;
  subject: string;
  progress: number;
  topicsTotal: number;
  topicsCompleted: number;
  quizzesCompleted: number;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'master';
  isWeakSubject?: boolean; // Added to track weak subjects
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'bank';
  isDefault: boolean;
  lastFour?: string;
  expiryDate?: string;
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

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  type: SubscriptionType;
  maxMembers?: number;
}
