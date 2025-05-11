
// Define the available user roles
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

// Define mood types
export enum MoodType {
  Happy = 'Happy',
  Motivated = 'Motivated',
  Focused = 'Focused',
  Tired = 'Tired',
  Stressed = 'Stressed',
  Anxious = 'Anxious',
  Confused = 'Confused',
  Neutral = 'Neutral',
  Sad = 'Sad'
}

// Define subscription types
export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise'
}

// Define signup types
export enum SignupType {
  Email = 'email',
  Google = 'google',
  Facebook = 'facebook',
  Apple = 'apple'
}

// Define study pace
export enum StudyPace {
  Slow = 'slow',
  Moderate = 'moderate',
  Fast = 'fast'
}

// Define study preference type
export enum StudyPreferenceType {
  Visual = 'visual',
  Auditory = 'auditory',
  Reading = 'reading',
  Kinesthetic = 'kinesthetic'
}

// Define gender types
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  PreferNotToSay = 'prefer_not_to_say'
}

// Define student stats
export interface StudentStats {
  totalStudyHours: number;
  questionsAttempted: number;
  conceptsLearned: number;
  averageScore: number;
  streak: number;
  lastActive: string;
}

// Define user subscription
export interface UserSubscription {
  planType: SubscriptionType;
  startDate?: string;
  expiryDate?: string;
  features?: string[];
  isActive: boolean;
}

// Base user profile interface
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  loginCount?: number;
  lastLogin?: string;
  subscription?: UserSubscription;
  avatar?: string;
  status?: 'online' | 'offline' | 'busy';
  examGoal?: string;
  studyPace?: 'slow' | 'moderate' | 'fast';
  stats?: StudentStats;
}

// Student profile extending base profile
export interface StudentProfile extends UserProfile {
  role: UserRole.Student;
  grade?: string;
  targetExams?: string[];
  subjects?: string[];
  completedOnboarding?: boolean;
}

// Teacher profile extending base profile
export interface TeacherProfile extends UserProfile {
  role: UserRole.Teacher;
  subjects?: string[];
  qualifications?: string[];
  experience?: number;
}

// Admin profile extending base profile
export interface AdminProfile extends UserProfile {
  role: UserRole.Admin;
  permissions?: string[];
  adminLevel?: 'basic' | 'super';
}
