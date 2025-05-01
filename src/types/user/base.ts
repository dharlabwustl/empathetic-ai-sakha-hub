
export enum UserRole {
  Student = 'student',
  Tutor = 'tutor',
  Admin = 'admin',
  Parent = 'parent'
}

export enum MoodType {
  Happy = 'happy',
  Sad = 'sad',
  Stressed = 'stressed',
  Relaxed = 'relaxed',
  Focused = 'focused',
  Motivated = 'motivated',
  Overwhelmed = 'overwhelmed',
  Tired = 'tired',
  Curious = 'curious',
  Okay = 'okay',
  Neutral = 'neutral'
}

export enum StudyPace {
  Relaxed = 'relaxed',
  Moderate = 'moderate',
  Intensive = 'intensive'
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  PreferNotToSay = 'prefer-not-to-say'
}

export enum StudyPreferenceType {
  Visual = 'visual',
  Auditory = 'auditory',
  ReadWrite = 'read-write',
  Kinesthetic = 'kinesthetic',
  Mixed = 'mixed'
}

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Group = 'group',
  Enterprise = 'enterprise'
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  createdAt?: string;
  lastLogin?: string;
  avatarUrl?: string;
  goals?: {
    id: string;
    title: string;
    description?: string;
  }[];
  subscription?: {
    type: SubscriptionType;
    expiresAt?: string;
    features?: string[];
  };
  studyPace?: StudyPace;
  studyPreference?: StudyPreferenceType;
  completedOnboarding?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions?: string[];
}
