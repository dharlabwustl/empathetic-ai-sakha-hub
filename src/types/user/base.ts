
export enum UserRole {
  Admin = 'admin',
  Student = 'student',
  Teacher = 'teacher',
  Parent = 'parent',
  Tutor = 'tutor'
}

export type MoodType = 'happy' | 'motivated' | 'focused' | 'curious' | 'neutral' | 'tired' | 'stressed' | 'sad';

export type PersonalityType = 'Analytical' | 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic' | 'Social' | 'Solitary';

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  loginCount?: number;
  lastLoginAt?: string;
  onboardingCompleted?: boolean;
  subscription?: {
    type: 'free' | 'basic' | 'premium' | 'enterprise';
    expiresAt?: string;
    features?: string[];
  };
}
