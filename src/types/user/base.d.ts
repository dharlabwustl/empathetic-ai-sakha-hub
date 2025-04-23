
export type UserRole = 'student' | 'teacher' | 'admin' | 'parent';

export type MoodType = 
  | 'happy' 
  | 'sad' 
  | 'neutral' 
  | 'motivated' 
  | 'tired' 
  | 'stressed' 
  | 'focused' 
  | 'curious' 
  | 'overwhelmed'
  | 'okay';

export type SubscriptionType = 'free' | 'basic' | 'premium' | 'enterprise' | 'group';

export interface UserGoal {
  id?: string;
  title: string;
  progress: number;
  target: string;
  examDate?: string;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bio?: string;
  avatar?: string;
  createdAt?: string;
  location?: string;
  phoneNumber?: string;
  mood?: MoodType;
  lastLogin?: string;
  goals?: UserGoal[];
  isVerified?: boolean;
  loginCount?: number;
  subscription?: {
    plan: string;
    status: 'active' | 'inactive' | 'trial';
    endDate: string;
    isGroupLeader?: boolean;
  };
  batchName?: string;
  batchCode?: string;
  isGroupLeader?: boolean;
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    occupation?: string;
    location?: string;
    city?: string;
    state?: string;
    school?: string;
    grade?: string;
    board?: string;
    phoneNumber?: string;
  };
}

// This defines the KPI data structure
export interface KpiData {
  id: string;
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  changeValue?: number;
  changePercentage?: number;
  description?: string;
  icon?: string;
  color?: string;
  target?: number;
  period?: string;
}
