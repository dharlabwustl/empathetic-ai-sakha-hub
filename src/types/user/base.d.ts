
// If this file doesn't exist, we'll create it
export interface UserGoal {
  id?: string;
  title: string;
  description?: string;
  target?: string;
  deadline?: string;
  progress?: number;
  status?: 'active' | 'completed' | 'paused';
}

export interface UserPerformance {
  subject?: string;
  score?: number;
  percentile?: number;
  rank?: number;
  timeSpent?: number;
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
}

export type MoodType = 
  | 'happy' 
  | 'sad' 
  | 'neutral' 
  | 'motivated' 
  | 'tired' 
  | 'stressed' 
  | 'focused' 
  | 'curious' 
  | 'okay' 
  | 'overwhelmed';

export interface UserProfileType {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  subscription?: string;
  avatar?: string;
  loginCount?: number;
  lastLogin?: string;
  createdAt?: string;
  examPreparation?: string;
  goals?: UserGoal[];
  performance?: UserPerformance[];
  studyStreak?: number;
  recentActivity?: {
    type: string;
    description: string;
    timestamp: string;
  }[];
  completedOnboarding?: boolean;
  mood?: MoodType;
  personality?: string;
  interests?: string[];
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
  parentGuardian?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  profileImage?: string | null;
}

export interface TeacherProfileType extends UserProfileType {
  subjects?: string[];
  school?: string;
  experience?: number;
  students?: string[];
  classes?: string[];
}

export interface ParentProfileType extends UserProfileType {
  children?: string[];
  relationship?: string;
}
