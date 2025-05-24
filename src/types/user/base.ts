
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
  Happy = 'happy',
  Motivated = 'motivated',
  Focused = 'focused',
  Tired = 'tired',
  Anxious = 'anxious',
  Neutral = 'neutral',
  Stressed = 'stressed',
  Sad = 'sad',
  Calm = 'calm',
  Confused = 'confused',
  Overwhelmed = 'overwhelmed',
  Okay = 'okay',
  Curious = 'curious'
}

export enum PersonalityType {
  StrategicThinker = 'Strategic Thinker',
  CreativeLearner = 'Creative Learner',
  MethodicalPlanner = 'Methodical Planner',
  AdaptiveExplorer = 'Adaptive Explorer'
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
  personalityType?: PersonalityType;
  mood?: MoodType;
  
  // Onboarding data fields
  age?: number;
  city?: string;
  educationLevel?: string;
  institute?: string;
  examGoal?: string;
  examAppearingDate?: Date;
  jobTitle?: string;
  experience?: string;
  industry?: string;
  skills?: string[];
  specialization?: string;
  institution?: string;
  researchTopic?: string;
  startupStage?: string;
  teamSize?: number;
  startupGoal?: string;
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'analytical' | 'creative' | 'practical';
  sleepSchedule?: string;
  focusHours?: number;
  stressManagement?: string;
  breakRoutine?: string;
  breakFrequency?: string;
  studyEnvironment?: string;
  studyPace?: 'slow' | 'moderate' | 'fast';
  dailyStudyHours?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  interests?: string[];
  weakSubjects?: string[];
  mobileNumber?: string;
  preferredSubjects?: string[];
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetDate: string;
  progress: number;
  targetYear: string;
  dueDate?: string;
  status?: 'in-progress' | 'not-started' | 'completed';
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
