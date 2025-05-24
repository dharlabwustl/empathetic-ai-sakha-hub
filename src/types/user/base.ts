
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher', 
  Admin = 'admin'
}

export enum MoodType {
  Happy = 'happy',
  Motivated = 'motivated',
  Focused = 'focused',
  Stressed = 'stressed',
  Overwhelmed = 'overwhelmed',
  Confident = 'confident',
  Anxious = 'anxious',
  Tired = 'tired'
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  loginCount?: number;
  createdAt?: string;
  updatedAt?: string;
  completedOnboarding?: boolean;
  goals?: Array<{ title: string; description?: string }>;
  mood?: MoodType;
  personalityType?: string;
  examPreparation?: string;
  studyPreferences?: {
    pace: string;
    hoursPerDay: number;
    preferredTimeStart: string;
    preferredTimeEnd: string;
  };
  studyStreak?: number;
  subscription?: {
    planType: string;
    expiryDate?: string;
  } | string;
}

export type UserProfileType = UserProfileBase;

export interface StudyStreak {
  current: number;
  longest: number;
  lastActiveDate: string;
}

export interface SubjectProgress {
  id: string;
  subject: string;
  totalConcepts: number;
  completedConcepts: number;
  progress: number;
  timeSpent: number;
  lastActivity: string;
  streak: number;
  averageScore: number;
  conceptsThisWeek: number;
  improvementRate: number;
}

export interface WeeklyProgress {
  week: string;
  hoursStudied: number;
  conceptsCompleted: number;
  testsCompleted: number;
  averageScore: number;
}

export interface ConceptProgress {
  conceptId: string;
  conceptName: string;
  subject: string;
  mastery: number;
  timeSpent: number;
  lastReviewed: string;
  attempts: number;
  correctAnswers: number;
  status: 'not-started' | 'in-progress' | 'mastered' | 'needs-review';
}
