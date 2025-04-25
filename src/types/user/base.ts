
export type UserRole = 'student' | 'tutor' | 'admin' | 'parent' | 'employee' | 'doctor' | 'founder';

export type PersonalityType = 'analytical' | 'creative' | 'practical' | 'social' | 'logical' | 'verbal' | 'visual' | 'auditory' | 'kinesthetic' | 'solitary';

export type MoodType = 'happy' | 'sad' | 'neutral' | 'motivated' | 'tired' | 'stressed' | 'curious' | 'focused' | 'okay' | 'overwhelmed';

export type DateFilterType = 'today' | 'week' | 'month' | 'all';

export type ExamType = 'IIT-JEE' | 'NEET' | 'UPSC' | 'CAT' | 'GMAT' | 'GRE';

export type UserGoal = {
  id: string;
  title: string;
  targetDate?: string;
  progress: number;
  description?: string;
  status?: 'active' | 'completed' | 'on-hold';
};

export interface ConceptCardType {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: string;
  completed: boolean;
  progress: number;
  tags?: string[];
  chapter?: string;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  goals?: UserGoal[];
  streak?: number;
  joinDate?: string;
  lastActive?: string;
  learningStyles?: string[];
  personality?: PersonalityType[];
  interests?: string[];
  peerRanking?: number;
  loginCount?: number;
  completedOnboarding?: boolean;
  subscription?: {
    plan: string;
    status: string;
    expiresAt: string;
    features: string[];
  };
}

export interface ProgressItem {
  id: string;
  name: string;
  progress: number;  // Percentage of completion
  status: 'completed' | 'in-progress' | 'not-started';
  lastPracticed?: string;  // ISO date string
  score?: number;          // Test/quiz score if applicable
  completed?: boolean;     // If the item is completed
  masteryLevel?: number;   // Mastery level (1-5 scale)
}

export interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "member" | "leader" | "school_admin" | "corporate_admin";
  status: "active" | "inactive" | "pending";
  joinedDate?: string;
  invitationCode?: string;
  avatar?: string;
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  };
}

export interface KpiData {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
  color?: string;
  secondaryValue?: string;
  secondaryLabel?: string;
}

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  action?: string;
  actionUrl?: string;
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
}

export type SubscriptionType = 'free' | 'basic' | 'premium' | 'enterprise';

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  details: string;
  source: string;
}
