
import { UserProfileType } from './base';

export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  completed: boolean;
  scheduledFor: 'today' | 'tomorrow' | 'this-week' | 'next-week' | 'later';
  flashcardsTotal: number;
  flashcardsCompleted: number;
  flagged?: boolean;
  lastReviewed?: Date;
  nextReviewDate?: Date;
}

export interface StudySubject {
  id: string;
  name: string;
  progress: number; // 0-100
  proficiency: 'weak' | 'moderate' | 'strong';
  chapters: {
    id: string;
    name: string;
    progress: number; // 0-100
  }[];
  quizzes: {
    id: string;
    title: string;
    score?: number; // 0-100
  }[];
  flashcards: {
    total: number;
    mastered: number;
  };
  recommendedStudyHours: number; // weekly
  priority?: 'high' | 'medium' | 'low';
}

export interface DailyStudyPlan {
  id: string;
  date: string;
  conceptCards: string[]; // IDs of concept cards
  flashcardSets: string[]; // IDs of flashcard sets
  practiceExams: string[]; // IDs of practice exams
  completedConcepts: number;
  totalConcepts: number;
  completedFlashcards: number;
  totalFlashcards: number;
  completedExams: number;
  totalExams: number;
  totalStudyMinutes: number;
  actualStudyMinutes: number;
}

export interface WeeklyProgress {
  weekStartDate: string;
  weekEndDate: string;
  dailyProgress: {
    date: string;
    conceptsCompleted: number;
    flashcardsCompleted: number;
    examsTaken: number;
    studyTimeMinutes: number;
  }[];
  conceptsGoal: number;
  conceptsCompleted: number;
  flashcardsGoal: number;
  flashcardsCompleted: number;
  examsGoal: number;
  examsTaken: number;
  studyTimeGoalMinutes: number;
  actualStudyTimeMinutes: number;
}

export interface StudyMilestone {
  id: string;
  title: string;
  targetDate: string;
  progress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'completed';
  description?: string;
}

export interface UserStudyData {
  userId: string;
  studyPlanId?: string;
  examGoal?: string;
  examDate?: string;
  subjects: StudySubject[];
  conceptCards: ConceptCard[];
  dailyPlans: DailyStudyPlan[];
  weeklyProgress: WeeklyProgress[];
  milestones: StudyMilestone[];
}
