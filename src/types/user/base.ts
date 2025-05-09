
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
  Staff = 'staff',
  Guest = 'guest'
}

export enum MoodType {
  Happy = 'Happy',
  Motivated = 'Motivated',
  Focused = 'Focused',
  Neutral = 'Neutral',
  Tired = 'Tired',
  Stressed = 'Stressed',
  Confused = 'Confused',
  Overwhelmed = 'Overwhelmed',
  Calm = 'Calm'
}

export enum SubscriptionType {
  FREE = 'FREE',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE'
}

export type UserProfileBase = {
  id?: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  photoURL?: string;
  avatar?: string;
  goals?: { id: string; title: string }[];
  roles?: UserRole[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  subscriptionPlan?: SubscriptionType;
  subscriptionValid?: boolean;
  loginCount?: number;
  examPreparation?: string;
};

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
  };
}

export interface MoodThemes {
  Happy: MoodTheme;
  Motivated: MoodTheme;
  Focused: MoodTheme;
  Neutral: MoodTheme;
  Tired: MoodTheme;
  Stressed: MoodTheme;
  Confused: MoodTheme;
  Overwhelmed: MoodTheme;
  Calm: MoodTheme;
}
