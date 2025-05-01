
// Dashboard data types for student interfaces

export interface DashboardData {
  examGoal: string;
  subjects: Subject[];
  conceptCards: ConceptCard[];
  studyPlan: any;
  progressTracker: ProgressTracker;
  revisionStats: RevisionStats;
  revisionItems: any[];  // Added this property
  milestones: Milestone[];  // Added this property
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  priority: string;
  proficiency: number;
  status: "not-started" | "in-progress" | "completed" | "overdue";
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

export interface ProgressTracker {
  daily: ProgressStats;
  weekly: ProgressStats;
  monthly: ProgressStats;
}

export interface ProgressStats {
  conceptsDone: number;
  flashcardsDone: number;
  testsTaken: number;
  completionPercentage: number;
}

export interface RevisionStats {
  pendingReviewConcepts: number;
  lowRetentionFlashcards: number;
  flaggedItems: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  completed: boolean;
}
