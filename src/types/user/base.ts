
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
  mood?: MoodType;
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
