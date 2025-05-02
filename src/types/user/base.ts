
export type UserRole = 'student' | 'admin' | 'teacher' | 'parent';

export type Proficiency = 'strong' | 'moderate' | 'weak' | 'medium';

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  loginCount?: number;
  goals?: Goal[];
  avatar?: string; // Add avatar property to fix type errors
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

// Add SignupType enum for the missing import
export enum SignupType {
  STUDENT = "student",
  TEACHER = "teacher",
  PARENT = "parent"
}

// Add Gender enum for the missing import
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  PREFER_NOT_TO_SAY = "prefer_not_to_say"
}

// Add StudyPace enum for the missing import
export enum StudyPace {
  FAST = "fast",
  MODERATE = "moderate",
  SLOW = "slow"
}

// Add StudyPreferenceType for the missing import
export enum StudyPreferenceType {
  VISUAL = "visual",
  AUDITORY = "auditory",
  READING = "reading",
  KINESTHETIC = "kinesthetic"
}

export enum SubscriptionType {
  FREE = "free",
  PREMIUM = "premium",
  PREMIUM_PLUS = "premium_plus",
  TRIAL = "trial",
  BASIC = "basic" // Added to fix type error with "basic"
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

// Add TaskItem interface with priority for AcademicAdvisor.tsx
export interface TaskItem {
  id: string;
  name: string;
  difficulty: "medium" | "easy" | "hard";
  completed: boolean;
  status?: "completed" | "skipped" | "pending" | "in-progress";
  priority?: 'high' | 'medium' | 'low';
}

export interface NewStudyPlan {
  id: string;
  name: string;
  subjects: StudyPlanSubject[];
  examDate?: string;
  hoursPerDay: number;
  preferredTimes: string[];
}
