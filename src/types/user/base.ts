
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
  TEACHER = 'teacher'
}

export enum MoodType {
  EXCITED = 'excited',
  MOTIVATED = 'motivated', 
  FOCUSED = 'focused',
  STRESSED = 'stressed',
  OVERWHELMED = 'overwhelmed',
  CONFIDENT = 'confident',
  ANXIOUS = 'anxious',
  TIRED = 'tired',
  HAPPY = 'happy',
  FRUSTRATED = 'frustrated'
}

export enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory', 
  KINESTHETIC = 'kinesthetic',
  READING = 'reading'
}

export enum StudyStyle {
  INTENSIVE = 'intensive',
  GRADUAL = 'gradual',
  MIXED = 'mixed'
}

export enum PerformanceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export interface UserProfileBase {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: UserRole;
  avatar?: string;
  photoURL?: string;
  loginCount?: number;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  
  // Academic information
  examGoal?: string;
  examDate?: string;
  learningStyle?: LearningStyle;
  studyStyle?: StudyStyle;
  performanceLevel?: PerformanceLevel;
  weakSubjects?: string[];
  strongSubjects?: string[];
  
  // Study tracking
  studyStreak?: number;
  totalStudyHours?: number;
  currentMood?: MoodType;
  mood?: MoodType;
  
  // Study preferences
  studyPreferences?: {
    pace?: string;
    hoursPerDay?: number;
    preferredTimeStart?: string;
    preferredTimeEnd?: string;
  };
  
  // Goals and subscription
  goals?: Array<{ title: string; description?: string }>;
  subscription?: any;
  
  // Onboarding and personalization
  onboardingComplete?: boolean;
  personalityType?: string;
  examPreparation?: string;
}

export type UserProfileType = UserProfileBase;

// Legacy alias for backward compatibility
export const UserProfileType = UserProfileBase;
