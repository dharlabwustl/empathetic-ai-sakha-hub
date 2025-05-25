export enum MoodType {
  HAPPY = 'happy',
  FOCUSED = 'focused',
  TIRED = 'tired',
  STRESSED = 'stressed',
  CURIOUS = 'curious',
  OKAY = 'okay',
  OVERWHELMED = 'overwhelmed',
  ANXIOUS = 'anxious',
  MOTIVATED = 'motivated',
  CONFUSED = 'confused',
  NEUTRAL = 'neutral',
  SAD = 'sad',
  CALM = 'calm',
}

export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  PREMIUM = 'premium',
  PRO_MONTHLY = 'pro_monthly',
  PRO_ANNUAL = 'pro_annual',
  GROUP_SMALL = 'group_small',
  GROUP_LARGE = 'group_large',
  GROUP_ANNUAL = 'group_annual',
  ENTERPRISE = 'enterprise'
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
  EMAIL = 'email',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
  MOBILE = 'mobile'
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

export enum PersonalityType {
  Analytical = 'analytical',
  Creative = 'creative',
  Practical = 'practical',
  Visual = 'visual',
  Auditory = 'auditory',
  Kinesthetic = 'kinesthetic'
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: Date | string;
}

export interface ExamReadiness {
  percentage: number;
  lastUpdated: Date | string;
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

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  photoURL?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  phone?: string;
  role: 'student' | 'teacher' | 'admin';
  subscription?: SubscriptionType | {
    planType: string;
    type?: string;
    startDate?: Date | string;
    expiryDate?: Date | string;
    status?: 'active' | 'expired' | 'cancelled';
    autoRenew?: boolean;
    features?: string[];
    isActive?: boolean;
    endDate?: string;
    memberLimit?: number;
  };
  goals?: {
    id: string;
    title: string;
    description?: string;
    targetDate?: Date | string;
    progress?: number;
    targetYear?: string;
  }[];
  streak?: StudyStreak;
  studyStreak?: number;
  examReadiness?: ExamReadiness;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
    emailAlerts?: boolean;
    language?: string;
    studyPace?: StudyPace;
    dailyStudyHours?: number;
    preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
    breakFrequency?: string;
    stressManagement?: string;
    studyEnvironment?: string;
    learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'analytical' | 'creative' | 'practical';
  };
  demographics?: {
    age?: number;
    city?: string;
    location?: string;
    grade?: string;
    educationLevel?: string;
    examAppearingDate?: Date | string;
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
  lastLogin?: Date | string;
  loginCount?: number;
  examPreparation?: string;
  personalityType?: string;
  studyPreferences?: {
    pace?: StudyPace;
    hoursPerDay?: number;
    preferredTimeStart?: string;
    preferredTimeEnd?: string;
    preferenceType?: StudyPreferenceType;
  };
  mood?: MoodType;
  firstName?: string;
  subjects?: string[];
  paymentMethods?: PaymentMethod[];
  billingHistory?: BillingHistory[];
  location?: string;
  grade?: string;
  gender?: string;
  batch?: any;
  isBatchLeader?: boolean;
}

export type UserProfileType = UserProfileBase;

export interface SubjectProgress {
  id?: string;
  subject: string;
  progress: number;
  topicsTotal: number;
  topicsCompleted: number;
  quizzesCompleted: number;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'master';
  isWeakSubject?: boolean;
  proficiency?: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  type: SubscriptionType;
  maxMembers?: number;
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: string;
  completed: boolean;
  status: string;
  priority: string;
}
