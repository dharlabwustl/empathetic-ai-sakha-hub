
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
  Mobile = 'mobile'
}

export enum StudyPreferenceType {
  Solo = 'solo',
  Group = 'group',
  AIAssisted = 'ai-assisted'
}

export enum StudyPace {
  Light = 'light',
  Moderate = 'moderate',
  Intense = 'intense'
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: string;
  features: string[];
  isPopular?: boolean;
  memberLimit?: number;
}

export interface SubscriptionType {
  planType: string;
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'canceled';
  autoRenew: boolean;
  type?: string;
  memberLimit?: number;
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  subscription?: SubscriptionType | string;
}
