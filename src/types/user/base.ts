export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin'
}

export enum MoodType {
  HAPPY = 5,
  NEUTRAL = 3,
  SAD = 1
}

export enum PersonalityType {
  INTROVERT = 'introvert',
  EXTROVERT = 'extrovert',
  AMBIVERT = 'ambivert'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  subscription?: {
    type: SubscriptionType;
    planType?: string;
    startDate?: string | Date;
    expiryDate?: string | Date;
    isActive?: boolean;
  };
  credits?: {
    standard: number;
    exam: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
import { SubscriptionType } from './subscription';
