
export interface Subject {
  id: string;
  name: string;
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
  proficiency: number;
  status: 'in-progress' | 'completed' | 'not-started';
  chapters: number;
  conceptsTotal: number;
  conceptsCompleted: number;
  flashcards: {
    total: number;
    completed: number;
    accuracy: number;
  };
  practiceTests: {
    total: number;
    completed: number;
    score: number;
  };
  quizAverage: number;
  recommendedStudyHours: number;
}

export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  topic: string;
  completed: boolean;
  masteryLevel: number;
  lastPracticed: string;
  timeSuggestion: number;
  flashcardsTotal: number;
  flashcardsCompleted: number;
  examReady: boolean;
  bookmarked?: boolean;
}

export interface StudyPlan {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
  subjects: StudyPlanSubject[];
  examGoal?: string;
  examDate?: string;
  progressPercent?: number;
  daysLeft?: number;
  studyHoursPerDay?: number;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  completed: number;
  total: number;
  color?: string;
  proficiency?: number;
  hoursPerWeek?: number;
  difficulty?: string;
}

export interface NewStudyPlan {
  title: string;
  examGoal?: string;
  examDate?: string;
  preferredStudyTime?: string;
  learningPace?: string;
  subjects: StudyPlanSubject[];
}

export interface ProgressSnapshot {
  conceptsDone: number;
  flashcardsDone: number;
  testsTaken: number;
  completionPercentage: number;
}

export interface ProgressTracker {
  daily: ProgressSnapshot;
  weekly: ProgressSnapshot;
  monthly: ProgressSnapshot;
}

export interface RevisionStats {
  pendingReviewConcepts: number;
  lowRetentionFlashcards: number;
  flaggedItems: number;
}

export interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  lastReviewed: string;
  retentionScore: number;
  dueDate: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'weekly-target' | 'practice-exam' | 'performance-check';
  completed: boolean;
}

export interface DashboardData {
  examGoal: string;
  subjects: Subject[];
  conceptCards: ConceptCard[];
  studyPlan: {
    id: string;
    dailyStudyTarget: number;
    conceptsPerDay: number;
    flashcardsPerDay: number;
    testsPerWeek: number;
    todaysFocus: {
      subject: string;
      concepts: string[];
      flashcardsCount: number;
      hasPracticeExam: boolean;
      estimatedTime: number;
    };
  };
  progressTracker: ProgressTracker;
  revisionStats: RevisionStats;
  revisionItems: RevisionItem[];
  milestones: Milestone[];
}
