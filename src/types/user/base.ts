export enum UserRole {
  Student = "student",
  Tutor = "tutor",
  Parent = "parent",
  Admin = "admin",
  Doctor = "doctor",
  Employee = "employee",
  Founder = "founder",
  SchoolAdmin = "school_admin",
  Guest = "guest"
}

export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | 'overwhelmed' | 'tired' | 'focused' | 'curious' | 'stressed' | 'okay';

export type PersonalityType = 'analytical' | 'creative' | 'practical' | 'social' | 'independent';

export interface SubjectProgress {
  id: string;
  name: string;
  percentageComplete: number;
  lastStudied: string;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
}

export interface KpiData {
  label: string;
  value: number | string;
  trend?: "up" | "down" | "neutral";
  percentageChange?: number;
}

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  isRead: boolean;
}

export interface StudyMetrics {
  totalConceptCards: number;
  flashcardsToComplete: number;
  practiceExams: number;
  averageQuizScore: number;
  averageRecallAccuracy: number;
  totalConceptsCompleted: number;
}

export interface SubjectMetrics {
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  concepts: {
    completed: number;
    total: number;
  };
  flashcards: {
    completed: number;
    total: number;
  };
  practiceTests: {
    completed: number;
    total: number;
  };
  status: 'completed' | 'in-progress' | 'need-attention';
}

export interface StudyPlanMetrics {
  dailyStudyTarget: number;
  conceptsPerDay: number;
  flashcardsPerDay: number;
  practiceTestsPerWeek: number;
}

export interface RevisionMetrics {
  pendingReviewConcepts: number;
  lowRetentionFlashcards: number;
  flaggedForRevisit: number;
  nextWeeklyTarget: string;
  nextPracticeExam: {
    topic: string;
    date: string;
  };
  performanceCheckIn: string;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bio?: string;
  avatar?: string;
  subjects?: string[];
  createdAt?: string;
  updatedAt?: string;
  completedOnboarding?: boolean;
  loginCount?: number;
  examPreparation?: string;
  goals?: {
    id: string;
    title: string;
    progress: number;
  }[];
  lastActivity?: {
    type: string;
    description: string;
  };
  suggestedNextAction?: string;
  mood?: MoodType;
  studyMetrics?: StudyMetrics;
  subjectMetrics?: SubjectMetrics[];
  studyPlanMetrics?: StudyPlanMetrics;
  revisionMetrics?: RevisionMetrics;
}
