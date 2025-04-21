
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
}

export interface AdminAuthContextProps {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export interface AdminSettings {
  id: string;
  name: string;
  value: any;
  category: string;
  description?: string;
  updatedAt: string;
  updatedBy: string;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  examType: string;
  registrationDate: string;
  completedOnboarding: boolean;
  status: string;
  joinDate?: string;
  lastActive?: string;
  subscriptionTier?: string;
  studyTime?: number;
  completedLessons?: number;
  targetScore?: number;
  avatarUrl?: string;
  subjectsSelected?: string[];
  engagementScore?: number;
  goals?: string[];
  studyHours?: number;
  moodScore?: number;
  joinedDate?: string;
  role?: string;
  examPrep?: string;
  subjects?: string[];
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  };
}
