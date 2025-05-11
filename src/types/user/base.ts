
export enum UserRole {
  Student = 'student',
  Tutor = 'tutor',
  Parent = 'parent',
  Admin = 'admin'
}

export enum MoodType {
  HAPPY = 'HAPPY',
  MOTIVATED = 'MOTIVATED',
  FOCUSED = 'FOCUSED',
  TIRED = 'TIRED',
  STRESSED = 'STRESSED'
}

export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise'
}

export interface UserProfileBase {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  role: UserRole;
  createdAt?: string | Date;
  lastActive?: string | Date;
  loginCount?: number;
  streak?: {
    current: number;
    longest: number;
    lastStudyDate: string | Date;
  };
  examReadiness?: {
    percentage: number;
    lastUpdated: string | Date;
  };
  goals?: {
    id: string;
    title: string;
    targetDate?: string | Date;
    progress?: number;
  }[];
  subscription?: SubscriptionType | {
    planType: string;
    startDate?: string | Date;
    expiryDate?: string | Date;
    status?: 'active' | 'expired' | 'cancelled';
    autoRenew?: boolean;
  };
}

export interface UserProfileType extends UserProfileBase {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
  preferences?: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    language: string;
    accessibility?: {
      fontSize: string;
      highContrast: boolean;
      screenReaderMode: boolean;
    };
  };
  examPreparation?: string;
  location?: string;
  grade?: string;
}

export interface MoodTheme {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  darkBackgroundColor: string;
  darkTextColor: string;
  darkBorderColor: string;
  emoji: string;
  message: string;
  studyTip: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface MoodThemes {
  [key: string]: MoodTheme;
  happy: MoodTheme;
  motivated: MoodTheme;
  focused: MoodTheme;
  tired: MoodTheme;
  stressed: MoodTheme;
  confused: MoodTheme;
  calm: MoodTheme;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: number;
}
