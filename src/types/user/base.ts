
export enum UserRole {
  Student = 'student',
  Employee = 'employee',
  Doctor = 'doctor',
  Founder = 'founder',
  Admin = 'admin'
}

export enum MoodType {
  Happy = 'Happy',
  Stressed = 'Stressed',
  Motivated = 'Motivated',
  Tired = 'Tired',
  Focused = 'Focused',
  Confused = 'Confused',
  Calm = 'Calm',
  Overwhelmed = 'Overwhelmed',
  Okay = 'Okay'
}

export enum SubscriptionType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM'
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  goals?: {
    id: string;
    title: string;
    description?: string;
    deadline?: Date;
    completed: boolean;
  }[];
  skills?: string[];
  interests?: string[];
  mood?: MoodType;
  onboardingCompleted?: boolean;
  subscriptionType?: SubscriptionType;
  createdAt: Date;
  updatedAt?: Date;
}
