export enum UserRole {
  Admin = 'admin',
  Student = 'student',
  Tutor = 'tutor',
  Parent = 'parent'
}

export enum MoodType {
  Happy = 'happy',
  Motivated = 'motivated',
  Focused = 'focused',
  Neutral = 'neutral',
  Tired = 'tired',
  Anxious = 'anxious',
  Stressed = 'stressed',
  Sad = 'sad'
}

export enum PersonalityType {
  Analytical = 'analytical',
  Creative = 'creative',
  Practical = 'practical',
  Visual = 'visual',
  Auditory = 'auditory',
  Kinesthetic = 'kinesthetic'
}

export enum StudyPace {
  Aggressive = "Aggressive",
  Balanced = "Balanced",
  Relaxed = "Relaxed"
}

export enum StudyTimePreference {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening",
  Night = "Night"
}

export enum StudyEnvironmentPreference {
  Quiet = "Quiet environment",
  Background = "Background noise/music",
  Group = "Group study",
  Library = "Library/Study room",
  Outdoors = "Outdoor setting",
  Other = "Other"
}

export enum StressManagementTechnique {
  Exercise = "exercise",
  Meditation = "meditation",
  Breaks = "breaks",
  Music = "music",
  Talking = "talking",
  Other = "other"
}

export enum StudyPreferenceType {
  Solo = 'solo',
  Group = 'group',
  Mixed = 'mixed'
}

export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';
export type SignupType = 'email' | 'mobile' | 'google' | 'facebook';
export type SubscriptionType = string;
export type PaymentMethod = { 
  id: string; 
  type: string; 
  isDefault: boolean; 
  lastFour?: string;
  expiryDate?: string;
  cardType?: string;
  upiId?: string;
};

export type BillingHistory = {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
  planName: string;
};

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string; // Mobile number for authentication
  createdAt?: string;
  updatedAt?: string;
  subscription?: string | { planType: string };
}

// Demographics information
export interface UserDemographics {
  age?: number;
  educationLevel?: string;
  city?: string;
  examTarget?: string;
  examDate?: string; // Target exam date
  grade?: string;
  gender?: Gender;
  location?: string;
}

// Study preferences
export interface StudyPreferences {
  preferredStudyTime?: StudyTimePreference[];
  studyPace?: StudyPace;
  dailyStudyHours?: number;
  breakFrequency?: string;
  stressManagement?: StressManagementTechnique;
  stressManagementCustom?: string;
  studyEnvironment?: StudyEnvironmentPreference;
  studyEnvironmentCustom?: string;
}

export interface AdminUser extends BaseUser {
  role: UserRole.Admin;
  permissions?: string[];
}

export interface StudentUser extends BaseUser {
  role: UserRole.Student;
  demographics?: UserDemographics;
  personality?: PersonalityType;
  examPreparation?: string;
  level?: string;
  preferredSubjects?: string[];
  weakSubjects?: string[];
  lastLogin?: string;
  loginCount?: number;
  studyPreferences?: StudyPreferences;
  moodHistory?: Array<{
    timestamp: string;
    mood: MoodType;
    intensity: number;
  }>;
  currentMood?: {
    mood: MoodType;
    timestamp: string;
    intensity: number;
  };
  studyStreak?: number;
  rewards?: number;
  onboardingCompleted?: boolean;
}

export interface TutorUser extends BaseUser {
  role: UserRole.Tutor;
  subjects?: string[];
  expertise?: string[];
  students?: string[];
  rating?: number;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

export interface ParentUser extends BaseUser {
  role: UserRole.Parent;
  children?: string[]; // IDs of child accounts
}

export type User = AdminUser | StudentUser | TutorUser | ParentUser;

// For Profile UI component types
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

export interface UserProfileType extends UserProfileBase {
  signupType?: SignupType;
  examPreparation?: string;
  avatar?: string;
  bio?: string;
  phoneNumber?: string;
  personalityType?: PersonalityType;
  location?: string;
  gender?: Gender;
  grade?: string;
  goals?: Goal[];
  subjects?: string[];
  studyPreferences?: {
    pace: StudyPace;
    hoursPerDay: number;
    preferredTimeStart: string;
    preferredTimeEnd: string;
    preferenceType: StudyPreferenceType;
  };
  preferences?: {
    studyReminders: boolean;
    emailNotifications: boolean;
    darkMode: boolean;
  };
  recentActivity?: {
    lastLogin: Date;
    lastStudySession?: Date;
    completedTasks: number;
  };
  subscription?: {
    type: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    planType: string;
    features: string[];
    memberLimit: number;
  };
  studyStreak?: number;
  mood?: MoodType;
  paymentMethods?: PaymentMethod[];
  billingHistory?: BillingHistory[];
}
