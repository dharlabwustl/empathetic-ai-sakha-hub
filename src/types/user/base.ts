
export enum UserRole {
  Student = 'student',
  Admin = 'admin',
  Employee = 'employee',
  Doctor = 'doctor',
  Founder = 'founder'
}

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise',
  School = 'school',
  Corporate = 'corporate'
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  progress: number;
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  level: string;
  institution: string;
  fieldOfStudy: string;
  graduationYear?: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserSubscription {
  planId?: string;
  planType: SubscriptionType;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  expiryDate?: string;
  features?: string[];
  batchName?: string;
  batchCode?: string;
  role?: 'leader' | 'member' | 'school_admin' | 'corporate_admin';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  type: string | SubscriptionType;
  maxMembers?: number;
}

export interface UserProfileType {
  id: string;
  name?: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  phoneNumber?: string;
  gender?: 'male' | 'female' | 'other';
  profession?: string;
  joinDate?: string;
  lastActive?: string;
  goals?: Goal[];
  subscription?: SubscriptionType | UserSubscription;
  address?: Address;
  education?: Education;
  skills?: string[];
  interests?: string[];
  personalityType?: string;
  examPreparation?: string;
}

