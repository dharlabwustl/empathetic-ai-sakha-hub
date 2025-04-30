
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
  Neutral = 'neutral',
  Sad = 'sad',
  Calm = 'calm',
}

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise'
}

export type Subscription = {
  planType: SubscriptionType | string;
  startDate?: string;
  expiryDate?: string;
  autoRenew?: boolean;
  features?: string[];
};

export interface UserGoal {
  id?: string;
  title: string;
  targetDate?: string;
  progress?: number;
  description?: string;
}

export interface UserProfileBase {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  role?: string;
  goals?: UserGoal[];
  interests?: string[];
  subscription?: Subscription | string;
  streak?: number;
  loginCount?: number;
  lastLogin?: string;
  settings?: Record<string, any>;
  examPrep?: string;
  mood?: MoodType;
  personalityType?: string;
  studyHabits?: Record<string, any>;
  [key: string]: any;
}

export type UserProfileType = UserProfileBase;
