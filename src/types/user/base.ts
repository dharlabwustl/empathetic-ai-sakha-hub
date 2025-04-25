
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
  personalityType?: string;
  loginCount?: number;
  goals?: Array<{
    id: string;
    title: string;
    progress: number;
  }>;
}
