
export enum UserRole {
  Student = 'student',
  Employee = 'employee',
  Doctor = 'doctor',
  Founder = 'founder',
  Admin = 'admin'
}

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise',
  School = 'school',
  Corporate = 'corporate'
}

export type MoodType = 'motivated' | 'curious' | 'neutral' | 'tired' | 'stressed' | 'focused' | 
                      'happy' | 'okay' | 'overwhelmed' | 'sad';

export type PersonalityType = 'analytical' | 'creative' | 'determined' | 'practical' | 'social';

export interface UserSubscription {
  id: string;
  userId: string;
  planType: SubscriptionType;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'cancelled';
  autoRenew: boolean;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  subscription?: UserSubscription;
  joinDate?: string;
  personalityType?: PersonalityType;
  loginCount?: number;
  completedOnboarding?: boolean;
  examPreparation?: string;
  goals?: Array<{
    id: string;
    title: string;
    progress: number;
    description?: string;
  }>;
}
