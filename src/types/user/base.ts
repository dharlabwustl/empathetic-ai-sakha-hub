
export enum UserRole {
  Admin = 'admin',
  Student = 'student',
  Teacher = 'teacher',
  Parent = 'parent',
  Tutor = 'tutor',
  Employee = 'employee',
  Doctor = 'doctor',
  Founder = 'founder'
}

export type MoodType = 'happy' | 'motivated' | 'focused' | 'curious' | 'neutral' | 'tired' | 'stressed' | 'sad' | 'okay' | 'overwhelmed';

export type PersonalityType = 'Analytical' | 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic' | 'Social' | 'Solitary';

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  loginCount?: number;
  lastLoginAt?: string;
  onboardingCompleted?: boolean;
  subscription?: {
    type: 'free' | 'basic' | 'premium' | 'enterprise';
    expiresAt?: string;
    features?: string[];
  };
}

// Export for use in the application
export type UserProfileType = UserProfileBase;
export type SubscriptionType = 'free' | 'basic' | 'premium' | 'enterprise';
export interface UserSubscription {
  type: SubscriptionType;
  expiresAt?: string;
  features?: string[];
}
export type SubscriptionPlan = {
  id: string;
  name: string;
  type: SubscriptionType;
  price: number;
  features: string[];
  popular?: boolean;
  description?: string;
};
