
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

export enum MoodType {
  Happy = 'happy',
  Focused = 'focused',
  Tired = 'tired',
  Stressed = 'stressed',
  Curious = 'curious',
  Okay = 'okay',
  Overwhelmed = 'overwhelmed',
  Anxious = 'anxious',
  Motivated = 'motivated',
  Confused = 'confused',
  Neutral = 'neutral',
  Sad = 'sad'
}

export enum PersonalityType {
  Visual = 'visual',
  Auditory = 'auditory',
  ReadWrite = 'readWrite',
  Kinesthetic = 'kinesthetic',
  Logical = 'logical',
  Social = 'social',
  Solitary = 'solitary'
}

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Pro = 'pro'
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastActive?: Date | string;
  avatarUrl?: string;
  avatar?: string;
  streak?: number;
  studyHours?: number;
  conceptsLearned?: number;
  testsCompleted?: number;
  personality?: PersonalityType;
  mood?: MoodType;
  subscription?: SubscriptionType | {
    planType: string;
    status: string;
    expiresAt?: string;
  };
  loginCount?: number;
  goals?: string[];
  studyPace?: 'Aggressive' | 'Balanced' | 'Relaxed';
  studyTime?: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  dailyStudyHours?: number;
}
