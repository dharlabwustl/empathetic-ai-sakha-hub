
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

export interface Goal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
}

export interface UserRecentActivity {
  lastLogin: Date;
  lastStudySession?: Date;
  completedTasks: number;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  examPreparation?: string;
  bio?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  goals?: Goal[];
  subjects?: string[];
  preferences?: {
    studyReminders?: boolean;
    emailNotifications?: boolean;
    darkMode?: boolean;
  };
  recentActivity: UserRecentActivity;
}
