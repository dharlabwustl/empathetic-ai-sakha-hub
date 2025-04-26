
export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | 'anxious' | 'stressed' | 'tired' | 'focused' | 'overwhelmed' | 'curious' | 'okay';

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  loginCount?: number;
  lastLogin?: string;
  role: UserRole;
  goals?: UserGoal[];
  tags?: string[];
  permissions?: UserPermission[];
  createdAt?: string;
  updatedAt?: string;
  joinDate?: string;
  personalityType?: string;
  mood?: MoodType;
  subscription?: SubscriptionType | UserSubscription;
}

export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Parent = 'parent',
  Admin = 'admin',
  SuperAdmin = 'superadmin'
}

export interface UserGoal {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  progress?: number;
  status?: 'not-started' | 'in-progress' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export enum UserPermission {
  ViewDashboard = 'view_dashboard',
  EditProfile = 'edit_profile',
  ManageCourses = 'manage_courses',
  ManageUsers = 'manage_users',
  ManagePayments = 'manage_payments',
  ViewReports = 'view_reports',
  AdminAccess = 'admin_access'
}

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise',
  School = 'school',
  Corporate = 'corporate'
}

export interface UserSubscription {
  planType: SubscriptionType;
  startDate: string;
  expiryDate: string;
  isActive: boolean;
  features?: string[];
}

export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  type: SubscriptionType;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
};

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastUpdated: string;
  topics: TopicProgress[];
  quizzes: QuizProgress[];
}

export interface TopicProgress {
  id: string;
  name: string;
  progress: number;
  lastStudied: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'mastered';
}

export interface QuizProgress {
  id: string;
  name: string;
  score: number;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
}

export interface StudyStreak {
  current: number;
  longest: number;
  history: { date: string; minutes: number }[];
  weeklyAverage: number;
}
