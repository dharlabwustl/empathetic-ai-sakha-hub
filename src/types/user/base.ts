
export enum MoodType {
  HAPPY = 'happy',
  MOTIVATED = 'motivated',
  STRESSED = 'stressed',
  CONFIDENT = 'confident',
  ANXIOUS = 'anxious',
  EXCITED = 'excited',
  TIRED = 'tired',
  FOCUSED = 'focused'
}

export interface UserGoal {
  id: string;
  title: string;
  description?: string;
  targetDate?: Date;
  progress?: number;
  isActive?: boolean;
}

export interface UserProfileBase {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
  photoURL?: string;
  examPreparation?: string;
  goals?: UserGoal[];
  loginCount?: number;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  currentMood?: MoodType;
  preferences?: {
    theme?: 'light' | 'dark';
    language?: string;
    notifications?: boolean;
  };
}
