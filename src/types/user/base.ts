
export enum MoodType {
  MOTIVATED = 'motivated',
  FOCUSED = 'focused',
  STRESSED = 'stressed',
  CONFIDENT = 'confident',
  OVERWHELMED = 'overwhelmed',
  EXCITED = 'excited',
  TIRED = 'tired',
  ANXIOUS = 'anxious',
  HAPPY = 'happy',
  CALM = 'calm',
  CONFUSED = 'confused',
  NEUTRAL = 'neutral',
  OKAY = 'okay',
  SAD = 'sad',
  CURIOUS = 'curious'
}

export enum UserGoal {
  NEET = 'NEET',
  JEE = 'JEE',
  UPSC = 'UPSC',
  CAT = 'CAT',
  GATE = 'GATE'
}

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
  TUTOR = 'tutor'
}

export enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING_WRITING = 'reading_writing'
}

export enum StudyStyle {
  INTENSIVE = 'intensive',
  GRADUAL = 'gradual',
  SPACED = 'spaced',
  CRAMMING = 'cramming'
}

export enum SubscriptionType {
  FREE = 'free',
  PREMIUM = 'premium',
  PRO = 'pro'
}

export interface UserProfileBase {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  avatar?: string;
  photoURL?: string;
  role?: UserRole;
  goals?: Array<{ title: string; id: string; targetDate?: string }>;
  loginCount?: number;
  examGoal?: UserGoal;
  examDate?: string;
  learningStyle?: LearningStyle;
  studyStyle?: StudyStyle;
  currentMood?: MoodType;
  weakSubjects?: string[];
  strongSubjects?: string[];
  performanceLevel?: 'beginner' | 'intermediate' | 'advanced';
  subscription?: SubscriptionType | { planType: string; expiryDate?: string };
  studyStreak?: number;
  examPreparation?: string;
  personalityType?: string;
  studyPreferences?: {
    pace: string;
    hoursPerDay: number;
    preferredTimeStart: string;
    preferredTimeEnd: string;
  };
  mood?: MoodType;
}

export type UserProfileType = UserProfileBase;
