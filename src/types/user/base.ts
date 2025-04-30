
export enum UserRole {
  Admin = "admin",
  Student = "student",
  Educator = "educator",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder"
}

export enum SubscriptionType {
  free = "free",
  premium = "premium",
  pro_student = "pro_student",
  pro_educator = "pro_educator"
}

export type MoodType = 'happy' | 'motivated' | 'focused' | 'neutral' | 'tired' | 'anxious' | 'stressed' | 'sad';

export interface UserSubscription {
  type: SubscriptionType;
  startDate: Date;
  endDate?: Date;
  autoRenew?: boolean;
  features?: string[];
}

export interface UserProfileBase {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  photoUrl?: string;
  subscription?: SubscriptionType | UserSubscription;
  goals?: { id: string; title: string; progress: number }[];
  loginCount?: number;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  exams?: string[];
}
