
// User profile base type
export interface UserProfileBase {
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  photoURL?: string;
  role?: string;
  loginCount?: number;
  goals?: UserGoal[];
  lastLogin?: string;
  subscription?: SubscriptionInfo | SubscriptionType;
}

// User profile type with additional fields
export interface UserProfileType extends UserProfileBase {
  createdAt?: string;
  updatedAt?: string;
  verified?: boolean;
  phoneNumber?: string;
  preferences?: UserPreferences;
  stats?: UserStats;
  achievements?: UserAchievement[];
  streakDays?: number;
  totalStudyHours?: number;
}

export interface UserPreferences {
  theme?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  language?: string;
  timezone?: string;
  studyReminders?: boolean;
}

export interface UserStats {
  completedLessons?: number;
  completedQuizzes?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  averageScore?: number;
}

export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
  icon: string;
}

export interface UserGoal {
  id?: string;
  title: string;
  description?: string;
  targetDate?: string;
  progress?: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  type?: string;
  category?: string;
}

export interface SubscriptionInfo {
  planType?: SubscriptionType | string;
  startDate?: string;
  expiryDate?: string;
  autoRenew?: boolean;
  status?: 'active' | 'expired' | 'canceled';
  price?: number;
  currency?: string;
}

export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

export enum MoodType {
  Happy = 'happy',
  Sad = 'sad',
  Tired = 'tired',
  Stressed = 'stressed',
  Anxious = 'anxious',
  Calm = 'calm',
  Confused = 'confused',
  Bored = 'bored',
  Focused = 'focused',
  Motivated = 'motivated',
  Overwhelmed = 'overwhelmed'
}

export interface DailyStudyStats {
  date: string;
  hours: number;
  efficiency: number;
  mood: MoodType;
  completedTasks: number;
  totalTasks: number;
  streakDays: number;
}
