
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Parent = 'parent',
  Admin = 'admin',
  Founder = 'founder'
}

export type MoodType = 
  | 'happy'
  | 'motivated'
  | 'focused'
  | 'neutral'
  | 'tired'
  | 'anxious'
  | 'stressed'
  | 'sad'
  | 'curious'
  | 'okay'
  | 'overwhelmed';

export type PersonalityType =
  | 'analytical'
  | 'creative'
  | 'practical'
  | 'visual'
  | 'auditory'
  | 'kinesthetic';

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise',
  Trial = 'trial',
  Pro_Annual = 'pro_annual',
  Pro_Monthly = 'pro_monthly'
}

export interface UserSubscription {
  planType: SubscriptionType | string;
  startDate?: string;
  expiryDate?: string;
  autoRenew?: boolean;
  paymentMethod?: string;
}

export interface UserProfileBase {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  loginCount?: number;
  subscription?: UserSubscription | SubscriptionType | string;
  goals?: Array<{id: string; title: string; targetDate?: string}>;
  mood?: MoodType;
  personality?: PersonalityType;
  lastActive?: string;
  avatarUrl?: string;
  avatar?: string;
  streak?: number;
  studyHours?: number;
  conceptsLearned?: number;
  testsCompleted?: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}
