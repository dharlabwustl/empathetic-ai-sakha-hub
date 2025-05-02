
export type UserRole = 'student' | 'admin' | 'teacher' | 'parent';

export type Proficiency = 'strong' | 'moderate' | 'weak' | 'medium';

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  loginCount?: number;
  goals?: Goal[];
  subscription?: SubscriptionType | { 
    planType: SubscriptionType;
    expiryDate?: string; 
  };
}

export interface Goal {
  id: string;
  title: string;
  targetDate?: string;
  progress?: number;
}

export enum UserRole {
  Student = "student",
  Parent = "parent",
  Teacher = "teacher",
  Admin = "admin"
}

export enum MoodType {
  MOTIVATED = "motivated",
  FOCUSED = "focused",
  STRESSED = "stressed",
  TIRED = "tired",
  CONFUSED = "confused",
  HAPPY = "happy",
  SAD = "sad",
  RELAXED = "relaxed",
  OVERWHELMED = "overwhelmed",
  CURIOUS = "curious",
  OKAY = "okay",
  NEUTRAL = "neutral",
  ANXIOUS = "anxious",
  CALM = "calm"
}

export enum SubscriptionType {
  FREE = "free",
  PREMIUM = "premium",
  PREMIUM_PLUS = "premium_plus",
  TRIAL = "trial"
}

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AdminUser extends BaseUser {
  role: 'admin';
}

export interface StudentUser extends BaseUser {
  role: 'student';
  profileCompleted?: boolean;
  grade?: string;
  school?: string;
  examTarget?: string;
  studyPreferences?: {
    preferredTime: string[];
    hoursPerDay: number;
    studyStyle: string[];
  };
  subjects?: string[];
}

export interface TeacherUser extends BaseUser {
  role: 'teacher';
  subjects: string[];
  experience: number;
  qualification: string;
  specialization?: string[];
}

export interface ParentUser extends BaseUser {
  role: 'parent';
  children: {
    id: string;
    name: string;
  }[];
}

export type User = StudentUser | AdminUser | TeacherUser | ParentUser;

// Study Plan related types
export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  progress: number;
  proficiency: Proficiency;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  topics: any[];
}

export interface NewStudyPlan {
  id: string;
  name: string;
  subjects: StudyPlanSubject[];
  examDate?: string;
  hoursPerDay: number;
  preferredTimes: string[];
}
