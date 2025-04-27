
// Define subscription types
export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Pro = 'pro',
  Standard = 'standard',
  School = 'school',
  Corporate = 'corporate'
}

export type MoodType = 'happy' | 'focused' | 'tired' | 'stressed' | 'confused' | 'motivated' | undefined;

export interface UserSubscription {
  type: SubscriptionType;
  isActive: boolean;
  startDate: string;
  expiryDate: string;
}

export interface SubscriptionDetails {
  planType: string;
  isActive: boolean;
  startDate: string;
  expiryDate: string;
  features?: string[];
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: string;
  subscription?: SubscriptionType | SubscriptionDetails;
  avatar?: string;
  bio?: string;
  school?: string;
  grade?: string | number;
  goals?: { id: string; title: string; progress: number; targetDate?: string }[];
  streak?: {
    current: number;
    max: number;
    lastActive?: string;
  };
  stats?: {
    [key: string]: number;
  };
  loginCount?: number;
  lastLogin?: string;
  joinDate?: string;
  mood?: MoodType;
}

export interface UserAuthBase {
  isLoggedIn: boolean;
  token?: string;
  user?: UserProfileBase | null;
}
