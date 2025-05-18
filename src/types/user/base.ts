
export enum UserRole {
  Student = 'student',
  Tutor = 'tutor',
  Admin = 'admin'
}

export enum MoodType {
  HAPPY = 'HAPPY',
  MOTIVATED = 'MOTIVATED',
  FOCUSED = 'FOCUSED',
  CALM = 'CALM',
  TIRED = 'TIRED',
  CONFUSED = 'CONFUSED',
  ANXIOUS = 'ANXIOUS',
  STRESSED = 'STRESSED',
  OVERWHELMED = 'OVERWHELMED',
  NEUTRAL = 'NEUTRAL',
  OKAY = 'OKAY',
  SAD = 'SAD'
}

export enum SubscriptionType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  PRO = 'PRO',
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  loginCount?: number;
}

export interface AdminUser extends UserProfileBase {
  role: UserRole.Admin;
  permissions: string[];
}

export interface UserProfileType extends UserProfileBase {
  subscription?: {
    planType: string;
    expiryDate?: string;
  } | string;
  goals?: { id: string; title: string }[];
  subjects?: string[];
  examDate?: string;
  mood?: MoodType;
}
