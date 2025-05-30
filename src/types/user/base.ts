
export enum MoodType {
  HAPPY = 'happy',
  FOCUSED = 'focused', 
  TIRED = 'tired',
  STRESSED = 'stressed',
  CURIOUS = 'curious',
  OKAY = 'okay',
  OVERWHELMED = 'overwhelmed',
  ANXIOUS = 'anxious',
  MOTIVATED = 'motivated',
  CONFUSED = 'confused',
  NEUTRAL = 'neutral',
  SAD = 'sad',
  CALM = 'calm'
}

export interface MoodEntry {
  id: string;
  mood: MoodType;
  timestamp: Date;
  note?: string;
}

export interface UserProfileBase {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
  photoURL?: string;
  loginCount?: number;
  goals?: Array<{
    id: string;
    title: string;
    targetDate: string;
    progress: number;
  }>;
  preferences?: {
    studyTime?: string;
    difficultyLevel?: string;
    learningStyle?: string;
  };
  currentMood?: MoodType;
  lastActivity?: {
    type: string;
    description: string;
    timestamp: Date;
  };
}

export type UserProfileType = UserProfileBase;

// Helper type for string literal mood values
export type MoodTypeValue = 'happy' | 'focused' | 'tired' | 'stressed' | 'curious' | 'okay' | 'overwhelmed' | 'anxious' | 'motivated' | 'confused' | 'neutral' | 'sad' | 'calm';
