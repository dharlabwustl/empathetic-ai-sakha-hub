
export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | 'anxious' | 'stressed' | 'tired' | 'focused' | 'overwhelmed' | 'curious' | 'okay';

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  loginCount?: number;
  goals?: Array<{
    id: string;
    title: string;
    progress: number;
  }>;
  subscriptionType?: SubscriptionType | SubscriptionDetails;
}

export enum SubscriptionType {
  Free = 'free',
  Premium = 'premium',
  ProStudent = 'pro_student',
  ProEducator = 'pro_educator'
}

export interface SubscriptionDetails {
  type: SubscriptionType;
  startDate: string;
  expiryDate?: string;
  isActive: boolean;
  features?: string[];
}
