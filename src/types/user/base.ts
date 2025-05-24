import { SubscriptionInfo } from './subscription';

export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
  Guest = 'guest'
}

export enum MoodType {
  HAPPY = 'happy',
  FOCUSED = 'focused', 
  TIRED = 'tired',
  STRESSED = 'stressed',
  CURIOUS = 'curious',
  OKAY = 'okay',
  OVERWHELMED = 'overwhelmed',
  ANXIOUS = 'anxious',
  MOTIVATED = 'motivated',
  CONFUSED = 'confused',
  NEUTRAL = 'neutral',
  SAD = 'sad'
}

// Helper type for string literal mood values
export type MoodTypeValue = 'happy' | 'focused' | 'tired' | 'stressed' | 'curious' | 'okay' | 'overwhelmed' | 'anxious' | 'motivated' | 'confused' | 'neutral' | 'sad';

export interface UserProfileBase {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  photoURL?: string;
  avatar?: string;
  role: UserRole;
  gradeLevel?: number;
  majorInterests?: string[];
  minorInterests?: string[];
  location?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
  darkMode?: boolean;
  isNewUser?: boolean;
  lastLogin?: string;
  loginCount?: number;
  streak?: number;
  points?: number;
  credits?: number;
  badges?: string[];
  goals?: { id: string; title: string; description?: string; }[];
  examPreferences?: string[];
  studyPreferences?: string[];
  learningStyle?: string;
  preferredSubjects?: string[];
  mood?: MoodType;
  settings?: {
    notificationsEnabled?: boolean;
    emailNotificationsEnabled?: boolean;
    smsNotificationsEnabled?: boolean;
  };
}

export interface User extends UserProfileBase {
  subscription?: SubscriptionInfo;
}
