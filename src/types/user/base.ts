
export enum MoodType {
  Happy = 'Happy',
  Sad = 'Sad',
  Anxious = 'Anxious',
  Excited = 'Excited',
  Stressed = 'Stressed',
  Calm = 'Calm',
  Tired = 'Tired',
  Motivated = 'Motivated',
  Focused = 'Focused',
  Bored = 'Bored',
  Confused = 'Confused',
  Overwhelmed = 'Overwhelmed'
}

export enum SubscriptionType {
  FREE = 'Free',
  BASIC = 'Basic',
  PREMIUM = 'Premium',
  PRO = 'Pro'
}

export interface UserProfileBase {
  id?: string;
  uid?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  loginCount?: number;
  goals?: {
    id?: string;
    title?: string;
    description?: string;
    progress?: number;
    dueDate?: string;
  }[];
  examGoal?: string;
  targetExamDate?: string;
  subscription?: string | {
    planType?: string;
    startDate?: string;
    expiryDate?: string;
    isActive?: boolean;
  };
}

export type UserProfileType = UserProfileBase;
